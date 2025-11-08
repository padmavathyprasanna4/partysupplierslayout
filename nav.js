const categories = [
  [
    { img: "partyimages/homeimages/home2.jpg", title: "DESTINATION WEDDINGS" },
    { img: "partyimages/homeimages/home3.jpg", title: "HONEYMOON & TRAVEL WEDDING" },
    { img: "partyimages/homeimages/home4.jpg", title: "VIDEOGRAPHERS WEDDING" },
    { img: "partyimages/homeimages/home5.jpg", title: "CELEBRANT" }
  ],
  [
    { img: "partyimages/homeimages/home6.jpg", title: "MAKEUP ARTIST" },
    { img: "partyimages/homeimages/home7.jpg", title: "WEDDING VENUE" },
    { img: "partyimages/homeimages/home8.jpg", title: "PHOTOGRAPHER" },
    { img: "partyimages/homeimages/home9.jpg", title: "MUSIC & DJ" }
  ],
  [
    { img: "partyimages/homeimages/home10.jpg", title: "WEDDING CAKES" },
    { img: "partyimages/homeimages/home11.jpg", title: "CATERING SERVICES" },
    { img: "partyimages/homeimages/home12.jpg", title: "WEDDING PLANNER" },
    { img: "partyimages/homeimages/home13.jpg", title: "BRIDAL DESIGNER" },
  ]
];

const venues = [
  [
    { img: "partyimages/homeimages/home2.jpg", title: "DESTINATION WEDDINGS" },
    { img: "partyimages/homeimages/home3.jpg", title: "HONEYMOON & TRAVEL WEDDING" },
    { img: "partyimages/homeimages/home4.jpg", title: "VIDEOGRAPHERS WEDDING" },
    { img: "partyimages/homeimages/home5.jpg", title: "CELEBRANT" }
    
  ],
  [
     { img: "partyimages/homeimages/home6.jpg", title: "MAKEUP ARTIST" },
    { img: "partyimages/homeimages/home7.jpg", title: "WEDDING VENUE" },
    { img: "partyimages/homeimages/home8.jpg", title: "PHOTOGRAPHER" },
    { img: "partyimages/homeimages/home9.jpg", title: "MUSIC & DJ" }
   
  ],
  [
    
    { img: "partyimages/homeimages/home10.jpg", title: "WEDDING CAKES" },
    { img: "partyimages/homeimages/home11.jpg", title: "CATERING SERVICES" },
    { img: "partyimages/homeimages/home12.jpg", title: "WEDDING PLANNER" },
    { img: "partyimages/homeimages/home13.jpg", title: "BRIDAL DESIGNER" },
    
  ]
];

/* ---------- GENERIC PAGINATOR ---------- */
function initPager({ pages, containerId, pagerId, cardClass }) {
  let currentPage = 1;

  const container = document.getElementById(containerId);
  const pager = document.getElementById(pagerId);
  if (!container || !pager) return;

  const prevBtn   = pager.querySelector('[aria-label="Previous"]');
  const nextBtn   = pager.querySelector('[aria-label="Next"]');
  const numberBtns = pager.querySelectorAll('[data-page]');

  function render(page) {
    if (page < 1 || page > pages.length) return;

    container.innerHTML = "";
    const rows = pages[page - 1];

    rows.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-3";
      col.innerHTML = `
        <article class="${cardClass} h-100">
          <img src="${item.img}" alt="${item.title}" loading="lazy">
          <p>${item.title}</p>
        </article>`;
      container.appendChild(col);
    });

    // active page
    numberBtns.forEach(b => b.parentElement.classList.remove("active"));
    const active = pager.querySelector(`[data-page="${page}"]`);
    if (active) active.parentElement.classList.add("active");

    // disable prev/next
    prevBtn.parentElement.classList.toggle("disabled", page === 1);
    nextBtn.parentElement.classList.toggle("disabled", page === pages.length);
  }

  // number buttons
  numberBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const target = parseInt(btn.dataset.page, 10);
      if (!Number.isNaN(target)) {
        currentPage = target;
        render(currentPage);
      }
    });
  });

  // prev/next
  prevBtn.addEventListener("click", e => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      render(currentPage);
    }
  });
  nextBtn.addEventListener("click", e => {
    e.preventDefault();
    if (currentPage < pages.length) {
      currentPage++;
      render(currentPage);
    }
  });

  // initial
  render(currentPage);
}

/* ---------- INIT BOTH PAGERS ---------- */
initPager({
  pages: categories,
  containerId: "categoryContainer",
  pagerId: "browsePager",
  cardClass: "category-card"
});
initPager({
  pages: venues,
  containerId: "venueContainer",
  pagerId: "venuePager",
  cardClass: "venue-card"
});

// -------- Reviews Carousel (safe + scoped) --------
document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelector('#reviews .review-stage');
  if (!stage) return; // do nothing if the section isn't on this page

  const REVIEWS = [
    {
      name: "Celin",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop",
      text: "Aihole is one of the least explored architectural treasures in Karnataka, offering a wedding experience like no other amidst ancient temples and carvings."
    },
    {
      name: "John",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=240&auto=format&fit=crop",
      text: "From planning to ceremony, everything was seamless and stunning. The venue felt magical and the team was incredibly supportive."
    },
    {
      name: "Kavala",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=240&auto=format&fit=crop",
      text: "Great attention to detail and beautiful decor. Our guests loved the ambience and the flow of the day."
    }
  ];

  // Elements
  const nameEl   = stage.querySelector('.reviewer-name');
  const textEl   = stage.querySelector('.review-text');
  const avatarEl = stage.querySelector('.avatar');
  const prevBtn  = stage.querySelector('.nav-btn.prev');
  const nextBtn  = stage.querySelector('.nav-btn.next');
  const dotsWrap = stage.querySelector('.dots');
  const dotEls   = Array.from(dotsWrap.querySelectorAll('.dot'));

  const leftGhostName  = stage.querySelector('.left-ghost .ghost-name');
  const leftGhostText  = stage.querySelector('.left-ghost .ghost-text');
  const rightGhostName = stage.querySelector('.right-ghost .ghost-name');
  const rightGhostText = stage.querySelector('.right-ghost .ghost-text');

  let i = 0;

  function render(idx){
    const N = REVIEWS.length;
    const cur   = REVIEWS[idx];
    const left  = REVIEWS[(idx - 1 + N) % N];
    const right = REVIEWS[(idx + 1) % N];

    nameEl.textContent = cur.name;
    textEl.textContent = cur.text;
    avatarEl.src       = cur.avatar;
    avatarEl.alt       = `${cur.name} avatar`;

    if (leftGhostName){ leftGhostName.textContent = left.name; leftGhostText.textContent = left.text; }
    if (rightGhostName){ rightGhostName.textContent = right.name; rightGhostText.textContent = right.text; }

    dotEls.forEach((d, j) => d.classList.toggle('active', j === idx));
  }

  prevBtn.addEventListener('click', () => { i = (i - 1 + REVIEWS.length) % REVIEWS.length; render(i); });
  nextBtn.addEventListener('click', () => { i = (i + 1) % REVIEWS.length; render(i); });
  dotEls.forEach((d, j) => d.addEventListener('click', () => { i = j; render(i); }));

  render(i);
});

// dot click
dotEls.forEach((d, j) => d.addEventListener('click', () => {
  i = j; render(i);
}));

render(i);

    