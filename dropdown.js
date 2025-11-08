(() => {
  document.addEventListener('DOMContentLoaded', () => {
    // Unique root for the hero category dropdown
    const root = document.getElementById('category-select');
    if (!root) return; // Exit quietly if this page doesn't have the dropdown

    const triggerBtn = root.querySelector('#category-trigger-hero');
    const panel      = root.querySelector('.select__panel');
    const list       = root.querySelector('#category-list-hero');

    // Use a unique constant name to avoid collisions with existing "categories" arrays
    const CATEGORY_OPTIONS = [
      'Decorators',
      'Venue Planners',
      'Choreographers',
      'Makeup Artist',
      'Bar Services',
      'Designers',
      'Celebrant',
      'Honeymoon',
      'Photographer',
      'Videographer'
    ];

    // Build options
    CATEGORY_OPTIONS.forEach((label, idx) => {
      const li = document.createElement('li');
      li.className = 'select__option';
      li.setAttribute('role', 'option');
      li.dataset.index = String(idx);
      li.textContent = label;
      list.appendChild(li);
    });

    const options = Array.from(list.querySelectorAll('.select__option'));
    let activeIndex = -1;

    function openPanel() {
      root.setAttribute('aria-expanded', 'true');
      panel.style.display = 'block';
      document.addEventListener('click', onDocClick, { capture: true });
    }

    function closePanel() {
      root.setAttribute('aria-expanded', 'false');
      panel.style.display = 'none';
      document.removeEventListener('click', onDocClick, { capture: true });
    }

    function onDocClick(e) {
      if (!root.contains(e.target)) closePanel();
    }

    function choose(i) {
      const opt = options[i];
      options.forEach(o => o.removeAttribute('aria-selected'));
      opt.setAttribute('aria-selected', 'true');
      triggerBtn.textContent = opt.textContent;
      triggerBtn.style.color = '#222';
      closePanel();
    }

    // Toggle open/close
    triggerBtn.addEventListener('click', () => {
      const expanded = root.getAttribute('aria-expanded') === 'true';
      expanded ? closePanel() : openPanel();
    });

    // Click to choose
    options.forEach((opt, i) => {
      opt.addEventListener('click', () => choose(i));
    });
  });
})();

/*select location*/
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('location-select');
  if (!root) return;

  const triggerBtn = root.querySelector('#location-trigger');
  const panel      = root.querySelector('.select__panel');
  const list       = root.querySelector('#location-list');

  const LOCATIONS = [
    'Chennai','Mumbai','Madurai','Delhi','Dubai',
    'Kanyakumari','Tirunelveli','Bengaluru',
    'Tiruvananthapuram','Kochi'
  ];

  // create list items
  const frag=document.createDocumentFragment();
  LOCATIONS.forEach((label,idx)=>{
    const li=document.createElement('li');
    li.className='select__option';
    li.role='option';
    li.tabIndex=-1;
    li.dataset.index=idx;
    li.textContent=label;
    frag.appendChild(li);
  });
  list.appendChild(frag);

  const options=Array.from(list.querySelectorAll('.select__option'));
  let activeIndex=0;

  function openPanel(){
    root.setAttribute('aria-expanded','true');
    document.addEventListener('click',onDocClick,{capture:true});
    focusOption(activeIndex);
  }
  function closePanel(){
    root.setAttribute('aria-expanded','false');
    document.removeEventListener('click',onDocClick,{capture:true});
  }
  function onDocClick(e){ if(!root.contains(e.target)) closePanel(); }
  function focusOption(i){
    activeIndex=(i+options.length)%options.length;
    options.forEach(o=>o.tabIndex=-1);
    const opt=options[activeIndex];
    opt.tabIndex=0; opt.focus({preventScroll:true});
  }
  function choose(i){
    const opt=options[i];
    options.forEach(o=>o.removeAttribute('aria-selected'));
    opt.setAttribute('aria-selected','true');
    triggerBtn.textContent=opt.textContent;
    triggerBtn.style.color='#222';
    closePanel();
  }

  triggerBtn.addEventListener('click',()=>{
    const open=root.getAttribute('aria-expanded')==='true';
    open?closePanel():openPanel();
  });
  options.forEach((opt,i)=>{
    opt.addEventListener('click',()=>choose(i));
    opt.addEventListener('mousemove',()=>opt.focus());
  });
  triggerBtn.addEventListener('keydown',e=>{
    if(['Enter',' ','ArrowDown'].includes(e.key)){e.preventDefault();openPanel();}
  });
  list.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();closePanel();}
    else if(e.key==='Enter'){e.preventDefault();choose(activeIndex);}
    else if(e.key==='ArrowDown'){e.preventDefault();focusOption(activeIndex+1);}
    else if(e.key==='ArrowUp'){e.preventDefault();focusOption(activeIndex-1);}
    else if(e.key==='Home'){e.preventDefault();focusOption(0);}
    else if(e.key==='End'){e.preventDefault();focusOption(options.length-1);}
  });
});

// dropdown1.js
document.addEventListener('DOMContentLoaded', () => {
  // ---------- 1) Custom "select" widgets (hero bar) ----------
  // We only want the custom widgets that have a .select__button (not <details>)
  const customSelects = Array.from(
    document.querySelectorAll('.select')
  ).filter(el => el.querySelector('.select__button'));

  function closeAllCustom(except = null) {
    customSelects.forEach(sel => {
      if (sel !== except) sel.setAttribute('aria-expanded', 'false');
    });
  }

  customSelects.forEach(sel => {
    const button = sel.querySelector('.select__button');
    const panel  = sel.querySelector('.select__panel');

    // Toggle on button click
    button?.addEventListener('click', ev => {
      ev.stopPropagation();
      const isOpen = sel.getAttribute('aria-expanded') === 'true';
      // Close all, then open the one we clicked (if it was closed)
      closeAllCustom();
      sel.setAttribute('aria-expanded', String(!isOpen));
    });

    // Optional: close when picking an option (if you render li.select__option)
    panel?.addEventListener('click', ev => {
      const opt = ev.target.closest('.select__option');
      if (!opt) return;
      // Mark selection (basic example)
      panel.querySelectorAll('.select__option[aria-selected="true"]')
           .forEach(o => o.setAttribute('aria-selected', 'false'));
      opt.setAttribute('aria-selected', 'true');
      // Put chosen label on the button (if desired)
      const label = opt.textContent.trim();
      if (label) button.textContent = label;
      sel.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- 2) Filter bar <details class="select"> ----------
  const detailsSelects = Array.from(document.querySelectorAll('details.select'));

  function closeAllDetails(except = null) {
    detailsSelects.forEach(d => {
      if (d !== except && d.open) d.open = false;
    });
  }

  // When one <details> opens, close the others
  detailsSelects.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) closeAllDetails(d);
    });
  });

  // ---------- Global closing behaviors ----------
  // Click outside -> close everything
  document.addEventListener('click', () => {
    closeAllCustom();
    closeAllDetails();
  });

  // Press Escape -> close everything
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAllCustom();
      closeAllDetails();
    }
  });

  // Stop outside-close when clicking inside a custom panel
  document.querySelectorAll('.select__panel').forEach(panel => {
    panel.addEventListener('click', ev => ev.stopPropagation());
  });
});