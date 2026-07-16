const nav = document.querySelector('.nav');
const productDropdown = document.querySelector('.has-dropdown');
const productTrigger = document.querySelector('.products-trigger');
const productTriggerChevron = productTrigger?.querySelector('span[aria-hidden="true"]');
const isMobileNav = () => window.matchMedia('(max-width: 860px)').matches;
const mobileProductsListId = 'mobile-products-list';
const mobileProductItems = [
  {
    href: '/products/hydraulic-breaker/',
    title: 'Hydraulic Breakers',
    desc: 'Side, box and top type breaker attachments',
    image: '/images/products/featured/raw/hydraulic-breaker.webp',
  },
  {
    href: '/products/quick-coupler/',
    title: 'Quick Couplers',
    desc: 'Hydraulic, tilt and rotating coupler options',
    image: '/images/products/featured/raw/quick-coupler.webp',
  },
  {
    href: '/products/vibratory-pile-hammer/',
    title: 'Vibratory Pile Hammers',
    desc: 'Pile driving attachments for excavators',
    image: '/images/products/featured/raw/pile-driver.webp',
  },
  {
    href: '/products/hydraulic-shear/',
    title: 'Demolition Shears',
    desc: 'Steel cutting and demolition shear tools',
    image: '/images/products/featured/raw/hydraulic-shear.webp',
  },
  {
    href: '/products/hydraulic-pulverizer/',
    title: 'Hydraulic Pulverizers',
    desc: 'Concrete crushing and rebar separation',
    image: '/images/products/featured/raw/hydraulic-pulverizer.webp',
  },
  {
    href: '/products/grapples/',
    title: 'Hydraulic Grapples',
    desc: 'Sorting, timber and scrap handling grapples',
    image: '/images/products/featured/raw/grapple.webp',
  },
  {
    href: '/products/plate-compactors/',
    title: 'Plate Compactors',
    desc: 'Trench, slope and foundation compaction',
    image: '/images/products/featured/raw/plate-compactor.webp',
  },
  {
    href: '/products/earth-augers/',
    title: 'Earth Augers',
    desc: 'Drilling for poles, foundations and landscaping',
    image: '/images/products/featured/raw/earth-auger.webp',
  },
  {
    href: '/products/excavator-buckets/',
    title: 'Excavator Buckets',
    desc: 'Rock, standard, skeleton and tilt buckets',
    image: '/images/products/featured/raw/heavy-duty-bucket.webp',
  },
  {
    href: '/products/rippers/',
    title: 'Excavator Rippers',
    desc: 'Ripping tools for hard ground and rock',
    image: '/images/products/featured/raw/excavator-ripper.webp',
  },
  {
    href: '/products/custom-attachments/',
    title: 'Custom Attachments',
    desc: 'OEM / ODM mounting and special structures',
    image: '/images/products/featured/raw/custom-attachments.webp',
  },
];

const ensureMobileProductsList = () => {
  if (!productDropdown || productDropdown.querySelector(`#${mobileProductsListId}`)) {
    return;
  }

  const list = document.createElement('div');
  list.id = mobileProductsListId;
  list.className = 'mobile-products-list';
  list.setAttribute('aria-label', 'Mobile product categories');
  list.innerHTML = `
    <div class="mobile-products-list__head">
      <strong>Product Categories</strong>
      <button class="mobile-products-list__close" type="button" aria-label="Close product categories">×</button>
    </div>
    <div class="mobile-products-list__grid">
      ${mobileProductItems
        .map(
          (item) => `
            <a class="mobile-products-list__item" href="${item.href}">
              <span class="mobile-products-list__thumb">
                <img src="${item.image}" alt="" aria-hidden="true" width="96" height="96" decoding="async" loading="lazy">
              </span>
              <span class="mobile-products-list__copy">
                <strong>${item.title}</strong>
                <em>${item.desc}</em>
              </span>
              <b aria-hidden="true">&#8250;</b>
            </a>
          `
        )
        .join('')}
    </div>
    <a class="mobile-products-list__cta" href="/#quote-form">
      <span>Need help choosing the right attachment?</span>
      <strong>SEND MACHINE INFO</strong>
    </a>
  `;

  productTrigger?.insertAdjacentElement('afterend', list);

  list.querySelector('.mobile-products-list__close')?.addEventListener('click', () => {
    productDropdown?.classList.remove('is-open');
    productTrigger?.setAttribute('aria-expanded', 'false');
  });
};

ensureMobileProductsList();
productTriggerChevron?.classList.add('products-trigger__chevron');
productTriggerChevron?.setAttribute('role', 'button');
productTriggerChevron?.setAttribute('aria-label', 'Toggle product categories');
productTriggerChevron?.setAttribute('tabindex', '0');

