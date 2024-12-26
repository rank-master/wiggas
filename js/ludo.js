const socket = io('http://localhost:3000'); // Connect to the server
const board = document.getElementById('ludo-board');
const diceResult = document.getElementById('dice-result');
const leaderboardList = document.getElementById('leaderboard-list');
const rollDiceBtn = document.getElementById('roll-dice');

// Generate board
for (let i = 0; i < 81; i++) {
  const cell = document.createElement('div');
  cell.textContent = i + 1;
  board.appendChild(cell);
}

// Roll dice
rollDiceBtn.addEventListener('click', () => {
  const dice = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `Dice: ${dice}`;
  socket.emit('playerMove', { player: 'Player1', move: dice });
});

// Update board
socket.on('updateMove', (data) => {
  console.log(`${data.player} moved ${data.move}`);
});

// Leaderboard
socket.on('updateLeaderboard', (leaderboard) => {
  leaderboardList.innerHTML = '';
  leaderboard.forEach(player => {
    const li = document.createElement('li');
    li.textContent = `${player.name}: ${player.score}`;
    leaderboardList.appendChild(li);
  });
});
