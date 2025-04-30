// Superhero Class
class Superhero {
    constructor(name, power, strength, intelligence, catchphrase) {
        this.name = name;
        this.power = power;
        this.strength = strength;
        this.intelligence = intelligence;
        this.catchphrase = catchphrase;
        this.isHero = true;
        this.victories = 0;
    }
    
    useSpecialPower() {
        return `${this.name} uses ${this.power} to save the day!`;
    }
    
    rescueCivilian() {
        this.victories++;
        return `${this.name} successfully rescued civilians! Total rescues: ${this.victories}`;
    }
    
    speak() {
        return `${this.name} says: "${this.catchphrase}"`;
    }
}

// Villain Class
class Villain {
    constructor(name, power, evilPlan, minions, weakness) {
        this.name = name;
        this.power = power;
        this.evilPlan = evilPlan;
        this.minions = minions;
        this.weakness = weakness;
        this.isHero = false;
        this.schemes = 0;
    }
    
    useEvilPower() {
        return `${this.name} unleashes ${this.power} to wreak havoc!`;
    }
    
    plotScheme() {
        this.schemes++;
        return `${this.name} is plotting: ${this.evilPlan}! This is evil scheme #${this.schemes}`;
    }
    
    commandMinions() {
        return `${this.name} commands ${this.minions} minions to do their bidding!`;
    }
}

// Instantiate superheroes
const superman = new Superhero(
    "Superman", 
    "heat vision and super strength", 
    100, 
    90, 
    "Up, up and away!"
);

const wonderWoman = new Superhero(
    "Wonder Woman", 
    "Lasso of Truth", 
    95, 
    95, 
    "For Themyscira!"
);

// Instantiate villains
const joker = new Villain(
    "The Joker", 
    "chaos and unpredictability", 
    "turn Gotham's citizens against each other", 
    50, 
    "his obsession with Batman"
);

const lexLuthor = new Villain(
    "Lex Luthor", 
    "genius intellect and technology", 
    "control the world's economy", 
    200, 
    "his ego"
);

// Function appropriate for superheroes
function teamUp(hero1, hero2) {
    if (hero1.isHero && hero2.isHero) {
        return `${hero1.name} and ${hero2.name} join forces with their powers: ${hero1.power} and ${hero2.power}!`;
    } else {
        return "Only heroes can team up for good!";
    }
}

// Function appropriate for villains
function villainShowdown(villain1, villain2) {
    if (!villain1.isHero && !villain2.isHero) {
        return `${villain1.name} and ${villain2.name} face off! Who is the more evil villain?
        ${villain1.name} has ${villain1.minions} minions and ${villain2.name} has ${villain2.minions} minions.
        ${villain1.minions > villain2.minions ? villain1.name : villain2.name} has more minions and wins this round of villainy!`;
    } else {
        return "This showdown requires actual villains!";
    }
}

// Output to screen in a fun way
function displayHeroCard(hero) {
    console.log(`
    ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    ★                HERO CARD              ★
    ★                                       ★
    ★  Name: ${hero.name.padEnd(32, ' ')}★
    ★  Power: ${hero.power.padEnd(30, ' ')}★
    ★  Strength: ${hero.strength}                      ★
    ★  Intelligence: ${hero.intelligence}                   ★
    ★                                       ★
    ★  "${hero.catchphrase}"                ★
    ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    `);
}

function displayVillainCard(villain) {
    console.log(`
    ☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠
    ☠               VILLAIN CARD             ☠
    ☠                                        ☠
    ☠  Name: ${villain.name.padEnd(33, ' ')}☠
    ☠  Power: ${villain.power.padEnd(31, ' ')}☠
    ☠  Evil Plan: ${villain.evilPlan}        ☠
    ☠  Minions: ${villain.minions}                        ☠
    ☠  Weakness: ${villain.weakness}         ☠
    ☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠
    `);
}

// Display hero information
displayHeroCard(superman);
displayHeroCard(wonderWoman);

// Display villain information
displayVillainCard(joker);
displayVillainCard(lexLuthor);

// Show hero and villain in action
console.log("\n===== HEROES IN ACTION =====");
console.log(superman.useSpecialPower());
console.log(wonderWoman.rescueCivilian());
console.log(teamUp(superman, wonderWoman));

console.log("\n===== VILLAINS PLOTTING =====");
console.log(joker.useEvilPower());
console.log(lexLuthor.plotScheme());
console.log(villainShowdown(joker, lexLuthor));

// Epic hero vs villain narration
console.log("\n===== EPIC CONFRONTATION =====");
console.log(`The city is in chaos as ${joker.name} ${joker.useEvilPower().toLowerCase()}`);
console.log(`But wait! ${superman.name} arrives on the scene! ${superman.speak()}`);
console.log(`Meanwhile, across town, ${lexLuthor.name} ${lexLuthor.plotScheme().toLowerCase()}`);
console.log(`Never fear! ${wonderWoman.name} is here! ${wonderWoman.useSpecialPower()}`);