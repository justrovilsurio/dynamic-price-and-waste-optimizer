import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Surface & Background */
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'surface-hover': 'var(--surface-hover)',

        /* Borders & Dividers */
        border: 'var(--border)',
        'border-subtle': 'var(--border-subtle)',

        /* Text */
        text: 'var(--text)',
        'text-dark': 'var(--text-dark)',
        'text-muted': 'var(--text-muted)',
        'text-light': 'var(--text-light)',

        /* Primary Action (Blue) */
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-foreground': 'var(--primary-foreground)',
        'primary-light': 'var(--primary-light)',

        /* Secondary (Gray) */
        secondary: 'var(--secondary)',
        'secondary-hover': 'var(--secondary-hover)',
        'secondary-light': 'var(--secondary-light)',

        /* Focus & Ring */
        ring: 'var(--ring)',
        'ring-offset': 'var(--ring-offset)',

        /* Badge - Recommendation Variants */
        'badge-promo-bg': 'var(--badge-promo-bg)',
        'badge-promo-text': 'var(--badge-promo-text)',
        'badge-increase-bg': 'var(--badge-increase-bg)',
        'badge-increase-text': 'var(--badge-increase-text)',
        'badge-decrease-bg': 'var(--badge-decrease-bg)',
        'badge-decrease-text': 'var(--badge-decrease-text)',
        'badge-markdown-bg': 'var(--badge-markdown-bg)',
        'badge-markdown-text': 'var(--badge-markdown-text)',

        /* Badge - Confidence Variants */
        'badge-high-bg': 'var(--badge-high-bg)',
        'badge-high-text': 'var(--badge-high-text)',
        'badge-medium-bg': 'var(--badge-medium-bg)',
        'badge-medium-text': 'var(--badge-medium-text)',
        'badge-low-bg': 'var(--badge-low-bg)',
        'badge-low-text': 'var(--badge-low-text)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        lg: 'var(--shadow-lg)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      backgroundColor: {
        DEFAULT: 'var(--bg)',
      },
      textColor: {
        DEFAULT: 'var(--text)',
      },
    },
  },
  plugins: [],
};

export default config;
