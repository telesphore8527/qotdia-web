# Qotdia

> **One thoughtful quote a day.**

Qotdia is a Progressive Web App (PWA) for discovering, reading and saving inspiring quotes.

The application provides a daily quote, an exploration feed, categories, local favorites, offline capabilities, theme customization and optional daily reminders — without requiring user accounts.

**Live application:** https://qotdia.com

---

## ✨ Features

* 📖 **Quote of the Day** — discover a new quote every day.
* 🔎 **Explore** — browse quotes through a paginated infinite-scroll feed.
* 🏷️ **Categories** — discover quotes by theme.
* ❤️ **Favorites** — save quotes locally on your device.
* 📋 **Copy & Share** — quickly copy or share quotes using native browser capabilities.
* 🌙 **Light / Dark mode** — switch between themes.
* 📱 **Progressive Web App** — install Qotdia directly on supported devices.
* 📡 **Offline-first experience** — access locally stored data when the network is unavailable.
* 🔔 **Daily reminders** — optionally receive local reminders for your daily quote on supported browsers.
* 🔄 **Automatic updates** — the PWA can detect and install new application versions.
* ♿ **Responsive interface** — designed for mobile and desktop screens.
* 🔍 **SEO support** — page-level metadata is managed with `react-helmet-async`.
* 🔒 **No user accounts** — Qotdia does not require authentication to use the application.

---

## 🖥️ Screens

Qotdia currently includes:

| Page         | Description                  |
| ------------ | ---------------------------- |
| `/`          | Daily quote                  |
| `/explore`   | Explore the quote collection |
| `/favorites` | Locally saved quotes         |
| `/settings`  | Application preferences      |
| `/about`     | About Qotdia and its creator |
| `/privacy`   | Privacy policy               |
| `/terms`     | Terms of service             |

Unknown routes are handled by a dedicated 404 page.

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **Vite**
* **React Router**
* **TanStack React Query**
* **Zustand**
* **localForage**
* **React Helmet Async**
* **React Icons**
* **Poppins**
* **Day.js**

### PWA

* **vite-plugin-pwa**
* Service Worker
* Web App Manifest
* Periodic Background Sync for supported browsers
* Browser Notifications API

### Development

* **ESLint**
* **Vite React plugin**
* **React Query Devtools**

The project's current dependencies and development dependencies are defined in `package.json`.

---

## 🏗️ Architecture

Qotdia follows a client-side React architecture organized by responsibility.

```text
src/
├── api/                  # API client and endpoint functions
├── assets/               # Static application assets
├── components/           # Reusable UI components
├── config/               # Application configuration
├── hooks/                # Reusable React hooks
├── lib/                  # Shared libraries and infrastructure
├── pages/                # Application pages
├── pwa/                  # PWA installation and update features
├── routes/               # React Router configuration
├── store/                # Client-side state management
├── styles/               # Global and page-level styles
└── utils/                # Utility functions
```

### API layer

API communication is isolated inside `src/api/`.

The frontend uses a small HTTP client and exposes dedicated functions for resources such as:

* Quotes
* Quote of the Day
* Categories
* Category-specific quotes

The API base URL is provided through the `VITE_API_BASE_URL` environment variable.

### Server state

**TanStack Query** manages remote API state.

It is used for:

* fetching the daily quote;
* fetching categories;
* infinite quote feeds;
* caching and synchronizing server data.

### Client state

**Zustand** manages local application state such as:

* favorites;
* UI theme.

Favorites are persisted using **localForage**, allowing them to survive page reloads and remain available locally.

---

## 📡 API

Qotdia's frontend communicates with the Qotdia API rather than storing the quote catalogue directly inside the React application.

The API base URL is configured with:

```env
VITE_API_BASE_URL=https://api.qotdia.com/api/v1
```

The frontend currently consumes endpoints for:

```text
GET /quotes
GET /quotes/today
GET /quotes/{id}
GET /categories
GET /categories/{slug}
GET /categories/{slug}/quotes
```

The quote exploration endpoint supports parameters such as:

```text
page
per_page
search
category
sort
seed
```

The feed uses a generated client-side seed so that pagination can remain coherent while allowing different feed ordering between sessions.

---

## ⚙️ Requirements

Before running the project locally, make sure you have:

* Node.js
* npm

A modern browser with support for the APIs required by the PWA features is recommended.

