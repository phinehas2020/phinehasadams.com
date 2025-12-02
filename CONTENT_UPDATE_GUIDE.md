# Content Update Guide

## Overview
This site is built with Next.js and React. Content is managed directly in the component files.

## Updating Content

### 1. Hero Section
- **File**: `src/app/components/Hero.tsx`
- **What to change**: Name, Location text.

### 2. About Section
- **File**: `src/app/components/About.tsx`
- **What to change**: The paragraph text inside `<p>` tags.

### 3. Projects
- **File**: `src/app/components/Projects.tsx`
- **What to change**: The `projects` array at the top of the file.
```typescript
const projects = [
  {
    title: "Project Name",
    status: "Active",
    desc: "Description...",
    tech: ["Tech1", "Tech2"]
  },
  // ...
];
```

### 4. Capabilities
- **File**: `src/app/components/Capabilities.tsx`
- **What to change**: The `capabilities` array.

### 5. Contact
- **File**: `src/app/components/Contact.tsx`
- **What to change**: The email address in `href` and the display text.

## Deployment
Pushing changes to the `main` branch will automatically trigger a deployment on Vercel (once connected).
