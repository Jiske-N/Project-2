const handleListInput = () => {
    document.getElementById('open-list').style.display = "none";
    const addList = document.getElementById('open-list-container');
    addList.style.display = "flex"
    document.getElementById('add-list').addEventListener("click", handleAddList)
}

const handleAddList = async () => {
    const listInput = document.getElementById('list-name-input').value;
    const board = 1;
    
    // Send a POST request to the API endpoint
      const response = await fetch('/api/list', {
        method: 'POST',
        body: JSON.stringify({ listInput, board}),
        headers: { 'Content-Type': 'application/json' }
      });
    
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/board');
      } else {
        alert(`${response.statusText}: Invalid task`);
      }
    
  }
  
    //Query selectors for the submit button, & calling the function
    document
      .querySelector('#open-list')
      .addEventListener('click', handleListInput);
    
