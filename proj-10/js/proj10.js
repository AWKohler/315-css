// Globals
let startTime;
let timerInterval;
let puzzleCompleted = false;
let bestTime = localStorage.getItem('bestTime') ? parseInt(localStorage.getItem('bestTime')) : null;

// Constants
const IMAGE_URL = 'images/puzzle.png';

const GRID_SIZE = 3;
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

const piecesContainer = document.getElementById('pieces-container');
const puzzleBoard = document.getElementById('puzzle-board');
const timerElement = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');
const successMessage = document.getElementById('success-message');
const completionTimeElement = document.getElementById('completion-time');
const bestTimeElement = document.getElementById('best-time');

// Update the best time displayed
function updateBestTimeDisplay() {
    if (bestTime) {
        bestTimeElement.textContent = formatTime(bestTime);
    } else {
        bestTimeElement.textContent = 'None yes';
    }
}

function initGame() {
    createPuzzleBoard();
    createPuzzlePieces();

    // Event listeners
    resetButton.addEventListener('click', resetGame);

    // Start time
    startTime();

    updateBestTimeDisplay();
}

// Crate with emply slots
function createPuzzleBoard() {
    puzzleBoard.innerHTML = '';

    // Draw the board
    for (let i = 0; i < TOTAL_PIECES; i++) {
        const slot = document.createElement('div');
        slot.className = 'puzzle-slot';
        slot.dataset.position = i;

        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('dragenter', handleDragEnter);
        slot.addEventListener('dragleave', handleDragLeave);

        puzzleBoard.appendChild(slot);
    }
}

function createPuzzlePieces() {
    piecesContainer.innerHTML = '';

    // Array of Shuffled pieces 
    const indices = Array.from({ length: TOTAL_PIECES }, (_, i) => i);
    shuffleArray(indices);

    // Create the pieces
    for (let i = 0; i < TOTAL_PIECES; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.draggable = true;

        // Original position
        const originalPosition = indices[i];
        piece.dataset.originalPosition = originalPosition;

        // Background position
        const row = Math.floor(originalPosition / GRID_SIZE);
        const col = originalPosition % GRID_SIZE;

        // apply background image
        piece.style.backgroundImage = `url(${IMAGE_URL})`;
        piece.style.backgroundPosition = `-${col * 150}px -${row * 150}px`;

        // Piece event listeners
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragend', handleDragEnd);

        piecesContainer.appendChild(piece);
    }
}

// Shuffle (credit: https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_random2)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Handle drag
function handleDragStart(e) {
    // Only allow dragging if the piece is not already correctly placed
    if (!this.classList.contains('piece-correct')) {
        this.classList.add('dragging');
        e.dataTransfer.setData('text/plain', this.dataset.originalPosition);
        
        // Set the drag image to be the element itself
        e.dataTransfer.effectAllowed = 'move';
    } else {
        // Prevent dragging if the piece is correctly placed
        e.preventDefault();
    }
}

// Handle drag end event
function handleDragEnd() {
    this.classList.remove('dragging');
}

// Handle drag over event
function handleDragOver(e) {
    // Allow dropping
    e.preventDefault();
}

// Handle drag enter event
function handleDragEnter(e) {
    e.preventDefault();
    // Only highlight if the slot is empty
    if (!this.classList.contains('filled')) {
        this.classList.add('highlight');
    }
}

// Handle drag leave event
function handleDragLeave() {
    this.classList.remove('highlight');
}

// Handle drop event
function handleDrop(e) {
    e.preventDefault();
    
    // Remove highlight
    this.classList.remove('highlight');
    
    // Only allow dropping if the slot is empty
    if (!this.classList.contains('filled')) {
        const piecePosition = e.dataTransfer.getData('text/plain');
        const slotPosition = this.dataset.position;
        
        // Get the dragged piece
        const draggedPiece = document.querySelector(`.puzzle-piece[data-original-position="${piecePosition}"]`);
        
        // Append the piece to the slot
        this.appendChild(draggedPiece);
        this.classList.add('filled');
        
        // Check if the piece is in the correct position
        if (piecePosition === slotPosition) {
            draggedPiece.classList.add('piece-correct');
        }
        
        // Check if puzzle is completed
        checkCompletion();
    }
}


// Check if the puzzle is completed
function checkCompletion() {
    const correctPieces = document.querySelectorAll('.piece-correct');
    
    if (correctPieces.length === TOTAL_PIECES && !puzzleCompleted) {
        puzzleCompleted = true;
        
        // Stop the timer
        clearInterval(timerInterval);
        
        // Calculate completion time
        const completionTime = Date.now() - startTime;
        
        // Update best time if needed
        if (!bestTime || completionTime < bestTime) {
            bestTime = completionTime;
            localStorage.setItem('bestTime', bestTime);
        }
        
        // Show success message
        completionTimeElement.textContent = formatTime(completionTime);
        updateBestTimeDisplay();
        successMessage.classList.remove('hidden');
    }
}

// Start the timer
function startTimer() {
    // Reset timer
    puzzleCompleted = false;
    startTime = Date.now();
    
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Update timer every second
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        timerElement.textContent = formatTime(elapsedTime);
    }, 1000);
}

// Format time in MM:SS format
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Reset the game
function resetGame() {
    // Hide success message
    successMessage.classList.add('hidden');
    
    // Recreate puzzle
    createPuzzleBoard();
    createPuzzlePieces();
    
    // Reset and restart timer
    startTimer();
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', initGame);



// Harder than I thought it would be lol