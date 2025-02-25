let clicks = 0;
let clickMultiplier = 1;
let drinkIndex = 0; // Start with default drink
let drinkCooldown = false;

document.getElementById('cookie').addEventListener('click', () => {
  clicks += clickMultiplier;
  document.getElementById('clicks').innerText = clicks;
  updateDrinkAnimation();
  checkUpgrades();
});

function updateDrinkAnimation() {
  if (!drinkCooldown) {
    const drinkImage = document.getElementById('drink');
    drinkImage.src = `drink/drink${drinkIndex}.png`;
    drinkImage.classList.remove('hidden');
    drinkImage.classList.add('drinking');
    drinkCooldown = true;
    setTimeout(() => {
      drinkImage.classList.remove('drinking');
      drinkImage.classList.add('hidden');
      drinkCooldown = false;
    }, 1000); // Cooldown for 1 second
  }
}

function checkUpgrades() {
  if (clicks >= 200) document.getElementById('2x-upgrade').disabled = false;
  if (clicks >= 300) document.getElementById('3x-upgrade').disabled = false;
  if (clicks >= 400) document.getElementById('4x-upgrade').disabled = false;
  if (clicks >= 500) document.getElementById('5x-upgrade').disabled = false;
  if (clicks >= 600) document.getElementById('6x-upgrade').disabled = false;
  if (clicks >= 700) document.getElementById('7x-upgrade').disabled = false;
  if (clicks >= 800) document.getElementById('8x-upgrade').disabled = false;
  if (clicks >= 900) document.getElementById('9x-upgrade').disabled = false;
  if (clicks >= 1000) document.getElementById('10x-upgrade').disabled = false;
  if (clicks >= 1000) document.getElementById('sober-button').classList.remove('hidden');
}

document.getElementById('2x-upgrade').addEventListener('click', () => buyUpgrade(2, 200));
document.getElementById('3x-upgrade').addEventListener('click', () => buyUpgrade(3, 300));
document.getElementById('4x-upgrade').addEventListener('click', () => buyUpgrade(4, 400));
document.getElementById('5x-upgrade').addEventListener('click', () => buyUpgrade(5, 500));
document.getElementById('6x-upgrade').addEventListener('click', () => buyUpgrade(6, 600));
document.getElementById('7x-upgrade').addEventListener('click', () => buyUpgrade(7, 700));
document.getElementById('8x-upgrade').addEventListener('click', () => buyUpgrade(8, 800));
document.getElementById('9x-upgrade').addEventListener('click', () => buyUpgrade(9, 900));
document.getElementById('10x-upgrade').addEventListener('click', () => buyUpgrade(10, 1000));

function buyUpgrade(level, cost) {
  if (clicks >= cost) {
    clicks -= cost;
    clickMultiplier = level;
    document.getElementById('clicks').innerText = clicks;
    document.getElementById(`${level}x-upgrade`).disabled = true;
    drinkIndex = level; // Update drink index based on upgrade level
  }
}

document.getElementById('sober-button').addEventListener('click', () => {
  clicks = 0;
  clickMultiplier = 1;
  drinkIndex = 0; // Reset to default drink
  document.getElementById('clicks').innerText = clicks;
  document.getElementById('sober-button').classList.add('hidden');
  resetUpgrades();
});

function resetUpgrades() {
  for (let i = 2; i <= 10; i++) {
    document.getElementById(`${i}x-upgrade`).disabled = true;
  }
}

document.getElementById('options-button').addEventListener('click', () => {
  const optionsMenu = document.getElementById('options-menu');
  optionsMenu.classList.toggle('hidden');
});

document.getElementById('cookie-image').addEventListener('change', (event) => {
  const cookieImage = document.getElementById('cookie');
  cookieImage.src = `images/${event.target.value}.png`;
});

let lastClickTime = 0;
let spinSpeed = 5; // Initial spin speed in seconds

document.getElementById('cookie').addEventListener('click', () => {
  const currentTime = Date.now();
  const timeSinceLastClick = currentTime - lastClickTime;

  // Adjust spin speed based on clicking speed
  if (timeSinceLastClick < 1000) { // If clicks are faster than 1 second apart
    spinSpeed = Math.max(0.1, spinSpeed * 0.9); // Speed up the spin, but don't go below 0.1s
  } else {
    spinSpeed = Math.min(5, spinSpeed * 1.1); // Slow down the spin, but don't go above 5s
  }

  // Update the spin animation speed
  const drinkImage = document.getElementById('drink');
  drinkImage.style.animationDuration = `${spinSpeed}s`;

  // Update last click time
  lastClickTime = currentTime;

  // Existing click logic
  clicks += clickMultiplier;
  document.getElementById('clicks').innerText = clicks;
  updateDrinkAnimation();
  checkUpgrades();
});

// Spin toggle functionality
document.getElementById('spin-toggle').addEventListener('change', (event) => {
  const drinkImage = document.getElementById('drink');
  if (event.target.checked) {
    drinkImage.classList.add('spin');
  } else {
    drinkImage.classList.remove('spin');
  }
});

// Spin toggle functionality
document.getElementById('spin-toggle').addEventListener('change', (event) => {
  const cookieImage = document.getElementById('cookie');
  if (event.target.checked) {
    cookieImage.classList.add('spin');
  } else {
    cookieImage.classList.remove('spin');
  }
});

