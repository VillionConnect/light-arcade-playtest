const gamesEl = document.querySelector("[data-games]");
const searchEl = document.querySelector("[data-search]");
const totalEl = document.querySelector("[data-total]");
const liveEl = document.querySelector("[data-live]");
const updatedEl = document.querySelector("[data-updated]");
const refreshButton = document.querySelector("[data-refresh]");

let games = [];

const icons = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"></path></svg>',
};

function text(value) {
  return String(value ?? "");
}

function cleanUrl(url) {
  const value = text(url).trim();
  if (!value || value.includes("://") || value.startsWith("//")) return "#";
  return value;
}

function render(gamesToRender) {
  gamesEl.innerHTML = "";
  if (!gamesToRender.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "没有找到匹配的小游戏。";
    gamesEl.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const game of gamesToRender) {
    const card = document.createElement("article");
    card.className = "game-card";
    card.style.setProperty("--accent", text(game.accent || "#79ffd7"));

    const art = document.createElement("div");
    art.className = "game-art";
    card.appendChild(art);

    const body = document.createElement("div");
    body.className = "game-body";

    const titleRow = document.createElement("div");
    titleRow.className = "game-title-row";

    const titleWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = text(game.title);
    const subtitle = document.createElement("p");
    subtitle.textContent = text(game.subtitle);
    titleWrap.append(title, subtitle);

    const status = document.createElement("span");
    status.className = "pill";
    status.textContent = text(game.status || "可玩");
    titleRow.append(titleWrap, status);

    const description = document.createElement("p");
    description.textContent = text(game.description);

    const tags = document.createElement("div");
    tags.className = "tags";
    for (const label of game.tags || []) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = text(label);
      tags.appendChild(tag);
    }

    body.append(titleRow, description, tags);
    card.appendChild(body);

    const foot = document.createElement("div");
    foot.className = "game-foot";
    const version = document.createElement("span");
    version.className = "version";
    version.textContent = `v${text(game.version || "0.1.0")} · ${text(game.updated || "")}`;
    const link = document.createElement("a");
    link.className = "play-link";
    link.href = cleanUrl(game.url);
    link.rel = "noopener";
    link.innerHTML = `${icons.play}<span>开玩</span>`;
    foot.append(version, link);
    card.appendChild(foot);
    fragment.appendChild(card);
  }
  gamesEl.appendChild(fragment);
}

function updateMetrics() {
  totalEl.textContent = String(games.length);
  liveEl.textContent = String(games.filter((game) => text(game.status).includes("可玩")).length);
  const dates = games.map((game) => text(game.updated)).filter(Boolean).sort();
  updatedEl.textContent = dates.at(-1) || "-";
}

function applySearch() {
  const query = searchEl.value.trim().toLowerCase();
  if (!query) {
    render(games);
    return;
  }
  render(games.filter((game) => {
    const haystack = [
      game.title,
      game.subtitle,
      game.description,
      ...(game.tags || []),
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  }));
}

async function loadGames() {
  gamesEl.innerHTML = '<div class="empty">正在读取小游戏清单。</div>';
  try {
    const response = await fetch("data/games.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const nextGames = await response.json();
    games = Array.isArray(nextGames) ? nextGames : [];
    updateMetrics();
    applySearch();
  } catch (error) {
    games = [];
    updateMetrics();
    gamesEl.innerHTML = '<div class="empty">清单读取失败，请检查 data/games.json。</div>';
  }
}

searchEl.addEventListener("input", applySearch);
refreshButton.addEventListener("click", loadGames);
loadGames();
