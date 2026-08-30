/* Mobile menu burger toggle */
(function () {
    const navigation = document.querySelector('.gh-navigation');
    if (!navigation) return;

    const burger = navigation.querySelector('.gh-burger');
    if (!burger) return;

    const desktopQuery = window.matchMedia('(min-width: 768px)');

    const getFocusableElements = function () {
        return Array.from(navigation.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(function (element) {
            return element.getClientRects().length > 0;
        });
    };

    const setOpen = function (isOpen, restoreFocus) {
        navigation.classList.toggle('is-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? burger.dataset.closeLabel : burger.dataset.openLabel);
        document.documentElement.style.overflowY = isOpen ? 'hidden' : '';

        if (isOpen) {
            const firstMenuControl = navigation.querySelector(
                '#gh-navigation-menu a[href], #gh-navigation-actions a[href], #gh-navigation-actions button:not([disabled]), #gh-navigation-actions input:not([disabled])'
            );
            if (firstMenuControl) firstMenuControl.focus();
        } else if (restoreFocus) {
            burger.focus();
        }
    };

    burger.addEventListener('click', function () {
        setOpen(!navigation.classList.contains('is-open'), false);
    });

    navigation.addEventListener('keydown', function (event) {
        if (!navigation.classList.contains('is-open')) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            setOpen(false, true);
            return;
        }

        if (event.key !== 'Tab') return;

        const focusable = getFocusableElements();
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    const handleDesktopChange = function (event) {
        if (event.matches && navigation.classList.contains('is-open')) {
            setOpen(false, false);
        }
    };

    if (desktopQuery.addEventListener) {
        desktopQuery.addEventListener('change', handleDesktopChange);
    } else {
        desktopQuery.addListener(handleDesktopChange);
    }
})();

/* Add lightbox to gallery images */
(function () {
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img'
    );
})();

/* Responsive video in post content */
(function () {
    const sources = [
        '.gh-content iframe[src*="youtube.com"]',
        '.gh-content iframe[src*="youtube-nocookie.com"]',
        '.gh-content iframe[src*="player.vimeo.com"]',
        '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.gh-content object',
        '.gh-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));
})();

/* Turn the main nav into dropdown menu when there are more than 5 menu items */
(function () {
    dropdown();
})();

/* Responsive HTML table */
(function () {
    const tables = document.querySelectorAll('.gh-content > table:not(.gist table)');
    
    tables.forEach(function (table) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gh-table';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
})();
