const handleLoginForm = async (submission) => {
    submission.preventDefault();

    console.log("loginjs", submission);
    //   collect login data
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (email && password) {
        console.log("loginjs", email, password);
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
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
    .querySelector("#login-form")
    .addEventListener("submit", handleLoginForm);
