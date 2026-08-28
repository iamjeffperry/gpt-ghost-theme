(function () {
    var navigation = document.querySelector('.gh-navigation');
    var burger = navigation && navigation.querySelector('.gh-burger');

    // Source normally adds this after measuring a dynamic navigation menu.
    // Our navigation is fixed, so mark it ready immediately.
    if (navigation) navigation.classList.add('is-dropdown-loaded');

    if (burger) {
        burger.addEventListener('click', function () {
            var open = navigation.classList.toggle('is-open');
            document.documentElement.style.overflowY = open ? 'hidden' : '';
        });
    }

    function isExternal(url) {
        try {
            return new URL(url, window.location.href).origin !== window.location.origin;
        } catch (e) {
            return false;
        }
    }

    document.querySelectorAll('.jp-entry.is-link').forEach(function (entry) {
        var title = entry.querySelector('.jp-entry-external-title');
        var source = entry.querySelector('.jp-entry-link-source');
        var content = entry.querySelector('.jp-entry-link-content');
        if (!title || !content) return;

        var bookmark = content.querySelector('.kg-bookmark-container[href]');
        var candidates = Array.from(content.querySelectorAll('a[href]'));
        var external = (bookmark && isExternal(bookmark.href)) ? bookmark : candidates.find(function (link) {
            return isExternal(link.href);
        });
        if (!external) return;

        title.href = external.href;
        if (source) {
            source.href = external.href;
            try {
                source.textContent = new URL(external.href).hostname.replace(/^www\./, '');
            } catch (e) {
                source.textContent = 'Open link';
            }
        }

        var targetRow = null;
        if (bookmark && external === bookmark) {
            targetRow = bookmark.closest('.kg-bookmark-card') || bookmark.closest('figure');
        } else {
            var paragraph = external.closest('p');
            if (paragraph && content.contains(paragraph)) {
                var copy = paragraph.cloneNode(true);
                copy.querySelectorAll('a').forEach(function (link) { link.remove(); });
                if (/^[\s:;,.!?–—-]*$/.test(copy.textContent || '')) targetRow = paragraph;
            }
        }

        if (targetRow) targetRow.classList.add('jp-link-target-row');
        entry.classList.add('has-external-target');
    });
})();
