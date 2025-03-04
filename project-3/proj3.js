document.addEventListener("DOMContentLoaded", function() {
  // Array of grades
  let grades = [85, 92, 78, 90, 62];

  // Initialize variables for total, highest, and lowest grade
  let total = 0;
  let highestGrade = grades[0];
  let lowestGrade = grades[0];

  // For loop to calculate total grades and determine highest and lowest scores
  for (let i = 0; i < grades.length; i++) {
    total += grades[i];
    
    // Determine highest grade
    if (grades[i] > highestGrade) {
      highestGrade = grades[i];
    }
    
    // Determine lowest grade
    if (grades[i] < lowestGrade) {
      lowestGrade = grades[i];
    }
  }

  // Calculate the average grade
  let average = total / grades.length;

  // Determine letter grade based on average using if/else if
  let letterGrade = '';
  if (average >= 90) {
    letterGrade = 'A';
  } else if (average >= 80) {
    letterGrade = 'B';
  } else if (average >= 70) {
    letterGrade = 'C';
  } else if (average >= 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
  }

  // Generate a performance message based on the average grade using if/else statements
  let performanceMessage = '';
  if (average >= 90) {
    performanceMessage = 'Excellent work! You are acing your grades!';
  } else if (average >= 80) {
    performanceMessage = 'Great job! Keep up the good work!';
  } else if (average >= 70) {
    performanceMessage = 'Not bad, but there\'s room for improvement.';
  } else if (average >= 60) {
    performanceMessage = 'You passed, but consider extra study time.';
  } else {
    performanceMessage = 'Needs improvement! Don\'t give up, keep trying!';
  }

  // Use a switch statement to provide additional feedback based on the letter grade
  let additionalFeedback = '';
  switch(letterGrade) {
    case 'A':
      additionalFeedback = 'Outstanding performance!';
      break;
    case 'B':
      additionalFeedback = 'Very good! A little more effort and you could be top of the class.';
      break;
    case 'C':
      additionalFeedback = 'Good, but there is potential to improve.';
      break;
    case 'D':
      additionalFeedback = 'You passed, but consider seeking help for a better understanding.';
      break;
    case 'F':
      additionalFeedback = 'Failing grade. It\'s time to re-evaluate your study habits.';
      break;
    default:
      additionalFeedback = 'Invalid grade.';
      break;
  }

  // Display the results on the console
  console.log('Grades:', grades);
  console.log('Total Grades:', total);
  console.log('Average Grade:', average.toFixed(2));
  console.log('Letter Grade:', letterGrade);
  console.log('Highest Grade:', highestGrade);
  console.log('Lowest Grade:', lowestGrade);
  console.log('Performance Message:', performanceMessage);
  console.log('Additional Feedback:', additionalFeedback);

  // Display in html
  let outputDiv = document.getElementById('output');
  if (outputDiv) {
    outputDiv.innerHTML = `
      <h2>Grade Tracker Results</h2>
      <p><strong>Grades:</strong> ${grades.join(', ')}</p>
      <p><strong>Total:</strong> ${total}</p>
      <p><strong>Average:</strong> ${average.toFixed(2)}</p>
      <p><strong>Letter Grade:</strong> ${letterGrade}</p>
      <p><strong>Highest Grade:</strong> ${highestGrade}</p>
      <p><strong>Lowest Grade:</strong> ${lowestGrade}</p>
      <p><strong>Performance:</strong> ${performanceMessage}</p>
      <p><strong>Feedback:</strong> ${additionalFeedback}</p>
    `;
  }
});
