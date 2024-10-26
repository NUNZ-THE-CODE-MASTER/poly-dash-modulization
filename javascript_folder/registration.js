document.addEventListener('DOMContentLoaded', () => {  
    const registrationForm = document.getElementById('registrationForm');  
    const feedbackPara = document.getElementById('feedback');  
    const phoneCodeSelect = document.getElementById('phone-code');  

    // Password regex to check for upper case, lower case, digits, and minimum length  
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$");  

    // List of country codes  
    const countryCodes = [  
        { code: '+1', name: 'USA' },  
        { code: '+44', name: 'UK' },  
        { code: '+230', name: 'Mauritius' },  
        { code: '+81', name: 'Japan' },  
        { code: '+49', name: 'Germany' },  
        { code: '+61', name: 'Australia' },  
        { code: '+33', name: 'France' },  
        { code: '+256', name: 'Uganda' },  
        { code: '+39', name: 'Italy' }  
    ];  

    // Populate the dropdown with country codes  
    countryCodes.forEach(country => {  
        const option = document.createElement('option');  
        option.value = country.code;  
        option.textContent = `${country.code} (${country.name})`;  
        phoneCodeSelect.appendChild(option);  
    });  

    registrationForm.addEventListener('submit', (event) => {  
        event.preventDefault(); // Prevent the default form submission   

        // Get the input values  
        const username = document.getElementById('username').value;  
        const email = document.getElementById('email').value;  
        const password = document.getElementById('password').value;  
        const confirmPassword = document.getElementById('confirm-password').value;  
        const phoneCode = document.getElementById('phone-code').value;  
        const phone = document.getElementById('phone').value;  
        const address = document.getElementById('address').value;  

        // Clear previous feedback messages  
        clearFeedback();  

        // Validate the inputs  
        if (validateForm(username, email, password, confirmPassword, phoneCode, phone, address)) {  
            const userData = {  
                username,  
                email,  
                password,  
                phone: `${phoneCode}${phone}`,  
                address  
            };  

            // Get existing users from local storage 
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];  
            existingUsers.push(userData); // Add the new user 
            localStorage.setItem('users', JSON.stringify(existingUsers)); // Save updated users list 
            console.log("Form Submitted Successfully!");  
            console.log("User Data:", userData); 

            // Show a success message  
            feedbackPara.innerHTML = "Registration successful! Redirecting to login...";  
            console.log("Form Submitted Successfully!");  
            console.log("User Data:", userData);  

            registrationForm.reset();  
            
            // Redirect to the login page after a delay  
            setTimeout(() => {  
                window.location.href = 'login.html'; // Ensure this path matches your actual login page path  
            }, 2000); // Redirect after 2 seconds  
        }  
    });  

    // Add event listeners for real-time validation  
    document.getElementById('username').addEventListener('input', function () {  
        const username = this.value;  
        clearFeedback();  

        if (username.trim() === '' || username.length < 3) {  
            showError('username', 'Username is required and must be at least 3 characters long.');  
        }  
    });  

    document.getElementById('email').addEventListener('input', function () {  
        const email = this.value;  
        clearFeedback();  

        if (email.trim() === '') {  
            showError('email', 'Email is required.');  
        } else if (!validateEmail(email)) {  
            showError('email', 'Please enter a valid email address.');  
        }  
    });  

    document.getElementById('password').addEventListener('input', function () {  
        const password = this.value;  
        clearFeedback();  

        if (!passwordRegex.test(password)) {  
            showError('password', "Password must contain at least 6 characters, including upper case, lower case, and digits.");  
        }  
    });  

    document.getElementById('confirm-password').addEventListener('input', function () {  
        const confirmPassword = this.value;  
        const password = document.getElementById('password').value;  
        clearFeedback();  

        if (password !== confirmPassword) {  
            showError('confirm-password', 'Passwords do not match.');  
        }  
    });  

    document.getElementById('phone').addEventListener('input', function () {  
        const phone = this.value;  
        clearFeedback();  

        if (!validatePhone(phone)) {  
            showError('phone', 'Please enter a valid phone number (digits only).');  
        }  
    });  

    document.getElementById('address').addEventListener('input', function () {  
        const address = this.value;  
        clearFeedback();  

        if (address.trim() === '' || address.length < 5) {  
            showError('address', 'Address is required and must be at least 5 characters long.');  
        }  
    });  

    function validateForm(username, email, password, confirmPassword,  phoneCode, phone, address) {  
        let isValid = true;  

        // Check if the username is valid  
        if (username.trim() === '' || username.length < 3) {  
            showError('username', 'Username is required and must be at least 3 characters long.');  
            isValid = false;  
        }  

        // Check if the email is valid  
        if (email.trim() === '') {  
            showError('email', 'Email is required.');  
            isValid = false;  
        } else if (!validateEmail(email)) {  
            showError('email', 'Please enter a valid email address.');  
            isValid = false;  
        }  

        // Check if password is secure  
        if (!passwordRegex.test(password)) {  
            showError('password', "Password must contain at least 6 characters, including upper case, lower case, and digits.");  
            isValid = false;  
        }  

        // Check if password and confirm password match  
        if (password !== confirmPassword) {  
            showError('confirm-password', 'Passwords do not match.');  
            isValid = false;  
        }  

        //Check if phone code is selected 
        if (phoneCode.trim() === '') {
            showError('phone-code', 'Please select a phone code.');
            isValid = false;
            }

        // Check if the phone number is valid  
        if (!validatePhone(phone)) {  
            showError('phone', 'Please enter a valid phone number (Enter 6 to 10 digits).');  
            isValid = false;  
        }  

        // Check if the address is provided  
        if (address.trim() === '' || address.length < 5) {  
            showError('address', 'Address is required and must be at least 5 characters long.');  
            isValid = false;  
        }  

        return isValid;  
    }  

    function validateEmail(email) {  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex  
        return emailRegex.test(email);  
    }  

    function validatePhone(phone) {  
        const phoneRegex = /^\d{6,10}$/; // Allows 6 to 10 digits  
        return phoneRegex.test(phone);  
    }  

    function showError(inputId, message) {  
        const inputElement = document.getElementById(inputId);  
        const errorSpan = document.createElement('span');  
        errorSpan.className = 'error-message'; // Apply styles as needed  
        errorSpan.innerText = message;  

        // Clear previous error messages  
        clearFeedback();  
        
        inputElement.classList.add('error'); // Add class to highlight the input  
        inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);  
        inputElement.focus(); // Set focus on the invalid input  
    }  

    function clearFeedback() {  
        const errorMessages = document.querySelectorAll('.error-message');  
        errorMessages.forEach(msg => msg.remove());  

        const inputs = registrationForm.querySelectorAll('input');  
        inputs.forEach(input => {  
            input.classList.remove('error'); // Remove error style  
        });  
    }  
});