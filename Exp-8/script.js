
// Selecting form elements
const gymForm = document.getElementById("gymForm");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const genderInput = document.getElementById("gender");
const membershipInput = document.getElementById("membership");

// Selecting success message
const successMessage = document.getElementById("successMessage");

// ======================================
// 1. NAME VALIDATION
// ======================================

function validateName() {

    const name = nameInput.value.trim();

    if (name === "") {
        return showError(nameInput, "nameError", "Name is required.");
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
        return showError(nameInput, "nameError", "Enter a valid name.");
    }

    return showSuccess(nameInput, "nameError");

}

// ======================================
// 2. AGE VALIDATION
// ======================================

function validateAge() {

    const age = Number(ageInput.value);

    if (ageInput.value.trim() === "") {
        return showError(ageInput, "ageError", "Age is required.");
    }

    if (!Number.isInteger(age) || age < 16 || age > 60) {
        return showError(ageInput, "ageError", "Age must be between 16 and 60.");
    }

    return showSuccess(ageInput, "ageError");

}

// ======================================
// 3. EMAIL VALIDATION
// ======================================

function validateEmail() {

    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        return showError(emailInput, "emailError", "Email is required.");
    }

    if (!emailPattern.test(email)) {
        return showError(emailInput, "emailError", "Enter a valid email.");
    }

    return showSuccess(emailInput, "emailError");

}

// ======================================
// 4. MOBILE NUMBER VALIDATION
// ======================================

function validatePhone() {

    const phone = phoneInput.value.trim();

    const phonePattern = /^[0-9]{10}$/;

    if (phone === "") {
        return showError(phoneInput, "phoneError", "Mobile number is required.");
    }

    if (!phonePattern.test(phone)) {
        return showError(phoneInput, "phoneError", "Enter a valid 10-digit number.");
    }

    return showSuccess(phoneInput, "phoneError");

}

// ======================================
// 5. GENDER VALIDATION
// ======================================

function validateGender() {

    if (genderInput.value === "") {
        return showError(genderInput, "genderError", "Please select your gender.");
    }

    return showSuccess(genderInput, "genderError");

}

// ======================================
// 6. MEMBERSHIP VALIDATION
// ======================================

function validateMembership() {

    if (membershipInput.value === "") {
        return showError(membershipInput, "membershipError", "Select a membership plan.");
    }

    return showSuccess(membershipInput, "membershipError");

}

// ======================================
// COMMON ERROR FUNCTION
// ======================================

function showError(input, errorId, message) {

    input.classList.add("invalid");
    input.classList.remove("valid");

    document.getElementById(errorId).textContent = message;

    return false;

}

// ======================================
// COMMON SUCCESS FUNCTION
// ======================================

function showSuccess(input, errorId) {

    input.classList.remove("invalid");
    input.classList.add("valid");

    document.getElementById(errorId).textContent = "";

    return true;

}

// ======================================
// 7. LIVE INPUT VALIDATION USING EVENTS
// ======================================

nameInput.addEventListener("input", validateName);

ageInput.addEventListener("input", validateAge);

emailInput.addEventListener("input", validateEmail);

phoneInput.addEventListener("input", validatePhone);

genderInput.addEventListener("change", validateGender);

membershipInput.addEventListener("change", validateMembership);

// ======================================
// 8. FORM SUBMISSION
// ======================================

gymForm.addEventListener("submit", function(event) {

    // Prevent default form submission
    event.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isAgeValid = validateAge();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isGenderValid = validateGender();
    const isMembershipValid = validateMembership();

    if (
        isNameValid &&
        isAgeValid &&
        isEmailValid &&
        isPhoneValid &&
        isGenderValid &&
        isMembershipValid
    ) {

        successMessage.textContent =
            "Congratulations! Your gym admission form has been submitted successfully.";

        console.log("Gym Admission Details:");
        console.log("Name:", nameInput.value);
        console.log("Age:", ageInput.value);
        console.log("Email:", emailInput.value);
        console.log("Mobile:", phoneInput.value);
        console.log("Gender:", genderInput.value);
        console.log("Membership:", membershipInput.value);

        gymForm.reset();

        // Remove validation styles after successful submission
        document.querySelectorAll("input, select").forEach(function(field) {
            field.classList.remove("valid", "invalid");
        });

    } else {

        successMessage.textContent = "";

    }

});

console.log("Gym Admission Form Loaded Successfully.");
