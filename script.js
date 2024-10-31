const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');

openModalBtn.addEventListener('click', () => taskModal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => taskModal.classList.add('hidden'));

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const title = document.getElementById('taskTitle').value;
  const status = document.getElementById('taskStatus').value;
  const dueDate = document.getElementById('taskDueDate').value;
  const priority = document.getElementById('taskPriority').value;

  const taskItem = document.createElement('div');
  taskItem.className = `p-2 rounded-md text-sm ${priority === 'P1' ? 'bg-red-200' : priority === 'P2' ? 'bg-orange-200' : 'bg-green-200'}`;
  taskItem.dataset.dueDate = dueDate;
  taskItem.dataset.priority = priority;

  taskItem.innerHTML = `
    <div class="flex justify-between">
      <span>${title}</span>
      <button class="text-red-500 hover:text-red-700" onclick="removeTask(this)">X</button>
    </div>
    <p class="text-gray-600">${dueDate}</p>
    <select class="text-blue-500 hover:text-blue-700" onchange="changeStatus(this)">
      <option value="todo">To do</option>
      <option value="inProgress">In Progress</option>
      <option value="review">Review</option>
      <option value="done">Done</option>
    </select>
  `;

  document.getElementById(`${status}List`).appendChild(taskItem);
  updateTaskCounts();

  taskModal.classList.add('hidden');
  taskForm.reset();
});

function removeTask(button) {
  button.parentElement.parentElement.remove();
  updateTaskCounts();
}

function changeStatus(select) {
  const taskItem = select.parentElement.parentElement;
  const newStatus = select.value;
  const currentStatus = taskItem.closest('[id$="List"]').id;

  taskItem.remove();
  document.getElementById(`${newStatus}List`).appendChild(taskItem);
  updateTaskCounts();
}

function updateTaskCounts() {
  document.getElementById('todoCount').innerText = document.getElementById('todoList').children.length;
  document.getElementById('inProgressCount').innerText = document.getElementById('inProgressList').children.length;
  document.getElementById('reviewCount').innerText = document.getElementById('reviewList').children.length;
  document.getElementById('doneCount').innerText = document.getElementById('doneList').children.length;
}

document.getElementById('sortByPriority').addEventListener('click', () => sortTasks('priority'));
document.getElementById('sortByDueDate').addEventListener('click', () => sortTasks('dueDate'));

function sortTasks(criteria) {
  const columns = ['todoList', 'inProgressList', 'reviewList', 'doneList'];

  columns.forEach(column => {
    const tasks = Array.from(document.getElementById(column).children);
    
    tasks.sort((a, b) => {
      if (criteria === 'priority') {
        const priorityOrder = { 'P1': 1, 'P2': 2, 'P3': 3 };
        return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
      } else if (criteria === 'dueDate') {
        return new Date(a.dataset.dueDate) - new Date(b.dataset.dueDate);
      }
    });
    const list = document.getElementById(column);
    list.innerHTML = '';
    tasks.forEach(task => list.appendChild(task));
  });
}