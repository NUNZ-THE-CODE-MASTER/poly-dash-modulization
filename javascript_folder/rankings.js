document.addEventListener('DOMContentLoaded', () => {
    // Save the user's score to localStorage
    function saveScore(username, score) {
        let scores = JSON.parse(localStorage.getItem('userScores')) || [];
        scores.push({ user: username, score: score });
        localStorage.setItem('userScores', JSON.stringify(scores));
    }

    // Retrieve and return the top 10 scores
    function getTopScores() {
        let scores = JSON.parse(localStorage.getItem('userScores')) || [];
        scores.sort((a, b) => b.score - a.score); // Sort descending by score
        return scores.slice(0, 10); // Get the top 10 scores
    }

    // Populate the ranking table with top scores
    function displayTopScores() {
        let topScores = getTopScores();
        let tableBody = document.getElementById('RankingsTableBody');

        // Clear the existing rows
        tableBody.innerHTML = '';

        // Add new rows for top scores
        topScores.forEach((score, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.user}</td>
                <td>${score.score}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    const username = "Player1";  // Replace with actual player's name
    const score = 120;           // Replace with actual score

    // Call the saveScore function to save the score
    saveScore(username, score);

    // Display the top scores when the page loads
    displayTopScores();
   
});
