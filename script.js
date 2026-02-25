// Mock Data State
let mangaData = [
    {
        id: 1,
        title: "Jujutsu Kaisen",
        author: "Gege Akutami",
        year: 2018,
        genres: ["Action", "Dark Fantasy", "Supernatural"],
        status: "Reading",
        chaptersRead: 150,
        totalChapters: 271,
        volumesRead: 16,
        totalVolumes: 30,
        rating: 9,
        synopsis: "Yuji Itadori, a kind-hearted teenager, joins his school's Occult Club for fun, but discovers that its members are actual sorcerers who can manipulate the energy between beings for their own use. He swallows a rotting finger belonging to a powerful Curse to protect his friends, becoming its host and entering the dangerous world of Jujutsu Sorcerers.",
        coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx101517-10iZz9bAn9g7.jpg"
    },
    {
        id: 2,
        title: "Vinland Saga",
        author: "Makoto Yukimura",
        year: 2005,
        genres: ["Historical", "Action", "Adventure"],
        status: "Plan to Read",
        chaptersRead: 0,
        totalChapters: 200,
        volumesRead: 0,
        totalVolumes: 27,
        rating: 10,
        synopsis: "Young Thorfinn grew up listening to the stories of old sailors that had traveled the ocean and reached the place of legend, Vinland. It's said to be warm and fertile, a place where there would be no need for fighting—not at all like the frozen village in Iceland where he was born, and certainly not like his current life as a mercenary.",
        coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30642-1jS1lA3lMhU4.png"
    },
    {
        id: 3,
        title: "Vagabond",
        author: "Takehiko Inoue",
        year: 1998,
        genres: ["Historical", "Martial Arts", "Seinen"],
        status: "Completed",
        chaptersRead: 327,
        totalChapters: 327,
        volumesRead: 37,
        totalVolumes: 37,
        rating: 10,
        synopsis: "In 16th century Japan, Shinmen Takezou is a wild, rough young man, in both his appearance and his actions. His aggressive nature has won him the reproach and fear of his village. Running away from home, he embarks on an incredible journey to become the greatest swordsman in the world, taking the legendary name of Miyamoto Musashi.",
        coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx30656-H1S2V1F4cK6D.jpg"
    },
    {
        id: 4,
        title: "Berserk",
        author: "Kentaro Miura",
        year: 1989,
        genres: ["Dark Fantasy", "Action", "Tragedy"],
        status: "Reading",
        chaptersRead: 250,
        totalChapters: 364,
        volumesRead: 25,
        totalVolumes: 41,
        rating: 10,
        synopsis: "Guts, a former mercenary now known as the \"Black Swordsman,\" is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart. Bound by a demonic brand, he must constantly battle monsters and demons while hunting the man who betrayed him.",
        coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30002-7EeFOhEwFv75.jpg"
    }
];

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    } else {
        htmlEl.classList.remove('dark');
    }
}

themeToggleBtn.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    if (htmlEl.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
});

// Run theme initialization on load
initTheme();

// Grid Rendering
let gridContainer = null;

