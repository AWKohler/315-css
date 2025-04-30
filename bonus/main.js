// Create hero cards
function createHeroCard(hero) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'hero-card';
    
    cardDiv.innerHTML = `
        <div class="card-title">${hero.name}</div>
        <div>Power: ${hero.power}</div>
        <div>Strength: ${hero.strength}</div>
        <div>Intelligence: ${hero.intelligence}</div>
        <div style="margin-top:10px;font-style:italic;">"${hero.catchphrase}"</div>
    `;
    
    document.getElementById('heroCards').appendChild(cardDiv);
}

// Create villain cards
function createVillainCard(villain) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'villain-card';
    
    cardDiv.innerHTML = `
        <div class="card-title">${villain.name}</div>
        <div>Power: ${villain.power}</div>
        <div>Evil Plan: ${villain.evilPlan}</div>
        <div>Minions: ${villain.minions}</div>
        <div>Weakness: ${villain.weakness}</div>
    `;
    
    document.getElementById('villainCards').appendChild(cardDiv);
}

// Create action log
function createActionLog(message, containerId, isHero = true) {
    const logDiv = document.createElement('div');
    logDiv.className = isHero ? 'action-log hero-speaks' : 'action-log villain-speaks';
    logDiv.textContent = message;
    document.getElementById(containerId).appendChild(logDiv);
}

// Create epic log
function createEpicLog(message) {
    const logDiv = document.createElement('div');
    logDiv.className = 'epic-log';
    logDiv.textContent = message;
    document.getElementById('epicBattle').appendChild(logDiv);
}

// Display heroes
createHeroCard(superman);
createHeroCard(wonderWoman);

// Display villains
createVillainCard(joker);
createVillainCard(lexLuthor);

// Show hero actions
createActionLog(superman.useSpecialPower(), 'heroActions');
createActionLog(wonderWoman.rescueCivilian(), 'heroActions');
createActionLog(teamUp(superman, wonderWoman), 'heroActions');

// Show villain actions
createActionLog(joker.useEvilPower(), 'villainActions', false);
createActionLog(lexLuthor.plotScheme(), 'villainActions', false);
createActionLog(villainShowdown(joker, lexLuthor), 'villainActions', false);

// Epic battle narration
createEpicLog(`The city is in chaos as ${joker.name} ${joker.useEvilPower().toLowerCase()}`);
createEpicLog(`But wait! ${superman.name} arrives on the scene! ${superman.speak()}`);
createEpicLog(`Meanwhile, across town, ${lexLuthor.name} ${lexLuthor.plotScheme().toLowerCase()}`);
createEpicLog(`Never fear! ${wonderWoman.name} is here! ${wonderWoman.useSpecialPower()}`);