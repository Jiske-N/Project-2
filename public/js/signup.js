// // signup.js
const handleSignupForm = async (submission) => {
    submission.preventDefault();

    console.log("signupjs", submission);
    //   collect signup data
    const email = document.querySelector("#email").value.trim();
    const name = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    console.log(email, name, password);
    if (email && name && password) {
        console.log("signups", email, name, password);
        const response = await fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({ email, name, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/board");
        } else {
            alert("incorrect user name or email");
        }
    }
};

// check password meets requirements
function checkPassword(submission) {
    submission.preventDefault();

    const input = document.getElementById("password");
    if (input.value.length < 8) {
        input.setCustomValidity("Password Must be at Least 8 Characters.");
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity("");
    }
}

// add event listeners to password inputs to allow for checkNewPassword
document.querySelector("#password").addEventListener("input", checkPassword);

// add event listener to form
document
    .querySelector("#signup-form")
    .addEventListener("submit", handleSignupForm);
