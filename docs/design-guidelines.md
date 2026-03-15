# TeaVibe Store - Design Guidelines

**Project:** TeaVibe Store E-Commerce Platform
**Version:** 1.0
**Last Updated:** March 2025
**Design System Completion:** March 15, 2025

---

## Design System Overview

TeaVibe's visual identity combines elegant typography with a warm, earthy color palette. The design prioritizes premium positioning while maintaining accessibility and responsiveness across all devices.

---

## Typography

### Heading Font: Playfair Display
**Usage:** H1, H2, H3 headings, logo, feature highlights
**Characteristics:** Serif font with high contrast, elegant and sophisticated
**Weight:** Bold (700)
**Tracking:** Wide letter-spacing for premium feel
**Implementation:** CSS variable `--font-playfair`

```css
font-family: var(--font-playfair), 'Playfair Display', serif;
```

**Examples:**
- Logo text: "TEAVIBE" (brand identity)
- Page titles: "About Us", "Our Premium Teas"
- Feature headings: Marketing sections

### Body Font: Inter
**Usage:** Body text, button labels, form fields, labels
**Characteristics:** Clean sans-serif, excellent readability
**Weight:** Regular (400) for body, Medium (500) for emphasis
**Line Height:** 1.6 for optimal readability

**Examples:**
- Product descriptions
- Navigation items
- Form labels and input placeholders
- Footer link text

---

## Color Palette

### Primary Color: Teal Green
**Light Mode:** `hsl(160 27% 27%)` - Deep teal for primary actions
**Dark Mode:** `hsl(36 33% 94%)` - Cream for text contrast
**Usage:** Header background, buttons, links, active states
**Foreground:** Cream `hsl(36 33% 94%)`

### Accent Color: Amber
**Light Mode:** `hsl(41 50% 56%)` - Warm amber/gold
**Dark Mode:** `hsl(41 50% 56%)` - Consistent across themes
**Usage:** Call-to-action buttons, hover states, highlights, "VIBE" in logo
**Foreground:** Dark `hsl(160 27% 12%)`

### Background Color: Cream
**Light Mode:** `hsl(36 33% 94%)` - Warm off-white
**Dark Mode:** `hsl(160 27% 8%)` - Dark teal-green
**Usage:** Page backgrounds, cards

### Secondary Color: Soft Cream
**Light Mode:** `hsl(36 25% 88%)` - Light cream
**Dark Mode:** `hsl(160 20% 18%)` - Dark slate
**Usage:** Muted backgrounds, disabled states

### Semantic Colors
- **Destructive:** Red `hsl(0 84.2% 60.2%)` - Errors, delete actions
- **Muted:** Gray `hsl(36 20% 90%)` - Disabled, secondary text
- **Border:** `hsl(36 20% 85%)` - Subtle dividers

---

## Component Styling

### Header (Fixed)
**Layout:** Fixed top bar with backdrop blur
**Components:**
- Logo: Playfair Display, "TEA" in primary + "VIBE" in accent
- Categories Drawer: Mobile hamburger menu
- Search Bar: Integrated search input (desktop & mobile responsive)
- Menu: Right-side navigation with theme toggle, locale switch, user button

**CSS Details:**
```css
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 50;
background: bg-background/95;
backdrop-filter: blur(10px);
border-bottom: 1px solid border/50;
```

### Footer (Multi-Column)
**Layout:** 4-column grid (Shop, Company, Support) + Brand section
**Content Sections:**
1. **Brand Column:** Logo, description, social icons (Twitter, Instagram, Facebook, YouTube)
2. **Shop:** Green Tea, Black Tea, Herbal Tea, Oolong Tea, White Tea
3. **Company:** About, Contact, FAQ
4. **Support:** Shipping, Returns, Privacy, Terms

**Styling:**
- Background: Primary color (teal)
- Text: Primary foreground (cream)
- Social icons: Circular bordered buttons with hover effects
- Divider: Subtle border between sections

### Product Cards
**Hover Effect:** Shadow lift with scale transform
**Content:**
- Product image with fade overlay
- Product name (Playfair heading)
- Rating (star display with count)
- Price (highlighted in accent color)
- Add to cart button

**Responsive:** 1 column mobile, 2-3 columns tablet, 4 columns desktop

### Hero Carousel
**Implementation:** Fullscreen carousel component
**Features:**
- Autoplay with manual controls
- Hero images spanning full viewport width
- Call-to-action overlays with opacity
- Navigation dots for slide indicator
- Responsive sizing

### Checkout Steps (Icon Stepper)
**Visual Design:** Pill-shaped step indicators
**Steps:**
1. Truck icon + "Shipping" label
2. Credit Card icon + "Payment" label
3. Package icon + "Place Order" label

**States:**
- **Completed:** Primary bg with check icon
- **Active:** Primary bg with shadow, full opacity
- **Upcoming:** Muted bg with icon, faded text
- **Connectors:** Lines between steps (filled when completed, border when upcoming)

**Mobile:** Text labels hidden on small screens, showing icons only

---

## Spacing & Layout

### Container
- **Max Width:** 1400px (`2xl` Tailwind breakpoint)
- **Padding:** 2rem (32px) responsive
- **Mobile Padding:** 1.25rem (20px)

### Grid System
- **Desktop:** 4 columns for products
- **Tablet (md):** 2-3 columns
- **Mobile (sm):** 1 column

