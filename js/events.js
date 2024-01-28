function addTask() {
	const taskInput = document.getElementById("messageInput");
	const tasksList = document.getElementById("todoItem");

	if (taskInput.value.trim() == "") {
		alert("Please enter a task");
		return;
	}

	// Save task to localStorage
	saveTaskToStorage(taskInput.value);

	// create element with class name todoItemWrapper
	const task = document.createElement("div");
	task.classList.add("todoItemWrapper");
	task.innerHTML = `<div class="todoItemText">${taskInput.value}</div>
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="deleteTask(this)">
		<path d="M9.75 18L3 11.25L4.0605 10.1895L9.75 15.8783L19.9395 5.68951L21 6.75001L9.75 18Z" fill="white"/>
	</svg>`;
	tasksList.appendChild(task);
	taskInput.value = "";
}

function saveTaskToStorage(task) {
	let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks.push(task);
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
	let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const tasksList = document.getElementById("todoItem");

	tasks.forEach((task) => {
		const taskElement = document.createElement("div");
		taskElement.classList.add("todoItemWrapper");
		taskElement.innerHTML = `<div class="todoItemText">${task}</div>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="deleteTask(this)">
			<path d="M9.75 18L3 11.25L4.0605 10.1895L9.75 15.8783L19.9395 5.68951L21 6.75001L9.75 18Z" fill="white"/>
		</svg>`;
		tasksList.appendChild(taskElement);
	});
}

function handleKeyPress(event) {
	event = event || window.event; // Ensure the event object is available

	if (event.key === "Enter") {
		addTask();
	}
}

function deleteTask(button) {
	const taskText = button.previousElementSibling.textContent;
	removeTaskFromStorage(taskText);

	const taskElement = button.parentElement;
	taskElement.remove();
}

function removeTaskFromStorage(task) {
	let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks = tasks.filter((t) => t !== task);
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from storage when the page loads
window.onload = loadTasksFromStorage;
