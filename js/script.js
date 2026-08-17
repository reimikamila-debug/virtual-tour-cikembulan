/* ================================================================
   VIRTUAL TOUR TAMAN SATWA CIKEMBULAN — Main JavaScript
   ================================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     DATA: Galeri
     --------------------------------------------------------------- */
  const galleryData = [
    {
      id: 1,
      src: 'assets/images/gallery/harimau.jpeg',
      alt: 'Harimau Benggala di Taman Satwa Cikembulan',
      caption: 'Harimau Benggala'
    },
    {
      id: 2,
      src: 'assets/images/gallery/buaya.jpg',
      alt: 'Buaya muara di Taman Satwa Cikembulan',
      caption: 'Buaya Muara'
    },
    {
      id: 3,
      src: 'assets/images/gallery/beruang_madu.jpeg',
      alt: 'Beruang Madu di Taman Satwa Cikembulan',
      caption: 'Beruang Madu'
    },
    {
      id: 4,
      src: 'assets/images/gallery/macan_tutul.jpeg',
      alt: 'Macan Tutul di Taman Satwa Cikembulan',
      caption: 'Macan Tutul'
    },
    {
      id: 5,
      src: 'assets/images/gallery/singa_afrika.jpeg',
      alt: 'Singa Afrika di Taman Satwa Cikembulan',
      caption: 'Singa Afrika'
    },
    {
      id: 6,
      src: 'assets/images/gallery/burung_unta.jpeg',
      alt: 'Burung Unta di Taman Satwa Cikembulan',
      caption: 'Burung Unta'
    },
    {
      id: 7,
      src: 'assets/images/gallery/merak_hijau.png',
      alt: 'Merak Hijau di Taman Satwa Cikembulan',
      caption: 'Merak Hijau'
    },
    {
      id: 8,
      src: 'assets/images/gallery/merak_biru.png',
      alt: 'Merak Biru di Taman Satwa Cikembulan',
      caption: 'Merak Biru'
    },
    {
      id: 9,
      src: 'assets/images/gallery/orang_utan.jpeg',
      alt: 'Orang Utan di Taman Satwa Cikembulan',
      caption: 'Orang Utan'
    },
    {
      id: 10,
      src: 'assets/images/gallery/burung_hantu.jpeg',
      alt: 'Burung Hantu di Taman Satwa Cikembulan',
      caption: 'Burung Hantu'
    },
    {
      id: 11,
      src: 'assets/images/gallery/kelinci.jpeg',
      alt: 'Kelinci di Taman Satwa Cikembulan',
      caption: 'Kelinci'
    },
    {
      id: 12,
      src: 'assets/images/gallery/elang_bondol.jpeg',
      alt: 'Elang Bondol di Taman Satwa Cikembulan',
      caption: 'Elang Bondol'
    },
    {
      id: 13,
      src: 'assets/images/gallery/domba_merino.png',
      alt: 'Domba Merino di Taman Satwa Cikembulan',
      caption: 'Domba Merino'
    },
    {
      id: 14,
      src: 'assets/images/gallery/burung_makaw sayap_hijau.jpeg',
      alt: 'Burung Makaw Sayap Hijau di Taman Satwa Cikembulan',
      caption: 'Burung Makawa Sayap Hijau'
    },
    {
      id: 15,
      src: 'assets/images/gallery/kakatua_koki.jpeg',
      alt: 'Kakatua Koki di Taman Satwa Cikembulan',
      caption: 'Kakatua Koki'
    },
    {
      id: 16,
      src: 'assets/images/gallery/rusa_timor.png',
      alt: 'Rusa Timor di Taman Satwa Cikembulan',
      caption: 'Rusa Timor'
    },
    {
      id: 17,
      src: 'assets/images/gallery/itik_mandarin.jpeg',
      alt: 'Itik Mandarin di Taman Satwa Cikembulan',
      caption: 'Itik Mandarin'
    },
    {
      id: 18,
      src: 'assets/images/gallery/kasuari_gelambir_tunggal.jpeg',
      alt: 'Kasuari Gelambrir Tunggal di Taman Satwa Cikembulan',
      caption: 'Kasuari Gelambir Tunggal'
    },
    {
      id: 19,
      src: 'assets/images/gallery/Julang_Emas_Betina.jpeg',
      alt: 'Julang Emas Betina di Taman Satwa Cikembulan',
      caption: 'Julang Emas Betina'
    },
    {
      id: 20,
      src: 'assets/images/gallery/singa_afrika_betina.jpeg',
      alt: 'Singa Betina Afrika di Taman Satwa Cikembulan',
      caption: 'Singa Betina Afrika'
    },
    {
      id: 21,
      src: 'assets/images/gallery/bangau_tontong.jpeg',
      alt: 'Bangau Tongtong di Taman Satwa Cikembulan',
      caption: 'Bangau Tongtong'
    },
    {
      id: 22,
      src: 'assets/images/gallery/Binturong.jpeg',
      alt: 'Binturong di Taman Satwa Cikembulan',
      caption: 'Binturong'
    },
    {
      id: 23,
      src: 'assets/images/gallery/Buaya_Senyulong.jpeg',
      alt: 'Buaya Senyulong di Taman Satwa Cikembulan',
      caption: 'Buaya Senyulong'
    },
    {
      id: 24,
      src: 'assets/images/gallery/Elang_Brontok_Muda.jpeg',
      alt: 'Elang Brontok Muda di Taman Satwa Cikembulan',
      caption: 'Elang Brontok Muda'
    },
    {
      id: 25,
      src: 'assets/images/gallery/Elang_Harris.jpeg',
      alt: 'Elang Harris di Taman Satwa Cikembulan',
      caption: 'Elang Harris'
    },
    {
      id: 26,
      src: 'assets/images/gallery/Kakatua_Raja.jpeg',
      alt: 'Kakatua Raja di Taman Satwa Cikembulan',
      caption: 'Kakatua Raja'
    },
    {
      id: 27,
      src: 'assets/images/gallery/Lingsang_Air.jpeg',
      alt: 'Lingsang Air di Taman Satwa Cikembulan',
      caption: 'Lingsang Air'
    },
    {
      id: 28,
      src: 'assets/images/gallery/Naga_Berjanggut.jpeg',
      alt: 'Naga Berjanggut di Taman Satwa Cikembulan',
      caption: 'Naga Berjanggut'
    },
    {
      id: 29,
      src: 'assets/images/gallery/owa_jawa.jpeg',
      alt: 'Owa Jawa di Taman Satwa Cikembulan',
      caption: 'Owa Jawa'
    },
    {
      id: 30,
      src: 'assets/images/gallery/siamang.jpeg',
      alt: 'Siamang di Taman Satwa Cikembulan',
      caption: 'Siamang'
    },
    {
      id: 31,
      src: 'assets/images/gallery/Ular_Sanca_Albino.jpeg',
      alt: 'Ular Sanca Albino di Taman Satwa Cikembulan',
      caption: 'Ular Sanca Albino'
    },
    {
      id: 32,
      src: 'assets/images/gallery/kasuari_gelambir_merah.jpeg',
      alt: 'Kasuari Gelambir Merah di Taman Satwa Cikembulan',
      caption: 'Kasuari Gelambir Merah'
    },
    {
      id: 33,
      src: 'assets/images/gallery/Gazebo.jpeg',
      alt: 'Gazebo di Taman Satwa Cikembulan',
      caption: 'Gazebo',
      category: 'area-wahana'
    },
    {
      id: 34,
      src: 'assets/images/gallery/jembatanmerah.jpeg',
      alt: 'Jembatan Merah di Taman Satwa Cikembulan',
      caption: 'Jembatan Merah',
      category: 'area-wahana'
    },
    {
      id: 35,
      src: 'assets/images/gallery/wahana_perahu.jpeg',
      alt: 'Wahana perahu di Taman Satwa Cikembulan',
      caption: 'Wahana Perahu',
      category: 'area-wahana'
    },
    {
      id: 36,
      src: 'assets/images/gallery/foto_dengan_satwa.jpg',
      alt: 'Area foto bersama satwa di Taman Satwa Cikembulan',
      caption: 'Foto Bersama Satwa',
      category: 'area-wahana'
    },
    {
      id: 37,
      src: 'assets/images/gallery/tamanbermain2.jpeg',
      alt: 'Taman bermain di Taman Satwa Cikembulan',
      caption: 'Taman Bermain',
      category: 'area-wahana'
    },
    {
      id: 38,
      src: 'assets/images/gallery/kuda.jpg',
      alt: 'Wahana naik kuda di Taman Satwa Cikembulan',
      caption: 'Wahana Naik Kuda',
      category: 'area-wahana'
    },
    {
      id: 39,
      src: 'assets/images/gallery/tamanbermain_3.jpg',
      alt: 'Area permainan anak di Taman Satwa Cikembulan',
      caption: 'Area Permainan Anak',
      category: 'area-wahana'
    },
    {
      id: 40,
      src: 'assets/images/gallery/tamanbermain_kapal.jpg',
      alt: 'Taman bermain berbentuk kapal di Taman Satwa Cikembulan',
      caption: 'Taman Bermain Kapal',
      category: 'area-wahana'
    },
    {
      id: 41,
      src: 'assets/images/gallery/Gazebo_1.png',
      alt: 'Area gazebo di Taman Satwa Cikembulan',
      caption: 'Area Gazebo',
      category: 'area-wahana'
    },
    {
      id: 42,
      src: 'assets/images/gallery/gazebo2.png',
      alt: 'Gazebo taman di Taman Satwa Cikembulan',
      caption: 'Gazebo Taman',
      category: 'area-wahana'
    },
    {
      id: 43,
      src: 'assets/images/gallery/taman_bermain.png',
      alt: 'Taman bermain anak di Taman Satwa Cikembulan',
      caption: 'Taman Bermain Anak',
      category: 'area-wahana'
    },
    {
      id: 44,
      src: 'assets/images/gallery/spotfoto.png',
      alt: 'Spot foto di Taman Satwa Cikembulan',
      caption: 'Spot Foto',
      category: 'area-wahana'
    },
    {
      id: 45,
      src: 'assets/images/gallery/spotfoto2.png',
      alt: 'Area spot foto di Taman Satwa Cikembulan',
      caption: 'Area Spot Foto',
      category: 'area-wahana'
    }
  ];

  /* ---------------------------------------------------------------
     VIRTUAL TOUR CONFIG
     --------------------------------------------------------------- */
  const VIRTUAL_TOUR_URL =
    'virtual-tour/index.htm';

  /* ---------------------------------------------------------------
     DOM HELPERS
     --------------------------------------------------------------- */
  const $ = (selector, context = document) =>
    context.querySelector(selector);

  const $$ = (selector, context = document) =>
    Array.from(context.querySelectorAll(selector));

  function hasIntersectionObserver() {
    return 'IntersectionObserver' in window;
  }

  function getAnimalsData() {
    try {
      if (
        typeof animalsData !== 'undefined' &&
        Array.isArray(animalsData)
      ) {
        return animalsData;
      }
    } catch (error) {
      console.warn('Data satwa tidak dapat dibaca:', error);
    }

    return Array.isArray(window.animalsData)
      ? window.animalsData
      : [];
  }

  /* ---------------------------------------------------------------
     NAVBAR
     --------------------------------------------------------------- */
  function initNavbar() {
    const header = $('.header');
    const toggle = $('.navbar__toggle');
    const menu = $('.navbar__menu');
    const overlay = $('.menu-overlay');
    const links = $$('.navbar__link');

    function onScroll() {
      if (header) {
        header.classList.toggle(
          'header--scrolled',
          window.scrollY > 30
        );
      }
    }

    function openMenu() {
      if (!toggle || !menu || !overlay) return;

      menu.classList.add('navbar__menu--open');
      overlay.classList.add('menu-overlay--active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (menu) {
        menu.classList.remove('navbar__menu--open');
      }

      if (overlay) {
        overlay.classList.remove('menu-overlay--active');
      }

      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }

      document.body.style.overflow = '';
    }

    if (header) {
      window.addEventListener('scroll', onScroll, {
        passive: true
      });

      onScroll();
    }

    if (toggle && menu && overlay) {
      toggle.addEventListener('click', () => {
        const isOpen =
          toggle.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      overlay.addEventListener('click', closeMenu);
    }

    links.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    const sections = $$('section[id]');

    if (
      !hasIntersectionObserver() ||
      sections.length === 0 ||
      links.length === 0
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          links.forEach((link) => {
            const active =
              link.getAttribute('href') ===
              `#${entry.target.id}`;

            link.classList.toggle(
              'navbar__link--active',
              active
            );
          });
        });
      },
      {
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  /* ---------------------------------------------------------------
     SMOOTH SCROLL
     --------------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');

      if (!href || href === '#') return;

      let targetId = href.slice(1);

      try {
        targetId = decodeURIComponent(targetId);
      } catch (error) {
        console.warn(
          'ID tujuan tidak dapat dibaca:',
          error
        );
      }

      const target =
        document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  /* ---------------------------------------------------------------
     BACK TO TOP
     --------------------------------------------------------------- */
  function initBackToTop() {
    const button = $('.back-to-top');

    if (!button) return;

    function updateButton() {
      button.classList.toggle(
        'back-to-top--visible',
        window.scrollY > 500
      );
    }

    window.addEventListener(
      'scroll',
      updateButton,
      {
        passive: true
      }
    );

    updateButton();

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ---------------------------------------------------------------
     ANIMALS: RENDER, FILTER, SEARCH
     --------------------------------------------------------------- */
  function initAnimals() {
    const grid = $('.animals__grid');

    if (!grid) return;

    const filterButtons = $$('.filter-btn');
    const searchInput =
      $('.animals__search-input');

    const animalList = getAnimalsData();

    let currentFilter = 'Semua';
    let currentSearch = '';

    function createAnimalCard(animal) {
      const statusClasses = {
        LC: 'animal-card__status--lc',
        NT: 'animal-card__status--nt',
        VU: 'animal-card__status--vu',
        EN: 'animal-card__status--en'
      };

      const category =
        animal.category || 'Lainnya';

      const name =
        animal.name || 'Satwa';

      const color =
        animal.color || '#c8e6c9';

      const emoji =
        animal.emoji || '🐾';

      const latin =
        animal.latin || '';

      const description =
        animal.description || '';

      const statusClass =
        statusClasses[animal.status] || '';

      const statusLabel =
        animal.statusLabel ||
        animal.status ||
        '';

      return `
        <article
          class="animal-card reveal"
          data-category="${category}"
        >
          <div class="animal-card__image">
            <div
              class="img-placeholder"
              style="background: linear-gradient(135deg, ${color}, #e8f5e9)"
              role="img"
              aria-label="Foto ${name}"
            >
              <span
                style="font-size: 3.5rem; z-index: 1;"
              >
                ${emoji}
              </span>
            </div>

            <span class="animal-card__category">
              ${category}
            </span>

            ${animal.status
          ? `
                  <span
                    class="animal-card__status ${statusClass}"
                  >
                    ${statusLabel}
                  </span>
                `
          : ''
        }
          </div>

          <div class="animal-card__body">
            <h3 class="animal-card__name">
              ${name}
            </h3>

            ${latin
          ? `
                  <p class="animal-card__latin">
                    ${latin}
                  </p>
                `
          : ''
        }

            <p class="animal-card__desc">
              ${description}
            </p>

            <a
              href="#virtual-tour"
              class="animal-card__link"
              aria-label="Lihat ${name} di Virtual Tour"
            >
              Lihat di Virtual Tour

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </article>
      `;
    }

    function renderAnimals() {
      const filteredAnimals =
        animalList.filter((animal) => {
          const category = String(
            animal.category || ''
          ).toLowerCase();

          const name = String(
            animal.name || ''
          ).toLowerCase();

          const latin = String(
            animal.latin || ''
          ).toLowerCase();

          const matchesCategory =
            currentFilter === 'Semua' ||
            animal.category === currentFilter;

          const matchesSearch =
            currentSearch === '' ||
            name.includes(currentSearch) ||
            latin.includes(currentSearch) ||
            category.includes(currentSearch);

          return (
            matchesCategory &&
            matchesSearch
          );
        });

      if (filteredAnimals.length === 0) {
        grid.innerHTML = `
          <div class="animals__empty">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              ></circle>

              <path
                d="m21 21-4.3-4.3"
              ></path>
            </svg>

            <p>
              Tidak ada satwa yang ditemukan.
            </p>

            <p style="font-size: 0.8rem;">
              Coba ubah filter atau kata
              kunci pencarian.
            </p>
          </div>
        `;

        return;
      }

      grid.innerHTML =
        filteredAnimals
          .map(createAnimalCard)
          .join('');

      initRevealForElements(
        $$('.animal-card.reveal', grid)
      );
    }

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((item) => {
          item.classList.remove(
            'filter-btn--active'
          );
        });

        button.classList.add(
          'filter-btn--active'
        );

        currentFilter =
          button.dataset.filter ||
          'Semua';

        renderAnimals();
      });
    });

    if (searchInput) {
      let debounceTimer;

      searchInput.addEventListener(
        'input',
        () => {
          window.clearTimeout(
            debounceTimer
          );

          debounceTimer =
            window.setTimeout(() => {
              currentSearch =
                searchInput.value
                  .toLowerCase()
                  .trim();

              renderAnimals();
            }, 250);
        }
      );
    }

    renderAnimals();
  }

  /* ---------------------------------------------------------------
     GALLERY: RENDER DAN LIGHTBOX
     --------------------------------------------------------------- */
  /* ---------------------------------------------------------------
     GALLERY: RENDER, FILTER, LOAD MORE DAN LIGHTBOX
     --------------------------------------------------------------- */
  /* ---------------------------------------------------------------
     GALLERY: RENDER, FILTER, LOAD MORE DAN LIGHTBOX
     --------------------------------------------------------------- */
  function initGallery() {
    const grid = $('.gallery__grid');

    if (!grid) return;

    const filterButtons = $$('.gallery-filter__btn');
    const loadMoreContainer = $('#gallery-load-more');
    const loadMoreBtn = $('#gallery-load-more-btn');

    const lightbox = $('.lightbox');
    const lightboxImage = $('.lightbox__image');
    const lightboxCaption = $('.lightbox__caption');
    const lightboxClose = $('.lightbox__close');
    const lightboxPrevious = $('.lightbox__nav--prev');
    const lightboxNext = $('.lightbox__nav--next');

    let currentFilter = 'hewan';
    let visibleCount = getBatchSize();
    let filteredGalleryData = [];
    let currentIndex = 0;
    let focusedBefore = null;

    function getBatchSize() {
      const width = window.innerWidth;
      if (width > 1024) return 8;
      if (width > 600) return 6;
      return 4;
    }

    function updateFilteredData() {
      filteredGalleryData = galleryData.filter((item) => {
        const itemCat = (item.category || 'hewan').toLowerCase().trim();
        if (currentFilter === 'hewan') {
          return itemCat === 'hewan';
        }
        if (currentFilter === 'area-wahana') {
          return itemCat === 'area-wahana';
        }
        return itemCat === currentFilter;
      });
    }

    function renderGallery() {
      updateFilteredData();

      if (filteredGalleryData.length === 0) {
        grid.innerHTML = `
          <p class="gallery__empty" style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 2rem;">
            Belum ada foto pada kategori ini.
          </p>
        `;
        if (loadMoreContainer) {
          loadMoreContainer.style.display = 'none';
        }
        return;
      }

      const visibleItems = filteredGalleryData.slice(0, visibleCount);

      grid.innerHTML = visibleItems
        .map(
          (item, index) => `
            <div
              class="gallery__item reveal"
              tabindex="0"
              role="button"
              aria-label="Buka foto: ${item.caption}"
              data-index="${index}"
            >
              <img
                src="${item.src}"
                alt="${item.alt}"
                loading="lazy"
                decoding="async"
              >

              <div class="gallery__item-overlay">
                <span class="gallery__item-caption">
                  ${item.caption}
                </span>
              </div>
            </div>
          `
        )
        .join('');

      if (loadMoreContainer) {
        if (visibleCount >= filteredGalleryData.length) {
          loadMoreContainer.style.display = 'none';
        } else {
          loadMoreContainer.style.display = 'flex';
        }
      }

      initRevealForElements($$('.gallery__item.reveal', grid));
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', (event) => {
        event.preventDefault();
        visibleCount += getBatchSize();
        renderGallery();
      });
    }

    if (filterButtons && filterButtons.length > 0) {
      filterButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          filterButtons.forEach((item) => {
            item.classList.remove('gallery-filter__btn--active');
          });

          button.classList.add('gallery-filter__btn--active');

          currentFilter = button.dataset.filter || 'hewan';
          visibleCount = getBatchSize();
          renderGallery();
        });
      });
    }

    function updateLightbox() {
      const item = filteredGalleryData[currentIndex];

      if (!item) return;

      if (lightboxImage) {
        if (lightboxImage.tagName === 'IMG') {
          lightboxImage.src = item.src;
          lightboxImage.alt = item.alt;
        } else {
          lightboxImage.innerHTML = `
            <img
              src="${item.src}"
              alt="${item.alt}"
              decoding="async"
            >
          `;
        }
      }

      if (lightboxCaption) {
        lightboxCaption.textContent = item.caption;
      }
    }

    function openLightbox(index) {
      if (!lightbox) return;

      if (!Number.isInteger(index) || !filteredGalleryData[index]) {
        return;
      }

      focusedBefore = document.activeElement;
      currentIndex = index;

      updateLightbox();

      lightbox.classList.add('lightbox--active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (lightboxClose) {
        lightboxClose.focus();
      }
    }

    function closeLightbox() {
      if (!lightbox) return;

      lightbox.classList.remove('lightbox--active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (focusedBefore instanceof HTMLElement) {
        focusedBefore.focus();
      }
    }

    function nextImage() {
      const total = Math.min(visibleCount, filteredGalleryData.length);
      if (total === 0) return;

      currentIndex = (currentIndex + 1) % total;
      updateLightbox();
    }

    function previousImage() {
      const total = Math.min(visibleCount, filteredGalleryData.length);
      if (total === 0) return;

      currentIndex = (currentIndex - 1 + total) % total;
      updateLightbox();
    }

    grid.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const item = event.target.closest('.gallery__item');
      if (!item) return;

      const index = Number.parseInt(item.dataset.index || '', 10);
      openLightbox(index);
    });

    grid.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      if (!(event.target instanceof Element)) {
        return;
      }

      const item = event.target.closest('.gallery__item');
      if (!item) return;

      event.preventDefault();
      const index = Number.parseInt(item.dataset.index || '', 10);
      openLightbox(index);
    });

    if (lightbox) {
      lightbox.setAttribute('aria-hidden', 'true');

      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });

      lightbox.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') {
          return;
        }

        const focusables = $$(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]',
          lightbox
        ).filter((element) => element.offsetParent !== null);

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrevious) {
      lightboxPrevious.addEventListener('click', previousImage);
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', nextImage);
    }

    document.addEventListener('keydown', (event) => {
      if (!lightbox || !lightbox.classList.contains('lightbox--active')) {
        return;
      }

      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        previousImage();
      }

      if (event.key === 'ArrowRight') {
        nextImage();
      }
    });

    renderGallery();
  }

  /* ---------------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------------- */
  function initReveal() {
    initRevealForElements(
      $$('.reveal')
    );
  }

  function initRevealForElements(elements) {
    const elementList =
      Array.from(elements || []).filter(
        (element) =>
          element instanceof Element
      );

    if (elementList.length === 0) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    if (
      reduceMotion ||
      !hasIntersectionObserver()
    ) {
      elementList.forEach((element) => {
        element.classList.add(
          'reveal--visible'
        );
      });

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              'reveal--visible'
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.1,
          rootMargin:
            '0px 0px -50px 0px'
        }
      );

    elementList.forEach((element) => {
      observer.observe(element);
    });
  }

  /* ---------------------------------------------------------------
     VIRTUAL TOUR (CONFIRMATION MODAL & DIRECT NEW-TAB LAUNCH)
     --------------------------------------------------------------- */
  function initVirtualTour() {
    const startBtn = $('#start-tour-btn');
    const confirmModal = $('#vt-confirm-modal');
    const modalBackdrop = $('#vt-modal-backdrop');
    const btnCancel = $('#vt-btn-cancel');
    const btnYes = $('#vt-btn-yes');

    // Open Modal ("Apakah Anda ingin memulai Virtual Tour?")
    function openModal() {
      if (!confirmModal) return;
      confirmModal.classList.add('vt-modal--active');
      confirmModal.setAttribute('aria-hidden', 'false');
    }

    // Close Modal
    function closeModal() {
      if (!confirmModal) return;
      confirmModal.classList.remove('vt-modal--active');
      confirmModal.setAttribute('aria-hidden', 'true');
    }

    // Launch Virtual Tour in new tab upon confirmation
    function launchTour() {
      closeModal();
      window.open('virtual-tour/index.html', '_blank');
    }

    if (startBtn) {
      startBtn.addEventListener('click', openModal);
    }

    if (btnCancel) {
      btnCancel.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', closeModal);
    }

    if (btnYes) {
      btnYes.addEventListener('click', launchTour);
    }

    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        confirmModal &&
        confirmModal.classList.contains('vt-modal--active')
      ) {
        closeModal();
      }
    });
  }

  /* ---------------------------------------------------------------
     TOAST NOTIFICATION
     --------------------------------------------------------------- */
  let toastTimer = null;

  function showToast(
    message,
    type = 'info'
  ) {
    const toast = $('.toast');

    if (!toast) return;

    window.clearTimeout(
      toastTimer
    );

    const icons = {
      info: `
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
          ></circle>

          <path
            d="M12 16v-4"
          ></path>

          <path
            d="M12 8h.01"
          ></path>
        </svg>
      `,
      warning: `
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
          ></path>

          <path
            d="M12 9v4"
          ></path>

          <path
            d="M12 17h.01"
          ></path>
        </svg>
      `
    };

    toast.innerHTML = `
      ${icons[type] || icons.info}
      <span></span>
    `;

    const messageElement =
      $('span', toast);

    if (messageElement) {
      messageElement.textContent =
        String(message);
    }

    toast.className =
      `toast toast--${type} toast--visible`;

    toastTimer =
      window.setTimeout(() => {
        toast.classList.remove(
          'toast--visible'
        );
      }, 5000);
  }

  /* ---------------------------------------------------------------
     COPYRIGHT YEAR
     --------------------------------------------------------------- */
  function initCopyright() {
    const yearElement =
      $('#copyright-year');

    if (yearElement) {
      yearElement.textContent =
        String(
          new Date().getFullYear()
        );
    }
  }

  /* ---------------------------------------------------------------
     GOOGLE MAPS
     --------------------------------------------------------------- */
  function initMap() {
    const directionsButton =
      $('#directions-btn');

    if (!directionsButton) return;

    directionsButton.addEventListener(
      'click',
      () => {
        window.open(
          'https://maps.app.goo.gl/iENK51gfSACBVNZt9',
          '_blank',
          'noopener,noreferrer'
        );
      }
    );
  }

  /* ---------------------------------------------------------------
     HERO VIDEO PLAYLIST
     --------------------------------------------------------------- */
  function initHeroVideo() {
    const heroVideo = document.getElementById("hero-video");
    const heroVideoSource = document.getElementById("hero-video-source");

    const heroVideos = [
      "assets/video/video_intro.mp4",
      "assets/video/video_intro2.mp4"
    ];

    if (!heroVideo || !heroVideoSource) return;

    let currentHeroVideoIndex = 0;

    heroVideo.addEventListener("ended", () => {
      currentHeroVideoIndex =
        (currentHeroVideoIndex + 1) % heroVideos.length;

      heroVideoSource.src =
        heroVideos[currentHeroVideoIndex];

      heroVideo.load();

      heroVideo.play().catch(() => {
        console.info(
          "Pemutaran video menunggu interaksi pengguna."
        );
      });
    });

    heroVideo.play().catch(() => {
      console.info(
        "Autoplay video diblokir oleh browser."
      );
    });
  }

  /* ---------------------------------------------------------------
     INITIALIZE ALL
     --------------------------------------------------------------- */
  function init() {
    const initializers = [
      initNavbar,
      initSmoothScroll,
      initBackToTop,
      initAnimals,
      initGallery,
      initReveal,
      initVirtualTour,
      initCopyright,
      initMap,
      initHeroVideo
    ];

    initializers.forEach(
      (initializer) => {
        try {
          initializer();
        } catch (error) {
          console.error(
            `Gagal menjalankan ${initializer.name}:`,
            error
          );
        }
      }
    );
  }

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      init,
      {
        once: true
      }
    );
  } else {
    init();
  }
})();