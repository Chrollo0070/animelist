# MangaList Requirements

## Tech Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript (or React via CDN if preferred)
- Styling: Tailwind CSS (via CDN)
- Animations: Custom CSS 3D Transforms and Transitions for the most performant and beautiful "book opening" effect.

## Key UI/UX Requirements
1. **Main Layout**: A responsive CSS Grid displaying high-quality manga covers with a clean and minimalistic background.
2. **Theme Toggle**: Smooth toggle between Light Theme (light gray background, dark text) and Dark Theme (black background, light text).
3. **Interactive Modal ("Book" View)**:
   - When a manga cover is clicked, it triggers a smooth 3D animation opening a split-pane modal resembling an open book.
   - **Left Pane**: Displays high-resolution manga cover art.
   - **Right Pane**: Displays metadata, tracking controls, and synopsis.
      - **Header**: Manga Title (Bold Typography).
      - **Metadata**: Author, Publication Year, and Genres (displayed as small pill tags).
      - **Reading Status**: Dropdown menu (e.g., "Plan to Read", "Reading", "Completed").
      - **Progress Trackers**: Interactive number inputs/progress bars for Chapters and Volumes.
      - **Synopsis**: Scrollable text block containing the plot description.

## Design Vibe
- **Visuals**: Focus heavily on visual covers.
- **Typography**: Bold for titles, clean/sans-serif for tracking details.
- **Transitions**: Seamless transition from grid item to expanded modal, resembling physical book opening.

## Mock Data
- Included initial state with "Jujutsu Kaisen" and "Vinland Saga" pre-populated.

## Future Requirements
- **Local File Upload**: Include an "Add" button in the UI to support importing and reading local files (e.g., `.cbz`, `.pdf`, `.epub`) in future updates.
