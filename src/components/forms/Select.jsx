import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, AlertCircle } from 'lucide-react';

/**
 * Ambika Traders — Reusable Accessible Select Primitive (Stage 02)
 */
export const Select = React.forwardRef(({
  label,
  id,
  name,
  options = [],
  children,
  error,
  helperText,
  required = false,
  className,
  containerClassName,
  disabled = false,
  ...props
}, ref) => {
  const selectId = id || name;

  return (
    <div className={cn('w-full space-y-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-label uppercase tracking-wider font-semibold font-mono text-mono-800"
        >
          {label} {required && <span className="text-mono-950">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          name={name}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          className={cn(
            'w-full appearance-none px-4 py-3 pr-10 text-body-sm font-intern bg-mono-0 border rounded-xs transition-colors duration-200 text-mono-950 focus:outline-none focus:ring-1 cursor-pointer',
            error
              ? 'border-mono-950 bg-mono-50 focus:border-mono-950 focus:ring-mono-950'
              : 'border-mono-300 hover:border-mono-600 focus:border-mono-950 focus:ring-mono-950',
            disabled && 'opacity-50 cursor-not-allowed bg-mono-100',
            className
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-mono-600">
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>

      {error && (
        <p id={`${selectId}-error`} className="flex items-center gap-1.5 text-xs text-mono-950 font-medium">
          <AlertCircle className="w-3.5 h-3.5 text-mono-950 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      {!error && helperText && (
        <p id={`${selectId}-helper`} className="text-xs text-mono-500 font-normal">
          {helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
