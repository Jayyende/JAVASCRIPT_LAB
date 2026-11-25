
const form = document.getElementById("palindromeForm");
const input = document.getElementById("userInput");
const result = document.getElementById("result");
const countDisplay = document.getElementById("count");

// Closure
function createPalindromeChecker() {

    let checkCount = 0;

    // Inner function remembers checkCount
    return function(text) {

        checkCount++;

        // Remove spaces and special characters
        let cleanedText = text
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

        if (cleanedText === "") {
            throw new Error("Please enter a valid word or sentence.");
        }

        // Reverse the text
        let reversedText = cleanedText
            .split("")
            .reverse()
            .join("");

        // Check palindrome
        let isPalindrome = cleanedText === reversedText;

        return {
            original: text,
            reversed: reversedText,
            isPalindrome: isPalindrome,
            count: checkCount
        };
    };
}

// Creating checker function
const checkPalindrome = createPalindromeChecker();

// Arrow function for displaying result
const displayResult = (message, className) => {

    result.style.display = "block";
    result.className = "result " + className;
    result.textContent = message;

};

// Form submission event
form.addEventListener("submit", function(event) {

    event.preventDefault();

    try {

        let userText = input.value.trim();

        if (userText === "") {
            throw new Error("Please enter a word or sentence.");
        }

        // Calling closure function
        let answer = checkPalindrome(userText);

        if (answer.isPalindrome) {

            displayResult(
                `"${answer.original}" is a Palindrome!`,
                "success"
            );

        } else {

            displayResult(
                `"${answer.original}" is NOT a Palindrome.`,
                "failure"
            );

        }

        countDisplay.textContent =
            "Checks performed: " + answer.count;

        console.log("Original:", answer.original);
        console.log("Reversed:", answer.reversed);
        console.log("Palindrome:", answer.isPalindrome);

    } catch (error) {

        displayResult(error.message, "error");

    }

});

// Reset event
form.addEventListener("reset", function() {

    result.style.display = "none";
    result.textContent = "";

});
