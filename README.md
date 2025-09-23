# AstraOne Frontend Wireframe

A modern wireframe implementation of the AstraOne UI built with Nuxt 3, Vue 3, Pinia, and Tailwind CSS.

## Overview

This project is a frontend wireframe scaffolding that matches the provided design screenshots. It includes:

- **Top Bar**: Brand logo, product dropdown grid, tab navigation, search, and user avatar
- **Sidebar Navigation**: Collapsible menu with expandable sub-items and active states
- **Content Areas**: Placeholder content areas for each tab page
- **Custom Design System**: Tailwind configuration with AstraOne color palette

## Tech Stack

- **Nuxt 3** - Vue.js framework
- **Vue 3** - Frontend framework
- **Pinia** - State management
- **Tailwind CSS** - Styling system
- **Headless UI** - Accessible UI components
- **Heroicons** - Icon library

## Features

- ✅ Responsive sidebar navigation with expand/collapse
- ✅ Top bar with product grid dropdown
- ✅ Tab navigation routing (Button One - Seven)
- ✅ Custom color palette matching design specs
- ✅ Placeholder content areas
- ✅ Component-based architecture

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
├── components/
│   ├── TopBar.vue        # Top navigation bar
│   └── Sidebar.vue       # Left sidebar navigation
├── layouts/
│   └── default.vue       # Main layout wrapper
├── pages/
│   ├── index.vue         # Home page
│   ├── one.vue          # Button One page
│   ├── two.vue          # Button Two page
│   └── ...              # Additional tab pages
├── stores/
│   └── navigation.js     # Pinia store for navigation state
└── assets/css/
    └── main.css         # Tailwind CSS imports

## Color Palette

The project uses a custom color palette defined in `tailwind.config.js`:

- `astra-gray-600`: #667085
- `astra-gray-800`: #2B2C2C  
- `astra-slate-300`: #E2E8F0
- `astra-gray-50`: #F9FAFB
- `astra-blue`: #465FFF
- And more...

## Navigation

- **Tab Navigation**: Use the top bar tabs (Button One - Seven) to navigate between pages
- **Sidebar**: Click sidebar items to see expand/collapse behavior
- **Product Dropdown**: Click the grid icon in the top bar to see the product grid

## Netlify Deployment

This project is configured for seamless deployment to Netlify with static site generation.

### Deploy to Netlify

#### Method 1: Drag & Drop (Quick Deploy)

1. Run the build command:
   ```bash
   npm run generate
   ```

2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

#### Method 2: Git Integration (Recommended)

1. Push your code to a GitHub repository
2. Connect the repository to Netlify:
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Netlify will automatically detect the configuration from `netlify.toml`

#### Method 3: Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Configuration Files

The project includes these Netlify configuration files:

- **`netlify.toml`**: Main configuration with build settings, redirects, and headers
- **`public/_redirects`**: Backup redirect rules for SPA routing
- **`nuxt.config.ts`**: Configured for static generation with Netlify preset

### Build Settings

If manually configuring in Netlify dashboard:
- **Build command**: `npm run generate`
- **Publish directory**: `dist`
- **Node version**: `18`

### Features Included

- ✅ Static Site Generation (SSG)
- ✅ SPA routing with fallback support
- ✅ Optimized caching headers
- ✅ Security headers
- ✅ 404 error handling
- ✅ Automatic route discovery and prerendering

## Next Steps

This wireframe provides the foundation for:
- Adding real content and data
- Implementing backend integrations
- Adding authentication
- Making it responsive for mobile devices
- **✅ Deploying to Netlify (Ready!)**

## GitHub Repository

This project is ready to be pushed to your colin-mark GitHub account for further development and collaboration.
