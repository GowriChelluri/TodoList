let tasks = [];

function addTask() {
  const titleInput = document.getElementById('taskTitle');
  const priorityInput = document.getElementById('taskPriority');
  const deadlineInput = document.getElementById('taskDeadline');

  const title = titleInput.value.trim();
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;

  if (!title || !deadline) {
    alert('Please enter both title and deadline.');
    return;
  }

  const task = {
    id: Date.now(),
    title,
    priority,
    deadline,
    completed: false
  };

  tasks.push(task);

  titleInput.value = '';
  deadlineInput.value = '';

  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const statusFilter = document.getElementById('filterStatus').value;
  const priorityFilter = document.getElementById('filterPriority').value;
  const sortOption = document.getElementById('sortOption').value;

  let filteredTasks = tasks.filter(task => {
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'pending' && !task.completed);
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  // Sorting
  if (sortOption === 'deadline') {
    filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (sortOption === 'priority') {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  const now = new Date();

  filteredTasks.forEach(task => {
    const deadlineDate = new Date(task.deadline);
    const isOverdue = deadlineDate < now && !task.completed;
    const timeDiffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
    const countdownText = timeDiffDays >= 0 ? `Due in ${timeDiffDays} day(s)` : 'Overdue';

    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    if (isOverdue) taskCard.classList.add('overdue');

    taskCard.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})" />
      <h3>${task.title}</h3>
      <p><span class="${task.priority}">${task.priority}</span></p>
      <p>${task.deadline} <br><small>${countdownText}</small></p>
      <p>Status: ${task.completed ? 'Completed' : 'Pending'}</p>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(taskCard);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskPriority').value = task.priority;
  document.getElementById('taskDeadline').value = task.deadline;

  // Remove old task
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('filterStatus').addEventListener('change', renderTasks);
document.getElementById('filterPriority').addEventListener('change', renderTasks);
document.getElementById('sortOption').addEventListener('change', renderTasks);

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// Initial render with default filters
renderTasks();
