(function () {
  const posts = window.BLOG_POSTS || [];
  const body = document.body;
  const searchPanel = document.querySelector("[data-search-panel]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  const openButtons = document.querySelectorAll("[data-search-open]");
  const closeButtons = document.querySelectorAll("[data-search-close]");

  function normalize(value) {
    return String(value || "").toLowerCase();
  }

  function renderResults(query) {
    if (!searchResults) return;

    const needle = normalize(query).trim();
    const matches = needle
      ? posts.filter((post) => {
          const haystack = normalize([
            post.title,
            post.excerpt,
            post.date,
            post.author,
            (post.tags || []).join(" ")
          ].join(" "));
          return haystack.includes(needle);
        })
      : posts;

    if (!matches.length) {
      searchResults.innerHTML = '<p class="empty-state">没有找到匹配的文章。</p>';
      return;
    }

    searchResults.innerHTML = matches.map((post) => {
      const tags = (post.tags || []).map((tag) => `<span>${tag}</span>`).join("");
      return `
        <a class="search-result" href="${post.url}">
          <strong>${post.title}</strong>
          <small>${post.date}</small>
          <p>${post.excerpt}</p>
          <div class="mini-tags">${tags}</div>
        </a>
      `;
    }).join("");
  }

  function openSearch() {
    if (!searchPanel) return;
    searchPanel.classList.add("is-open");
    body.classList.add("no-scroll");
    renderResults(searchInput ? searchInput.value : "");
    window.setTimeout(() => searchInput && searchInput.focus(), 80);
  }

  function closeSearch() {
    if (!searchPanel) return;
    searchPanel.classList.remove("is-open");
    body.classList.remove("no-scroll");
  }

  openButtons.forEach((button) => button.addEventListener("click", openSearch));
  closeButtons.forEach((button) => button.addEventListener("click", closeSearch));

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
    if (event.key === "Escape") closeSearch();
  });

  if (searchInput) {
    searchInput.addEventListener("input", (event) => renderResults(event.target.value));
  }

  const archiveList = document.querySelector("[data-archive-list]");
  if (archiveList) {
    archiveList.innerHTML = posts.map((post) => {
      const tags = (post.tags || []).map((tag) => `<a href="archive.html?tag=${encodeURIComponent(tag)}">${tag}</a>`).join("");
      return `
        <article class="archive-item" data-tags="${(post.tags || []).join(",")}">
          <time>${post.date}</time>
          <div>
            <h2><a href="${post.url}">${post.title}</a></h2>
            <p>${post.excerpt}</p>
            <div class="tag-row">${tags}</div>
          </div>
        </article>
      `;
    }).join("");

    const params = new URLSearchParams(window.location.search);
    const activeTag = params.get("tag");
    if (activeTag) {
      document.querySelectorAll(".archive-item").forEach((item) => {
        const tags = item.getAttribute("data-tags") || "";
        const isMatch = tags.split(",").includes(activeTag);
        item.hidden = !isMatch;
        item.style.display = isMatch ? "" : "none";
        item.setAttribute("aria-hidden", String(!isMatch));
      });
      const title = document.querySelector("[data-archive-title]");
      if (title) title.textContent = `标签：${activeTag}`;
    }
  }

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
