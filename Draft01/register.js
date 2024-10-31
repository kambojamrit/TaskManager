/**<-Name: Amritpal Kaur-->
<!--Section - 300 CST8285-->
<!--Description: Handles registration form validation for index.html file. Display error messages upon validation failure.*/

document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript loaded");                                        // Debugging line to see if the javascript file I want to load is loaded
    const registrationForm = document.getElementById("registrationForm");       //get the user registeration form using tag id

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Form submitted");                                      // Another debugging line
        const formData = new FormData(registrationForm);

        if (!validate()) {
            console.log("Validation failed");                               // Debugging line
            return;                                                         // fucntion will stop if validation fails
        }

        fetch("register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())                                  //once the user is successfully registered
        .then(data => {                                                     // "you are register" message will be displayed to the user.
            alert(data.message);
            if (data.message === 'You are registered') {
                window.location.href = "login.html";
            }
        })
        .catch(error => console.error('Error:', error));                    
    });
});

function validate() {                                                       //function to validate the registration form
    let valid = true;

    clearErrors();                                                          // Clear previous errors
    console.log("Validation started");  

    const username = document.getElementById("username").value;
    if (username === "" || username.length > 20) {
        console.log("Username validation failed");                           // Debugging line 
        showError("username-error", "X Username must be non-empty and within 20 characters long.");
        valid = false;
    } else {
        document.getElementById("username").value = username.toLowerCase();        // Convert username to lowercase
    }

    const pass = document.getElementById("password").value;
    if (pass.length < 8 || pass === "")   {
        console.log("Password validation failed");                          // Debugging line
        showError("password-error", "Password must be at least 8 characters long: 1 uppercase, 1 lowercase");
        valid = false;
    }

    if (valid) {
        registrationForm.reset();
    }

    return valid;
}

function showError(elementId, message) {                                    //function to show error messages by the element id
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = "red";
}

function clearErrors() {                                                    //function to clear messages once the conditions are met for username
    const errorMessages = document.querySelectorAll(".error-message");      //and password.
    errorMessages.forEach(function(errorElement) {
        errorElement.textContent = "";
    });
}
