/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: '#1F3A93',
                sky: '#5DADE2',
                coolgrey: '#7F8C8D',
                purewhite: '#FFFFFF',
            }
        },
    },
    plugins: [],
}