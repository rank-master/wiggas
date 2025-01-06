// script.js
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';

const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [2, 4, 6]  // Diagonal (top-right to bottom-left)
];

function handleClick(event) {
  const cell = event.target;
  // Place the current player's mark
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  // Check for a win or draw
  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins!`);
    resetBoard();
    return;
  } else if (checkDraw()) {
    alert('It\'s a draw!');
    resetBoard();
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => cell.classList.contains('taken'));
}

function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
}

// Add event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', resetBoard);
