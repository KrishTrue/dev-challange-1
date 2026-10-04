import React from 'react';
import { ExternalLink, BookOpen, Layers, Server, ShieldCheck, Code2, CheckCircle2 } from 'lucide-react';

export const SourcesSection: React.FC = () => {
  const resources = [
    {
      title: 'GitHub Repository',
      desc: 'Source code, machine learning training pipelines, Flask REST backend, and React client.',
      url: 'https://github.com/KrishTrue/dev-challange-1',
      icon: <Code2 className="h-5 w-5 text-slate-800" />,
      cta: 'View on GitHub',
    },
    {
      title: 'Technical Documentation',
      desc: 'In-depth documentation covering the Random Forest model architecture, evaluation metrics, and API endpoints.',
      url: 'https://github.com/KrishTrue/dev-challange-1#readme',
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      cta: 'Read Documentation',
    },
  ];

  const techSpecs = [
    {
      title: 'Machine Learning Model',
      detail: 'Supervised Random Forest Classifier evaluated across 132 binary symptom features to classify 41 target disease conditions with ~95% cross-validation accuracy.',
      icon: <Layers className="h-4 w-4 text-blue-600" />,
    },
    {
      title: 'Generative Clinical Intelligence',
      detail: 'Google Gemini Flash integration providing contextual clinical overviews, common risk factors, and recommended precautions.',
      icon: <Server className="h-4 w-4 text-purple-600" />,
    },
    {
      title: 'Backend & Inference Performance',
      detail: 'Python Flask REST API with Gunicorn WSGI and fast in-memory scikit-learn model inference (<500ms latency).',
      icon: <ShieldCheck className="h-4 w-4 text-teal-600" />,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
          <span>Transparent Clinical Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System Architecture &amp; References
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Explore the open source codebase, data pipeline details, and machine learning infrastructure behind MediPredict.
        </p>
      </div>

      {/* Main Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <span className="text-[11px] font-medium text-slate-400">Verified Resource</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <span>{item.cta}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Technical Specifications */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-900">Technical Specifications &amp; Methodology</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Architectural characteristics and algorithmic evaluation benchmarks.
          </p>
        </div>

        <div className="p-6 divide-y divide-slate-100 space-y-4">
          {techSpecs.map((spec, i) => (
            <div key={spec.title} className={i > 0 ? 'pt-4 space-y-1' : 'space-y-1'}>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                {spec.icon}
                <span>{spec.title}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{spec.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
