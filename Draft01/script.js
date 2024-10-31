document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");
    const taskForm = document.getElementById("taskForm");
    const tasksList = document.getElementById("tasksList");

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(registrationForm);
        fetch("register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        });
    });

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(taskForm);
        fetch("tasks.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            loadTasks();
        });
    });

    function loadTasks() {
        fetch("tasks.php")
        .then(response => response.json())
        .then(tasks => {
            tasksList.innerHTML = "";
            tasks.forEach(task => {
                const taskDiv = document.createElement("div");
                taskDiv.className = "task";
                taskDiv.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Priority: ${task.priority}</p>
                    <p>Due Date: ${task.due_date}</p>
                    <p>Status: ${task.status}</p>
                `;
                tasksList.appendChild(taskDiv);
            });
        });
    }

    loadTasks();
});
