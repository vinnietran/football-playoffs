document.addEventListener('DOMContentLoaded', function() {
    fetchLeaderboardData();
});

function fetchLeaderboardData() {
    const apiUrl = CONFIG.apiUrl;
    const action = 'getAllTeamsRosterAndScores';

    const spinner = document.getElementById('spinner');
    const leaderboardTable = document.getElementById('leaderboard-table');

    // Show the spinner
    spinner.style.display = 'block';


    fetch(`${apiUrl}?action=${encodeURIComponent(action)}`)
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none';
            leaderboardTable.style.display = 'table';
            displayLeaderboard(data);
        })
        .catch(error => console.error('Error fetching leaderboard data:', error));
}


// function displayLeaderboard(teamScores) {
//     const leaderboardTable = document.getElementById('leaderboard-table-body');
//     leaderboardTable.innerHTML = ''; // Clear existing content

//     teamScores.sort((a, b) => b.score - a.score);

//     teamScores.forEach((team, index) => {
//         const row = leaderboardTable.insertRow();
//         const rankCell = row.insertCell(0);
//         const teamNameCell = row.insertCell(1);
//         const scoreCell = row.insertCell(2);

//         rankCell.textContent = index + 1;  // Rank
//         scoreCell.textContent = team.score; // Score

//         // Create a hyperlink or button for the team name
//         const teamLink = document.createElement('a');
//         teamLink.textContent = team.teamName;
//         teamLink.href = `roster.html?teamName=${encodeURIComponent(team.teamName)}`;
//         teamLink.addEventListener('click', function() {
//             fetchTeamRoster(team.teamName);
//         });
//         teamNameCell.appendChild(teamLink);
//     });
// }

function displayLeaderboard(teamScores) {
    const leaderboardTable = document.getElementById('leaderboard-table-body');
    leaderboardTable.innerHTML = ''; // Clear existing content

    teamScores.sort((a, b) => b.score - a.score);

    let currentRank = 1;
    let previousScore = null;
    let teamsWithSameScore = 1; // Counter for teams with the same score

    teamScores.forEach((team, index) => {
        if (team.score !== previousScore) {
            // Update the rank only if the score is different
            currentRank = index + 1;
            teamsWithSameScore = 1;
        } else {
            // Increment counter for teams with the same score
            teamsWithSameScore++;
        }

        const row = leaderboardTable.insertRow();
        const rankCell = row.insertCell(0);
        const teamNameCell = row.insertCell(1);
        const scoreCell = row.insertCell(2);

        rankCell.textContent = currentRank; // Assign the current rank
        scoreCell.textContent = team.score; // Score

        // Create a hyperlink for the team name
        const teamLink = document.createElement('a');
        teamLink.textContent = team.teamName;
        teamLink.href = `roster.html?teamName=${encodeURIComponent(team.teamName)}`;
        teamNameCell.appendChild(teamLink);

        previousScore = team.score; // Update the previous score
    });
}


