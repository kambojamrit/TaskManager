/**<-Name: Amritpal Kaur-->
<!--Section - 300 CST8285-->
<!--Description: Handles login form validation for index.html file. Display error messages upon validation failure.*/

document.addEventListener("DOMContentLoaded", function() {
                                           // Debugging line to see if the javascript file I want to load is loaded
    const registrationForm = document.getElementById("loginForm");       //get the user registeration form using tag id

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
       
        const formData = new FormData(loginForm);

        if (!validate()) {
            console.log("Validation failed");                               // Debugging line
            return;                                                         // fucntion will stop if validation fails
        }

        fetch("login.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())                                  //once the user is successfully registered
        .then(data => {                                                     // "you are register" message will be displayed to the user.
            alert(data.message);
            if (data.message === 'You are logged in.) {
                window.location.href = "task.html";
            }
        })
        .catch(error => console.error('Error:', error));                    
    });
});

function validate() {                                                       //function to validate the registration form
    let valid = true;

    clearErrors();                                                          // Clear previous errors
    const username = document.getElementById("username").value;
    if (username === "" ) {
        console.log("Username validation failed");                           // Debugging line 
        showError("username-error", "X Must enter a username");
        valid = false;
    } else {
        document.getElementById("username").value = username.toLowerCase();        // Convert username to lowercase
    }

    const pass = document.getElementById("password").value;
    if ( pass === "")   {
        console.log("Password validation failed");                          // Debugging line
        showError("password-error", "Must enter a password.");
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
