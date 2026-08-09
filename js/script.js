const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const repoCount = document.getElementById('repoCount');

const themeKey = 'portfolio-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function loadTheme() {
  const stored = localStorage.getItem(themeKey);
  const preferred = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(preferred);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(themeKey, next);
}

async function loadRepositories() {
  try {
    const response = await fetch('https://api.github.com/users/Xenawi/repos?sort=updated&per_page=8');
    if (!response.ok) throw new Error('GitHub API error');
    const repos = await response.json();
    repoCount.textContent = repos.length;
  } catch (error) {
    console.error(error);
    repoCount.textContent = '—';
  }
}

themeToggle.addEventListener('click', toggleTheme);
loadTheme();
loadRepositories();
