renderToDoList(); 

function addTask () {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    let actualArrayJSON = localStorage.getItem("todolist");
    let actualArray; 
    if (actualArrayJSON){
        actualArray = JSON.parse(actualArrayJSON);
    } else {
        actualArray = [];
    }
    
    actualArray.push(todoText);
    localStorage.setItem("todolist", JSON.stringify(actualArray));

    todoInput.value ='';
    renderToDoList();
}

document.getElementById('addButton').addEventListener('click', addTask);

document.getElementById('todoInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();           
    }
});

function renderToDoList () {
    const actualArrayJSON = localStorage.getItem("todolist");

    const actualArray = JSON.parse(actualArrayJSON || '[]');

    const listDisplay = document.getElementById('todoList');

    listDisplay.innerHTML = '';

    actualArray.forEach(function(todoItem, index) {
        const listItem = document.createElement('li');

        listItem.textContent = todoItem;

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Fait';
        doneButton.classList.add('done-btn');
        doneButton.addEventListener('click', function() {
            listItem.classList.toggle('done');
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {

            deleteTodo(index); 
        });

        listDisplay.appendChild(listItem);
        listItem.appendChild(doneButton);
        listItem.appendChild(deleteButton);
    });
}


function deleteTodo(index) {
    const actualArrayJSON = localStorage.getItem("todolist");

    const actualArray = JSON.parse(actualArrayJSON);

    actualArray.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(actualArray));
    
    renderToDoList();   
}
