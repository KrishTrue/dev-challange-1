import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  )
);
Accordion.displayName = 'Accordion';

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, defaultOpen = false, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const toggle = () => setIsOpen((prev) => !prev);

    return (
      <AccordionItemContext.Provider value={{ isOpen, toggle }}>
        <div
          ref={ref}
          className={cn('rounded-xl border border-slate-200 bg-white transition-all', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionItemContext);
  if (!context) throw new Error('AccordionTrigger must be used within AccordionItem');

  return (
    <button
      ref={ref}
      type="button"
      onClick={context.toggle}
      className={cn(
        'flex w-full items-center justify-between p-4 text-left font-medium text-slate-900 transition-all hover:bg-slate-50 rounded-xl cursor-pointer',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200',
          context.isOpen && 'rotate-180 text-blue-600'
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionItemContext);
  if (!context) throw new Error('AccordionContent must be used within AccordionItem');

  if (!context.isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn('border-t border-slate-100 p-4 pt-3 text-sm text-slate-600', className)}
      {...props}
    >
      {children}
    </div>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
