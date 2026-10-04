import type { DiseaseSection } from '@/types';

type SectionKey = 'description' | 'symptoms' | 'causes' | 'precautions' | 'medication';

interface SectionDef {
  key: SectionKey;
  pattern: RegExp;
  meta: Omit<DiseaseSection, 'id' | 'content'>;
}

const SECTION_DEFS: SectionDef[] = [
  {
    key: 'description',
    pattern: /^(description|overview|about|what is)\b/i,
    meta: {
      title: 'Overview',
      shortTitle: 'Overview',
      iconName: 'info',
      badgeLabel: 'Overview',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
  },
  {
    key: 'symptoms',
    pattern: /^(symptoms?|signs|key signs|clinical features)\b/i,
    meta: {
      title: 'Symptoms',
      shortTitle: 'Symptoms',
      iconName: 'activity',
      badgeLabel: 'Key Indicators',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
  },
  {
    key: 'causes',
    pattern: /^(causes?|etiology|risk factors|triggers)\b/i,
    meta: {
      title: 'Causes',
      shortTitle: 'Causes',
      iconName: 'help',
      badgeLabel: 'Risk Factors',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  },
  {
    key: 'precautions',
    pattern: /^(precautions?|prevention|preventive measures|self-care)\b/i,
    meta: {
      title: 'Precautions',
      shortTitle: 'Precautions',
      iconName: 'shield',
      badgeLabel: 'Prevention',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  },
  {
    key: 'medication',
    pattern: /^(medications?|medicines?|treatments?|therapy|therapies|management)\b/i,
    meta: {
      title: 'Medication & Treatment',
      shortTitle: 'Medication',
      iconName: 'pill',
      badgeLabel: 'Treatment',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
  },
];

/**
 * Detects whether a line is a section heading such as:
 *   "### 1. Description", "**1. Description**", "1.  **Description**", "## Symptoms"
 * Returns the matching section definition plus any inline content after the heading.
 */
function detectHeading(line: string): { def: SectionDef; inline: string } | null {
  let s = line.trim();
  // A heading must start with a markdown heading, bold marker, or a number ("1.")
  if (!/^(#{1,6}\s|\*\*|\d+[.)]\s)/.test(s)) return null;

  s = s
    .replace(/^#{1,6}\s*/, '')
    .replace(/^\d+[.)]\s*/, '')
    .replace(/^\*\*\s*/, '')
    .replace(/^\d+[.)]\s*/, '');

  const def = SECTION_DEFS.find((d) => d.pattern.test(s));
  if (!def) return null;

  let rest = s.replace(def.pattern, '');
  // Consume the remainder of the heading title up to its closing "**" or ":"
  const close = rest.match(/^[^*:\n]{0,40}?(\*\*\s*:?|:\s*\*\*|:)/);
  if (close) {
    rest = rest.slice(close[0].length);
  } else if (rest.trim().length > 40) {
    return null; // Looks like a sentence, not a heading
  } else {
    rest = '';
  }

  rest = rest.trim();
  // Drop prompt-template echoes like "– What the disease is."
  if (/^[–—-]/.test(rest)) rest = '';

  return { def, inline: rest };
}

/** Removes the common leading indentation so markdown isn't parsed as code blocks. */
function dedent(lines: string[]): string {
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length === 0) return '';
  const minIndent = Math.min(...nonEmpty.map((l) => (l.match(/^ */)?.[0].length ?? 0)));
  return lines
    .map((l) => l.slice(Math.min(minIndent, l.match(/^ */)?.[0].length ?? 0)))
    .join('\n')
    // A non-indented line starting with a capital letter begins a new paragraph
    // (prevents it from being merged into the previous paragraph or list item)
    .replace(/([^\n])\n(?=[A-Z])/g, '$1\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Cleans raw LLM markdown: strips the intro sentence, dividers and stray title lines. */
export function cleanRawMarkdown(raw: string): string {
  if (!raw) return '';
  const lines = raw.replace(/\r\n?/g, '\n').split('\n');
  const kept = lines.filter((l) => !/^\s*(---+|\*\*\*+|___+)\s*$/.test(l));
  // Remove a leading "Here is a brief and clear overview..." sentence
  while (kept.length && (kept[0].trim() === '' || /^here(?:'s| is)\b/i.test(kept[0].trim()))) {
    kept.shift();
  }
  return dedent(kept);
}

/**
 * Parses disease description text into standard clinical sections:
 * Overview, Symptoms, Causes, Precautions, Medication & Treatment.
 */
export function parseDiseaseSections(rawText: string, diseaseName?: string): DiseaseSection[] {
  if (!rawText) return [];

  const lines = cleanRawMarkdown(rawText).split('\n');
  const buckets = new Map<SectionKey, string[]>();
  const order: SectionKey[] = [];
  let current: SectionKey | null = null;

  for (const line of lines) {
    const heading = detectHeading(line);
    if (heading) {
      current = heading.def.key;
      if (!buckets.has(current)) {
        buckets.set(current, []);
        order.push(current);
      }
      if (heading.inline) buckets.get(current)!.push(heading.inline);
      continue;
    }
    // Lines before the first heading (e.g. "### Allergy" title) are dropped
    if (current) buckets.get(current)!.push(line);
  }

  const sections: DiseaseSection[] = [];
  for (const key of order) {
    const def = SECTION_DEFS.find((d) => d.key === key)!;
    const content = dedent(buckets.get(key) ?? []);
    if (content) sections.push({ id: key, content, ...def.meta });
  }

  if (sections.length === 0) {
    const text = cleanRawMarkdown(rawText);
    return [
      {
        id: 'overview',
        title: 'Overview',
        shortTitle: 'Overview',
        iconName: 'file',
        content: text || `Clinical reference for ${diseaseName || 'this condition'}.`,
        badgeLabel: 'Summary',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      },
    ];
  }

  return sections;
}
