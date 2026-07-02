// Game Variables
let coins = 0;
let autoClickers = 0;
let autoClickerCost = 10;

// HTML Elements
const coinCountElement = document.getElementById('coin-count');
const cpsCountElement = document.getElementById('cps-count');
const clickBtn = document.getElementById('click-btn');
const buyAutoClickerBtn = document.getElementById('buy-autoclicker-btn');
const autoClickerCostElement = document.getElementById('autoclicker-cost');
const autoClickerCountElement = document.getElementById('autoclicker-count');

// Function to update the text on the screen
function updateUI() {
    coinCountElement.innerText = coins;
    cpsCountElement.innerText = autoClickers;
    autoClickerCostElement.innerText = autoClickerCost;
    autoClickerCountElement.innerText = autoClickers;
}

// When the main button is clicked
clickBtn.addEventListener('click', () => {
    coins += 1;
    updateUI();
});

// When the buy auto-clicker button is clicked
buyAutoClickerBtn.addEventListener('click', () => {
    if (coins >= autoClickerCost) {
        // Deduct cost and add an auto-clicker
        coins -= autoClickerCost;
        autoClickers += 1;
        
        // Increase the cost for the next one (scales up by 1.5x)
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        
        updateUI();
    } else {
        alert("Not enough coins!");
    }
});

// The Game Loop (Runs every 1000 milliseconds / 1 second)
setInterval(() => {
    if (autoClickers > 0) {
        coins += autoClickers;
        updateUI();
    }
}, 1000);
