
// Selecting HTML elements
const fetchBtn = document.getElementById("fetchBtn");
const jqueryBtn = document.getElementById("jqueryBtn");

const studentTable = document.getElementById("studentTable");
const statusMessage = document.getElementById("statusMessage");

// Function to display student records
function displayStudents(students) {

    studentTable.innerHTML = "";

    students.forEach(function(student) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
        `;

        studentTable.appendChild(row);

    });

}

// ======================================
// 1. LOAD DATA USING FETCH API
// ======================================

fetchBtn.addEventListener("click", function() {

    fetch("data.json")

        .then(function(response) {

            if (!response.ok) {
                throw new Error("Unable to load JSON data.");
            }

            return response.json();

        })

        .then(function(data) {

            displayStudents(data.students);

            statusMessage.textContent =
                "Student records loaded successfully using Fetch API.";

            statusMessage.className = "success";

            console.log("Fetch API Data:", data);

        })

        .catch(function(error) {

            statusMessage.textContent = error.message;

            statusMessage.className = "error";

            console.error("Fetch Error:", error);

        });

});

// ======================================
// 2. LOAD DATA USING JQUERY GETJSON
// ======================================

jqueryBtn.addEventListener("click", function() {

    $.getJSON("data.json")

        .done(function(data) {

            displayStudents(data.students);

            statusMessage.textContent =
                "Student records loaded successfully using jQuery.";

            statusMessage.className = "success";

            console.log("jQuery Data:", data);

        })

        .fail(function() {

            statusMessage.textContent =
                "Error loading JSON data using jQuery.";

            statusMessage.className = "error";

            console.error("jQuery JSON Loading Failed.");

        });

});

console.log("JSON Data Loading Application Loaded Successfully.");
