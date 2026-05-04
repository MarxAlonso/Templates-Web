# ☕ Café Aroma — Frontend Architecture Document

> **Project Type:** Informational Coffee Shop Website (Frontend-Only)  
> **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui  
> **Architecture:** Clean Architecture / Feature-Based / Atomic Design  
> **Palette:** Brown `#3E2723` | Mustard `#D4A017` | White `#FAFAFA`  
> **Future-Ready:** Designed for seamless Node.js backend integration

---

## 📐 Architecture Overview

```
my-app/
├── app/                          # Next.js 14 App Router (Routing Layer)
│   ├── layout.tsx                # Root layout: fonts, metadata, global providers
│   ├── page.tsx                  # Landing page (Home)
│   ├── menu/
│   │   └── page.tsx              # Menu page
│   ├── about/
│   │   └── page.tsx              # About us page
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── loading.tsx               # Global loading state (skeleton)
│   ├── error.tsx                 # Global error boundary
│   └── globals.css               # Tailwind directives + custom CSS variables
│
├── src/
│   ├── core/                     # 🏗️ CORE — Domain layer (pure business logic)
│   │   ├── entities/             # Domain models (TypeScript interfaces/classes)
│   │   │   ├── Product.ts        # Product: id, name, description, price, categoryId, image, tags, isFeatured, isNew, rating
│   │   │   ├── Category.ts       # Category: id, name, description, icon, productCount
│   │   │   └── Contact.ts        # ContactForm: name, email, phone?, subject, message
│   │   │
│   │   ├── interfaces/           # Repository contracts (ports in Clean Architecture)
│   │   │   ├── IProductRepository.ts    # getAll(), getById(), getByCategory(), getFeatured(), getNew()
│   │   │   ├── ICategoryRepository.ts   # getAll(), getById()
│   │   │   └── IContactService.ts       # sendForm(), validateForm()
│   │   │
│   │   └── usecases/             # Business logic / Application services
│   │       ├── GetProducts.ts           # Orchestrates product retrieval
│   │       ├── GetFeaturedProducts.ts   # Filters featured items
│   │       ├── GetNewProducts.ts        # Filters new arrivals
│   │       ├── GetCategories.ts         # Retrieves all categories
│   │       └── SendContactForm.ts       # Handles contact submission logic
│   │
│   ├── infrastructure/           # 🔧 INFRASTRUCTURE — External adapters (mock data now, real APIs later)
│   │   ├── data/
│   │   │   ├── repositories/
│   │   │   │   ├── MockProductRepository.ts   # Implements IProductRepository with mock data + artificial delays
│   │   │   │   └── MockCategoryRepository.ts  # Implements ICategoryRepository with mock data
│   │   │   └── mocks/
│   │   │       ├── products.mock.ts         # Array of 15+ realistic coffee products
│   │   │       └── categories.mock.ts       # Array of 4 categories (Hot Coffee, Cold Coffee, Pastries, Specialties)
│   │   │
│   │   ├── services/
│   │   │   └── MockContactService.ts        # Implements IContactService (console.log + toast simulation)
│   │   │
│   │   └── config/               # Centralized configuration tokens
│   │       ├── colors.ts         # TypeScript color tokens (coffee-900..50, mustard-600..100, cream, white)
│   │       ├── typography.ts     # Font variables, size scale
│   │       └── breakpoints.ts    # Responsive breakpoints map
│   │
│   ├── presentation/             # 🎨 PRESENTATION — UI Layer (React components)
│   │   ├── components/
│   │   │   ├── atoms/            # Smallest indivisible UI elements
│   │   │   │   ├── Button.tsx           # Props: variant (primary/secondary/outline/ghost), size, isLoading, children
│   │   │   │   ├── Badge.tsx            # Props: variant (default/mustard/outline), children
│   │   │   │   ├── Heading.tsx          # Props: as (h1-h6), variant (display/title/subtitle), children
│   │   │   │   ├── Paragraph.tsx        # Props: variant (default/lead/small), children
│   │   │   │   ├── Input.tsx            # Props: type, placeholder, value, onChange, error?
│   │   │   │   ├── Textarea.tsx         # Props: rows, placeholder, value, onChange
│   │   │   │   ├── Logo.tsx             # SVG logo component with customizable size/color
│   │   │   │   └── Icon.tsx             # Wrapper for Lucide icons with size/color props
│   │   │   │
│   │   │   ├── molecules/        # Composed atoms (simple components)
│   │   │   │   ├── ProductCard.tsx      # Props: product (Product entity), shows image, name, price, tags, badges
│   │   │   │   ├── CategoryCard.tsx     # Props: category (Category entity), isActive, onClick, shows icon + name + count
│   │   │   │   ├── NavLink.tsx          # Props: href, label, isActive, shows active underline/highlight
│   │   │   │   ├── SocialIcon.tsx       # Props: platform, href, shows hover animation
│   │   │   │   ├── FeatureItem.tsx      # Props: icon (LucideIcon), title, description, centered layout
│   │   │   │   └── TestimonialCard.tsx  # Props: name, role, content, rating, shows stars + quote icon
│   │   │   │
│   │   │   ├── organisms/        # Complex UI sections (page sections)
│   │   │   │   ├── Navbar.tsx           # Fixed header, scroll-aware styling, mobile hamburger menu, nav links, CTA button
│   │   │   │   ├── HeroSection.tsx      # Full-screen hero with background image, gradient overlay, headline, CTAs, info badges
│   │   │   │   ├── MenuGrid.tsx         # Category filter bar + responsive product grid (2 cols mobile, 3 cols desktop)
│   │   │   │   ├── AboutSection.tsx     # Two-column layout: image with stats badge + text content + metrics
│   │   │   │   ├── FeaturesSection.tsx  # 4-column grid of FeatureItem molecules with section header
│   │   │   │   ├── TestimonialsSection.tsx # 3-column testimonial cards with section header
│   │   │   │   ├── ContactForm.tsx      # Form with validation, submit handling, success state
│   │   │   │   ├── Footer.tsx           # 4-column footer: brand, navigation, services, contact info + social icons
│   │   │   │   └── CTASection.tsx       # Call-to-action banner (e.g., "Visítanos hoy")
│   │   │   │
│   │   │   └── templates/        # Page-level layouts
│   │   │       ├── MainLayout.tsx       # Wraps Navbar + Footer around page content
│   │   │       └── PageWrapper.tsx      # Adds consistent padding/max-width/page transitions
│   │   │
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useProducts.ts           # Returns { products, loading, error } using usecase + repository
│   │   │   ├── useCategories.ts         # Returns { categories, loading, error }
│   │   │   ├── useContactForm.ts        # Form state management + validation + submission
│   │   │   ├── useScrollAnimation.ts    # IntersectionObserver for scroll-triggered fade-in animations
│   │   │   └── useMediaQuery.ts         # Responsive breakpoint detection (mobile/tablet/desktop)
│   │   │
│   │   ├── providers/            # Context providers
│   │   │   └── ThemeProvider.tsx        # Dark mode / theme context (prepared for future theming)
│   │   │
│   │   └── styles/               # Component-specific styles
│   │       └── animations.ts            # Reusable Framer Motion / CSS animation variants
│   │
│   └── shared/                   # 🔄 SHARED — Cross-cutting utilities
│       ├── types/
│       │   └── index.ts                 # Shared TypeScript types (e.g., ApiResponse, Pagination)
│       ├── utils/
│       │   ├── cn.ts                    # Tailwind class merge utility (clsx + tailwind-merge)
│       │   ├── formatters.ts            # Currency formatter, date formatter
│       │   └── validators.ts            # Email validation, phone validation helpers
│       ├── constants/
│       │   ├── routes.ts                # Route path constants ("/", "/menu", "/about", "/contact")
│       │   └── socialLinks.ts           # Social media URLs + platform metadata
│       └── enums/
│           └── ProductStatus.ts         # Enum: AVAILABLE, OUT_OF_STOCK, SEASONAL
│
├── public/
│   ├── images/
│   │   ├── hero-coffee.jpg              # Hero background: warm coffee atmosphere
│   │   ├── about-cafe.jpg               # Interior café shot
│   │   ├── products/
│   │   │   ├── espresso.jpg
│   │   │   ├── cappuccino.jpg
│   │   │   ├── latte.jpg
│   │   │   ├── cold-brew.jpg
│   │   │   ├── croissant.jpg
│   │   │   └── matcha-cake.jpg
│   │   └── team/                        # Team member photos (future feature)
│   └── fonts/                           # Custom font files if needed
│
├── tailwind.config.ts              # Extended Tailwind config with custom colors, fonts, animations
├── next.config.js                  # Next.js config: image domains, output settings, redirects
├── tsconfig.json                   # TypeScript paths: `@/*` → `./src/*` and `@/app/*` → `./app/*`
├── package.json                    # Dependencies: next, react, typescript, tailwindcss, lucide-react, framer-motion
└── .eslintrc.json                  # ESLint config with Next.js + TypeScript rules
```

---

## 🎨 Design System

### Color Palette (Tailwind Extended)

| Token | Hex | Usage |
|-------|-----|-------|
| `coffee-900` | `#3E2723` | Primary text, dark backgrounds, navbar scrolled |
| `coffee-800` | `#4E342E` | Secondary dark elements |
| `coffee-700` | `#5D4037` | Headings, emphasis text |
| `coffee-600` | `#6D4C41` | Interactive elements hover |
| `coffee-500` | `#8D6E63` | Borders, dividers, muted icons |
| `coffee-400` | `#A1887F` | Placeholder text, disabled states |
| `coffee-300` | `#BCAAA4` | Light borders, subtle separators |
| `coffee-200` | `#D7CCC8` | Subtle backgrounds, hover states |
| `coffee-100` | `#EFEBE9` | Card backgrounds, input backgrounds |
| `coffee-50` | `#FAFAFA` | Page background (warm white) |
| `mustard-600` | `#B8860B` | Dark accent (hover states) |
| `mustard-500` | `#D4A017` | **Primary accent**: buttons, highlights, active states |
| `mustard-400` | `#E6B800` | Light accent (button hover, badges) |
| `mustard-300` | `#F0C040` | Very light accent backgrounds |
| `mustard-100` | `#FFF8E1` | Accent backgrounds, highlight boxes |
| `cream` | `#FAF7F2` | Section alternate background (warmer than white) |
| `white` | `#FFFFFF` | Cards, contrast elements |

### Typography Scale

| Element | Font | Weight | Size (Mobile → Desktop) |
|---------|------|--------|---------------------------|
| H1 (Display) | Playfair Display | 700 | 48px → 64px → 72px |
| H2 (Title) | Playfair Display | 600 | 32px → 40px → 48px |
| H3 (Subtitle) | Playfair Display | 600 | 24px → 28px → 32px |
| Body | Inter | 400 | 16px |
| Lead | Inter | 400 | 18px → 20px |
| Caption | Inter | 500 | 14px |
| Button | Inter | 600 | 14px → 16px |

### Spacing Scale (Tailwind Extended)

- Section padding: `py-20 md:py-32` (80px → 128px)
- Container max-width: `max-w-7xl` (1280px)
- Container padding: `px-4 md:px-8`
- Card gap: `gap-6` (24px)
- Component gap: `gap-4` (16px)

---

## 🏗️ Core Layer (Domain)

### What to build in each file:

#### `src/core/entities/Product.ts`
- Define `Product` interface with all fields
- Include JSDoc comments explaining each field
- Export a `Product` type and optionally a `Product` class with validation methods

#### `src/core/entities/Category.ts`
- Define `Category` interface
- Include icon name field (string referencing Lucide icon names)
- Include productCount for display purposes

#### `src/core/entities/Contact.ts`
- Define `ContactForm` interface
- Include optional phone field
- Export validation rules as constants

#### `src/core/interfaces/IProductRepository.ts`
- Define `IProductRepository` interface with 5 methods
- Define `ICategoryRepository` interface with 2 methods
- Add JSDoc explaining contract expectations

#### `src/core/usecases/GetProducts.ts`
- Create `GetProductsUseCase` class
- Constructor receives `IProductRepository`
- Single `execute()` method returning `Promise<Product[]>`
- Follow same pattern for `GetFeaturedProducts`, `GetNewProducts`, `GetCategories`

#### `src/core/usecases/SendContactForm.ts`
- Create `SendContactFormUseCase` class
- Constructor receives `IContactService`
- Validate form data before sending
- Return success/error result type

---

## 🔧 Infrastructure Layer

### What to build in each file:

#### `src/infrastructure/data/mocks/products.mock.ts`
- Export `mockProducts` array with 15+ realistic coffee shop products
- Include variety: hot coffees (5), cold coffees (4), pastries (4), specialties (2+)
- Each product needs realistic name, description, price, tags
- Mix of `isFeatured: true` and `isNew: true` for testing filters
- Use placeholder image paths (`/images/products/xxx.jpg`)

#### `src/infrastructure/data/mocks/categories.mock.ts`
- Export `mockCategories` array with 4 categories
- Map icon names to Lucide icons: `coffee`, `snowflake`, `cake`, `star`
- Include realistic descriptions and product counts

#### `src/infrastructure/data/repositories/MockProductRepository.ts`
- Implement `IProductRepository` interface
- Each method wraps mock data in `Promise` with `setTimeout` (200-300ms)
- `getByCategory()` filters by `categoryId`
- `getFeatured()` filters by `isFeatured`
- `getNew()` filters by `isNew`
- Add console.log for debugging (simulating network requests)

#### `src/infrastructure/data/repositories/MockCategoryRepository.ts`
- Implement `ICategoryRepository` interface
- Same Promise + delay pattern

#### `src/infrastructure/services/MockContactService.ts`
- Implement `IContactService` interface
- `sendForm()` logs to console and returns success after 500ms delay
- `validateForm()` checks email format, required fields
- Return typed result: `{ success: boolean; message?: string }`

#### `src/infrastructure/config/colors.ts`
- Export `colors` object with nested coffee/mustard scales
- Use `as const` for type safety
- Export individual color constants for JS usage

#### `src/infrastructure/config/typography.ts`
- Export `typography` object with font families and size scale
- Reference CSS variables (`--font-playfair`, `--font-inter`)

#### `src/infrastructure/config/breakpoints.ts`
- Export breakpoint constants: `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280`

---

## 🎨 Presentation Layer

### What to build in each file:

#### Atoms (`src/presentation/components/atoms/`)

**Button.tsx:**
- Accept `variant`: primary (mustard bg), secondary (coffee bg), outline (border), ghost (text only)
- Accept `size`: sm, md, lg
- Accept `isLoading`: shows spinner, disables button
- Use `cn()` utility for class merging
- Include focus rings and disabled states
- Support `asChild` pattern for Next.js Link wrapping

**Badge.tsx:**
- Accept `variant`: default (coffee bg), mustard (mustard bg), outline (border)
- Rounded-full pill shape
- Small text size, medium weight

**Heading.tsx:**
- Accept `as`: h1-h6 (polymorphic)
- Accept `variant`: display (massive), title (section), subtitle (card)
- Always uses `font-heading` (Playfair Display)
- Default color: `coffee-900`

**Paragraph.tsx:**
- Accept `variant`: default, lead (larger, for intros), small (captions)
- Default color: `coffee-600`
- Max-width readable line length

**Input.tsx & Textarea.tsx:**
- Styled form controls with coffee-200 borders
- Focus state: mustard-500 border + ring
- Error state: red border + error message slot
- Consistent padding and border-radius

**Logo.tsx:**
- SVG or composed icon + text
- Accept `size` and `color` props
- Used in Navbar and Footer

---

#### Molecules (`src/presentation/components/molecules/`)

**ProductCard.tsx:**
- Layout: Image top (aspect 4:3), content bottom
- Image: Next.js Image with hover zoom effect
- Overlays: "Nuevo" / "Destacado" badges (absolute positioned)
- Content: Name + Price (flex row), Description (2-line clamp), Tags (flex wrap)
- Hover: shadow increase, slight Y translation
- Loading skeleton variant

**CategoryCard.tsx:**
- Layout: Vertical flex, centered
- Icon: Lucide icon in colored circle
- Text: Category name (bold) + Product count (small, muted)
- Active state: mustard background, mustard border
- Inactive state: white bg, coffee border, hover effect
- Click handler for filtering

**NavLink.tsx:**
- Next.js Link wrapper
- Active state: mustard color or underline
- Hover state: color transition
- Support for scrolled vs transparent navbar text colors

**SocialIcon.tsx:**
- Circular button with icon
- Hover: background color change + scale
- Accept platform name and URL

**FeatureItem.tsx:**
- Layout: Vertical flex, centered
- Icon: Large Lucide icon in rounded square (mustard bg)
- Title: Heading atom
- Description: Paragraph atom (small)
- Used in 4-column grid

**TestimonialCard.tsx:**
- Layout: Vertical card with padding
- Quote icon: Large, decorative, low opacity
- Stars: 5-star rating display (filled/empty)
- Content: Italic or regular text
- Author: Avatar circle (initials) + Name + Role

---

#### Organisms (`src/presentation/components/organisms/`)

**Navbar.tsx:**
- Fixed position, full width, z-50
- Left: Logo + Brand name
- Center/Right: Navigation links (hidden on mobile)
- Far right: CTA button ("Reservar Mesa")
- Scroll behavior: transparent → white background with shadow
- Mobile: Hamburger menu → slide-down panel
- Uses `useScrollAnimation` or scroll listener
- Links change color based on scroll state

**HeroSection.tsx:**
- Full viewport height (`min-h-screen`)
- Background: Image with gradient overlay (dark coffee → transparent)
- Content: Left-aligned text block (max-width for readability)
- Eyebrow: "Abierto ahora" badge with pulse dot
- Headline: Large display heading with mustard accent word
- Subheadline: Lead paragraph in white/coffee-200
- CTAs: Two buttons (primary + outline)
- Bottom info: Location + Hours (icon + text)
- Bottom fade: Gradient to cream background

**MenuGrid.tsx:**
- Section header: Centered title + subtitle
- Category filter: Horizontal scroll on mobile, grid on desktop
- "Todos" button + CategoryCard molecules
- Product grid: Responsive (1 col mobile, 2 col tablet, 3 col desktop)
- Uses ProductCard molecules
- Empty state message
- Client component (needs interactivity for filtering)

**AboutSection.tsx:**
- Dark background (coffee-900) for contrast
- Two-column layout: Image left, Text right
- Image: Rounded, with floating stats badge (absolute positioned)
- Text: Heading + multiple paragraphs
- Metrics row: 3 stats with large numbers + labels
- CTA button: Outline style

**FeaturesSection.tsx:**
- Light background (white or cream)
- Section header: Centered
- 4-column grid of FeatureItem molecules
- Responsive: 2 cols tablet, 1 col mobile

**TestimonialsSection.tsx:**
- Cream background
- Section header: Centered
- 3-column grid of TestimonialCard molecules
- Responsive: 1 col mobile, 3 cols desktop

**ContactForm.tsx:**
- Client component (form state)
- Fields: Name, Email (2-col grid), Subject, Message (textarea)
- Validation: Required fields, email format
- Submit button: Full width on mobile
- Success state: Checkmark icon + confirmation message
- Error state: Inline error messages

**Footer.tsx:**
- Dark background (coffee-900)
- 4-column grid: Brand, Navigation, Services, Contact
- Brand column: Logo + description + social icons row
- Navigation columns: Link lists
- Contact column: Icon + text rows (MapPin, Phone, Mail, Clock)
- Bottom bar: Copyright text, border-top separator

**CTASection.tsx:**
- Full-width banner
- Mustard or coffee background
- Centered text + CTA button
- Used at bottom of pages before footer

---

#### Templates (`src/presentation/components/templates/`)

**MainLayout.tsx:**
- Accepts `children`
- Wraps with Navbar + Footer
- Adds consistent padding-top for fixed navbar

**PageWrapper.tsx:**
- Accepts `children`, `className`
- Adds max-width container + horizontal padding
- Optional: page transition animations (Framer Motion)

---

#### Hooks (`src/presentation/hooks/`)

**useProducts.ts:**
- Uses `useState` + `useEffect`
- Instantiates `MockProductRepository`
- Calls `GetProductsUseCase`
- Returns `{ products, loading, error }`
- Same pattern for `useCategories`, `useFeaturedProducts`

**useContactForm.ts:**
- Manages form state object
- Validation logic (real-time or on submit)
- Submission handling with loading state
- Success/error feedback

**useScrollAnimation.ts:**
- Uses `IntersectionObserver` API
- Accepts threshold and rootMargin
- Returns `ref` + `isVisible`
- Used for fade-in-up animations on scroll

**useMediaQuery.ts:**
- Accepts breakpoint key
- Uses `window.matchMedia`
- Returns boolean (is matching)
- Used for responsive conditional rendering

---

## 📄 App Router Pages

### What to build in each file:

#### `app/layout.tsx`
- Import Google Fonts: Playfair Display (headings) + Inter (body)
- Set CSS variables for fonts
- Metadata object: title template, description, keywords, OpenGraph tags
- Root layout wraps Navbar + Footer around children
- Add `suppressHydrationWarning` for theme provider

#### `app/page.tsx` (Home)
- Server Component (fetches data server-side)
- Instantiate repositories + use cases
- Fetch: all products, categories, featured products (Promise.all)
- Compose sections in order:
  1. HeroSection
  2. FeaturesSection
  3. MenuGrid (with featured products)
  4. AboutSection
  5. TestimonialsSection

#### `app/menu/page.tsx`
- Server Component
- Fetch: all products + all categories
- Page header: Title + subtitle
- MenuGrid with full product list
- Metadata for SEO

#### `app/about/page.tsx`
- Server Component (mostly static)
- Hero header with dark background
- Story section: Image + text two-column
- Values section: 4-column FeatureItem grid
- Team section placeholder (for future)
- Statistics/metrics display

#### `app/contact/page.tsx`
- Mix: Server Component wrapper + Client Component form
- Two-column layout: Contact info (left) + ContactForm (right)
- Contact info: Address, phone, email, hours with icons
- Map placeholder (for future Google Maps integration)
- Social links row

#### `app/loading.tsx`
- Global loading UI
- Skeleton screens matching main sections
- Use `animate-pulse` for shimmer effect

#### `app/error.tsx`
- Error boundary
- "Something went wrong" message
- Retry button
- Styled with coffee/mustard colors

---

## 🔧 Configuration Files

### What to configure:

#### `tailwind.config.ts`
- Extend `theme.colors` with coffee and mustard scales
- Extend `theme.fontFamily` with CSS variables
- Extend `theme.animation` with custom keyframes (fade-in, slide-up)
- Add `theme.extend.borderRadius` for 2xl rounded cards
- Configure `content` paths: `app/**/*`, `src/**/*`

#### `next.config.js`
- `images.domains`: Add any external image domains (Unsplash for placeholders)
- `output: 'export'` (if static hosting)
- `trailingSlash: true` (optional)
- Configure redirects if needed

#### `tsconfig.json`
- Path aliases:
  - `@/*` → `./src/*`
  - `@/app/*` → `./app/*`
  - `@/public/*` → `./public/*`
- Strict mode enabled
- Include `app` and `src` directories

#### `package.json` dependencies
- `next` (14.x)
- `react`, `react-dom`
- `typescript`
- `tailwindcss`, `postcss`, `autoprefixer`
- `lucide-react` (icons)
- `framer-motion` (animations)
- `clsx`, `tailwind-merge` (class utilities)
- `zod` (future form validation)

---

## 🚀 Future Backend Integration Roadmap

When migrating to Node.js backend:

1. **Replace Mock Repositories:**
   - Create `HttpProductRepository` implementing same `IProductRepository`
   - Use `fetch()` or Axios for API calls
   - Keep mock repositories for testing/Storybook

2. **Add API Layer:**
   - `src/infrastructure/api/client.ts` — Axios instance with interceptors
   - `src/infrastructure/api/endpoints.ts` — API route constants

3. **Environment Configuration:**
   - `.env.local` with `NEXT_PUBLIC_API_URL`
   - `src/infrastructure/config/env.ts` — Typed env variables

4. **Authentication (Future):**
   - `src/core/entities/User.ts`
   - `src/core/interfaces/IAuthService.ts`
   - JWT token management in HTTP client

5. **State Management (if needed):**
   - Zustand or Redux Toolkit for global state
   - React Query (TanStack Query) for server state caching

6. **Database Integration:**
   - Prisma or Drizzle ORM schema definitions
   - Migration to PostgreSQL or MongoDB

---

## 📝 Implementation Order (Recommended)

1. **Setup Phase:**
   - Initialize Next.js project with TypeScript + Tailwind
   - Configure path aliases, fonts, Tailwind colors
   - Install dependencies (lucide-react, framer-motion, clsx)

2. **Foundation Phase:**
   - Build `cn()` utility
   - Create color/typography config files
   - Define all entities and interfaces

3. **Data Layer:**
   - Create mock data files
   - Implement mock repositories
   - Build use cases

4. **Atoms Phase:**
   - Button, Badge, Heading, Paragraph
   - Input, Textarea, Logo, Icon

5. **Molecules Phase:**
   - ProductCard, CategoryCard
   - FeatureItem, TestimonialCard

6. **Organisms Phase:**
   - Navbar, Footer
   - HeroSection, FeaturesSection
   - MenuGrid, AboutSection, TestimonialsSection
   - ContactForm

7. **Pages Phase:**
   - Layout + Home page
   - Menu, About, Contact pages
   - Loading + Error states

8. **Polish Phase:**
   - Animations (Framer Motion)
   - Responsive testing
   - Performance optimization (images, fonts)
   - SEO metadata

---

## 🎯 Key Design Principles

1. **Separation of Concerns:** Domain logic (core) never depends on UI or infrastructure
2. **Dependency Inversion:** UI depends on Core interfaces, not implementations
3. **Single Responsibility:** Each component does one thing well
4. **Composition over Inheritance:** Build complex UI from simple pieces
5. **Mobile-First:** Design for mobile, enhance for desktop
6. **Accessibility:** WCAG 2.1 AA compliance (contrast ratios, keyboard navigation, ARIA labels)
7. **Performance:** Server Components by default, Client Components only when interactivity needed
8. **Type Safety:** Strict TypeScript throughout — no `any` types

---

*Document generated for Café Aroma — Frontend Architecture v1.0*
