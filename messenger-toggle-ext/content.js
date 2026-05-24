// Messenger Sidebar Toggle

(function () {
  'use strict';

  let isHidden = false;
  let sidebarEl = null;
  let chatAreaEl = null;
  let toggleBtn = null;

  function findElements() {
    const h = [...document.querySelectorAll('h1')].find(x => x.textContent.trim() === 'Chats');
    if (!h) return false;

    // Leo lên tìm sidebar column (width 250-500px)
    let el = h;
    while (el && el !== document.body) {
      if (el.offsetWidth > 250 && el.offsetWidth < 500) break;
      el = el.parentElement;
    }
    if (!el || el === document.body) return false;

    // Leo lên tìm flex-row container chứa cả sidebar + chat
    let p = el.parentElement;
    while (p && p !== document.body) {
      const s = getComputedStyle(p);
      if (s.display === 'flex' && s.flexDirection === 'row' && p.offsetWidth > 800 && p.children.length >= 2) {
        // Trong container: cái NHỎ = sidebar, cái LỚN = chat area
        const children = [...p.children];
        const sorted = children.slice().sort((a, b) => a.offsetWidth - b.offsetWidth);
        sidebarEl = sorted[0];
        chatAreaEl = sorted[sorted.length - 1];
        return !!(sidebarEl && chatAreaEl && sidebarEl !== chatAreaEl);
      }
      p = p.parentElement;
    }
    return false;
  }

  function createToggleButton() {
    const btn = document.createElement('button');
    btn.id = 'msn-sidebar-toggle';
    btn.title = 'Ẩn/hiện danh sách Chats (Alt+Q)';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="9" y1="3" x2="9" y2="21"/>
      </svg>
    `;
    btn.addEventListener('click', toggleSidebar);
    return btn;
  }

  function toggleSidebar() {
    if (!sidebarEl || !chatAreaEl) {
      if (!findElements()) return;
    }

    isHidden = !isHidden;

    if (isHidden) {
      sidebarEl.style.setProperty('width', '0', 'important');
      sidebarEl.style.setProperty('min-width', '0', 'important');
      sidebarEl.style.setProperty('max-width', '0', 'important');
      sidebarEl.style.setProperty('overflow', 'hidden', 'important');
      sidebarEl.style.setProperty('opacity', '0', 'important');
      sidebarEl.style.setProperty('flex-shrink', '0', 'important');
      sidebarEl.style.setProperty('transition', 'all 0.25s ease', 'important');

      chatAreaEl.style.setProperty('flex', '1 1 100%', 'important');
      chatAreaEl.style.setProperty('width', '100%', 'important');
      chatAreaEl.style.setProperty('max-width', '100%', 'important');
      chatAreaEl.style.setProperty('transition', 'all 0.25s ease', 'important');

      toggleBtn.classList.add('msn-hidden');
      toggleBtn.title = 'Hiện danh sách Chats (Alt+Q)';
    } else {
      ['width','min-width','max-width','overflow','opacity','flex-shrink','transition'].forEach(p =>
        sidebarEl.style.removeProperty(p)
      );
      ['flex','width','max-width','transition'].forEach(p =>
        chatAreaEl.style.removeProperty(p)
      );
      toggleBtn.classList.remove('msn-hidden');
      toggleBtn.title = 'Ẩn danh sách Chats (Alt+Q)';
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 'q') {
      e.preventDefault();
      toggleSidebar();
    }
  });

  function init() {
    if (document.getElementById('msn-sidebar-toggle')) return;
    toggleBtn = createToggleButton();
    document.body.appendChild(toggleBtn);

    if (!findElements()) {
      const observer = new MutationObserver(() => {
        if (findElements()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 2000));
  } else {
    setTimeout(init, 2000);
  }
})();
