// search tasks by values
const searchByUser = async (submission) => {
    submission.preventDefault();

    //   collect search params
    const nameInput = document.querySelector("#taskByUser").value.trim();
    const statusInput = document.querySelector("#taskByStatus").value.trim();
    const dateInput = document.querySelector("#taskByDate").value.trim();

    // const searchString = `/task/search?name=${nameInput}&status=${statusInput}&date=${dateInput}`;

    const searchString = `/search-tasks?name=${nameInput}&status=${statusInput}&date=${dateInput}`;

    // console.log(searchString);
    // search exists
    if (nameInput || statusInput || dateInput) {
        const response = await fetch(searchString, {
            method: "GET",
            // body: JSON.stringify({ userInput: nameInput }),
            headers: { "Content-Type": "application/json" },
        });

        console.log("searchTask.js", "fetch sent awaiting response");

        if (response.ok) {
            document.location.replace(searchString);
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector("#filterTasks").addEventListener("submit", searchByUser);
