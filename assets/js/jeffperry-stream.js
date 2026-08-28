(function () {
    function isExternal(url) {
        try {
            var target = new URL(url, window.location.href);
            return target.origin !== window.location.origin;
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
                var hostname = new URL(external.href).hostname.replace(/^www\./, '');
                source.textContent = hostname;
            } catch (e) {
                source.textContent = 'Open link';
            }
        }

        // The first external URL is metadata for a Link post, not feed content.
        // Hide only the row/card that contains that destination URL; keep the
        // quote and the author's commentary visible. Individual post pages are
        // unaffected because this script only targets .jp-entry feed cards.
        var targetRow = null;

        if (bookmark && external === bookmark) {
            targetRow = bookmark.closest('.kg-bookmark-card') || bookmark.closest('figure');
        } else {
            var paragraph = external.closest('p');
            if (paragraph && content.contains(paragraph)) {
                var copy = paragraph.cloneNode(true);
                copy.querySelectorAll('a').forEach(function (link) {
                    link.remove();
                });

                // Obsidian-style destination rows such as
                // [https://example.com](https://example.com):
                // leave only punctuation after the anchor.
                if (/^[\s:;,.!?–—-]*$/.test(copy.textContent || '')) {
                    targetRow = paragraph;
                }
            }
        }

        if (targetRow) {
            targetRow.classList.add('jp-link-target-row');
        }

        entry.classList.add('has-external-target');
    });
})();
