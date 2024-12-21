function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

function openArticle(title, content) {
  document.getElementById('article-title').innerText = title;
  document.getElementById('article-content').innerText = content;
  document.getElementById('article-modal').style.display = 'flex';
}

function closeArticle() {
  document.getElementById('article-modal').style.display = 'none';
}
