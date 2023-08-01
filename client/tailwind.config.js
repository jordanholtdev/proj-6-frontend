/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
    theme: {
        extend: {},
        container: {
            center: true,
        },
        variants: {
            extend: {
                overflow: ['responsive', 'hover', 'focus'],
            },
        },
    },
    plugins: [require('@headlessui/react')],
};