---

## 🚀 Installation

Clone the repository:

```bash
git clone [https://github.com/telesphore8527/qotdia-web.git]
cd [https://github.com/telesphore8527/qotdia-web.git]
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

On Windows, you can create the file manually if necessary.

Set the API URL:

```env
VITE_API_BASE_URL=https://api.qotdia.com/api/v1
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the local Vite development URL.

---

## 🔐 Environment Variables

The frontend currently expects:

| Variable            | Required | Description                |
| ------------------- | -------: | -------------------------- |
| `VITE_API_BASE_URL` |      Yes | Base URL of the Qotdia API |

Example:

```env
VITE_API_BASE_URL=https://api.qotdia.com/api/v1
```

> **Security:** never put private API keys, secrets or server credentials in a `VITE_*` variable. Vite exposes these variables to the client bundle.

For production, configure the environment variable through your hosting provider rather than committing `.env` to Git.

---

## 🧪 Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates the production build.

```bash
npm run preview
```

Serves the production build locally for testing.

```bash
npm run lint
```

Runs ESLint against the project.

---

## 📱 Progressive Web App

Qotdia is distributed as a Progressive Web App (PWA) using `vite-plugin-pwa` and Workbox.

The application is installable on supported browsers and runs in standalone mode when installed.

### PWA configuration

The application manifest defines:

* **Name:** Qotdia
* **Short name:** Qotdia
* **Language:** English
* **Display:** standalone
* **Orientation:** portrait
* **Start URL:** `/`
* **Scope:** `/`
* **Theme color:** `#6c5ce7`
* **Background color:** `#0a1628`
* **Maskable icon:** 512×512

### Service Worker

Qotdia uses Workbox runtime caching with different strategies depending on the type of resource.

| Resource            | Strategy               | Purpose                                                       |
| ------------------- | ---------------------- | ------------------------------------------------------------- |
| `/quotes/random`    | `NetworkOnly`          | Always request a fresh random quote                           |
| `/quotes/today`     | `NetworkFirst`         | Prefer fresh daily content while retaining a fallback         |
| Quote feeds         | `NetworkFirst`         | Provide fresh feeds while supporting temporary offline access |
| Quote/category data | `StaleWhileRevalidate` | Serve cached data immediately and update it in the background |

The Quote of the Day cache uses a **3-second network timeout**. If the network does not respond within that period, an available cached response can be used.

The quote feed uses a **4-second network timeout**.

### Feed cache and randomization

The Explore feed can use a `seed` parameter to vary the ordering of quotes between sessions.

The service worker intentionally removes this parameter when generating the Workbox cache key:

```js
cacheKeyWillBeUsed: async ({ request }) => {
  const url = new URL(request.url);
  url.searchParams.delete("seed");
  return url.href;
}
```

This prevents every generated feed seed from creating a separate cache entry and keeps the cache bounded.

### Cache expiration

Runtime caches use automatic expiration policies:

* Quote of the Day: up to **5 entries**, maximum **24 hours**
* Quote feeds: up to **30 entries**, maximum **3 days**
* Static quote/category data: up to **60 entries**, maximum **7 days**

Outdated Workbox caches are automatically cleaned up.

### Application updates

Qotdia uses:

```js
registerType: "prompt"
```

New application versions therefore do not silently replace the current version. The application can notify the user that an update is available and allow the update to be applied.

### Offline navigation

The service worker uses:

```js
navigateFallback: "/index.html"
```

This allows client-side React Router routes to continue working when the application shell has already been cached.

### Periodic synchronization

The service worker additionally loads:

```js
importScripts: ["periodic-sync.js"]
```

This provides the infrastructure used by Qotdia's periodic synchronization functionality where supported by the browser.


### Installation

On supported browsers, users can install Qotdia directly from the browser.

On mobile devices, the installation experience depends on the browser and operating system.

### Updates

Qotdia can detect a new application version and display an update prompt instead of silently replacing the current application.

---

## 💾 Local Data

Qotdia intentionally keeps several pieces of application data on the user's device.

Favorites are persisted through:

```text
Zustand
   ↓
persist middleware
   ↓
localForage
   ↓
IndexedDB
```

The application also uses browser storage for UI preferences such as the selected theme.

This architecture allows Qotdia to provide useful functionality without requiring user accounts.

---

## 🔔 Daily Reminders

