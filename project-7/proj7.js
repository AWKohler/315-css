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
    
    // FORM VALIDATION FOR SIGN-UP PAGE
    
    // Check if we're on the account page by checking for the form
    const signupForm = document.getElementById('form');
    
    if (signupForm) {
        console.info('Sign-up form detected - initializing validation');
        
        // Prevent default form submission and use our validation instead
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            validateForm();
        });
        
        // Replace the existing Calculate button click with our validation
        const submitButton = signupForm.querySelector('button');
        if (submitButton) {
            submitButton.textContent = 'Submit'; // Change button text from 'Calculate' to 'Submit'
            submitButton.onclick = function(event) {
                event.preventDefault();
                validateForm();
                return false;
            };
        }
        
        /**
         * Main validation function for the entire form
         */
        function validateForm() {
            console.info('Validating form...');
            let isValid = true;
            let errorMessages = [];
            
            try {
                // Using forms collection as required
                const form = document.forms[0];
                
                // Validate Full Name (no numbers or special characters)
                const nameRegex = /^[A-Za-z\s]+$/;
                const fullName = form.name.value.trim();
                if (!fullName) {
                    errorMessages.push('Full Name is required');
                    isValid = false;
                    console.warn('Full Name validation failed - empty field');
                } else if (!nameRegex.test(fullName)) {
                    errorMessages.push('Full Name should contain only letters and spaces');
                    isValid = false;
                    console.warn('Full Name validation failed - contains invalid characters');
                }
                
                // Validate Username (6-15 chars, alphanumeric, can't start with number)
                const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{5,14}$/;
                const username = form.username.value.trim();
                if (!username) {
                    errorMessages.push('Username is required');
                    isValid = false;
                    console.warn('Username validation failed - empty field');
                } else if (!usernameRegex.test(username)) {
                    errorMessages.push('Username must be 6-15 characters, only letters and numbers, and cannot start with a number');
                    isValid = false;
                    console.warn('Username validation failed - format incorrect');
                }
                
                // Validate Email
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const email = form.email.value.trim();
                if (!email) {
                    errorMessages.push('Email is required');
                    isValid = false;
                    console.warn('Email validation failed - empty field');
                } else if (!emailRegex.test(email)) {
                    errorMessages.push('Please enter a valid email address (e.g., user@example.com)');
                    isValid = false;
                    console.warn('Email validation failed - invalid format');
                }
                
                // Validate Password (8-20 chars, uppercase, lowercase, digit, special char)
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
                const password = form.password.value;
                if (!password) {
                    errorMessages.push('Password is required');
                    isValid = false;
                    console.warn('Password validation failed - empty field');
                } else if (!passwordRegex.test(password)) {
                    errorMessages.push('Password must be 8-20 characters, and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)');
                    isValid = false;
                    console.warn('Password validation failed - does not meet requirements');
                }
                
                // Validate Confirm Password
                const confirmPassword = form.confirm.value;
                if (password !== confirmPassword) {
                    errorMessages.push('Passwords do not match');
                    isValid = false;
                    console.warn('Confirm Password validation failed - passwords don\'t match');
                }
                
                // Validate Phone Number (using our existing regex for 10 digits)
                const phoneRegex = /^\d{10}$/;
                const phone = form.phone.value.trim();
                if (!phone) {
                    errorMessages.push('Phone Number is required');
                    isValid = false;
                    console.warn('Phone validation failed - empty field');
                } else if (!phoneRegex.test(phone)) {
                    errorMessages.push('Phone Number must be exactly 10 digits');
                    isValid = false;
                    console.warn('Phone validation failed - invalid format');
                }
                
                // Validate Date of Birth (must be at least 18 years old)
                const birthDate = new Date(form.birthDate.value);
                const today = new Date();
                const eighteenYearsAgo = new Date();
                eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
                
                if (!form.birthDate.value) {
                    errorMessages.push('Date of Birth is required');
                    isValid = false;
                    console.warn('Date of Birth validation failed - empty field');
                } else if (birthDate > eighteenYearsAgo) {
                    errorMessages.push('You must be at least 18 years old to register');
                    isValid = false;
                    console.warn('Date of Birth validation failed - under 18');
                }
                
                // Validate Agree to Terms checkbox
                if (!form.agree.checked) {
                    errorMessages.push('You must agree to the terms and conditions');
                    isValid = false;
                    console.warn('Terms agreement validation failed - not checked');
                }
                
                // If validation passes, show success and "submit" the form
                if (isValid) {
                    // Clear any previous error messages
                    clearValidationErrors();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Registration successful! Thank you for signing up.';
                    successMessage.style.color = 'green';
                    successMessage.style.padding = '10px';
                    successMessage.style.marginTop = '10px';
                    successMessage.style.backgroundColor = '#e8f5e9';
                    successMessage.style.border = '1px solid #a5d6a7';
                    successMessage.style.borderRadius = '4px';
                    
                    // Add success message after the form
                    signupForm.after(successMessage);
                    
                    console.info('Form validation successful');
                    
                    // Normally we would submit the form here
                    // form.submit();
                } else {
                    // Display validation errors
                    displayValidationErrors(errorMessages);
                    console.error('Form validation failed with', errorMessages.length, 'errors');
                }
                
            } catch (error) {
                // Exception handling for any unexpected errors
                console.error('Exception occurred during form validation:', error);
                errorMessages.push('An unexpected error occurred. Please try again later.');
                displayValidationErrors(errorMessages);
            }
        }
        
        /**
         * Display validation errors on the page
         */
        function displayValidationErrors(errors) {
            // Clear any previous error messages
            clearValidationErrors();
            
            // Create error message container
            const errorContainer = document.createElement('div');
            errorContainer.className = 'validation-errors';
            errorContainer.style.color = '#d32f2f';
            errorContainer.style.backgroundColor = '#ffebee';
            errorContainer.style.padding = '10px';
            errorContainer.style.marginTop = '10px';
            errorContainer.style.border = '1px solid #ef9a9a';
            errorContainer.style.borderRadius = '4px';
            
            // Add heading
            const heading = document.createElement('h3');
            heading.textContent = 'Please correct the following issues:';
            heading.style.margin = '0 0 10px 0';
            errorContainer.appendChild(heading);
            
            // Create list of errors
            const errorList = document.createElement('ul');
            errorList.style.margin = '0';
            errorList.style.paddingLeft = '20px';
            
            errors.forEach(error => {
                const listItem = document.createElement('li');
                listItem.textContent = error;
                errorList.appendChild(listItem);
            });
            
            errorContainer.appendChild(errorList);
            
            // Add error container after the form
            signupForm.after(errorContainer);
        }
        
        /**
         * Clear all validation error messages
         */
        function clearValidationErrors() {
            // Remove any existing error messages
            const existingErrors = document.querySelector('.validation-errors');
            if (existingErrors) {
                existingErrors.remove();
            }
            
            // Remove any existing success messages
            const existingSuccess = document.querySelector('.success-message');
            if (existingSuccess) {
                existingSuccess.remove();
            }
        }
    }
    
    // LIGHTBOX FUNCTIONALITY
    
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