// 365 Clicks — preset do Tailwind com os mesmos valores de tokens.css.
// Uso: tailwind.config.js → presets: [require('./tailwind.preset.js')]
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: '#fafaf8',
        surface: { DEFAULT: '#ffffff', 2: '#f1f1ee' },
        line: '#e6e6e1',
        ink: { DEFAULT: '#121212', 2: '#3d3d3a' },
        muted: '#6b6b66',
        accent: { DEFAULT: '#c2410c', hover: '#9a3412', soft: '#fff1e8', ink: '#9a3412' },
        success: '#15803d',
        warning: '#a16207',
        danger: '#b91c1c',
        focus: '#2563eb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', '"Times New Roman"', 'serif'],
      },
      fontSize: {
        12: ['0.75rem', { lineHeight: '1.5' }],
        14: ['0.875rem', { lineHeight: '1.5' }],
        16: ['1rem', { lineHeight: '1.6' }],
        18: ['1.125rem', { lineHeight: '1.6' }],
        20: ['1.25rem', { lineHeight: '1.25' }],
        24: ['1.5rem', { lineHeight: '1.25' }],
        32: ['2rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        40: ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        56: ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        72: ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      // Grade de 8px: p-1=4, p-2=8, p-3=12, p-4=16, p-5=24, p-6=32, p-7=48, p-8=64, p-9=96
      spacing: {
        1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '24px', 6: '32px', 7: '48px', 8: '64px', 9: '96px',
      },
      borderRadius: {
        sm: '6px', md: '10px', card: '16px', xl: '24px', pill: '999px',
      },
      boxShadow: {
        1: '0 1px 2px rgba(18,18,18,.06)',
        2: '0 4px 16px rgba(18,18,18,.08)',
        3: '0 16px 40px rgba(18,18,18,.14)',
      },
      maxWidth: { container: '1320px' },
      height: { header: '64px' },
      backgroundImage: {
        'overlay-photo': 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,.72) 100%)',
        'overlay-hero': 'linear-gradient(90deg, rgba(0,0,0,.66) 0%, rgba(0,0,0,.28) 55%, rgba(0,0,0,.05) 100%)',
      },
      transitionTimingFunction: { brand: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
};
