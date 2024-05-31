const handleNewComment = () => {

}

const handleShowSave = () => {
    const saveButton = document.getElementById('save-comment');
    saveButton.style.display = "flex"



}

const commentInput = document.getElementById('new-comment');
commentInput.addEventListener("click", handleShowSave);