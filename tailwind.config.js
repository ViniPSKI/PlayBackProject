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
      'white':'white',
      'black':'black',
    },
    extend: {},
  },
  plugins: [],
}

