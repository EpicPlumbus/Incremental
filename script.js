// --- Game State ---
let coins = 0;
let clickPower = 1;

// Upgrade Tier 1: Auto-Clicker
let autoClickers = 0;
let autoClickerCost = 10;

// Upgrade Tier 2: Gold Miner
let miners = 0;
let minerCost = 100;

// Click Upgrade
let clickUpgradeCost = 25;
let clickUpgradeLevel = 1;

// --- DOM Elements ---
const coinCountEl = document.getElementById('coin-count');
const cpsCountEl = document.getElementById('cps-count');
const clickPowerCountEl = document.getElementById('click-power-count');
const clickBtn = document.getElementById('click-btn');

// Upgrade Elements
const buyClickPowerBtn = document.getElementById('buy-click-power-btn');
const clickPowerCostEl = document.getElementById('click-power-cost');
const clickPowerLevelEl = document.getElementById('click-power-level');

const buyAutoClickerBtn = document.getElementById('buy-autoclicker-btn');
const autoClickerCostEl = document.getElementById('autoclicker-cost');
const autoClickerCountEl = document.getElementById('autoclicker-count');

const buyMinerBtn = document.getElementById('buy-miner-btn');
const minerCostEl = document.getElementById('miner-cost');
const minerCountEl = document.getElementById('miner-count');


// --- Helper Functions ---

// Calculates total CPS dynamically based on what the player owns
function getCoinsPerSecond() {
    return (autoClickers * 1) + (miners * 8);
}

// Updates everything visible on the screen
function updateUI() {
    coinCountEl.innerText = Math.floor(coins);
    cpsCountEl.innerText = getCoinsPerSecond();
    clickPowerCountEl.innerText = clickPower;
    
    // Update Upgrade 1 (Click Power)
    clickPowerCostEl.innerText = clickUpgradeCost;
    clickPowerLevelEl.innerText = clickUpgradeLevel;

    // Update Upgrade 2 (Auto-Clicker)
    autoClickerCostEl.innerText = autoClickerCost;
    autoClickerCountEl.innerText = autoClickers;

    // Update Upgrade 3 (Gold Miner)
    minerCostEl.innerText = minerCost;
    minerCountEl.innerText = miners;
}


// --- Event Listeners ---

// Main Clicking Action
clickBtn.addEventListener('click', () => {
    coins += clickPower;
    updateUI();
});

// Buying Click Power
buyClickPowerBtn.addEventListener('click', () => {
    if (coins >= clickUpgradeCost) {
        coins -= clickUpgradeCost;
        clickPower += 1;
        clickUpgradeLevel += 1;
        
        // Multiplies cost by 1.5x for the next level
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        updateUI();
    }
});

// Buying Auto-Clicker (Tier 1)
buyAutoClickerBtn.addEventListener('click', () => {
    if (coins >= autoClickerCost) {
        coins -= autoClickerCost;
        autoClickers += 1;
        
        // Industry standard scaling: 1.15x cost increase
        autoClickerCost = Math.floor(autoClickerCost * 1.15);
        updateUI();
    }
});

// Buying Gold Miner (Tier 2)
buyMinerBtn.addEventListener('click', () => {
    if (coins >= minerCost) {
        coins -= minerCost;
        miners += 1;
        
        // 1.15x cost increase
        minerCost = Math.floor(minerCost * 1.15);
        updateUI();
    }
});


// --- The Game Loop ---
// Runs 10 times a second (every 100ms) for smoother, less laggy resource tracking
setInterval(() => {
    let cps = getCoinsPerSecond();
    if (cps > 0) {
        coins += cps / 10; // Add 1/10th of the CPS every 100ms
        updateUI();
    }
}, 100);
