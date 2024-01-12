document.addEventListener('DOMContentLoaded', function() {
    fetchLeaderboardData();
});

function fetchLeaderboardData() {
    const apiUrl = CONFIG.apiUrl;
    const action = 'getAllTeamsRosterAndScores';

    fetch(`${apiUrl}?action=${encodeURIComponent(action)}`)
        .then(response => response.json())
        .then(data => {
            displayLeaderboard(data);
        })
        .catch(error => console.error('Error fetching leaderboard data:', error));
}

// function displayLeaderboard(teamScores) {
//     const leaderboardTable = document.getElementById('leaderboard-table-body');
//     leaderboardTable.innerHTML = ''; // Clear existing content

//     // Sort the teams by score in descending order
//     teamScores.sort((a, b) => b.score - a.score);

//     let currentRank = 0;
//     let previousScore = -1;
//     let teamsAtCurrentScore = 0;

//     teamScores.forEach((team, index) => {
//         if (team.score !== previousScore) {
//             // New score, so update the rank
//             currentRank += 1 + teamsAtCurrentScore;
//             teamsAtCurrentScore = 0;
//         } else {
//             // Same score as previous, so it's a tie
//             teamsAtCurrentScore++;
//         }

//         previousScore = team.score;

//         // Create a new row for each team
//         const row = leaderboardTable.insertRow();
//         row.insertCell(0).textContent = currentRank;       // Rank
//         row.insertCell(1).textContent = team.teamName;    // Team Name
//         row.insertCell(2).textContent = team.score;       // Score
//     });
// }

function displayLeaderboard(teamScores) {
    const leaderboardTable = document.getElementById('leaderboard-table-body');
    leaderboardTable.innerHTML = ''; // Clear existing content

    teamScores.sort((a, b) => b.score - a.score);

    teamScores.forEach((team, index) => {
        const row = leaderboardTable.insertRow();
        const rankCell = row.insertCell(0);
        const teamNameCell = row.insertCell(1);
        const scoreCell = row.insertCell(2);

        rankCell.textContent = index + 1;  // Rank
        scoreCell.textContent = team.score; // Score

        // Create a hyperlink or button for the team name
        const teamLink = document.createElement('a');
        teamLink.textContent = team.teamName;
        teamLink.href = `roster.html?teamName=${encodeURIComponent(team.teamName)}`;
        teamLink.addEventListener('click', function() {
            fetchTeamRoster(team.teamName);
        });
        teamNameCell.appendChild(teamLink);
    });
}

