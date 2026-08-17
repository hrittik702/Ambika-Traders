/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        intern: ['INTERN', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['INTERN', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          dark: 'var(--color-bg-dark)',
          elevated: 'var(--color-bg-elevated)',
          surface: 'var(--color-bg-surface)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
          inverseMuted: 'var(--color-text-inverse-muted)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
          dark: 'var(--color-border-dark)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          subtle: 'var(--color-accent-subtle)',
        },
        mono: {
          950: '#0a0a0a',
          900: '#121212',
          850: '#1a1a1a',
          800: '#262626',
          700: '#404040',
          600: '#525252',
          500: '#737373',
          400: '#a3a3a3',
          300: '#d4d4d4',
          200: '#e5e5e5',
          100: '#f5f5f5',
          50: '#fafafa',
          0: '#ffffff',
        }
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 8vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(2.75rem, 6vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'heading-1': ['clamp(1.85rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading-2': ['clamp(1.5rem, 2.5vw, 2.15rem)', { lineHeight: '1.2', letterSpacing: '-0.018em' }],
        'heading-3': ['clamp(1.25rem, 1.8vw, 1.65rem)', { lineHeight: '1.28', letterSpacing: '-0.015em' }],
        'heading-4': ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'heading-5': ['1.1rem', { lineHeight: '1.4', letterSpacing: '-0.005em' }],
        'heading-6': ['1rem', { lineHeight: '1.45', letterSpacing: '0' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55', letterSpacing: '0.005em' }],
        'caption': ['0.75rem', { lineHeight: '1.45', letterSpacing: '0.02em' }],
        'label': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.08em' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      borderRadius: {
        'none': '0px',
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      maxWidth: {
        'content': '1440px',
        'narrow': '1120px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        'luxury': '500ms',
      }
    },
  },
  plugins: [],
}