function renderGrid() {
    if (!gridContainer) gridContainer = document.getElementById('manga-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    mangaData.forEach(manga => {
        // Status class formatting
        const statusClass = manga.status.includes('Plan') ? 'status-Plan' : `status-${manga.status}`;

        const wrapper = document.createElement('div');
        wrapper.className = 'manga-card-wrapper relative aspect-[2/3] cursor-pointer group';
        wrapper.onclick = () => openModal(manga.id);

        const card = document.createElement('div');
        card.className = 'manga-card w-full h-full relative overflow-hidden bg-gray-200 dark:bg-gray-800';

        // The high-contrast, edge-to-edge cover layout
        card.innerHTML = `
            <div class="manga-card-inner relative w-full pt-[140%] shadow-lg transform-style-3d cursor-pointer transition-transform duration-300">
                <!-- Cover Face (Scale up slightly on hover via class in js) -->
                <div class="manga-cover absolute inset-0 bg-cover bg-center overflow-hidden backface-hidden flex flex-col justify-between" style="background-image: url('${manga.coverUrl}')">
                    
                    <div class="glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
                    
                    <!-- Top Section -->
                    <div class="flex justify-end p-2 z-10">
                        <!-- Top Right Yellow Rating Box -->
                        <div class="bg-[#ffd700] text-black text-[10px] font-['Inter'] font-extrabold px-2 py-0.5 rounded shadow-sm flex items-center gap-1 border border-black/10">
                             <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                             ${manga.rating ? manga.rating : 'N/A'}
                        </div>
                    </div>

                    <!-- Bottom Section (Gradient Overlay only under text) -->
                    <div class="relative pt-12 pb-2 px-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-end">
                         <!-- Bottom Right Red Tracker -->
                         <div class="bg-[#e43b3b] text-white text-[8px] sm:text-[9px] font-['Inter'] font-extrabold px-1.5 py-0.5 rounded-sm shadow-sm tracking-wider mb-1">
                              CH ${manga.chaptersRead} / ${manga.totalChapters}
                         </div>
                         <!-- Bottom Left Bold Title -->
                         <div class="w-full text-left">
                              <h3 class="text-white font-['Inter'] text-sm sm:text-base font-extrabold leading-tight tracking-tight drop-shadow-md line-clamp-2">${manga.title}</h3>
                         </div>
                    </div>
                </div>

                <!-- Page Edges (Right spine) - Stark White -->
                <div class="manga-pages absolute top-0 bottom-0 right-0 w-8 sm:w-10 origin-left rotate-y-90 backface-hidden shadow-inner bg-white border-y border-r border-[#ddd] bg-[repeating-linear-gradient(to_bottom,#f0f0f0_0px,#fff_2px)]">
                </div>
            </div>
        `;

        // 3D Parallax Tilt Logic
        const mangaCardInner = card.querySelector('.manga-card-inner');
        const glare = card.querySelector('.glare');

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max tilt 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transition = 'none';
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Dynamic glare
            glare.style.transition = 'none';
            glare.style.opacity = '1';
            glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

            glare.style.transition = 'opacity 0.5s ease-out';
            glare.style.opacity = '0';
        });

        wrapper.appendChild(card);
        gridContainer.appendChild(wrapper);
    });
}

// Modal Logic & Animation
const modalOverlay = document.getElementById('book-modal-overlay');
const bookContainer = document.getElementById('book-modal');
const bookCover = document.querySelector('.book-cover');
const bookRight = document.querySelector('.book-right');
const closeModalBtn = document.getElementById('close-modal');

let currentMangaId = null;

