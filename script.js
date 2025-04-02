window.onload = function() {
    document.querySelector('.todo-input').focus();
    removeNoTodosYet();
};

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

const todos = [];


todoButton.addEventListener('click', () => {
    if (todoInput.value.trim() === '') {
        alert('Please enter a todo');
        return;
    }

    addTodo(capitalize(todoInput.value));
    todoInput.value = '';
});

todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        todoButton.click();
    }
});

function renderTodos() {
    const todoListBody = document.querySelector('#todo-list-body');

    let todoListBodyRowHTML = '';
    todos.forEach((todo, index) => {
        todoListBodyRowHTML += `
        <tr class="todo-list-body-row">
            <td>${index + 1}</td>
            <td>${todo}</td>
            <td>
                <button class="delete-btn" onclick="deleteTodo(${index})">
                    Delete
                </button>
                <button class="edit-btn" onclick="editTodo(${index})">
                    Edit
                </button>
            </td>
        </tr>
        `;
    });

    todoListBody.innerHTML = todoListBodyRowHTML;

    if (todos.length === 0) {
        removeNoTodosYet();
        
    }
}

function removeNoTodosYet() {
    const todoListBody = document.querySelector('#todo-list-body');
    if (todos.length === 0) {
        todoListBody.innerHTML = '<div class="no-todos-yet">No todos yet</div>';
    }

}

function addTodo(todo) {
    todos.push(todo);

    renderTodos();
}

function deleteTodo(index) {
    if (confirm('Are you sure you want to delete this todo?')) {
        todos.splice(index, 1);
        renderTodos();
    }
}

function editTodo(index) {
    const todo = todos[index];
    const newTodo = prompt('Edit the todo:', todo);
    if (newTodo !== null) {
        todos[index] = capitalize(newTodo);

        renderTodos();
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
