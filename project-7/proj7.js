// Array to store selected interests
let selectedInterests = [];

document.addEventListener('DOMContentLoaded', function() {
    // Setup for selections functionality
    const saveSelectionsBtn = document.getElementById('save-selections');
    const addCustomBtn = document.getElementById('add-custom');
    const selectionsList = document.getElementById('selections-list');
    const customInterestInput = document.getElementById('custom-interest');
    
    // Add custom interest
    if (addCustomBtn) {
        addCustomBtn.addEventListener('click', function() {
            const customValue = customInterestInput.value.trim();
            if (customValue) {
                // Create a virtual checkbox item so we can use the same process flow
                const customCheckbox = { value: customValue, checked: true };
                processSelection(customCheckbox);
                // Update the display immediately
                displaySelections();
                customInterestInput.value = '';
            }
        });
    }
    
    // Save checked interests
    if (saveSelectionsBtn) {
        saveSelectionsBtn.addEventListener('click', function() {
            // Clear previous selections
            selectedInterests = [];
            
            // Get all checked checkboxes
            const checkboxes = document.querySelectorAll('input[name="interest"]:checked');
            
            // Process each checked box
            checkboxes.forEach(checkbox => {
                processSelection(checkbox);
            });
            
            // Update the display
            displaySelections();
        });
    }
    
    /**
     * Process a selection and add it to the array if not already present
     */
    function processSelection(item) {
        if (item.checked && !selectedInterests.includes(item.value)) {
            selectedInterests.push(item.value);
        }
    }
    
    /**
     * Display the current selections in the list
     */
    function displaySelections() {
        if (!selectionsList) return;
        
        // Clear the current list
        selectionsList.innerHTML = '';
        
        // Populate with current selections
        selectedInterests.forEach(interest => {
            const li = document.createElement('li');
            li.textContent = interest;
            
            // Add remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
            removeBtn.addEventListener('click', function() {
                // Remove from array
                const index = selectedInterests.indexOf(interest);
                if (index > -1) {
                    selectedInterests.splice(index, 1);
                }
                
                // Uncheck the corresponding checkbox if it exists
                const checkbox = document.querySelector(`input[name="interest"][value="${interest}"]`);
                if (checkbox) {
                    checkbox.checked = false;
                }
                
                // Update display
                displaySelections();
            });
            
            li.appendChild(removeBtn);
            selectionsList.appendChild(li);
        });
    }
    
    // Regular Expression Validation
    
    const validatePhoneBtn = document.getElementById('validate-phone');
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    
    if (validatePhoneBtn && phoneInput) {
        validatePhoneBtn.addEventListener('click', function() {
            validatePhone();
        });
        
        // Also validate on input
        phoneInput.addEventListener('input', function() {
            // Clear error message when typing
            if (phoneError) phoneError.textContent = '';
        });
    }
    
    /**
     * Validate phone number using regex
     * Accepts: 10 digits (no formatting required)
     */
    function validatePhone() {
        if (!phoneInput || !phoneError) return;
        
        const phoneValue = phoneInput.value.trim();
        // Regex for exactly 10 digits (North American phone number format)
        const phoneRegex = /^\d{10}$/;
        
        if (phoneRegex.test(phoneValue)) {
            // Valid phone number - format it for display
            const formatted = formatPhoneNumber(phoneValue);
            phoneError.textContent = `Valid number: ${formatted}`;
            phoneError.style.color = 'green';
        } else {
            // Invalid phone number
            phoneError.textContent = 'Please enter exactly 10 digits';
            phoneError.style.color = 'red';
        }
    }
    
    /**
     * Format a 10-digit phone number as (XXX) XXX-XXXX
     */
    function formatPhoneNumber(phoneNumber) {
        const area = phoneNumber.substring(0, 3);
        const middle = phoneNumber.substring(3, 6);
        const last = phoneNumber.substring(6, 10);
        
        return `(${area}) ${middle}-${last}`;
    }
    
    // File Upload and Display
    
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const fileContentDisplay = document.getElementById('file-content-display');
    
    if (uploadButton && fileInput) {
        uploadButton.addEventListener('click', function() {
            if (fileInput.files.length === 0) {
                alert('Please select a file first.');
                return;
            }
            
            const file = fileInput.files[0];
            readFile(file);
        });
    }
    
    /**
     * Read the contents of a file and display it
     */
    function readFile(file) {
        if (!fileContentDisplay) return;
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const contents = e.target.result;
            fileContentDisplay.textContent = contents;
        };
        
        reader.onerror = function() {
            fileContentDisplay.textContent = 'Error reading file';
        };
        
        // Read the file as text
        reader.readAsText(file);
    }
    
    
    const gallery = document.querySelector('.gallery');
    const lightbox = document.querySelector('.lightbox');
    
    // Only run lightbox code if gallery exists on the page
    if (gallery && lightbox) {
        const lightboxImg = document.querySelector('.lightbox-img');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        let currentIndex = 0;
        
        // Open lightbox
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                currentIndex = parseInt(this.dataset.index);
                const imgSrc = this.querySelector('img').src;
                const caption = this.querySelector('.caption').textContent;
                
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
                
                // Prevent scrolling when lightbox is open
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        closeBtn.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Navigate through photos
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox();
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightbox();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightbox();
            }
        });
        
        function updateLightbox() {
            const item = galleryItems[currentIndex];
            const imgSrc = item.querySelector('img').src;
            const caption = item.querySelector('.caption').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption;
        }
    }
});