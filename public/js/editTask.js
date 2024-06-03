const editButton = document.querySelector("#edit-task-button");
const handleEditTask = async () => {
    console.log(editButton)
    
    // //TO DO - add in user, need to access via session
    // const user = 1;
  
    // if (title && description && dueDate, listId) {
    //   // Send a POST request to the API endpoint
    //   const response = await fetch('/api/tasks', {
    //     method: 'POST',
    //     body: JSON.stringify({ title, description, dueDate, listId, user }),
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    
  
    //   if (response.ok) {
    //     // If successful, redirect the browser to the profile page
    //     document.location.replace('/board');
    //   } else {
    //     alert(`${response.statusText}: Invalid task`);
    //   }
    // }
    // document.getElementById('myModal').setAttribute('style', 'display:none');

}

//TO DO - save button to call the edit function



editButton.addEventListener("click", handleEditTask)