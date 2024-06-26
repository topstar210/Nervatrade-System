import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        container: '1440px',
      },
      colors: {
        dark: {
          main: '#000814',
          second: '#0D111C',
          input: '#001D3D',
          modal: '#0E1217',
          btn: '#1E1C26'
        },
        green: {
          main: '#8FFE09',
          second: '#8FFE09'
        },
        red: {
          main: '#FF415A',
        },
        gray: {
          main: '#8C8C8C',
          second: '#91A7B4',
          border: '#22262E',
          active: '#0E1217'
        },
        white: {
          main: '#FEFEFF'
        }
      },
      backgroundImage: {
        'authbg-pattern': "url('/images/auth-pattern.png')",
      },
    },
  },
  plugins: [],
}
export default config
