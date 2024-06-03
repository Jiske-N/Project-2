// change username access requires logged_in
const handleChangeUsername = async (submission) => {
    submission.preventDefault();

    //   collect new username
    const newUsername = document.querySelector("#username").value.trim();

    // confirm newUsername exists
    if (newUsername) {
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

// change email access requires logged_in
const handleChangeEmail = async (submission) => {
    submission.preventDefault();

    //   collect new email
    const newEmail = document.querySelector("#email").value.trim();

    // confirm newEmail exists
    if (newEmail) {
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

// change password access requires logged_in
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

    // double check for password match - shouldn't be needed due to checkmatch below
    if (newPassword === confirmPassword) {
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

// trying to get alerts to show message from errors in userRoutes.
// // change password access requires logged_in
// const handleChangePassword = async (submission) => {
//     try {
//         submission.preventDefault();

//         //   collect current, new and confirmed passwords
//         const currentPassword = document
//             .querySelector("#current-password")
//             .value.trim();
//         const newPassword = document
//             .querySelector("#new-password")
//             .value.trim();
//         const confirmPassword = document
//             .querySelector("#confirm-password")
//             .value.trim();

//         // double check for password match - shouldn't be needed due to checkmatch below
//         if (newPassword === confirmPassword) {
//             const response = await fetch("/api/users/new-password", {
//                 method: "PUT",
//                 body: JSON.stringify({ currentPassword, newPassword }),
//                 headers: { "Content-Type": "application/json" },
//             });

//             if (response.ok) {
//                 document.location.reload();
//             } else {
//                 // throw error to provide response message
//                 const error = new Error(response.statusText);
//                 error.response = response;
//                 return response.json().then((data) => {
//                     throw error;
//                 });
//             }
//         }
//     } catch (error) {
//         // alert response message
//         alert(response.statusText);
//         alert(error.response.message);
//     }
// };

// ask tri should I put the password validation here as well to allow setting a message or is that a nono as it exposes things on the front end?
// check new and confirm password fields match
function checkNewPassword(submission) {
    submission.preventDefault();

    const input = document.getElementById("confirm-password");
    if (input.value.length < 8) {
        input.setCustomValidity("Password Must be at Least 8 Characters.");
    } else {
        if (input.value !== document.getElementById("new-password").value) {
            input.setCustomValidity("Password Must be Matching.");
        } else {
            // input is valid -- reset the error message
            input.setCustomValidity("");
        }
    }
}

// add event listeners to password inputs to allow for checkNewPassword
document
    .querySelector("#new-password")
    .addEventListener("input", checkNewPassword);
document
    .querySelector("#confirm-password")
    .addEventListener("input", checkNewPassword);

// add event listeners for change username, email and password forms.
document
    .querySelector("#change-username")
    .addEventListener("submit", handleChangeUsername);

document
    .querySelector("#change-email")
    .addEventListener("submit", handleChangeEmail);

document
    .querySelector("#change-password")
    .addEventListener("submit", handleChangePassword);
