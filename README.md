# Portfolio Full Stack

Welcome to my portfolio repository. This project showcases my skills and projects through a full-stack application built with React and Node.js. Below you will find an overview of the project structure and detailed explanations for each part of the codebase.

## Table of Contents


- [Overview](#overview)
- [Project Structure](#project-structure)
  - [Components](#components)
  - [Configuration](#configuration)
  - [Helpers](#helpers)
  - [Hooks](#hooks)
  - [Library](#library)
  - [Pages](#pages)
  - [Styles](#styles)
  - [Utilities](#utilities)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository contains the source code for my personal portfolio website. The website is designed to be a showcase of my work, including projects, blog posts, and other professional information. It is built using React for the frontend and Node.js for the backend.

## Project Structure

The project is organized into the following main directories:

### Components

The components directory contains all the reusable UI components used throughout the application. My approach is based on using an unstyled React component UI library, [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/), which I have styled using Tailwind CSS classes. This approach allows for a unique and consistent style identity while leveraging the functionality provided by React Spectrum components.

```plaintext
components/
├── common/               # Reusable components
│   ├── footer/
│   ├── hamburgerMenu/
│   ├── head/
│   ├── header/
│   ├── layer/
│   ├── script/
│   ├── switchLang/
│   └── toast/
│       ├── addToast.ts
│       ├── index.tsx
│       └── ToastRegion.tsx
├── Lenis.tsx
├── pages/
│   ├── ContactPage.tsx
│   ├── LandingPage.tsx
│   └── sections/
│       ├── 1-intro/
│       ├── 2-manifesto/
│       ├── 3_1-action/
│       ├── 3-expertise/
│       ├── 4-cases/
│       ├── 5-action/
│       └── video/
├── style.ts
└── ui/
    ├── animation/
    │   ├── index.tsx
    │   └── item/
    ├── button/
    ├── collection/
    │   ├── index.tsx
    │   └── menu/
    ├── container/
    │   ├── Container.style.ts
    │   ├── Container.tsx
    │   ├── Container.type.ts
    │   └── index.tsx
    ├── cursor/
    │   ├── CursorContainer.tsx
    │   ├── Cursors.tsx
    │   ├── Cursor.tsx
    │   ├── CursorType.ts
    │   └── index.tsx
    ├── deco/
    │   ├── circleText/
    │   └── index.tsx
    ├── form/
    │   ├── Form.module.scss
    │   ├── Form.tsx
    │   ├── Form.types.ts
    │   └── index.tsx
    ├── icon/
    │   ├── IconsList.tsx
    │   ├── Icon.tsx
    │   └── index.tsx
    ├── image/
    ├── loading/
    ├── logo/
    ├── navbar/
    ├── noise/
    ├── overlay/
    │   ├── index.tsx
    │   ├── modal/
    │   └── popover/
    ├── preloader/
    ├── resizablePanel/
    └── typography/
        ├── Display.tsx
        ├── index.tsx
        ├── Link.tsx
        ├── Text.tsx
        ├── Title.tsx
        ├── Typography.module.scss
        ├── Typography.style.ts
        └── Typography.type.ts
```

