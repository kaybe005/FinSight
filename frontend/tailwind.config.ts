import type {Config} from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./sanity/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		screens: {
    			xs: '475px'
    		},
    		colors: {
    			primary: {
    				'100': '#0057FF',
    				DEFAULT: '#0A2540',
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			black: {
    				'100': '#333333',
    				'200': '#141413',
    				'300': '#7D8087',
    				DEFAULT: '#000000'
    			},
    			white: {
    				'100': '#F7F7F7',
    				DEFAULT: '#FFFFFF'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',

    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',

    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    			},
    		},
    		fontFamily: {
    			'work-sans': [
    				'var(--font-work-sans)'
    			]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		boxShadow: {
    			'100': '2px 2px 0px 0px rgb(0, 0, 0)',
    			'200': '2px 2px 0px 2px rgb(0, 0, 0)',
    			'300': '2px 2px 0px 2px rgb(238, 43, 105)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;