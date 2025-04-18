
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
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
						background: '#0F172A', // Deep navy blue
						primary: '#1E293B', // Darker slate blue
						secondary: '#334155', // Slate gray
						accent: '#1E40AF', // Deep blue
						text: '#E2E8F0', // Light grayish blue
						muted: '#475569' // Muted slate
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

