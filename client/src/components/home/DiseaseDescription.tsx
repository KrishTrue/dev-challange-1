import React from 'react';
import { useAppStore } from '@/store/appStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const DiseaseDescription: React.FC = () => {
  const { prediction, diseaseDescription, isLoadingDescription } = useAppStore();

  if (!prediction && !isLoadingDescription) return null;

  return (
    <Card className="border-slate-200 shadow-xs mb-6">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span>Clinical Overview &amp; Guidance</span>
          </CardTitle>
          <Badge variant="default" className="w-fit text-[11px] gap-1 bg-blue-50 text-blue-700 border-blue-200">
            <Sparkles className="h-3 w-3" />
            Gemini AI Generated
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {isLoadingDescription ? (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : diseaseDescription ? (
          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4 [&>h1]:text-lg [&>h1]:font-bold [&>h1]:text-slate-900 [&>h2]:text-base [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h3]:text-sm [&>h3]:font-semibold [&>h3]:text-slate-900 [&>p]:text-slate-600 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:text-slate-600 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol>li]:text-slate-600 [&>strong]:text-slate-900 [&>strong]:font-semibold">
            <ReactMarkdown>{diseaseDescription}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">No additional clinical description available for this condition.</p>
        )}
      </CardContent>
    </Card>
  );
};
