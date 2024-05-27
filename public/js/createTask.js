const handleAddTask = async (e) => {
  e.preventDefault();

  const title = document.querySelector('#task-title').value.trim();
  const description = document.querySelector('#task-description').value.trim();
  const dueDate = document.querySelector('#task-duedate').value;
  const status = document.querySelector('#task-status').value;



  const response = await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title, description, dueDate, status }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/board')
  } else {
    alert(response.statusText)
  }



}


  //Query selectors for the submit button, & calling the function
  document
    .querySelector('#task-save')
    .addEventListener('click', handleAddTask);
  
