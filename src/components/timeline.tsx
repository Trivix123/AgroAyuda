import * as React from 'react';
import { cn } from '@/lib/utils';

const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn('flex flex-col', className)} {...props} />
  )
);
Timeline.displayName = 'Timeline';

const TimelineItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('relative flex items-start pb-8', className)} {...props} />
  )
);
TimelineItem.displayName = 'TimelineItem';

const TimelineConnector = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute left-3 top-1 h-full w-0.5 bg-border -translate-x-1/2',
        'group-last:hidden',
        className
      )}
      {...props}
    />
  )
);
TimelineConnector.displayName = 'TimelineConnector';

const TimelineHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-4 flex-shrink-0', className)}
      {...props}
    >
      <div className="h-6 w-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>
      {children}
    </div>
  )
);
TimelineHeader.displayName = 'TimelineHeader';

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('font-semibold', className)} {...props} />
));
TimelineTitle.displayName = 'TimelineTitle';

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('ml-10 pt-1 flex-1 min-w-0', className)}
      {...props}
    />
  )
);
TimelineContent.displayName = 'TimelineContent';

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineContent,
};
