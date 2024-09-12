// Global Chart.js instances
let incomeExpenseChart, expenseBreakdownChart, savingsProgressChart;

// Function to initialize and render charts
function createCharts() {
    const ctxIncomeExpense = document.getElementById('income-expense').getContext('2d');
    const ctxExpenseBreakdown = document.getElementById('expense-breakdown').getContext('2d');
    const ctxSavingsProgress = document.getElementById('savings-progress').getContext('2d');

    if (incomeExpenseChart) incomeExpenseChart.destroy(); // Clear existing chart
    if (expenseBreakdownChart) expenseBreakdownChart.destroy(); // Clear existing chart
    if (savingsProgressChart) savingsProgressChart.destroy(); // Clear existing chart

    incomeExpenseChart = new Chart(ctxIncomeExpense, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Income vs Expenses',
                data: [
                    parseFloat(localStorage.getItem('totalIncome')) || 0,
                    parseFloat(localStorage.getItem('totalExpenses')) || 0
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    expenseBreakdownChart = new Chart(ctxExpenseBreakdown, {
        type: 'pie',
        data: {
            labels: ['Rent', 'Utilities', 'Food', 'Others'], // Example categories
            datasets: [{
                label: 'Expense Breakdown',
                data: [1200, 300, 450, 600], // Example data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    savingsProgressChart = new Chart(ctxSavingsProgress, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Example months
            datasets: [{
                label: 'Savings Progress',
                data: [100, 200, 300, 400, 500, 600], // Example data
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        }
    });
}

// Function to update local storage
function updateLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// Function to add income and update charts
function addIncome(amount) {
    let totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    totalIncome += amount;
    updateLocalStorage('totalIncome', totalIncome);
    createCharts(); // Re-render charts with updated data
}

// Function to add expense and update charts
function addExpense(amount) {
    let totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;
    totalExpenses += amount;
    updateLocalStorage('totalExpenses', totalExpenses);
    createCharts(); // Re-render charts with updated data
}

// Initialize charts on page load
document.addEventListener('DOMContentLoaded', () => {
    createCharts();
});

// Event listeners for adding income and expenses
document.getElementById('add-income').addEventListener('click', () => {
    const amount = parseFloat(prompt('Enter income amount:'));
    if (!isNaN(amount)) {
        addIncome(amount);
    }
});

document.getElementById('add-expenses').addEventListener('click', () => {
    const amount = parseFloat(prompt('Enter expense amount:'));
    if (!isNaN(amount)) {
        addExpense(amount);
    }
});
