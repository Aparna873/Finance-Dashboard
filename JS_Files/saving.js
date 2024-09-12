document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('savingsForm');
    const savingsRecords = document.getElementById('savingsRecords');
    const userId = localStorage.getItem('currentUser');

    // Check if user is logged in
    if (!userId) {
        alert('You need to log in first.');
        window.location.href = 'login.html'; // Redirect to login page if not logged in
        return;
    }

    // Load savings goals for the logged-in user
    function loadSavingsGoals() {
        const userGoals = JSON.parse(localStorage.getItem(`savings_${userId}`)) || [];
        savingsRecords.textContent = ''; // Clear existing rows
        userGoals.forEach(goal => {
            const newRow = document.createElement('tr');

            const goalNameCell = document.createElement('td');
            goalNameCell.textContent = goal.name;
            newRow.appendChild(goalNameCell);

            const goalAmountCell = document.createElement('td');
            goalAmountCell.textContent = goal.amount;
            newRow.appendChild(goalAmountCell);

            const goalDateCell = document.createElement('td');
            goalDateCell.textContent = goal.date;
            newRow.appendChild(goalDateCell);

            const goalProgressCell = document.createElement('td');
            goalProgressCell.textContent = goal.progress + '%'; // Progress is optional
            newRow.appendChild(goalProgressCell);

            savingsRecords.appendChild(newRow);
        });
    }

    // Load goals on page load
    loadSavingsGoals();

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('goal-name').value.trim();
        const amount = parseFloat(document.getElementById('goal-amount').value);
        const date = document.getElementById('goal-date').value;

        if (amount <= 0 || isNaN(amount)) {
            alert('Enter a valid target amount.');
            return;
        }

        if (name === '') {
            alert('Enter a valid goal name.');
            return;
        }

        // Format the date
        const [year, month, day] = date.split('-');
        const formattedDate = `${day}-${month}-${year}`;

        const newGoal = { name, amount, date: formattedDate, progress: 0 };

        // Save the data to localStorage
        const userGoals = JSON.parse(localStorage.getItem(`savings_${userId}`)) || [];
        userGoals.push(newGoal);
        localStorage.setItem(`savings_${userId}`, JSON.stringify(userGoals));

        // Add the new goal to the table
        const newRow = document.createElement('tr');

        const goalNameCell = document.createElement('td');
        goalNameCell.textContent = name;
        newRow.appendChild(goalNameCell);

        const goalAmountCell = document.createElement('td');
        goalAmountCell.textContent = amount;
        newRow.appendChild(goalAmountCell);

        const goalDateCell = document.createElement('td');
        goalDateCell.textContent = formattedDate;
        newRow.appendChild(goalDateCell);

        const goalProgressCell = document.createElement('td');
        goalProgressCell.textContent = '0%';
        newRow.appendChild(goalProgressCell);

        savingsRecords.appendChild(newRow);

        // Reset the form
        form.reset();
    });
});
