// Function to handle opening and closing the authentication card
document.getElementById('openAuthButton').addEventListener('click', () => {
    document.getElementById('authOverlay').style.display = 'flex';
});

document.getElementById('closeSign').addEventListener('click', () => {
    document.getElementById('authOverlay').style.display = 'none';
    resetForm();
});

// Toggle between login and registration modes
document.getElementById('toggleButton').addEventListener('click', () => {
    const authTitle = document.getElementById('authTitle');
    const submitButton = document.getElementById('submitButton');
    const emailGroup = document.getElementById('emailGroup');

    if (authTitle.textContent === 'Login') {
        authTitle.textContent = 'Register';
        submitButton.textContent = 'Register';
        emailGroup.style.display = 'block';
        document.getElementById('toggleButton').textContent = 'Switch to Login';
    } else {
        authTitle.textContent = 'Login';
        submitButton.textContent = 'Login';
        emailGroup.style.display = 'none';
        document.getElementById('toggleButton').textContent = 'Switch to Register';
    }
});

// Handle form submission for login or registration
document.getElementById('authForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value; 
    const authTitle = document.getElementById('authTitle').textContent;
    
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};

    if (authTitle === 'Login') {
        // Handle login logic
        if (registeredUsers[username] && registeredUsers[username].password === password) {
            alert('Login successful');
            localStorage.setItem('currentUser', username);
            loadFinancialData(username);
            showUserProfile(username);
        } else {
            alert('Invalid username or password');
        }
    } else {
        // Handle registration logic
        if (registeredUsers[username]) {
            alert('User already exists');
        } else {
            registeredUsers[username] = { password, email, financialData: { currentBalance: 0, totalIncome: 0, totalExpenses: 0 } };
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            localStorage.setItem('currentUser', username);
            alert('Registration successful');
            loadFinancialData(username);
            showUserProfile(username);
        }
    }
    
    document.getElementById('authOverlay').style.display = 'none';
    resetForm();
});

// Reset the authentication form
function resetForm() {
    document.getElementById('authForm').reset();
    document.getElementById('authTitle').textContent = 'Login';
    document.getElementById('emailGroup').style.display = 'none';
    document.getElementById('toggleButton').textContent = 'Switch to Register';
}

// Show the user profile after login
function showUserProfile(username) {
    document.getElementById('userProfile').style.display = 'flex';
    document.getElementById('userName').textContent = username;

    const firstLetter = username.charAt(0).toUpperCase();
    document.getElementById('profileIcon').textContent = firstLetter;

    document.getElementById('openAuthButton').style.display = 'none';
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    logoutUser();
});

function logoutUser() {
    document.getElementById('userProfile').style.display = 'none';
    document.getElementById('openAuthButton').style.display = 'inline-block';
    localStorage.removeItem('currentUser');
    alert('You have been logged out');
}

// Load financial data for the current user
function loadFinancialData(username) {
    const user = JSON.parse(localStorage.getItem('registeredUsers'))[username];
    if (user) {
        const financialData = user.financialData || { currentBalance: 0, totalIncome: 0, totalExpenses: 0 };
        localStorage.setItem('currentBalance', financialData.currentBalance);
        localStorage.setItem('totalIncome', financialData.totalIncome);
        localStorage.setItem('totalExpenses', financialData.totalExpenses);
        updateFinancialData();
    }
}

// Update financial data on the dashboard
function updateFinancialData() {
    const currentBalance = localStorage.getItem('currentBalance') || 0;
    const totalIncome = localStorage.getItem('totalIncome') || 0;
    const totalExpenses = localStorage.getItem('totalExpenses') || 0;

    document.getElementById('current-balance').querySelector('span').textContent = parseFloat(currentBalance).toFixed(2);
    document.getElementById('total-income').querySelector('span').textContent = parseFloat(totalIncome).toFixed(2);
    document.getElementById('total-expenses').querySelector('span').textContent = parseFloat(totalExpenses).toFixed(2);
}

// Handle adding income
document.getElementById('add-income').addEventListener('click', () => {
    const income = parseFloat(prompt("Enter new income:"));
    if (!isNaN(income) && income > 0) {
        const totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
        const currentBalance = parseFloat(localStorage.getItem('currentBalance')) || 0;
        
        localStorage.setItem('totalIncome', totalIncome + income);
        localStorage.setItem('currentBalance', currentBalance + income);

        updateFinancialData();
        saveUserData(localStorage.getItem('currentUser'));
    }
});

// Handle adding expenses
document.getElementById('add-expenses').addEventListener('click', () => {
    const expense = parseFloat(prompt("Enter new expense:"));
    if (!isNaN(expense) && expense > 0) {
        const totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;
        const currentBalance = parseFloat(localStorage.getItem('currentBalance')) || 0;

        localStorage.setItem('totalExpenses', totalExpenses + expense);
        localStorage.setItem('currentBalance', currentBalance - expense);

        updateFinancialData();
        saveUserData(localStorage.getItem('currentUser'));
    }
});

// Save user data to localStorage
function saveUserData(username) {
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
    const user = registeredUsers[username];
    
    if (user) {
        user.financialData = {
            currentBalance: parseFloat(localStorage.getItem('currentBalance')) || 0,
            totalIncome: parseFloat(localStorage.getItem('totalIncome')) || 0,
            totalExpenses: parseFloat(localStorage.getItem('totalExpenses')) || 0
        };
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
}

// Initialize the page
function initPage() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showUserProfile(currentUser);
        loadFinancialData(currentUser);
    }
}

window.onload = initPage;
