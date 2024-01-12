document.addEventListener('DOMContentLoaded', function() {
    // Replace with your actual web app URL and the team name you want to query
    const apiUrl = CONFIG.apiUrl;
    const teamName = 'Vinnie'; // You can dynamically set this based on user input or URL parameters

    fetchRosterData(apiUrl, teamName);
});

function fetchRosterData(apiUrl, teamName) {
    console.log("fetching ...")
    const url = `${apiUrl}?action=getRosterAndScores&teamName=${encodeURIComponent(teamName)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Data received:', data); // Log the data to see its structure
            populateRosterTable(data, teamName); // Directly pass the data to populateRosterTable
        })
        .catch(error => console.error('Error fetching roster data:', error));
}


function populateRosterTable(roster, teamName) {
    console.log(roster)
    const tableBody = document.getElementById('roster-table-body');
    const playerName = document.getElementById('player-name');
    playerName.textContent = `${teamName}'s Team`;
    const totalScoreElement = document.getElementById('total-score');

    let totalScore = 0;

    roster.forEach(player => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = player.position; // Player Position
        row.insertCell(1).textContent = player.player;   // Player Name
        row.insertCell(2).textContent = player.wc;  // Player Score
        row.insertCell(3).textContent = player.div; 
        row.insertCell(4).textContent = player.champ;   
        row.insertCell(5).textContent = player.sb;
        row.insertCell(6).textContent = player.score;    // Player Score
        row.insertCell(7).textContent = player.team;     // Player Team

        totalScore += parseInt(player.score, 10) || 0;   // Add player's score to total
    });

    totalScoreElement.textContent = `Total Score: ${totalScore}`;
}

