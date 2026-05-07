# Filmiagi Production - Website

A modern, responsive website for Filmiagi Production built with React and Vite. Showcase your production company's team, models, artists, and latest projects with beautiful animations and smooth navigation.

## 🎬 Features

- **Hero Section** - Eye-catching landing area with company introduction
- **Founder Section** - Display founder/company leadership information
- **Team Section** - Showcase your team members with details
- **Champions Gallery** - Highlight top models and artists with individual profile pages
- **Highlights Section** - Featured projects and achievements
- **Latest Events** - Showcase breaking news and latest announcements
- **Contact Section** - Easy contact form for inquiries
- **Dynamic Routing** - Individual pages for artists and team members
- **Smooth Animations** - GSAP animations for engaging user experience
- **Responsive Design** - Works seamlessly on all device sizes
- **404 Page** - Custom not-found page for better UX

## 🛠 Tech Stack

- **React** v19.2.4 - UI library
- **Vite** v8.0.1 - Build tool and dev server
- **React Router DOM** v7.13.2 - Client-side routing
- **GSAP** v3.14.2 - Animation library
- **React Icons** v5.6.0 - Icon library
- **SASS** - Styling
- **ESLint** - Code linting

## 📁 Project Structure

```
src/
├── component/
│   ├── common/
│   │   ├── Slider.jsx
│   │   └── TeamCard.jsx
│   ├── ContactSection/
│   ├── Footer/
│   ├── FounderSection/
│   ├── HeroSection/
│   ├── Home/
│   ├── Latest/
│   ├── Layout/
│   ├── ModelPage/          # Individual artist/model pages
│   ├── NavBar/
│   ├── NotFound/           # 404 page
│   ├── TeamPage/           # Individual team member pages
│   ├── TeamSection/
│   ├── WhatsNextSection/
│   ├── WinnerSection/      # Champions gallery
│   └── highlightsSections/
├── utils/
│   ├── highlights.js
│   ├── latest.js
│   ├── model.js            # Models/artists data
│   └── team.js             # Team members data
├── App.jsx
└── main.jsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd project2

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## 🗺 Routing

```
/                    → Home page with all sections
/artist/:artistId    → Individual artist/model profile
/team/:teamId        → Individual team member profile
/*                   → 404 Not Found page
```

## 📊 Key Components

### Home Page
Main landing page featuring:
- Hero introduction
- Founder information
- Team showcase
- Champions gallery (from `model.js`)
- Highlights section
- Latest events/news
- Contact form

### ModelPage
Individual artist/model profile accessed via `/artist/:artistId`

### TeamPage
Individual team member profile accessed via `/team/:teamId`

### Layout
Root layout component that wraps all pages with:
- Navigation bar
- Page content
- Footer

## 🎨 Data Management

- **Models/Artists** - Edit/add data in `src/utils/model.js`
- **Team Members** - Edit/add data in `src/utils/team.js`
- **Highlights** - Manage in `src/utils/highlights.js`
- **Latest Events** - Update in `src/utils/latest.js`

## 🚀 Deployment

The project is configured for Vercel deployment with a `vercel.json` configuration file.

### Deploy to Vercel:
```bash
npm run build
# Push to your Vercel-connected repository
```

## 🔧 Configuration

- **Vite Config** - `vite.config.js`
- **ESLint Config** - `eslint.config.js`
- **Vercel Config** - `vercel.json`

## 📦 Dependencies

### Main Dependencies
- react - UI framework
- react-dom - React DOM rendering
- react-router-dom - Routing solution
- gsap - Animation library
- @gsap/react - GSAP React wrapper
- react-icons - Icon components

### Dev Dependencies
- vite - Build tool
- @vitejs/plugin-react - React plugin for Vite
- eslint - Code quality
- sass-embedded - SCSS support

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Commit your changes
5. Push to your branch

## 📧 Contact

For inquiries and support, use the contact section on the website.

---

Built with ❤️ for Filmiagi Production
