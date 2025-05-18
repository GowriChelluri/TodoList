
let tasks = [];


function addTask() {
  const title = document.getElementById('taskTitle').value;
  const priority = document.getElementById('taskPriority').value;
  const deadline = document.getElementById('taskDeadline').value;

  const task = {
    id: Date.now(),
    title,
    priority,
    deadline,
    completed: false
  };

  tasks.push(task);
  renderTasks();
}


function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    taskCard.innerHTML = `
      <div className="task-card">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})" />
        <h3>${task.title}</h3>
        <p> <span class="${task.priority}">${task.priority}</span></p>
        <p>${task.deadline}</p>
        <p>${task.completed ? 'Completed' : 'Pending'}</p>
        
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(taskCard);
  });
}

// Function to Toggle Task Completion
function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Function to Edit Task
function editTask(id) {
  const task = tasks.find(task => task.id === id);
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskPriority').value = task.priority;
  document.getElementById('taskDeadline').value = task.deadline;

  // Remove the old task
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Function to Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Event Listener for Add Task Button
document.getElementById('addTaskButton').addEventListener('click', addTask);
