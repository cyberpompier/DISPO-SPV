# GardeFlash - AI Rules & Tech Stack

This document outlines the technical standards and library preferences for the GardeFlash application.

## Tech Stack
- **Framework**: React 19 with TypeScript and Vite for a modern, type-safe development environment.
- **Styling**: Tailwind CSS for all component styling, ensuring responsive and consistent UI.
- **UI Components**: shadcn/ui (built on Radix UI) for accessible, high-quality pre-built components.
- **Icons**: Lucide React for a comprehensive and consistent iconography system.
- **Animations**: Framer Motion for all layout transitions, gestures, and entry/exit animations.
- **Notifications**: Sonner for sleek, non-blocking toast notifications.
- **Date Management**: `date-fns` for robust date parsing, formatting, and manipulation (especially for the planning system).
- **Navigation**: React Router for managing application states and URL-based routing.

## Development Rules

### 1. Component Architecture
- Always use **Functional Components** with TypeScript interfaces for props.
- Keep components small (under 100 lines). Extract sub-components into `src/components/` if they grow too large.
- Place screen-level components in `src/pages/` (or `src/screens/` as per current structure).

### 2. Styling Guidelines
- **Priority**: Tailwind CSS utility classes > shadcn/ui themes > custom CSS.
- Use the predefined color variables in `index.css` (e.g., `text-primary-red`, `bg-dark`) to maintain the luxury glassmorphism aesthetic.
- Ensure all designs are responsive and handle "Safe Areas" for mobile devices.

### 3. Library Usage Rules
- **Icons**: Only use `lucide-react`. Do not import from other icon libraries.
- **Dates**: Always use `date-fns` for calculations. Avoid the native `Date` object methods for complex logic.
- **Feedback**: Use `toast` from `sonner` for all user actions (success, error, info).
- **Animations**: Use `AnimatePresence` for screen transitions and `motion` components for interactive elements.

### 4. Data & State
- Use the `src/data/mock.ts` file for prototyping new features before implementing real API calls.
- Prefer local state (`useState`) for UI-only toggles and React Router for navigation state.