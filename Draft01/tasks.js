/**<-Name: Amritpal Kaur-->
<!--Section - 300 CST8285-->
<!--Description: Handles when the user adds, remove or display tasks by interacting with tasks.php */

document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("taskForm");                       //initializing form elements from tasks.html file
    const tasksList = document.getElementById("tasksList");
    const filterPriority = document.getElementById("filterPriority");
    const filterDueDate = document.getElementById("filterDueDate");
    const applyFilters = document.getElementById("applyFilters");

    taskForm.addEventListener("submit", function(event) {                       //added event listener for the submit button 
        event.preventDefault();                                                 //prevents the default submition of the form and wait validation to be true.
        const formData = new FormData(taskForm);
        fetch("tasks.php", {                                                    //user tasks are fetched using tasks.php file and then the
            method: "POST",                                                      //the contect is displayed as text
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            taskForm.reset();
            loadTasks();
        });
    });

    applyFilters.addEventListener("click", function() {                         //this fuction will load tasks for the logged in user
        loadTasks();
    });

    function loadTasks() {                  
        const priority = filterPriority.value;                                  //initialised variables to filter tasks by priority and due date
        const dueDate = filterDueDate.value;
        fetch(`tasks.php?priority=${priority}&due_date=${dueDate}`)
        .then(response => response.json())                                      //expected reponse is the json format
        .then(tasks => {
            tasksList.innerHTML = "";                                              //dynamically create a display of fetched task for logged in user
            tasks.forEach(task => {                                                
                const taskDiv = document.createElement("div");
                taskDiv.className = "task";
                taskDiv.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Priority: ${task.priority}</p>
                    <p>Due Date: ${task.due_date}</p>
                    <p>Status: ${task.status}</p>
                    <button class="removeTask" data-id="${task.id}">Remove</button>
                `;
                tasksList.appendChild(taskDiv);
            });

            document.querySelectorAll('.removeTask').forEach(button => {                            //when the remove task button is clicked the function
                button.addEventListener('click', function() {                                       //will remove task by id fecthed by the removeTask function 
                    const taskId = this.getAttribute('data-id');
                    removeTask(taskId);
                });
            });
        });
    }

    function removeTask(taskId) {                                                                  //removes tasks by id in the underlying tasks table
        fetch(`tasks.php`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: taskId })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            loadTasks();
        });
    }

    loadTasks();
});