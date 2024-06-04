// search tasks by user
const searchByUser = async (submission) => {
    submission.preventDefault();

    //   collect search params
    const nameInput = document.querySelector("#taskByUser").value.trim();
    const statusInput = document.querySelector("#taskByStatus").value.trim();
    const dateInput = document.querySelector("#taskByDate").value.trim();

    const searchString = `/task/search?name=${nameInput}&status=${statusInput}&date=${dateInput}`;
    // const searchString = `/task/?name=${nameInput}`;

    console.log(searchString);
    // search exists
    if (nameInput || statusInput || dateInput) {
        const response = await fetch(searchString, {
            method: "GET",
            // body: JSON.stringify({ userInput: nameInput }),
            headers: { "Content-Type": "application/json" },
        });

        console.log("searchTask.js", "fetch sent awaiting response");

        if (response.ok) {
            document.location.replace(
                `/task/search?name=${nameInput}&status=${statusInput}&date=${dateInput}`
            );
        } else {
            alert(response.statusText);
        }
    }
};

// router.get("/:name/:status/:date", async (req, res) => {
//     try {
//         console.log("taskRoutes.js", "starting");
//         const { name, status, date } = req.query;

//         console.log("taskRoutes.js", "req.query", req.query);

//         // console.log("taskRoutes.js", "user", user);

//         let filter = {};

//         if (status && status !== "") {
//             filter.status = status;
//         }

//         if (name && name !== "") {
//             const user = await User_s.findOne({
//                 where: {
//                     name,
//                 },
//             });
//             if (user) {
//                 filter.user_id = user.id;
//             }
//         }

//         if (date && date !== "") {
//             filter.due_date = date;
//         }

//         console.log("taskRoutes.js", "filter", filter);

//         const boardsData = await Board.findAll();
//         const boards = boardsData.map((board) => board.get({ plain: true }));

//         const listsData = await List.findAll({
//             where: {
//                 board_id: boards[0].id,
//             },
//             include: {
//                 model: Task,
//                 where: filter,
//                 include: {
//                     model: Comment,
//                     include: {
//                         model: User_s,
//                     },
//                 },
//             },
//         });

//         const lists = listsData.map((list) => list.get({ plain: true }));
//         console.log("taskRoutes.js", "lists", lists);

//         res.render("board", {
//             lists,
//             username: req.session.username,
//             logged_in: req.session.logged_in,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

document.querySelector("#filterTasks").addEventListener("submit", searchByUser);
