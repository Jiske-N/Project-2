const handleNewComment = () => {
    console.log("something")
}

const handleShowSave = () => {
    // const saveButton = document.getElementById('save-comment');
    // saveButton.style.display = "flex"

    console.log("something")


}

const commentInput = document.getElementById('new-comment');
const saveComment = document.querySelector('#save-comment')
commentInput.addEventListener("keydown", (e) => console.log(e));
saveComment.addEventListener('click', handleNewComment())
// console.log(commentInput)