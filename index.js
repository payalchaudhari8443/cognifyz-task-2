const express = require('express');
const app = express();
const port = 3001; // Using 3001 to avoid conflict with Task 1

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Temporary storage for submitted data
let submissions = [];

// Serve the form page
app.get('/', (req, res) => {
    res.render('index', { message: null, submissions });
});

// Handle form submission with server-side validation
app.post('/submit', (req, res) => {
    const { name, email, age } = req.body;

    // Server-side validation
    if (!name || name.length < 2) {
        return res.render('index', { message: 'Name must be at least 2 characters long', submissions });
    }
    if (!email || !email.includes('@')) {
        return res.render('index', { message: 'Invalid email address', submissions });
    }
    if (!age || isNaN(age) || age < 18) {
        return res.render('index', { message: 'Age must be a number and at least 18', submissions });
    }

    // Store validated data
    submissions.push({ name, email, age });
    res.render('index', { message: 'Submission successful!', submissions });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});