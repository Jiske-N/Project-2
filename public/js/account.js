const handleChangeUsername = async (submission) => {
    submission.preventDefault();

    //   collect new username
    const newUsername = document.querySelector("#username").value.trim();

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

    //   collect new password
    const newPassword = document.querySelector("#password").value.trim();

    if (newPassword) {
        console.log("accountjs", newPassword);
        const response = await fetch("/api/users/new-password", {
            method: "PUT",
            body: JSON.stringify({ newPassword }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector("#change-username")
    .addEventListener("submit", handleChangeUsername);

document
    .querySelector("#change-email")
    .addEventListener("submit", handleChangeEmail);

document
    .querySelector("#change-password")
    .addEventListener("submit", handleChangePassword);