### Gaps
- **Component Gaps:** 8px (2 units), 16px (4 units), 24px (6 units)
- **Section Gaps:** 32px - 64px vertical spacing
- **Card Padding:** 16px - 24px internal

---

## Icons

**Library:** Lucide React
**Common Icons:**
- Truck - Shipping
- CreditCard - Payment
- Package - Orders
- Check - Completed steps
- Twitter, Instagram, Facebook, YouTube - Social links
- Menu, X - Navigation toggles
- Search - Search functionality
- User - User account
- Settings - Preferences

**Sizing:**
- Small: 16px (h-4, w-4)
- Medium: 20px (h-5, w-5)
- Large: 24px (h-6, w-6)

---

## Interactive Elements

### Buttons
**Primary Button:**
- Background: Accent (amber) on light theme
- Text: Dark foreground
- Hover: Darker amber with scale effect
- Border radius: 0.5rem

**Secondary Button:**
- Background: Muted
- Text: Muted foreground
- Hover: Primary text

**Button Sizes:**
- Small: 8px 12px padding
- Medium: 10px 16px padding (default)
- Large: 12px 20px padding

### Input Fields
- Background: Input color (cream border)
- Border: 1px solid border
- Focus: Ring outline in primary color
- Border radius: 0.5rem

### Links
- Color: Primary
- Hover: Accent color with underline
- Transition: 200ms ease

---

## Dark Mode

### Color Shifts
- **Background:** Teal-green dark `hsl(160 27% 8%)`
- **Foreground:** Cream `hsl(36 33% 94%)`
- **Primary Text:** Cream, with reduced opacity for secondary
- **Borders:** Subtle teal-green borders

### Implementation
- CSS custom properties override in `.dark` class
- Respects system preference via `prefers-color-scheme`
- Toggle button in header menu

---

## Responsive Design

### Breakpoints
- **Mobile (sm):** < 640px
- **Tablet (md):** 640px - 1024px
- **Desktop (lg):** 1024px - 1280px
- **Large (xl):** 1280px+

### Mobile-First Approach
- Base styles for mobile
- `md:` prefix for tablet+ changes
- `lg:` prefix for desktop+ optimizations

### Header Responsiveness
- **Mobile:** Hamburger menu, logo only (no text), mobile search below navbar
- **Tablet+:** Full navigation menu visible, desktop search bar integrated

---

## Accessibility

### WCAG 2.1 Compliance Target
- Color contrast: 4.5:1 minimum for text
- Font size: 16px minimum for body text
- Line height: 1.6 for readability
- Focus indicators: Visible ring on all interactive elements

### Implementation
- Semantic HTML (buttons, links, forms)
- ARIA labels on icon buttons
- Alt text on product images
- Keyboard navigation support

---

## Page-Specific Styling

### Info/Legal Pages
**Layout:** Full-width with hero section
- Hero background: Primary color with cream text overlay
- Content area: Max-width container with generous padding
- Typography: Playfair headings with Inter body text
- Sections: Separated by subtle dividers

**Pages:** About, Contact, FAQ, Shipping, Returns, Privacy, Terms

### FAQ Page
- **Component:** Accordion (shadcn/ui)
- **Open Style:** Primary accent highlight on expanded items
- **Animation:** Smooth height transitions

### Contact Page
- **Form Fields:** Standard input styling with validation
- **Placeholder:** Muted foreground color
- **Submit Button:** Accent color

---

## Brand Voice in Design

**Premium Positioning:** Elegant typography and spacing communicate quality
**Warmth:** Amber accent and cream backgrounds create welcoming aesthetic
**Nature Connection:** Teal green represents sustainability and growth
**Clarity:** Clean layout and generous spacing ensure readability
**Trustworthiness:** Consistent, professional color application

---

## Design Tokens Reference

```typescript
// Colors
primary: "hsl(160 27% 27%)" // Teal
accent: "hsl(41 50% 56%)"   // Amber
background: "hsl(36 33% 94%)" // Cream
foreground: "hsl(160 27% 18%)" // Dark teal

// Typography
fontFamily: {
  playfair: "var(--font-playfair), 'Playfair Display', serif",
  inter: "'Inter', sans-serif"
}

// Spacing
container: "1400px"
padding: "2rem"
borderRadius: "0.5rem"

// Transitions
default: "200ms ease-in-out"
```

---

## Migration Notes from MVP

### Key Changes (March 2025)
1. **Typography:** Introduced Playfair Display for headings (was system font)
2. **Colors:** New teal/cream/amber palette (was blue/white)
3. **Header:** Changed from static to fixed positioning with backdrop blur
4. **Footer:** Expanded from simple to multi-column with social icons
5. **Components:** Added 6 new shadcn components (accordion, breadcrumb, tabs, separator, skeleton, tooltip)
6. **Checkout:** Added icon stepper visual with pill shapes and connectors
7. **Cards:** Enhanced product cards with hover effects and improved spacing

### Component Updates
- `components/shared/header/` - Complete redesign with fixed positioning
- `components/footer.tsx` - Multi-column grid layout with social integration
- `components/shared/checkout-steps.tsx` - New icon-based stepper
- `components/shared/product/product-card.tsx` - Enhanced hover effects
- New pages in `app/[locale]/(root)/` - 7 info/legal pages

---

## Related Documentation

- **Codebase Summary:** `docs/codebase-summary.md`
- **System Architecture:** `docs/system-architecture.md`
- **Code Standards:** `docs/code-standards.md`
- **Project Roadmap:** `docs/project-roadmap.md`
