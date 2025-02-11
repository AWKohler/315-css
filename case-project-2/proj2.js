document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault()
});

function calculateAge() {
    let name = document.getElementById("name").value;
    let birthDate = document.getElementById("birthYear").value; // Get full date string (YYYY-MM-DD)

    if (!name || !birthDate) {
        document.getElementById("result").innerText = "Please enter a valid name and birth date.";
        document.getElementById("message").innerText = "";
        return;
    }

    console.log("User Input:");
    console.log(`Name: ${name}`);
    console.log(`Birth Date: ${birthDate}`);

    let birthYear = new Date(birthDate).getFullYear(); // Extract year from date
    let currentYear = new Date().getFullYear();
    let age = currentYear - birthYear;
    let ageInMonths = age * 12;


    if (birthYear > currentYear) {
        document.getElementById("result").innerText = "Error: Birth year cannot be in the future.";
        console.warn("Validation Warning: User entered a future birth year.");
        return;
    }

    console.log(`Calculated Age: ${age} years`);
    console.log(`Calculated Age in Months: ${ageInMonths} months`);


    document.getElementById("result").innerText = `${name}, you are approximately ${ageInMonths} months old!`;

    displayMessage(name);
}

function displayMessage(name) {
    const messages = [
        "Keep pushing forward, great things are coming!",
        "Every day is a new opportunity to shine!",
        "Believe in yourself and all that you are!",
        "Your potential is limitless!"
    ];
    let randomMessage = messages[Math.floor(Math.random() * messages.length)];
    console.log(`Displayed Message: ${randomMessage}`);
    document.getElementById("message").innerText = `${name}, ${randomMessage}`;
}