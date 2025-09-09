# PhysioCore Physiotherapy Landing Site

## Overview

PhysioCore is a single-page React application for a physiotherapy clinic's landing website. Built with React, TypeScript, and Tailwind CSS, it features a modern, professional design with bilingual support (English/Spanish). The application is frontend-only with no backend connectivity, focusing on user experience with smooth scrolling navigation, responsive design, and accessibility features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Build Tool**: Vite for fast development and optimized production builds
- **Component Structure**: Modular components using React hooks for state management and custom hooks for reusable logic

### Design System
- **UI Components**: Comprehensive shadcn/ui component library including buttons, forms, dialogs, and navigation elements
- **Theming**: CSS custom properties for consistent color scheme with neutral grey backgrounds and blue accent colors
- **Typography**: Inter font family for modern, readable text
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities

### Key Features Implementation
- **Navigation**: Sticky header with hamburger menu, smooth scroll anchors, and slide-out sidebar
- **Internationalization**: Custom language hook with in-memory translation dictionary for English/Spanish support
- **Animations**: Scroll reveal animations using Intersection Observer API
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, and focus management

### State Management
- **Language State**: React Context API for global language switching
- **UI State**: Local component state using useState for sidebar, form interactions, and section tracking
- **Form Handling**: React Hook Form with Zod validation schemas for type-safe form management

### Performance Optimizations
- **Code Splitting**: Vite's automatic code splitting for optimal bundle sizes
- **Image Optimization**: Lazy loading and responsive images from Unsplash
- **CSS Optimization**: Tailwind CSS purging for minimal CSS bundle
- **SEO**: Structured data markup and meta tags for search engine optimization

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form for form management
- **TypeScript**: Full TypeScript support for type safety
- **Vite**: Build tool and development server

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution for development server

### Content and Media
- **Unsplash**: External image service for high-quality stock photography
- **Google Fonts**: Web font delivery for Inter font family

### Additional Libraries
- **class-variance-authority**: Type-safe variant styling
- **clsx & tailwind-merge**: Utility functions for conditional class names
- **date-fns**: Date manipulation utilities
- **embla-carousel-react**: Carousel component for image galleries

### Database Schema (Backend Ready)
- **Drizzle ORM**: Database toolkit configured for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database integration
- **Database Structure**: User management schema with authentication support prepared for future backend integration