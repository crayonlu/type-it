// tailwind.config.js 
// 这个文件仅仅是给vscode提示使用插件提示tailwind类名的，实际配置是不起作用的
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
  ],
}