function openModal(id) {
    const manga = mangaData.find(m => m.id === id);
    if (!manga) return;
    currentMangaId = id;

    // Populate Cover Data
    document.getElementById('modal-cover').style.backgroundImage = `url('${manga.coverUrl}')`;
    document.getElementById('modal-inner-cover').style.backgroundImage = `url('${manga.coverUrl}')`;

    // Populate Right Pane Data
    document.getElementById('modal-title').textContent = manga.title;
    document.getElementById('modal-author').textContent = manga.author;
    document.getElementById('modal-year').textContent = manga.year;

    // Genres (Comma separated all caps string)
    document.getElementById('modal-genres').textContent = manga.genres.join(', ');

    // Status / Shelf
    document.getElementById('modal-status').value = manga.status;

    // Rating Slanted Blocks
    const ratingContainer = document.getElementById('slanted-rating-container');
    if (ratingContainer) {
        ratingContainer.innerHTML = '';
        const maxScore = 10;
        const currentScore = parseInt(manga.rating) || 0;
        for (let i = 1; i <= maxScore; i++) {
            const block = document.createElement('div');
            // The slanted box look
            block.className = `h-6 flex-1 transform -skew-x-[15deg] border border-[#333] transition-colors ${i <= currentScore ? 'bg-[#ffd700]' : 'bg-[#111] hover:bg-[#222]'}`;
            ratingContainer.appendChild(block);
        }
    }

    // Chapters Progress
    const chReadDisplay = document.getElementById('modal-chapters-read-display');
    if (chReadDisplay) chReadDisplay.textContent = manga.chaptersRead;
    const chTotalDisplay = document.getElementById('modal-chapters-total');
    if (chTotalDisplay) chTotalDisplay.textContent = manga.totalChapters;
    const chapterProgress = manga.totalChapters > 0 ? (manga.chaptersRead / manga.totalChapters) * 100 : 0;
    const chBar = document.getElementById('modal-chapters-bar');
    if (chBar) chBar.style.width = `${chapterProgress}%`;

    // Volumes Progress
    const volReadDisplay = document.getElementById('modal-volumes-read-display');
    if (volReadDisplay) volReadDisplay.textContent = manga.volumesRead;
    const volTotalDisplay = document.getElementById('modal-volumes-total');
    if (volTotalDisplay) volTotalDisplay.textContent = manga.totalVolumes;
    const volumeProgress = manga.totalVolumes > 0 ? (manga.volumesRead / manga.totalVolumes) * 100 : 0;
    const volBar = document.getElementById('modal-volumes-bar');
    if (volBar) volBar.style.width = `${volumeProgress}%`;

    // Synopsis & Notes
    const synopsisDisplay = document.getElementById('modal-synopsis');
    if (synopsisDisplay) synopsisDisplay.textContent = manga.synopsis;
    const notesDisplay = document.getElementById('modal-notes');
    if (notesDisplay) notesDisplay.value = manga.notes || '';

    // Animate In:
    bookContainer.classList.add('closed');
    bookContainer.classList.remove('open');
    bookCover.classList.add('closed');
    bookCover.classList.remove('open');
    // Ensure bookRight DOM element exists before trying to modify classes.
    // In the new layout there isn't a specific 'book-right' that animates separately from 'book-modal' and 'book-cover',
    // but we'll try to find it just in case, or gracefully ignore it.
    const rightPane = document.querySelector('.book-right');
    if (rightPane) {
        rightPane.classList.add('closed-content');
    }

    // Display Overlay
    modalOverlay.classList.remove('pointer-events-none');

    requestAnimationFrame(() => {
        // Fade in backdrop
        modalOverlay.classList.remove('opacity-0');

        // Trigger Book Opening
        setTimeout(() => {
            bookContainer.classList.remove('closed');
            bookContainer.classList.add('open');
            bookCover.classList.remove('closed');
            bookCover.classList.add('open');
            if (rightPane) {
                rightPane.classList.remove('closed-content');
            }
        }, 50);
    });
}

function closeModal() {
    // Reverse Book Animation
    bookContainer.classList.remove('open');
    bookContainer.classList.add('closed');
    bookCover.classList.remove('open');
    bookCover.classList.add('closed');
    const rightPane = document.querySelector('.book-right');
    if (rightPane) {
        rightPane.classList.add('closed-content');
    }

    setTimeout(() => {
        modalOverlay.classList.add('opacity-0');
        setTimeout(() => {
            modalOverlay.classList.add('pointer-events-none');
            currentMangaId = null;
        }, 500);
    }, 400);
}

closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    // Only close if clicking the actual backdrop, not inside the book modal itself
    if (e.target === modalOverlay) closeModal();
});

// Form Syncing (Update mock data on change)
function syncData(field, val) {
    if (!currentMangaId) return;
    const manga = mangaData.find(m => m.id === currentMangaId);
    if (manga) {
        if (field === 'status') manga.status = val;
        else manga[field] = parseInt(val) || 0;

        // Soft re-render grid in background to update the status badges instantly
        renderGrid();
    }
}

document.getElementById('modal-status').addEventListener('change', (e) => syncData('status', e.target.value));
// Progress inputs removed, will add increment logic later.
// Bootstrap the app
renderGrid();
