let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    list.innerHTML += `
      <li>
        <div class="task-info ${task.completed ? 'completed' : ''}">
          <span><strong>${task.title}</strong></span>
          <span class="time">${task.time || ''}</span>
        </div>
        <div class="task-actions">
          <button onclick="toggleTask(${index})">✅</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </div>
      </li>
    `;
  });
}

function promptAddTask() {
  const title = prompt("Enter Task Title");
  const time = prompt("Enter Task Time (e.g., 10:30 AM)");
  if (title) {
    tasks.push({ title: title.trim(), time: time.trim(), completed: false });
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

renderTasks();
