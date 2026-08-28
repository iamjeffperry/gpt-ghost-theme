(function () {
    function firstPlainUrl(text) {
        var match = (text || '').match(/https?:\/\/[^\s<>"']+/i);
        return match ? match[0].replace(/[),.;!?]+$/, '') : null;
    }

    function isExternal(url) {
        try {
            var target = new URL(url, window.location.href);
            return target.origin !== window.location.origin;
        } catch (e) {
            return false;
        }
    }

    document.querySelectorAll('.mf-entry.is-link').forEach(function (entry) {
        var title = entry.querySelector('.mf-entry-external-title');
        var content = entry.querySelector('.mf-entry-link-content');
        if (!title || !content) return;

        var bookmark = content.querySelector('.kg-bookmark-container[href]');
        var candidates = Array.from(content.querySelectorAll('a[href]'));
        var external = (bookmark && isExternal(bookmark.href)) ? bookmark : candidates.find(function (link) {
            return isExternal(link.href);
        });
        var plainUrl = null;
        var plainUrlRow = null;

        if (!external) {
            Array.from(content.querySelectorAll('p, li, figcaption')).some(function (row) {
                var candidate = firstPlainUrl(row.textContent);
                if (!candidate || !isExternal(candidate)) return false;

                plainUrl = candidate;
                plainUrlRow = row;
                return true;
            });
        }

        var destination = external ? external.href : plainUrl;
        if (!destination) return;

        title.href = destination;

        // The first external URL is metadata for a Link post, not feed content.
        // Hide only the row/card that contains that destination URL; keep the
        // quote and the author's commentary visible. Individual post pages are
        // unaffected because this script only targets .mf-entry feed cards.
        var targetRow = null;

        if (plainUrlRow) {
            targetRow = plainUrlRow;
        } else if (bookmark && external === bookmark) {
            targetRow = bookmark.closest('.kg-bookmark-card') || bookmark.closest('figure');
        } else {
            var paragraph = external.closest('p');
            if (paragraph && content.contains(paragraph)) {
                targetRow = paragraph;
            } else {
                targetRow = external.closest('li, figure, .kg-card');
            }
        }

        if (targetRow) {
            targetRow.classList.add('mf-link-target-row');
        }

        entry.classList.add('has-external-target');
    });
})();
