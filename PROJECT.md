# PROJECT

## Resources

- https://tomsouthall.com/blog/publishing-react-component-using-vite
- Vitest: https://gist.github.com/jeromeabel/895454fe49ac009bd4fd65991b1efeb2

## Steps

- verify ja-react-table name
- repo
- pnpm create vite . : react/typescript
- pnpm install react react-dom --save-dev
- pnpm install vite @vitejs/plugin-react --save-dev
- pnpm install @testing-library/dom @testing-library/react c8 eslint eslint-plugin-react jsdom react-test-renderer vitest --save-dev
- pnpm i -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom @types/testing-library\_\_jest-dom
- pnpm i --save-dev @types/react-test-renderer

2001 npm run test
2002 npm run watch
2003 npm run dev
2004 npm run test
2005 npm run build

clean main,App, index.html
package.json : author, description, scripts, browserslist, eslint, ...
vite.config.ts
vitest.congig.js
vitest.setup.js

add lib/index.tsx, index.test.tsx, integration.test.tsx

TAILWIND
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
content: ["./src/**/*.{js,jsx,ts,tsx}",]

/_ index.css _/
@tailwind base;
@tailwind components;
@tailwind utilities;

## Publish

- npm run build
- npm login
- npm publish
