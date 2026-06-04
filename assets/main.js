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

document.querySelectorAll('[data-file-input]').forEach((input) => {
  input.addEventListener('change', () => {
    const field = input.closest('.file-upload-field');
    const nameTarget = field?.querySelector('[data-file-name]');
    const file = input.files?.[0];

    if (!nameTarget) return;
    if (!file) {
      nameTarget.textContent = 'Click to Upload';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      input.value = '';
      nameTarget.textContent = 'Click to Upload';
      window.alert('Please upload JPG, PNG, or PDF files up to 10MB.');
      return;
    }

    nameTarget.textContent = file.name;
  });
});
