
// Selecting HTML elements
const emailInput = document.getElementById("emailInput");
const emailResult = document.getElementById("emailResult");

const textInput = document.getElementById("textInput");
const analysisResult = document.getElementById("analysisResult");

const extractInput = document.getElementById("extractInput");
const extractResult = document.getElementById("extractResult");

// ======================================
// 1. EMAIL VALIDATION USING REGEX
// ======================================

document.getElementById("validateBtn").addEventListener("click", function() {

    let email = emailInput.value.trim();

    // Regular expression for basic email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        emailResult.textContent = "Please enter an email address.";
        emailResult.className = "message error";

    }
    else if (emailPattern.test(email)) {

        emailResult.textContent = "Valid email address!";
        emailResult.className = "message success";

    }
    else {

        emailResult.textContent = "Invalid email address!";
        emailResult.className = "message error";

    }

});

// ======================================
// 2. TEXT ANALYSIS USING STRING METHODS
// ======================================

document.getElementById("analyzeBtn").addEventListener("click", function() {

    let text = textInput.value;

    if (text.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    // Count characters
    let characters = text.length;

    // Count words
    let words = text.trim().split(/\s+/).length;

    // Count vowels using regex
    let vowels = text.match(/[aeiou]/gi) || [];

    // Display analysis
    document.getElementById("charCount").textContent = characters;

    document.getElementById("wordCount").textContent = words;

    document.getElementById("vowelCount").textContent = vowels.length;

    // Convert text into uppercase and lowercase
    document.getElementById("upperText").textContent =
        text.toUpperCase();

    document.getElementById("lowerText").textContent =
        text.toLowerCase();

});

// ======================================
// 3. EXTRACT EMAILS USING REGEX
// ======================================

document.getElementById("extractBtn").addEventListener("click", function() {

    let text = extractInput.value;

    // Regular expression to find email addresses
    let emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

    let emails = text.match(emailPattern);

    if (emails && emails.length > 0) {

        extractResult.className = "message success";

        extractResult.innerHTML =
            "<strong>Extracted Email Addresses:</strong><br>" +
            emails.map(email => `<p>${email}</p>`).join("");

    }
    else {

        extractResult.textContent = "No email addresses found.";
        extractResult.className = "message error";

    }

});

// ======================================
// 4. WORD REPLACEMENT USING STRING METHOD
// ======================================

document.getElementById("replaceBtn").addEventListener("click", function() {

    let text = textInput.value;

    let oldWord = document.getElementById("originalWord").value.trim();

    let newWord = document.getElementById("newWord").value;

    if (text.trim() === "" || oldWord === "") {

        alert("Please enter text and the word to replace.");
        return;

    }

    // Escape special regex characters in the search word
    let escapedWord = oldWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let pattern = new RegExp("\\b" + escapedWord + "\\b", "gi");

    let updatedText = text.replace(pattern, function() {
        return newWord;
    });

    document.getElementById("replaceResult").textContent =
        "Updated Text: " + updatedText;

});

// Console output
console.log("String and Regular Expression Analyzer Loaded Successfully.");
