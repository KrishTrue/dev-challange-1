import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300',
        outline: 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 active:bg-slate-100',
        ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800',
        link: 'text-blue-600 underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base font-semibold',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200',
        secondary: 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200',
        outline: 'border-slate-200 text-slate-700 bg-white',
        success: 'border-transparent bg-emerald-50 text-emerald-700 border-emerald-200',
        warning: 'border-transparent bg-amber-50 text-amber-800 border-amber-200',
        danger: 'border-transparent bg-red-50 text-red-700 border-red-200',
        pill: 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 px-3 py-1 text-sm font-medium rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
