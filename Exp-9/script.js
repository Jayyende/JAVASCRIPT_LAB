
// Selecting HTML elements
const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");

const themeMessage = document.getElementById("themeMessage");
const savedTheme = document.getElementById("savedTheme");

const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const savedNote = document.getElementById("savedNote");

const clearBtn = document.getElementById("clearBtn");
const clearMessage = document.getElementById("clearMessage");

// ======================================
// 1. APPLY THEME
// ======================================

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }

    savedTheme.textContent = theme;

}

// ======================================
// 2. LOAD SAVED THEME FROM LOCAL STORAGE
// ======================================

let storedTheme = localStorage.getItem("theme");

if (storedTheme === null) {

    storedTheme = "light";

}

applyTheme(storedTheme);

// ======================================
// 3. SAVE LIGHT THEME
// ======================================

lightBtn.addEventListener("click", function() {

    localStorage.setItem("theme", "light");

    applyTheme("light");

    themeMessage.textContent = "Light theme saved successfully!";

    clearMessage.textContent = "";

    console.log("Theme saved:", localStorage.getItem("theme"));

});

// ======================================
// 4. SAVE DARK THEME
// ======================================

darkBtn.addEventListener("click", function() {

    localStorage.setItem("theme", "dark");

    applyTheme("dark");

    themeMessage.textContent = "Dark theme saved successfully!";

    clearMessage.textContent = "";

    console.log("Theme saved:", localStorage.getItem("theme"));

});

// ======================================
// 5. SESSION STORAGE - SAVE NOTE
// ======================================

saveNoteBtn.addEventListener("click", function() {

    let note = noteInput.value.trim();

    if (note === "") {

        alert("Please enter a note.");

        return;

    }

    sessionStorage.setItem("sessionNote", note);

    savedNote.textContent = note;

    noteInput.value = "";

    console.log("Session Note:", sessionStorage.getItem("sessionNote"));

});

// ======================================
// 6. LOAD NOTE FROM SESSION STORAGE
// ======================================

let storedNote = sessionStorage.getItem("sessionNote");

if (storedNote !== null) {

    savedNote.textContent = storedNote;

}

// ======================================
// 7. CLEAR SAVED PREFERENCES
// ======================================

clearBtn.addEventListener("click", function() {

    // Remove only our application's stored values
    localStorage.removeItem("theme");

    sessionStorage.removeItem("sessionNote");

    // Reset the webpage
    applyTheme("light");

    savedTheme.textContent = "None";

    savedNote.textContent = "None";

    themeMessage.textContent = "";

    clearMessage.textContent =
        "Saved preferences cleared successfully!";

    console.log("Application storage cleared.");

});

// ======================================
// 8. DISPLAY STORAGE INFORMATION
// ======================================

console.log("Local Storage Theme:", localStorage.getItem("theme"));

console.log("Session Storage Note:", sessionStorage.getItem("sessionNote"));

console.log("Web Storage Application Loaded Successfully.");
