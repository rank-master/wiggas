function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === window.location.pathname) {
        link.classList.add('active');
    }
});

document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('active');
});
