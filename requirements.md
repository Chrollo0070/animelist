MangaList – Detailed Requirements Specification
1. Project Overview

MangaList is a visually rich web application designed for manga readers to organize, track, and explore their manga collection. The application emphasizes a visual-first design, focusing on high-quality manga covers and an immersive 3D book-opening interface for viewing details.

The application will function primarily as a personal manga tracking tool, allowing users to manage their reading progress, track manga status, and view detailed information about each manga.

The interface should feel smooth, modern, and minimalistic, with subtle animations and strong focus on usability.

2. Technology Stack
Frontend

HTML5

CSS3

JavaScript (Vanilla JS)
OR

React (via CDN) if component-based architecture is preferred.

Styling

Tailwind CSS (CDN) for rapid UI styling.

Custom CSS for advanced animations.

Animations

CSS 3D transforms

CSS transitions

Optional requestAnimationFrame-based animations for smooth performance.

3. Application Layout
Main Layout Structure

The application should consist of:

Header / Navigation Bar

Contains:

Application logo / title ("MangaList")

Theme toggle button

Add Manga button

Optional search bar (future feature)

Manga Grid Section

Displays manga covers using CSS Grid.

Grid behavior:

Desktop: 4–6 columns

Tablet: 2–3 columns

Mobile: 1–2 columns

Each grid item includes:

Manga cover image

Hover animation

Subtle shadow / elevation

Smooth scaling effect on hover

Example grid card structure:

[Cover Image]
Title
Reading Status Badge
4. Theme System

The application must support Light Mode and Dark Mode.

Light Theme

Background: Light gray (#f5f5f5)

Text: Dark (#111)

Cards: White

Shadows: Soft gray

Dark Theme

Background: Black (#0a0a0a)

Text: White (#f5f5f5)

Cards: Dark gray (#1a1a1a)

Borders: subtle gray

Theme Toggle Behavior

Toggle switch in header

Smooth transition (300ms)

Persist theme using localStorage

Example:

localStorage.setItem("theme", "dark")
5. Manga Grid Interaction

Each manga cover should behave like a clickable card.

Hover Interaction

Slight scale (1.05)

Glow or shadow effect

Cursor pointer

Click Interaction

Clicking a manga opens a 3D book-style modal animation.

6. Book-Opening Modal System

The modal should resemble a physical manga book opening.

Animation Requirements

Use:

transform: perspective()
rotateY()
transform-style: preserve-3d

Animation Flow:

Cover clicked

Card expands to center

"Book opening" animation

Modal fully visible

Animation duration:

400ms – 600ms
7. Modal Layout

The modal contains two main panels.

-----------------------------------------
|           |                           |
|  Cover    |        Manga Details      |
|  Panel    |        Panel              |
|           |                           |
-----------------------------------------
Left Panel – Cover Display

Contains:

Large manga cover

Maintains aspect ratio

High resolution

Slight drop shadow

Optional features:

Zoom on hover

Blur background behind modal

Right Panel – Manga Details
Header

Displays:

Manga Title

Typography:

Bold

Large font

Prominent

Example:

font-size: 28px
font-weight: 700
Metadata Section

Displays:

Author

Publication year

Genres

Genres displayed as pill tags

Example:

[Action] [Fantasy] [Adventure]

Tailwind example:

px-3 py-1 rounded-full text-sm
Reading Status Control

Dropdown menu containing:

Plan to Read

Reading

Completed

On Hold

Dropped

Behavior:

Changing status updates UI immediately

Status saved in localStorage

Progress Tracking

Two progress systems:

Chapters
Current Chapter: [ number input ]
Total Chapters: [ optional ]

Optional visual progress bar.

Volumes
Current Volume: [ number input ]
Total Volumes: [ optional ]

Progress automatically calculated.

Synopsis Section

Scrollable text container displaying manga description.

Requirements:

Max height

Scroll enabled

Smooth scroll

Example CSS:

overflow-y: auto
max-height: 200px
8. Add Manga Feature (UI Only)

A floating or header button:

+ Add Manga

Opens a form modal.

Fields:

Title

Author

Year

Genres

Cover Image URL

Total Chapters

Total Volumes

Synopsis

New manga added dynamically to grid.

9. Data Storage

Initially use localStorage.

Example structure:

mangaList = [
  {
    id: 1,
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    year: 2018,
    genres: ["Action", "Supernatural"],
    status: "Reading",
    chapterProgress: 120,
    volumeProgress: 14,
    synopsis: "...",
    cover: "image-url"
  }
]
10. Initial Mock Data

Include two manga entries by default.

Jujutsu Kaisen

Author: Gege Akutami
Year: 2018
Genres: Action, Supernatural

Vinland Saga

Author: Makoto Yukimura
Year: 2005
Genres: Historical, Adventure

11. Animations & Visual Polish

Required animations:

Grid Hover Animation

Scale effect

Shadow increase

Modal Open Animation

Book opening effect

Fade background overlay

Theme Transition

Smooth color transitions

Input Interaction

Focus ring

subtle highlight

12. Performance Requirements

The application should:

Load instantly

Avoid heavy libraries

Use CSS animations instead of JS where possible

Lazy load cover images

Optimize image rendering

13. Accessibility Requirements

All interactive elements must be keyboard accessible

Buttons must include aria-label

Proper contrast ratio

Tab navigation support

Close modal using ESC key

14. Responsive Design

The application must work on:

Desktop

Full grid and modal layout.

Tablet

Reduced grid columns.

Mobile

Modal becomes vertical layout:

Cover
Details
15. Future Features

These features should be considered in the architecture but not implemented immediately.

Local File Upload

Users can upload manga files:

Supported formats:

.cbz

.pdf

.epub

Future reader interface may include:

Page navigation

Zoom

Bookmarking

Reading progress auto-save

Search System

Search manga by:

Title

Author

Genre

Filtering

Filter by:

Reading status

Genre

Year

Cloud Sync

Future backend support:

Firebase

Supabase

Node.js API

Manga API Integration

Possible APIs:

MyAnimeList API

AniList API

MangaDex API

Allows auto-fetching metadata.

16. UI Design Philosophy

The UI should follow these principles:

Minimalistic

Visual-first

Smooth animations

Readable typography

Distraction-free reading management

The experience should feel like browsing a digital manga bookshelf.
