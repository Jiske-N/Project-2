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

document
    .querySelector("#signup-form")
    .addEventListener("submit", handleSignupForm);
