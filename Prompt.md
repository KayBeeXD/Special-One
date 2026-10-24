Build a mobile-first, responsive, and romantic single-page web experience commemorating "Day 1" of a relationship.

### Design & Theme Specifications
1. Theme: Night Sky / Constellation Canvas.
   - Background: Deep midnight navy / dark canvas (#0a0e1a to #0f172a) with subtle CSS-animated twinkling stars and soft ambient glows.
   - Color Palette: Midnight blue, warm amber/gold glows, soft starlight white, and muted rose accents.
   - Typography: Elegant serif headers (Playfair Display / Cormorant Garamond via Google Fonts) paired with clean, readable sans-serif body text (Inter / Plus Jakarta Sans) and a handwritten font for notes (Caveat / Dancing Script).

2. Nicknames & Context:
   - Her Nickname: "Sleepy Owl" 🦉
   - My Nickname: "Mr. Interest" ✨
   - Occasion: Today is Day 1 of our official relationship. Tone should be warm, romantic, genuine, and grounded (not overly cheesy or loud).

### File Structure & Assets
- Use relative local paths for images pointing to an `assets/` directory:
  -eg. `assets/photo1.jpg`, `assets/photo2.jpg`, `assets/photo3.jpg`, etc.
  - Optional audio: `assets/bg-music.mp3`(I will add the music later)
- Provide clean, production-ready code organized into either a single standalone `index.html` (with inline CSS/JS) or standard separated files (`index.html`, `style.css`, `script.js`).

### Layout & Interactive Features
1. Hero Section:
   - Subtle twinkling stars canvas or CSS animation.
   - Elegant headline: "Of all the days in the sky, today shines the brightest."
   - Subheading: "Day 1 • A quiet beginning for Sleepy Owl & Mr. Interest."
   - A soft "Explore the Sky" or glowing scroll-down indicator.

2. Interactive Floating Constellation / Star Cards:
   - A set of 3 to 4 clickable glowing stars or constellation nodes positioned gracefully on the screen.
   - When a star is tapped/clicked:
     - It opens a sleek, frosted-glass modal (glassmorphism: backdrop-blur, subtle border highlight) or expands into a Polaroid-styled memory card.
     - Content inside: A photo from `assets/` (e.g., `assets/photo1.jpg`), accompanied by a sweet, romantic quote and a personalized note tailored to Sleepy Owl.
     - Include a smooth close button or tap-outside-to-dismiss behavior.

3. Music Control:
   - A minimal, aesthetic floating vinyl/music icon in the top or bottom corner.
   - Starts paused (to comply with mobile autoplay restrictions), toggles background audio (`assets/bg-music.mp3`) with soft play/pause states.

4. Day 1 Celebration Footer / Final Touch:
   - A live "Day 1 with you — and looking forward to every tomorrow" milestone badge.
   - An interactive button: "To Our Journey Ahead ✨".
   - Clicking the button triggers a gentle particle burst of floating starlight/warm heart particles (using canvas-confetti or lightweight vanilla JS particle animation).

### Quality & Responsive Requirements:
- Strictly optimized for mobile screens (iOS & Android WebKit) while looking centered and elegant on desktop.
- Touch-friendly tap targets, smooth CSS transitions (`cubic-bezier`), and zero layout shifts.
- Include sensible placeholder captions and notes so the page feels complete right out of the box.