Qotdia can optionally schedule daily quote reminders through browser capabilities.

The reminder system relies on:

* Service Workers
* Notifications API
* Periodic Background Sync

Browser support is not universal. When the required APIs are unavailable, Qotdia informs the user that reminders are unsupported.

On some platforms, installation of the PWA is required before periodic background synchronization can be enabled.

---

## 🔒 Privacy

Qotdia does not require an account.

The frontend is designed around local storage for user-specific features such as favorites and preferences.

Network requests are made to the Qotdia API when fresh content is required.

For the complete application privacy policy, see:

**https://qotdia.com/privacy**

---

## 🎨 Categories

Quotes are visually associated with categories.

The frontend currently defines dedicated visual treatments for categories including:

* Motivation
* Success
* Perseverance
* Career
* Wisdom
* Philosophy
* Learning
* Hope
* Love
* Relationships
* Happiness
* Self-confidence

Category-specific backgrounds, gradients and visual styles are centralized in the application's configuration layer.

---

## 📁 Project Structure

A simplified view of the project:

```text
src/
│
├── api/
│   ├── client.js
│   ├── endpoints.js
│   ├── quotes.js
│   ├── dailyQuote.js
│   └── categories.js
│
├── components/
│   ├── DailyQuoteCard/
│   ├── ExpQuoteCard/
│   ├── FavQuoteCard/
│   ├── ExploreActions/
│   ├── FavoritesActions/
│   ├── layout/
│   └── ...
│
├── hooks/
│   ├── useCategories.js
│   ├── useDailyQuote.js
│   ├── useDailyReminder.js
│   ├── useInfiniteQuotes.js
│   ├── useIntersectionObserver.js
│   └── useQuoteActions.js
│
├── pages/
│   ├── Home.jsx
│   ├── Explore.jsx
│   ├── Favorites.jsx
│   ├── Settings.jsx
│   └── legals/
│
├── pwa/
│   ├── InstallButton.jsx
│   ├── UpdateToast.jsx
│   └── useInstallPrompt.js
│
├── store/
│   ├── useFavoriteStore.js
│   └── useUiStore.js
│
├── routes/
├── config/
├── lib/
├── styles/
└── utils/
```

---

## 🌐 Deployment

Qotdia is a static frontend application after the production build.

Build the application with:

```bash
npm run build
```

The generated production files are placed in:

```text
dist/
```

For deployment on a static hosting provider such as **Spaceship**:

1. Connect or upload the frontend project.
2. Install dependencies.
3. Run the production build.
4. Publish the contents of `dist/`.
5. Configure the production environment variable:

   ```env
   VITE_API_BASE_URL=https://your-api-domain.com/api/v1
   ```
6. Configure SPA fallback/rewrite behavior so application routes such as `/explore` and `/favorites` resolve to the application's entry point.

> The API itself is a separate backend service. Deploying this repository does not deploy the Qotdia API.

---

## 🧭 Development Principles

The project is intentionally designed around a few principles:

### No unnecessary accounts

Users can use the application without creating an account.

### Local-first user data

Features such as favorites do not require a backend account or synchronization service.

### API separation

Quote data is provided by the Qotdia API rather than being coupled directly to the React application.

### Progressive enhancement

Features such as installation, notifications and sharing depend on browser capabilities and gracefully degrade when unavailable.

### Maintainability

API calls, state management, reusable components, pages and configuration are separated rather than concentrated in a single application layer.

---

## 🗺️ Roadmap

Potential future improvements may include:

* improved offline synchronization;
* richer quote discovery;
* additional accessibility improvements;
* enhanced sharing experiences;
* improved PWA capabilities;
* additional language support.

The roadmap may evolve as Qotdia develops.

---

## 👨‍💻 Creator

**Telesphore Kuedjeu**

Independent developer · Cameroon

Qotdia is an independent project built and maintained by its creator.

For questions, feedback or bug reports:

**[telesphorekuedjeu@gmail.com](mailto:telesphorekuedjeu@gmail.com)**

---

## 📄 License

No open-source license has currently been specified for this repository.

Until a license is added, the source code should not be assumed to be freely reusable, modified or redistributed.

---

## ❤️ About Qotdia

Qotdia was built around a simple idea:

> **One thoughtful quote a day.**

A lightweight application for discovering ideas, keeping meaningful quotes close and taking a moment to reflect.
