const handleChangeUsername = async (submission) => {
    submission.preventDefault();

    //   collect new username
    const newUsername = document.querySelector("#username").value.trim();
    console.log("accountjs", newUsername);
    if (newUsername) {
        console.log("accountjs", newUsername);
        const response = await fetch("/api/users/new-username", {
            method: "PUT",
            body: JSON.stringify({ newUsername }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

const handleChangeEmail = async (submission) => {
    submission.preventDefault();

    //   collect new email
    const newEmail = document.querySelector("#email").value.trim();
    console.log("accountjs", newEmail);
    if (newEmail) {
        console.log("accountjs", newEmail);
        const response = await fetch("/api/users/new-email", {
            method: "PUT",
            body: JSON.stringify({ newEmail }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

const handleChangePassword = async (submission) => {
    submission.preventDefault();

    //   collect current, new and confirmed passwords
    const currentPassword = document
        .querySelector("#current-password")
        .value.trim();
    const newPassword = document.querySelector("#new-password").value.trim();
    const confirmPassword = document
        .querySelector("#confirm-password")
        .value.trim();

    // // enter error messages for each case of missing data
    // if (!currentPassword || !newPassword || !confirmPassword) {
    //     throw console.error("blah");
    // }
    console.log("accountjs", currentPassword, newPassword, confirmPassword);
    if (newPassword === confirmPassword) {
        console.log("accountjs", "Match");
        const response = await fetch("/api/users/new-password", {
            method: "PUT",
            body: JSON.stringify({ currentPassword, newPassword }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

function checkMatch(submission) {
    submission.preventDefault();

    var input = document.getElementById("confirm-password");
    if (input.value !== document.getElementById("new-password").value) {
        input.setCustomValidity("Password Must be Matching.");
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity("");
    }
}

document.querySelector("#new-password").addEventListener("input", checkMatch);
document
    .querySelector("#confirm-password")
    .addEventListener("input", checkMatch);

document
    .querySelector("#change-username")
    .addEventListener("submit", handleChangeUsername);

document
    .querySelector("#change-email")
    .addEventListener("submit", handleChangeEmail);

document
    .querySelector("#change-password")
    .addEventListener("submit", handleChangePassword);
