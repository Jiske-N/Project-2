// {{!-- Update name for list --}}
// <script>
  document.querySelector('.add-list-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = event.target.name.value;

      await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      window.location.reload();
    });
//Move task to another list, add draggable functionality
    document.querySelectorAll('.move-task-select').forEach(select => {
      select.addEventListener('change', async (event) => {
        const taskId = event.target.dataset.taskId;
        const newListId = event.target.value;

        await fetch(`/api/tasks/${taskId}/move`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ listId: newListId }),
        });

        window.location.reload();
      });
    });
//   </script>