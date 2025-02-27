function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add('active');
    selectedSection.style.display = 'block';
  }
}
