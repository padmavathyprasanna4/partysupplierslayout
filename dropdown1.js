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