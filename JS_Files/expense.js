document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expenseForm');
    const expenseRecords = document.getElementById('expenseRecords');
    const userId = localStorage.getItem('currentUser');

    // Check if user is logged in
    if (!userId) {
        alert('You need to log in first.');
        window.location.href = 'login.html'; // Redirect to login page if not logged in
        return;
    }

    // Load expense data for the logged-in user
    function loadExpenses() {
        const userExpenses = JSON.parse(localStorage.getItem(`expenses_${userId}`)) || [];
        expenseRecords.innerHTML = ''; // Clear existing rows
        userExpenses.forEach(expense => {
            const newRow = document.createElement('tr');
            
            const dataCategory = document.createElement('td');
            dataCategory.textContent = expense.category;
            newRow.appendChild(dataCategory);
            
            const dataAmount = document.createElement('td');
            dataAmount.textContent = expense.amount;
            newRow.appendChild(dataAmount);
            
            const dataDate = document.createElement('td');
            dataDate.textContent = expense.date;
            newRow.appendChild(dataDate);
            
            expenseRecords.appendChild(newRow);
        });
    }

    // Load expenses on page load
    loadExpenses();

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = document.getElementById('expense-category').value.trim();
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const date = document.getElementById('expense-date').value;

        if (category === '' || !isNaN(category)) {
            alert('Please enter a valid category.');
            return;
        }
        if (isNaN(amount) || amount < 0.01) {
            alert('Please enter a valid amount.');
            return;
        }

        const [year, month, day] = date.split('-');
        const formattedDate = `${day}-${month}-${year}`;

        const newExpense = { category, amount, date: formattedDate };

        // Save the data to localStorage
        const userExpenses = JSON.parse(localStorage.getItem(`expenses_${userId}`)) || [];
        userExpenses.push(newExpense);
        localStorage.setItem(`expenses_${userId}`, JSON.stringify(userExpenses));

        // Add the new expense to the table
        const newRow = document.createElement('tr');

        const dataCategory = document.createElement('td');
        dataCategory.textContent = category;
        newRow.appendChild(dataCategory);

        const dataAmount = document.createElement('td');
        dataAmount.textContent = amount;
        newRow.appendChild(dataAmount);

        const dataDate = document.createElement('td');
        dataDate.textContent = formattedDate;
        newRow.appendChild(dataDate);

        expenseRecords.appendChild(newRow);

        // Reset the form
        form.reset();
    });
});
