function dropdown() {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const head = document.querySelector('.gh-navigation');
    if (!head) return;
    const menu = head.querySelector('.gh-navigation-menu');
    const nav = menu?.querySelector('.nav');
    if (!nav) return;

    const logo = document.querySelector('.gh-navigation-logo');
    const navHTML = nav.innerHTML;
    const moreLabel = head.dataset.moreLabel || 'More';

    const closeDropdown = function (restoreFocus) {
        const toggle = head.querySelector('.gh-more-toggle');
        head.classList.remove('is-dropdown-open');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            if (restoreFocus) toggle.focus();
        }
    };

    if (mediaQuery.matches) {
        const items = nav.querySelectorAll('li');
        items.forEach(function (item, index) {
            item.style.transitionDelay = `${0.03 * (index + 1)}s`;
        });
    }

    const makeDropdown = function () {
        if (mediaQuery.matches) return;
        closeDropdown(false);
        head.classList.remove('is-dropdown-mega');
        const submenuItems = [];

        while ((nav.offsetWidth + 64) > menu.offsetWidth) {
            if (nav.lastElementChild) {
                submenuItems.unshift(nav.lastElementChild);
                nav.lastElementChild.remove();
            } else {
                break;
            }
        }

        if (!submenuItems.length) {
            head.classList.add('is-dropdown-loaded');
            return;
        }

        const item = document.createElement('li');
        const toggle = document.createElement('button');
        const wrapper = document.createElement('ul');

        item.setAttribute('class', 'gh-more-item');
        toggle.setAttribute('class', 'gh-more-toggle gh-icon-button');
        toggle.setAttribute('type', 'button');
        toggle.setAttribute('aria-label', moreLabel);
        toggle.setAttribute('aria-haspopup', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'gh-navigation-dropdown');
        toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M21.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM13.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM5.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0z"></path></svg>';
        wrapper.setAttribute('class', 'gh-dropdown');
        wrapper.setAttribute('id', 'gh-navigation-dropdown');

        if (submenuItems.length >= 10) {
            head.classList.add('is-dropdown-mega');
            wrapper.style.gridTemplateRows = `repeat(${Math.ceil(submenuItems.length / 2)}, 1fr)`;
        } else {
            head.classList.remove('is-dropdown-mega');
        }

        submenuItems.forEach(function (child) {
            wrapper.appendChild(child);
        });

        item.appendChild(toggle);
        item.appendChild(wrapper);
        nav.appendChild(item);

        const toggleRect = toggle.getBoundingClientRect();
        const documentCenter = window.innerWidth / 2;

        if (toggleRect.left < documentCenter) {
            wrapper.classList.add('is-left');
        }

        head.classList.add('is-dropdown-loaded');

        toggle.addEventListener('click', function () {
            const isOpen = !head.classList.contains('is-dropdown-open');
            head.classList.toggle('is-dropdown-open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    document.addEventListener('click', function (event) {
        if (!head.contains(event.target)) closeDropdown(false);
    });

    head.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && head.classList.contains('is-dropdown-open')) {
            event.preventDefault();
            closeDropdown(true);
        }
    });

    imagesLoaded(logo, function () {
        makeDropdown();
    });

    window.addEventListener('load', function () {
        if (!logo) {
            makeDropdown();
        }
    });

    window.addEventListener('resize', function () {
        setTimeout(() => {
            closeDropdown(false);
            nav.innerHTML = navHTML;
            makeDropdown();
        }, 1);
    });
}
