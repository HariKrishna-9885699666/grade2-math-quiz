

# Grade 2 Math Quiz

Fun and interactive math quiz app for Grade 2 students. Features dynamic question generation, responsive UI, and installable as a Progressive Web App (PWA).

---

## Features

- **Dynamic Question Generation**: New questions for each topic (Numbers, Addition, Subtraction, Multiplication, Measurement, Data, Shapes) are generated on every load.
- **Responsive UI**: Mobile-friendly design with Tailwind CSS and shadcn-ui components.
- **Rough Work Canvas**: Simple, responsive canvas for students to do rough work.
- **User Profile Modal**: Floating user icon at the bottom left opens a modal with profile/contact info.
- **Social Sharing Ready**: Open Graph and Twitter meta tags for rich previews on WhatsApp and other platforms.
- **PWA Support**: Installable on desktop and mobile, works offline with service worker.
- **No Unnecessary Dependencies**: Clean, modern React 19+ codebase.

---

## Requirements

- Node.js 18+
- npm 9+

---

## Getting Started

Clone the repository, install dependencies, and start the development server:

```sh
git clone <YOUR_GIT_URL>
cd grade2-math-quiz
npm install
npm run dev
```

---

## Build & Deploy

To build for production:

```sh
npm run build
```

Deploy the `dist/` folder to any static hosting (Vercel, Netlify, GitHub Pages, etc).

---

## PWA Installation

- The app can be installed on desktop and mobile (look for the install prompt or "Add to Home Screen").
- Works offline after first load.

---

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)

---

## License

MIT
