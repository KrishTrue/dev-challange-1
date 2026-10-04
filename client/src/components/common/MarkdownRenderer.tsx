import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  /** Kept for backwards compatibility; styling is uniform across sections. */
  variant?: string;
}

/**
 * Renders clinical markdown with consistent, readable typography.
 * All spacing rules live in the `.clinical-prose` class in index.css.
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  if (!content) return null;

  return (
    <div className={cn('clinical-prose', className)}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};
