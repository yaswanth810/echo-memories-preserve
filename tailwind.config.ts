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
        background: "#121212", // Dark background
        foreground: "#ffffff", // Light text
        muted: {
          DEFAULT: "#2a2a2a", // Muted background
          foreground: "#aaaaaa", // Muted text
        },
        accent: {
          DEFAULT: "#1E40AF", // Deep blue accent
          foreground: "var(--accent-foreground)",
          90: "rgba(30, 64, 175, 0.9)", // 90% opacity
        },
        border: "#333333", // Border color
        input: "#2a2a2a", // Input background
        ring: "#4a90e2", // Focus ring
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
            background: '#0a0a0a', // Very dark background
            primary: '#1a1a1a', // Dark primary
            secondary: '#2a2a2a', // Dark secondary
            accent: '#1E40AF', // Deep blue accent
            text: '#e0e0e0', // Light text for dark mode
            muted: '#4a4a4a' // Muted dark mode text
          },
          cyber: {
            neon: '#00FFE4', // Bright cyan
            electric: '#FF6B6B', // Vibrant coral
            circuit: '#4ECDC4', // Teal
            glitch: '#FF9F1C' // Bright orange
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
