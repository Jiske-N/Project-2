const handleAddTask = async () => {

  const title = document.querySelector('#task-title-new').value.trim();
  const description = document.querySelector('#task-description-new').value.trim();
  const dueDate = document.querySelector('#task-duedate-new').value;
  const listId = document.querySelector('.list-name').id;
  
  //TO DO - add in user, need to access via session
  const user = 1;

  if (title && description && dueDate, listId) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description, dueDate, listId, user }),
      headers: { 'Content-Type': 'application/json' }
    });
  

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/board');
    } else {
      alert(`${response.statusText}: Invalid task`);
    }
  }
  document.getElementById('myModal').setAttribute('style', 'display:none');
}

  //Query selectors for the submit button, & calling the function
  document
    .querySelector('#task-save')
    .addEventListener('click', handleAddTask);
  
