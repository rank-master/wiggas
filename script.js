// Toggle Navigation Menu
document.getElementById("menu-toggle").addEventListener("click", function () {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
});

// Show Section Functionality
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
    section.style.display = "none";
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add("active");
    selectedSection.style.display = "block";
  }
}
