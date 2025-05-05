import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enforce dark mode
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        background: "#1e293b", // Dark background
        foreground: "#f8fafc", // Light text
        muted: {
          DEFAULT: "#334155", // Muted background
          foreground: "#f8fafc", // Muted text
        },
        accent: {
          DEFAULT: "#8b5cf6", // Deep blue accent
          foreground: "var(--accent-foreground)",
          90: "rgba(139, 92, 246, 0.9)", // 90% opacity
        },
        border: "#475569", // Border color
        input: "#283141", // Input background
        ring: "#6366f1", // Focus ring
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        echo: {
          dark: {
            background: '#1e293b', // Very dark background
            primary: '#1e293b', // Dark primary
            secondary: '#334155', // Dark secondary
            accent: '#8b5cf6', // Deep blue accent
            text: '#f8fafc', // Light text for dark mode
            muted: '#475569' // Muted dark mode text
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        ...{
          'glitch': {
            '0%, 100%': { transform: 'translate(0,0)' },
            '25%': { transform: 'translate(-2px, -2px)' },
            '50%': { transform: 'translate(2px, 2px)' },
            '75%': { transform: 'translate(-2px, 2px)' }
          },
          'cyber-pulse': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' }
          }
        }
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'cyber-pulse': 'cyber-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
