// income.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('incomeForm');
    const incomeRecords = document.getElementById('incomeRecords');
    const userId = localStorage.getItem('currentUser');

    // Check if user is logged in
    if (!userId) {
        alert('You need to log in first.');
        window.location.href = 'login.html'; // Redirect to login page if not logged in
        return;
    }

    // Load income data for the logged-in user
    function loadIncome() {
        const userIncome = JSON.parse(localStorage.getItem(`income_${userId}`)) || [];
        incomeRecords.innerHTML = ''; // Clear existing rows
        userIncome.forEach(income => {
            const newRow = document.createElement('tr');
            
            const dataSource = document.createElement('td');
            dataSource.textContent = income.source;
            newRow.appendChild(dataSource);
            
            const dataAmount = document.createElement('td');
            dataAmount.textContent = income.amount;
            newRow.appendChild(dataAmount);
            
            const dataDate = document.createElement('td');
            dataDate.textContent = income.date;
            newRow.appendChild(dataDate);
            
            incomeRecords.appendChild(newRow);
        });
    }

    // Load income on page load
    loadIncome();

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const source = document.getElementById('income-source').value.trim();
        const amount = parseFloat(document.getElementById('income-amount').value);
        const date = document.getElementById('income-date').value;

        if (amount <= 0 || isNaN(amount)) {
            alert('Enter a valid amount');
            return;
        }
        if (source === '' || !isNaN(source)) {
            alert('Enter a valid source');
            return;
        }

        const [year, month, day] = date.split('-');
        const formattedDate = `${day}-${month}-${year}`;

        const newIncome = { source, amount, date: formattedDate };

        // Save the data to localStorage
        const userIncome = JSON.parse(localStorage.getItem(`income_${userId}`)) || [];
        userIncome.push(newIncome);
        localStorage.setItem(`income_${userId}`, JSON.stringify(userIncome));

        // Add the new income to the table
        const newRow = document.createElement('tr');

        const dataSource = document.createElement('td');
        dataSource.textContent = source;
        newRow.appendChild(dataSource);

        const dataAmount = document.createElement('td');
        dataAmount.textContent = amount;
        newRow.appendChild(dataAmount);

        const dataDate = document.createElement('td');
        dataDate.textContent = formattedDate;
        newRow.appendChild(dataDate);

        incomeRecords.appendChild(newRow);

        // Reset the form
        form.reset();
    });
});
