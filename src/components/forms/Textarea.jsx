import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

/**
 * Ambika Traders — Reusable Accessible Textarea Primitive (Stage 02)
 */
export const Textarea = React.forwardRef(({
  label,
  id,
  name,
  rows = 4,
  error,
  helperText,
  required = false,
  className,
  containerClassName,
  disabled = false,
  ...props
}, ref) => {
  const textareaId = id || name;

  return (
    <div className={cn('w-full space-y-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-label uppercase tracking-wider font-semibold font-mono text-mono-800"
        >
          {label} {required && <span className="text-mono-950">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          className={cn(
            'w-full px-4 py-3 text-body-sm font-intern bg-mono-0 border rounded-xs transition-colors duration-200 text-mono-950 placeholder:text-mono-400 focus:outline-none focus:ring-1 resize-y',
            error
              ? 'border-mono-950 bg-mono-50 focus:border-mono-950 focus:ring-mono-950'
              : 'border-mono-300 hover:border-mono-600 focus:border-mono-950 focus:ring-mono-950',
            disabled && 'opacity-50 cursor-not-allowed bg-mono-100',
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p id={`${textareaId}-error`} className="flex items-center gap-1.5 text-xs text-mono-950 font-medium">
          <AlertCircle className="w-3.5 h-3.5 text-mono-950 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      {!error && helperText && (
        <p id={`${textareaId}-helper`} className="text-xs text-mono-500 font-normal">
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
