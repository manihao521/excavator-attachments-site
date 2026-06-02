document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav')?.classList.toggle('open');
});

document.querySelectorAll('[data-popular-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-popular-tab');
    document.querySelectorAll('[data-popular-tab]').forEach((tab) => {
      tab.classList.toggle('active', tab === button);
    });
    document.querySelectorAll('[data-popular-panel]').forEach((panel) => {
      panel.classList.toggle('active', panel.getAttribute('data-popular-panel') === target);
    });
  });
});
