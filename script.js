function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
  }

document.querySelector(".game-section #roll-dice").addEventListener("click", () => {
  const dice = Math.floor(Math.random() * 6) + 1;
  document.querySelector(".game-section #dice-result").innerText = `Dice: ${dice}`;
});
