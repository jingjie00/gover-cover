/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        boxlightyellow: '#F5F5F5',
        boxyellow: '#E2BF4A',
        bloodred: '#9D0001',
        lightred: '#FF0002',
        buttonred: '#9B1619',
        buttonlightred: '#C91D22',
        buttonblue: '#163D7E',
        buttonlightblue: '#245FC2',
        buttonlightgreen: '#00C620',
        buttongreen: '#00570E',
        buttonyellow: '#FFE500',
        buttongold: '#E2BF4A',
        roundgreen: '#3AFFB8',
        borderyellow: '#FFE600',
        borderorange: '#F29D1F',
        textyellow: '#FFE600',
        textgold: '#FDEC97',
        textred: '#C40000',
        textgray: '#989898',
        lightgrey: '#404040',
        headerbg: '#666666',
        modalbg: '#373737',
        inputborder: '#FDEC97',
      },
      backgroundImage: {
        customgradienthint: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
        customgradientoption: 'linear-gradient(81deg, rgba(121,9,9,1) 0%, rgba(250,7,121,1) 100%)',
        customgradientyes: 'linear-gradient(129deg, rgba(9,121,77,1) 0%, rgba(7,250,208,1) 100%)',
        customgradientno: 'linear-gradient(131deg, rgba(238,18,18,1) 0%, rgba(250,194,7,1) 100%)',
        jjgradientbutton: 'linear-gradient(114.07deg, rgb(29, 212, 0) 3.49%, rgb(0, 56, 209) 34.7%, rgb(199, 0, 40) 112.68%)'
      },
      screens: {
        xs: '263px',
        // => @media (min-width: 640px) { ... }

        s: '430px',
        // => @media (min-width: 1024px) { ... }
      },
    },
    fontSize: {
      xxs: '10px',
      xs: '.75rem',
      sm: '.875rem',
      tiny: '2rem',
      base: '2rem',
      lg: '2rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
