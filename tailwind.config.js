/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './**/*.css'
  ],
  safelist: [
    {
      pattern:
        /(text|bg|border|leading|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w|h|max-w|max-h|min-w|min-h)-\[(.*?)\]/
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      colors: {
        primary: {
          base: '#ffb603',
          50: '#fff9db',
          100: '#fff2b8',
          200: '#ffe984',
          300: '#fbd733',
          400: '#fcc906',
          500: '#ffb603',
          600: '#f0a300',
          700: '#d48e00',
          800: '#b97700',
          900: '#8f5900'
        },
        black: '#0a0a0a',
        white: '#ffffff',
        gray: {
          50: '#fbf9fa',
          100: '#f6f3f4',
          200: '#f6f6f6',
          300: '#d1d5dc',
          400: '#99a1af',
          500: '#6a7282',
          600: '#4a5565',
          700: '#1e2328',
          800: '#1e2939',
          900: '#101828'
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'rgba(0,0,0,0.05)'
      },
      screens: {
        xxxl: '2560px',
        xxl: '1440px',
        xl: '1280px',
        lg: '1024px',
        xxmd: '960px',
        xmd: '854px',
        md: '768px',
        xsm: '640px',
        sm: '480px',
        xs: '375px',
        xxs: '310px'
      },
      maxWidth: {
        desktop: '1440px'
      }
    }
  },
  plugins: []
};
