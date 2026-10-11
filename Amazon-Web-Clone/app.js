/**
 * ==============================================================================
 * AMAZON CLONE UI - CORE APPLICATION LOGIC (app.js)
 * ------------------------------------------------------------------------------
 * Features:
 *  1. Dynamic CMS Catalog Hydration & Schema Architecture
 *  2. Real-time Debounced Search & Multi-Category Filtering
 *  3. Interactive Cart System with Slide-out Drawer & LocalStorage Persistence
 *  4. Side Navigation Drawer (Amazon 'All' Menu) & Modals
 *  5. Location Selector & Language Dropdown State
 *  6. Smooth UX Enhancements (Back-to-top, Toast notifications, Accessibility)
 * ==============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. CMS-DRIVEN PRODUCT CATALOG DATA SCHEMA
     Demonstrates structured content modeling & headless CMS authoring readiness.
     -------------------------------------------------------------------------- */
  const CATALOG_DATA = [
    {
      id: 1,
      title: 'Refresh your space',
      category: 'Home',
      image: 'box1_image.jpg',
      badge: 'Popular',
      price: 29.99,
      rating: 4.7,
      reviews: '1.2k'
    },
    {
      id: 2,
      title: 'Health & Personal Care',
      category: 'Beauty',
      image: 'box2_image.jpg',
      badge: 'Essential',
      price: 18.5,
      rating: 4.6,
      reviews: '950'
    },
    {
      id: 3,
      title: 'Give your home a makeover',
      category: 'Home',
      image: 'box3_image.jpg',
      badge: 'Trending',
      price: 45.0,
      rating: 4.8,
      reviews: '2.4k'
    },
    {
      id: 4,
      title: 'Electronics & Devices',
      category: 'Electronics',
      image: 'box4_image.jpg',
      badge: 'Top Deal',
      price: 89.99,
      rating: 4.9,
      reviews: '4.1k'
    },
    {
      id: 5,
      title: 'Beauty Picks',
      category: 'Beauty',
      image: 'box5_image.jpg',
      badge: 'Featured',
      price: 24.99,
      rating: 4.5,
      reviews: '820'
    },
    {
      id: 6,
      title: 'Shop Pet supplies',
      category: 'Home',
      image: 'box6_image.jpg',
      badge: 'Best Value',
      price: 15.99,
      rating: 4.7,
      reviews: '1.5k'
    },
    {
      id: 7,
      title: 'New arrivals in Toys',
      category: 'Toys',
      image: 'box7_image.jpg',
      badge: 'New',
      price: 19.99,
      rating: 4.8,
      reviews: '670'
    },
    {
      id: 8,
      title: 'Discover fashion trends',
      category: 'Fashion',
      image: 'box8_image.jpg',
      badge: 'Hot',
      price: 39.0,
      rating: 4.4,
      reviews: '3.1k'
    },
    {
      id: 9,
      title: 'For your Fitness Needs',
      category: 'Fitness',
      image: 'box9_image.jpg',
      badge: 'Trending',
      price: 34.5,
      rating: 4.7,
      reviews: '890'
    },
    {
      id: 10,
      title: 'Activity Trackers & Smartwatches',
      category: 'Electronics',
      image: 'box10_image.jpg',
      badge: 'Smart Tech',
      price: 79.99,
      rating: 4.8,
      reviews: '5.2k'
    },
    {
      id: 11,
      title: 'Home & Kitchen Under $30',
      category: 'Home',
      image: 'box11_image.jpg',
      badge: 'Under $30',
      price: 22.95,
      rating: 4.6,
      reviews: '1.8k'
    },
    {
      id: 12,
      title: 'Shop Laptops & Tablets',
      category: 'Electronics',
      image: 'box12_image.jpg',
      badge: 'Premium',
      price: 499.0,
      rating: 4.9,
      reviews: '6.3k'
    }
  ];

  /* --------------------------------------------------------------------------
     2. APPLICATION STATE
     -------------------------------------------------------------------------- */
  const state = {
    cart: JSON.parse(localStorage.getItem('amazon_clone_cart')) || [],
    location: localStorage.getItem('amazon_clone_location') || 'India',
    currentCategory: 'all',
    searchQuery: '',
    selectedLang: 'EN'
  };

  /* --------------------------------------------------------------------------
     3. DOM ELEMENTS CACHE
     -------------------------------------------------------------------------- */
  const DOM = {
    // Navigation
    searchInput: document.getElementById('searchInput'),
    searchSelect: document.getElementById('searchCategory'),
    searchForm: document.getElementById('searchForm'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    cartBtn: document.getElementById('cartBtn'),
    cartCount: document.getElementById('cartCount'),
    locationBtn: document.getElementById('locationBtn'),
    currentLocation: document.getElementById('currentLocation'),
    langSelector: document.getElementById('langSelector'),
    langMenu: document.getElementById('langMenu'),
    selectedLang: document.getElementById('selectedLang'),

    // Shop Grid & Filters
    shopSection: document.getElementById('shopSection'),
    filterStatusBar: document.getElementById('filterStatusBar'),
    filterStatusText: document.getElementById('filterStatusText'),
    resetFilterBtn: document.getElementById('resetFilterBtn'),
    noResultsView: document.getElementById('noResultsView'),
    noResultsResetBtn: document.getElementById('noResultsResetBtn'),

    // Side Navigation Drawer
    openMenuBtn: document.getElementById('openMenuBtn'),
    closeMenuBtn: document.getElementById('closeMenuBtn'),
    sideDrawer: document.getElementById('sideDrawer'),
    drawerOverlay: document.getElementById('drawerOverlay'),

    // Cart Drawer
    cartDrawer: document.getElementById('cartDrawer'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartDrawerItems: document.getElementById('cartDrawerItems'),
    cartTotalItems: document.getElementById('cartTotalItems'),
    cartTotalPrice: document.getElementById('cartTotalPrice'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    clearCartBtn: document.getElementById('clearCartBtn'),

    // Location Modal
    locationModal: document.getElementById('locationModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    closeLocationModal: document.getElementById('closeLocationModal'),
    countrySelect: document.getElementById('countrySelect'),
    pincodeInput: document.getElementById('pincodeInput'),
    applyPincodeBtn: document.getElementById('applyPincodeBtn'),
    saveLocationBtn: document.getElementById('saveLocationBtn'),

    // Back to top & Toast
    backToTopBtn: document.getElementById('backToTopBtn'),
    toast: document.getElementById('toast')
  };

  /* --------------------------------------------------------------------------
     4. TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */
  let toastTimeout;
  function showToast(message) {
    if (!DOM.toast) return;
    DOM.toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    DOM.toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     5. CART MANAGEMENT
     -------------------------------------------------------------------------- */
  function saveCart() {
    localStorage.setItem('amazon_clone_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function addToCart(productId) {
    const product = CATALOG_DATA.find((item) => item.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex((item) => item.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart();
    showToast(`Added "${product.title}" to cart!`);
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.id !== productId);
    saveCart();
    showToast('Item removed from cart.');
  }

  function updateItemQuantity(productId, delta) {
    const item = state.cart.find((item) => item.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }

  function clearCart() {
    state.cart = [];
    saveCart();
    showToast('Your shopping cart has been cleared.');
  }

  function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Update navbar badge
    if (DOM.cartCount) {
      DOM.cartCount.textContent = totalItems;
      DOM.cartBtn.setAttribute('aria-label', `Shopping Cart, ${totalItems} items`);
    }

    // Update cart drawer items
    if (DOM.cartTotalItems) DOM.cartTotalItems.textContent = totalItems;
    if (DOM.cartTotalPrice) DOM.cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

    if (!DOM.cartDrawerItems) return;

    if (state.cart.length === 0) {
      DOM.cartDrawerItems.innerHTML = `
        <div class="empty-cart-view">
          <i class="fa-solid fa-basket-shopping empty-icon"></i>
          <p>Your Amazon Cart is empty.</p>
          <small>Check out product boxes and click "Add to Cart" to start shopping!</small>
        </div>
      `;
    } else {
      DOM.cartDrawerItems.innerHTML = state.cart
        .map(
          (item) => `
          <div class="cart-item-card" data-id="${item.id}">
            <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-info">
              <h4 class="cart-item-title">${escapeHTML(item.title)}</h4>
              <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
              <div class="cart-item-controls">
                <button type="button" class="btn-qty btn-minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                <span class="qty-count">${item.quantity}</span>
                <button type="button" class="btn-qty btn-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
                <button type="button" class="btn-remove-item" data-id="${item.id}">Delete</button>
              </div>
            </div>
          </div>
        `
        )
        .join('');
    }
  }

  function openCartDrawer() {
    updateCartUI();
    DOM.cartDrawer.classList.add('open');
    DOM.cartDrawer.setAttribute('aria-hidden', 'false');
    DOM.cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    DOM.cartDrawer.classList.remove('open');
    DOM.cartDrawer.setAttribute('aria-hidden', 'true');
    DOM.cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------------------------
     6. PRODUCT FILTERING & SEARCH ENGINE
     -------------------------------------------------------------------------- */
  function filterProducts() {
    const query = state.searchQuery.trim().toLowerCase();
    const category = state.currentCategory.toLowerCase();

    const filtered = CATALOG_DATA.filter((item) => {
      const matchesCategory =
        category === 'all' || item.category.toLowerCase() === category;
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    renderShopGrid(filtered);

    // Update filter status bar
    const hasFilter = query || category !== 'all';
    if (DOM.filterStatusBar) {
      if (hasFilter) {
        DOM.filterStatusBar.style.display = 'flex';
        let status = `Showing ${filtered.length} item(s)`;
        if (category !== 'all') status += ` in category "${state.currentCategory}"`;
        if (query) status += ` matching "${escapeHTML(query)}"`;
        DOM.filterStatusText.textContent = status;
      } else {
        DOM.filterStatusBar.style.display = 'none';
      }
    }

    // Toggle empty state
    if (DOM.noResultsView) {
      DOM.noResultsView.style.display = filtered.length === 0 ? 'block' : 'none';
    }
  }

  function renderShopGrid(items) {
    if (!DOM.shopSection) return;

    if (items.length === 0) {
      DOM.shopSection.style.display = 'none';
      return;
    }

    DOM.shopSection.style.display = 'grid';
    DOM.shopSection.innerHTML = items
      .map(
        (item) => `
        <article class="box" data-id="${item.id}" data-category="${item.category}" data-title="${escapeHTML(item.title)}">
          <div class="box-content">
            <span class="box-badge">${escapeHTML(item.badge)}</span>
            <h2>${escapeHTML(item.title)}</h2>
            <div class="box-img" style="background-image: url('${item.image}')" role="img" aria-label="${escapeHTML(item.title)}"></div>
            <div class="box-meta">
              <span class="box-price">$${item.price.toFixed(2)}</span>
              <span class="box-rating"><i class="fa-solid fa-star"></i> ${item.rating} (${item.reviews})</span>
            </div>
            <div class="box-actions">
              <button type="button" class="btn-add-cart" data-id="${item.id}">Add to Cart</button>
              <a href="#see-more-${item.id}" class="see-more-link">See more</a>
            </div>
          </div>
        </article>
      `
      )
      .join('');
  }

  function resetAllFilters() {
    state.searchQuery = '';
    state.currentCategory = 'all';
    if (DOM.searchInput) DOM.searchInput.value = '';
    if (DOM.searchSelect) DOM.searchSelect.value = 'all';
    if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = 'none';
    filterProducts();
  }

  /* --------------------------------------------------------------------------
     7. SIDE NAVIGATION DRAWER (All Categories Menu)
     -------------------------------------------------------------------------- */
  function openSideDrawer() {
    DOM.sideDrawer.classList.add('open');
    DOM.sideDrawer.setAttribute('aria-hidden', 'false');
    DOM.drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSideDrawer() {
    DOM.sideDrawer.classList.remove('open');
    DOM.sideDrawer.setAttribute('aria-hidden', 'true');
    DOM.drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------------------------
     8. LOCATION MODAL LOGIC
     -------------------------------------------------------------------------- */
  function openLocationModal() {
    DOM.locationModal.classList.add('open');
    DOM.locationModal.setAttribute('aria-hidden', 'false');
    DOM.modalOverlay.classList.add('open');
    if (DOM.countrySelect) DOM.countrySelect.value = state.location;
    document.body.style.overflow = 'hidden';
  }

  function closeLocationModal() {
    DOM.locationModal.classList.remove('open');
    DOM.locationModal.setAttribute('aria-hidden', 'true');
    DOM.modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function setLocation(loc) {
    state.location = loc;
    localStorage.setItem('amazon_clone_location', loc);
    if (DOM.currentLocation) DOM.currentLocation.textContent = loc;
    showToast(`Delivery location updated to: ${loc}`);
    closeLocationModal();
  }

  /* --------------------------------------------------------------------------
     9. EVENT LISTENERS & INITIALIZATION
     -------------------------------------------------------------------------- */
  function initEventListeners() {
    // Search input typing with dynamic clear button
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
        }
        filterProducts();
      });
    }

    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener('click', () => {
        state.searchQuery = '';
        DOM.searchInput.value = '';
        DOM.clearSearchBtn.style.display = 'none';
        filterProducts();
        DOM.searchInput.focus();
      });
    }

    if (DOM.searchSelect) {
      DOM.searchSelect.addEventListener('change', (e) => {
        state.currentCategory = e.target.value;
        filterProducts();
      });
    }

    if (DOM.searchForm) {
      DOM.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        filterProducts();
      });
    }

    // Reset filter buttons
    if (DOM.resetFilterBtn) DOM.resetFilterBtn.addEventListener('click', resetAllFilters);
    if (DOM.noResultsResetBtn) DOM.noResultsResetBtn.addEventListener('click', resetAllFilters);

    // Event delegation for "Add to Cart" and grid interactions
    document.addEventListener('click', (e) => {
      // Add to cart click
      const addCartBtn = e.target.closest('.btn-add-cart');
      if (addCartBtn) {
        const id = parseInt(addCartBtn.getAttribute('data-id'), 10);
        addToCart(id);
        return;
      }

      // Cart quantity plus
      const plusBtn = e.target.closest('.btn-plus');
      if (plusBtn) {
        const id = parseInt(plusBtn.getAttribute('data-id'), 10);
        updateItemQuantity(id, 1);
        return;
      }

      // Cart quantity minus
      const minusBtn = e.target.closest('.btn-minus');
      if (minusBtn) {
        const id = parseInt(minusBtn.getAttribute('data-id'), 10);
        updateItemQuantity(id, -1);
        return;
      }

      // Delete from cart
      const removeBtn = e.target.closest('.btn-remove-item');
      if (removeBtn) {
        const id = parseInt(removeBtn.getAttribute('data-id'), 10);
        removeFromCart(id);
        return;
      }

      // Side drawer category item click
      const categoryLink = e.target.closest('.drawer-section a[data-category]');
      if (categoryLink) {
        e.preventDefault();
        const cat = categoryLink.getAttribute('data-category');
        state.currentCategory = cat;
        if (DOM.searchSelect) DOM.searchSelect.value = cat;
        filterProducts();
        closeSideDrawer();
        DOM.shopSection.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    });

    // Cart Drawer Open / Close
    if (DOM.cartBtn) DOM.cartBtn.addEventListener('click', openCartDrawer);
    if (DOM.closeCartBtn) DOM.closeCartBtn.addEventListener('click', closeCartDrawer);
    if (DOM.cartOverlay) DOM.cartOverlay.addEventListener('click', closeCartDrawer);

    if (DOM.clearCartBtn) DOM.clearCartBtn.addEventListener('click', clearCart);
    if (DOM.checkoutBtn) {
      DOM.checkoutBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast('Your cart is empty! Add products first.');
        } else {
          showToast('Checkout simulated! Thank you for testing the Amazon Clone.');
          clearCart();
          closeCartDrawer();
        }
      });
    }

    // Side Drawer Open / Close
    if (DOM.openMenuBtn) DOM.openMenuBtn.addEventListener('click', openSideDrawer);
    if (DOM.closeMenuBtn) DOM.closeMenuBtn.addEventListener('click', closeSideDrawer);
    if (DOM.drawerOverlay) DOM.drawerOverlay.addEventListener('click', closeSideDrawer);

    // Location Modal
    if (DOM.locationBtn) DOM.locationBtn.addEventListener('click', openLocationModal);
    if (DOM.closeLocationModal) DOM.closeLocationModal.addEventListener('click', closeLocationModal);
    if (DOM.modalOverlay) DOM.modalOverlay.addEventListener('click', closeLocationModal);

    if (DOM.applyPincodeBtn) {
      DOM.applyPincodeBtn.addEventListener('click', () => {
        const pin = DOM.pincodeInput.value.trim();
        if (pin) {
          setLocation(pin);
        } else {
          showToast('Please enter a valid postal code.');
        }
      });
    }

    if (DOM.saveLocationBtn) {
      DOM.saveLocationBtn.addEventListener('click', () => {
        const country = DOM.countrySelect ? DOM.countrySelect.value : 'India';
        setLocation(country);
      });
    }

    // Language Selector Dropdown
    if (DOM.langSelector) {
      DOM.langSelector.addEventListener('click', (e) => {
        e.stopPropagation();
        const isShown = DOM.langMenu.classList.contains('show');
        DOM.langMenu.classList.toggle('show');
        DOM.langSelector.setAttribute('aria-expanded', !isShown);
      });

      // Language selection
      if (DOM.langMenu) {
        DOM.langMenu.querySelectorAll('li').forEach((li) => {
          li.addEventListener('click', (e) => {
            const lang = li.getAttribute('data-lang');
            state.selectedLang = lang;
            if (DOM.selectedLang) DOM.selectedLang.textContent = lang;
            DOM.langMenu.querySelectorAll('li').forEach((el) => el.classList.remove('active'));
            li.classList.add('active');
            showToast(`Language set to ${li.textContent.trim()}`);
          });
        });
      }
    }

    // Close language dropdown when clicking outside
    document.addEventListener('click', () => {
      if (DOM.langMenu && DOM.langMenu.classList.contains('show')) {
        DOM.langMenu.classList.remove('show');
        if (DOM.langSelector) DOM.langSelector.setAttribute('aria-expanded', 'false');
      }
    });

    // Back to top button
    if (DOM.backToTopBtn) {
      DOM.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Keyboard accessibility: ESC key closes open modals/drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSideDrawer();
        closeCartDrawer();
        closeLocationModal();
        if (DOM.langMenu) DOM.langMenu.classList.remove('show');
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. UTILITIES
     -------------------------------------------------------------------------- */
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* --------------------------------------------------------------------------
     11. INITIALIZATION ON DOM READY
     -------------------------------------------------------------------------- */
  function init() {
    if (DOM.currentLocation) {
      DOM.currentLocation.textContent = state.location;
    }
    updateCartUI();
    initEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
