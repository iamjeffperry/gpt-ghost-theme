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

    function bookmarkCardFor(link) {
        var card = document.createElement('figure');
        var anchor = document.createElement('a');
        var content = document.createElement('div');
        var title = document.createElement('div');
        var description = document.createElement('div');
        var metadata = document.createElement('div');
        var publisher = document.createElement('span');
        var parsed = new URL(link.destination, window.location.href);

        card.className = 'kg-card kg-bookmark-card mf-generated-bookmark';
        anchor.className = 'kg-bookmark-container';
        anchor.href = link.destination;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        content.className = 'kg-bookmark-content';
        title.className = 'kg-bookmark-title';
        description.className = 'kg-bookmark-description';
        metadata.className = 'kg-bookmark-metadata';
        publisher.className = 'kg-bookmark-publisher';

        title.textContent = link.label || parsed.hostname;
        description.textContent = link.destination;
        publisher.textContent = parsed.hostname.replace(/^www\./, '');

        metadata.appendChild(publisher);
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(metadata);
        anchor.appendChild(content);
        card.appendChild(anchor);

        return card;
    }

    function findLinkDestination(content) {
        var bookmark = Array.from(content.querySelectorAll('.kg-bookmark-container[href]')).find(function (link) {
            return isExternal(link.href);
        });
        var candidates = Array.from(content.querySelectorAll('a[href]'));
        var external = bookmark || candidates.find(function (link) {
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
        if (!destination) return null;

        var targetRow = null;

        if (plainUrlRow) {
            targetRow = plainUrlRow;
        } else if (bookmark && external === bookmark) {
            targetRow = bookmark.closest('.kg-bookmark-card') || bookmark.closest('figure');
        } else {
            var paragraph = external.closest('p');
            targetRow = paragraph && content.contains(paragraph)
                ? paragraph
                : external.closest('li, figure, .kg-card');
        }

        var label = external ? external.textContent.trim() : '';
        if (!label || firstPlainUrl(label) === label) {
            label = new URL(destination, window.location.href).hostname.replace(/^www\./, '');
        }

        return {
            bookmarkCard: bookmark ? targetRow : null,
            destination: destination,
            label: label,
            targetRow: targetRow
        };
    }

    function enhanceLinkPost(entry, titleSelector, contentSelector, showBookmark) {
        var title = entry.querySelector(titleSelector);
        var content = entry.querySelector(contentSelector);
        if (!title || !content) return;

        var link = findLinkDestination(content);
        if (!link) return;

        title.href = link.destination;

        if (showBookmark) {
            if (link.bookmarkCard) {
                content.insertBefore(link.bookmarkCard, content.firstChild);
            } else {
                content.insertBefore(bookmarkCardFor(link), content.firstChild);
                if (link.targetRow) link.targetRow.remove();
            }
        } else if (link.targetRow) {
            link.targetRow.classList.add('mf-link-target-row');
        }

        entry.classList.add('has-external-target');
    }

    document.querySelectorAll('.mf-entry.is-link').forEach(function (entry) {
        enhanceLinkPost(entry, '.mf-entry-external-title', '.mf-entry-link-content', false);
    });

    document.querySelectorAll('.gh-article.is-link-post').forEach(function (entry) {
        enhanceLinkPost(entry, '.mf-post-external-title', '.mf-post-link-content', true);
    });
})();
