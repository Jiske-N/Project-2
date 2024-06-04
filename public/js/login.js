const handleLoginForm = async (submission) => {
    submission.preventDefault();

    console.log("loginjs", submission);
    //   collect login data
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            // redirect to taskboard
            document.location.replace("/board");
        } else {
            alert(response.statusText);
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
    .querySelector("#login-form")
    .addEventListener("submit", handleLoginForm);
