import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ExternalLink, BookOpen, Layers, Server, ShieldCheck, Code2 } from 'lucide-react';

export const SourcesSection: React.FC = () => {
  const resources = [
    {
      title: 'GitHub Repository',
      desc: 'Source code, machine learning training pipelines, Flask backend, and React frontend client.',
      url: 'https://github.com/KrishTrue/dev-challange-1',
      icon: <Code2 className="h-5 w-5 text-slate-800" />,
      cta: 'View on GitHub',
    },
    {
      title: 'Project Documentation',
      desc: 'In-depth documentation covering the Random Forest model architecture, evaluation metrics, and API endpoints.',
      url: 'https://github.com/KrishTrue/dev-challange-1#readme',
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      cta: 'Read Documentation',
    },
  ];

  const techSpecs = [
    {
      title: 'Machine Learning Model',
      detail: 'Random Forest Classifier trained across 132 binary symptom features to classify 41 target diseases with ~95% validation accuracy.',
      icon: <Layers className="h-4 w-4 text-blue-600" />,
    },
    {
      title: 'Generative AI Overview',
      detail: 'Integrated with Google Gemini Flash for structured clinical breakdowns (causes, precautions, treatments).',
      icon: <Server className="h-4 w-4 text-purple-600" />,
    },
    {
      title: 'Backend Architecture',
      detail: 'Python Flask REST API with Gunicorn WSGI and fast in-memory scikit-learn model inference (<500ms latency).',
      icon: <ShieldCheck className="h-4 w-4 text-emerald-600" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Project Sources &amp; Resources
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Explore the open source codebase, machine learning architecture, and technical reference guides.
        </p>
      </div>

      {/* Main Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((item) => (
          <Card key={item.title} className="border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
                  {item.icon}
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">{item.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-500 mt-0.5">Official resource</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <span>{item.cta}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technical Specifications */}
      <Card className="border-slate-200 shadow-xs">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base font-bold text-slate-900">Technical Specifications</CardTitle>
          <CardDescription className="text-xs text-slate-500">
            System architectural highlights and dataset parameters.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 divide-y divide-slate-100 space-y-4">
          {techSpecs.map((spec, i) => (
            <div key={spec.title} className={i > 0 ? 'pt-4 space-y-1' : 'space-y-1'}>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                {spec.icon}
                <span>{spec.title}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{spec.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Attribution Card */}
      <div className="text-center py-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
        <p className="flex items-center justify-center gap-1">
          <span>Developed with precision by</span>
          <strong className="text-slate-800 font-semibold">Keshav Gilhotra</strong>
          <span>&amp;</span>
          <strong className="text-slate-800 font-semibold">Krish Puri</strong>
        </p>
        <p className="text-[11px] text-slate-400">
          Designed for modern healthcare AI screening and educational awareness.
        </p>
      </div>
    </div>
  );
};
