// search tasks by user
const searchByUser = async (submission) => {
    submission.preventDefault();

    //   collect new username
    const nameInput = document.querySelector("#taskByUser").value.trim();
    // const statusInput = document.querySelector("#taskByStatus").value.trim();
    // const dateInput = document.querySelector("#taskByDate").value.trim();

    // confirm newUsername exists
    if (nameInput) {
        const response = await fetch("/task", {
            method: "POST",
            body: JSON.stringify({ userInput: nameInput }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector("#filterTasks").addEventListener("submit", searchByUser);
