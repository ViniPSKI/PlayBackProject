/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors:{
      'blue':'#3048EA',
      'snow':'#F7E8E6',
      'green':'#18845E',
      'pink':'#ECA5C6',
      'light-blue':'#B6E1F2',
      'gray':'#676767',
      'light-gray':'#EAEAEA',
      'extra-light-gray':'#F3F3F3',
      'white':'white',
      'black':'black',
      'red':'#DC143C',
    },
    extend: {},
  },
  plugins: [],
}

