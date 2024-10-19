
let tasks = [];

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const descriptionInput = document.getElementById("Description");
    const taskName = taskInput.value.trim();
    const taskDescription = descriptionInput.value.trim();

    if (!taskName || !taskDescription) return; // Prevent adding empty tasks

    const task = {
        id: tasks.length + 1, // Incremental task ID
        name: taskName, // Name from input
        description: taskDescription, // Description from input
        completed: false // Initially not completed
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = ""; // Clear input field
    descriptionInput.value = ""; // Clear description input
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById("taskList");
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    taskList.innerHTML = ""; // Clear existing tasks

    tasks.forEach(task => {
        if (task.name.toLowerCase().includes(searchInput) || task.description.toLowerCase().includes(searchInput)) {
            const li = document.createElement("li");
            li.className = "task";
            li.innerHTML = `
                <div>
                    <span class="${task.completed ? 'completed' : ''}">${task.name} - ${task.description}</span>
                </div>
                <div class="task-actions">
                    <button onclick="toggleCompletion(${task.id})"><i class="fas fa-check-circle"></i></button>
                    <button onclick="editTask(${task.id})"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteTask(${task.id})"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            taskList.appendChild(li);
        }
    });
}

// Function to search tasks
document.getElementById("searchInput").addEventListener("input", renderTasks);

// Function to toggle completion status of a task
function toggleCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed; // Toggle completed status
        renderTasks(); // Re-render task list
    }
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newName = prompt("Edit task name:", task.name);
        const newDescription = prompt("Edit task description:", task.description);
        if (newName && newDescription) {
            task.name = newName; // Update task name
            task.description = newDescription; // Update task description
            renderTasks(); // Re-render task list
        }
    }
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId); // Remove task from array
    renderTasks(); // Re-render task list
}

// Add event listener to the Add Task button
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Optional: Add functionality to press Enter to add task
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
document.getElementById("Description").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
