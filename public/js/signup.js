// // signup.js
const handleSignupForm = async (submission) => {
    submission.preventDefault();

    console.log("signupjs", submission);
    //   collect signup data
    const email = document.querySelector("#email").value.trim();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    console.log(email, username, password)
    if (email && username && password) {
        console.log("signups", email, username, password);
        const response = await fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({ email, username, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector("#signup-form")
    .addEventListener("submit", handleSignupForm);