const resetMobileNavScroll = () => {
  if (!nav) return;
  nav.scrollTop = 0;
  window.requestAnimationFrame(() => {
    nav.scrollTop = 0;
  });
  window.setTimeout(() => {
    nav.scrollTop = 0;
  }, 80);
};

// Core component: mobile navigation and Products mega menu state.
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open');
  if (isOpen) {
    resetMobileNavScroll();
  } else {
    productDropdown?.classList.remove('is-open');
    productTrigger?.setAttribute('aria-expanded', 'false');
  }
});

productTrigger?.addEventListener('click', (event) => {
  if (!isMobileNav()) return;
  if (event.target !== productTriggerChevron) return;
  event.preventDefault();
  event.stopPropagation();
  const isOpen = productDropdown?.classList.toggle('is-open');
  productTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

  if (isOpen) {
    window.requestAnimationFrame(() => {
      const mobileProductsList = productDropdown?.querySelector('.mobile-products-list');
      const dropdownPanel = productDropdown?.querySelector('.products-dropdown');
      if (mobileProductsList) mobileProductsList.scrollTop = 0;
      if (dropdownPanel) dropdownPanel.scrollTop = 0;
    });
  }
});

productTriggerChevron?.addEventListener('keydown', (event) => {
  if (!isMobileNav()) return;
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  productTriggerChevron.click();
});

window.addEventListener('resize', () => {
  if (isMobileNav()) return;
  productDropdown?.classList.remove('is-open');
  productTrigger?.setAttribute('aria-expanded', 'false');
});

// Legacy component guard: older Popular Products panels may still exist on generated or archived pages.
const legacyPopularTabs = document.querySelectorAll('[data-popular-tab]');
if (legacyPopularTabs.length) {
  legacyPopularTabs.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-popular-tab');
      legacyPopularTabs.forEach((tab) => {
        tab.classList.toggle('active', tab === button);
      });
      document.querySelectorAll('[data-popular-panel]').forEach((panel) => {
        panel.classList.toggle('active', panel.getAttribute('data-popular-panel') === target);
      });
    });
  });
}

// Products page: filter Featured Product Types without reloading or jumping the page.
document.querySelectorAll('.products-subtype-section').forEach((section) => {
  const tabs = Array.from(section.querySelectorAll('[data-filter]'));
  const cards = Array.from(section.querySelectorAll('.catalog-product-card[data-group]'));
  const emptyMessage = section.querySelector('.product-filter-empty');

  if (!tabs.length || !cards.length) return;

  const setActiveFilter = (filter = 'all') => {
    let visibleCount = 0;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.filter === filter;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    cards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.group === filter;
      card.classList.toggle('is-filter-hidden', !shouldShow);
      card.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    if (emptyMessage) {
      emptyMessage.hidden = true;
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setActiveFilter(tab.dataset.filter || 'all');
    });
  });

  setActiveFilter('all');
});

// Blog Resource Center: category filter for guide cards.
document.querySelectorAll('.blog-resource-page').forEach((page) => {
  const filters = Array.from(page.querySelectorAll('[data-blog-filter]'));
  const cards = Array.from(page.querySelectorAll('.blog-resource-card[data-blog-category]'));
  const featuredGuide = page.querySelector('[data-featured-guide]');
  const emptyMessage = page.querySelector('.blog-filter-empty');

  if (!filters.length || !cards.length) return;

  const setElementVisible = (element, shouldShow) => {
    if (!element) return;
    element.classList.toggle('is-filter-hidden', !shouldShow);
    element.hidden = !shouldShow;
  };

  const setActiveFilter = (filter = 'all') => {
    let visibleCount = 0;

    filters.forEach((button) => {
      const isActive = button.dataset.blogFilter === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    setElementVisible(featuredGuide, filter === 'all');

    cards.forEach((card) => {
      const groups = (card.dataset.blogCategory || '')
        .split(/\s+/)
        .map((group) => group.trim())
        .filter(Boolean);
      const shouldShow = filter === 'all' || groups.includes(filter);
      setElementVisible(card, shouldShow);
      if (shouldShow) visibleCount += 1;
    });

    if (emptyMessage) {
      emptyMessage.hidden = true;
    }
  };

  filters.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      setActiveFilter(button.dataset.blogFilter || 'all');
    });
  });

  setActiveFilter('all');
});

// Core conversion helper: dealer CTA scrolls to the quote form and focuses the message field.
document.querySelectorAll('[data-dealer-focus]').forEach((link) => {
  link.addEventListener('click', () => {
    window.setTimeout(() => {
      const messageField = document.querySelector('#quote-form textarea[name="message"], #quote-form textarea');
      messageField?.focus();
    }, 520);
  });
});

// Core form helper: keep the custom upload field readable and enforce the 10MB limit client-side.
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




