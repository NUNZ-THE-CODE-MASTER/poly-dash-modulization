document.addEventListener('DOMContentLoaded', () => {  
    const loginForm = document.getElementById('loginForm');  
    const feedbackPara = document.getElementById('feedback'); // Element for showing feedback messages

    // Clear fields on page load
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    //  Prevent browser autofill suggestions for security
    document.getElementById('username').setAttribute('autocomplete', 'off');
    document.getElementById('password').setAttribute('autocomplete', 'off');

    // Password Show/Hide functionality
    const passwordField = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const type = passwordField.type === 'password' ? 'text' : 'password';
            passwordField.type = type;
            toggleButton.classList.toggle('fa-eye'); // Toggles the eye icon
        });
    }

    // Handle form submission
    loginForm.addEventListener('submit', (event) => {  
        event.preventDefault(); // Prevent form submission  

        const username = document.getElementById('username').value.trim();  
        const password = document.getElementById('password').value.trim();  

        // Validate user input  
        if (!username || !password) {  
            feedbackPara.innerHTML = 'Please fill in all fields.';  
            feedbackPara.style.color = 'red';
            return;  
        }  

        // Get users data from Local Storage
        const storedUsersData = JSON.parse(localStorage.getItem('users'));  

        // Check credentials against Local Storage  
        if (storedUsersData) {  
            const user = storedUsersData.find(user => user.username === username && user.password === password);

            if (user) {  
                feedbackPara.innerHTML = "Login successful! Redirecting to homepage...";
                feedbackPara.style.color = 'green';
                console.log("Login Successful!");
                console.log("User:", user);

                loginForm.reset(); // Clear the form

                // Redirect to the index page after a short delay
                setTimeout(() => {  
                    window.location.href = 'index.html'; // Ensure this path matches your actual index page path  
                }, 2000); // Redirect after 2 seconds
            } else {  
                feedbackPara.innerHTML = 'Invalid username or password. Please try again.';  
                feedbackPara.style.color = 'red';
            }  
        } else {  
            feedbackPara.innerHTML = 'No user data found. Please register first.';  
            feedbackPara.style.color = 'red';
        }  

        // Update user's score in local storage
        function updateUserScore(username, newScore) {
        const storedUsersData = JSON.parse(localStorage.getItem('users')) || [];
  
    // Find the user and update their score
        const userIndex = storedUsersData.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        storedUsersData[userIndex].score = newScore;
        localStorage.setItem('users', JSON.stringify(storedUsersData));
    }
  }
    });  
});
