// startbutton 

// Wait until the DOM is fully loaded  
document.addEventListener("DOMContentLoaded", function () {  
    // Get the start game button  
    const startGameBtn = document.getElementById("startGameBtn");  

    // Add click event listener to the button  
    startGameBtn.addEventListener("click", function () {  
        // Redirect to game.html  
        window.location.href = "../html_folder/game.html";  
    });  
});