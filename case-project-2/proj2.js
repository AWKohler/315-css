document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault()
});

function calculateAge() {
    let name = document.getElementById("name").value;
    // Expecting a full date string (YYYY-MM-DD) from the input
    let birthDateInput = document.getElementById("birthYear").value;

    if (!name || !birthDateInput) {
        document.getElementById("result").innerText = "Please enter a valid name and birth date.";
        document.getElementById("message").innerText = "";
        return;
    }

    // Parse the input date and get today's date
    let birthDate = new Date(birthDateInput);
    let today = new Date();

    console.log("User Input:");
    console.log(`Name: ${name}`);
    console.log(`Birth Date: ${birthDate.toDateString()}`);

    // Validate that the birth date is not in the future
    if (birthDate > today) {
        document.getElementById("result").innerText = "Error: Birth date cannot be in the future.";
        console.warn("Validation Warning: User entered a future birth date.");
        return;
    }

    // Calculate age in years
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    // If the birthday hasn't occurred yet this year, subtract one year
    if (today.getMonth() < birthDate.getMonth() || 
       (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        ageYears--;
    }

    // Calculate the total age in months
    let monthsDifference = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
    // If today's day is less than the birth day, subtract one month from the total
    if (today.getDate() < birthDate.getDate()) {
        monthsDifference--;
    }

    console.log(`Calculated Age: ${ageYears} years`);
    console.log(`Calculated Age in Months: ${monthsDifference} months`);

    document.getElementById("result").innerText = `${name}, you are approximately ${monthsDifference} months old!`;

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