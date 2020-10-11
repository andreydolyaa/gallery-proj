'use strict'




function onInit() {
    renderTodos();
}


function renderTodos() {
    var strHTML = ''
    var todos = getTodosForDisplay();

    todos.forEach(function (todo) {
        strHTML +=
            `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> Added at - ${todo.time} 
            importance: ${todo.importance} 
        </li>`
    });
    if (todos.length === 0) {
        document.querySelector('.todo-list').innerText = `No Active todos.`;
    } else {
        document.querySelector('.todo-list').innerHTML = strHTML;
    }
    document.querySelector('.total').innerText = getTodosCount()
    document.querySelector('.active').innerText = getActiveTodosCount()
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('.new-todo-txt');
    var txt = elNewTodoTxt.value
    // var importence = document.querySelector('.importance').value;
    if (!txt) return;
    addTodo(txt);
    renderTodos();
    elNewTodoTxt.value = '';
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    removeTodo(todoId);
    renderTodos();
}
function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos();
}


function onSetImportance(val) {
    setImportance(val);
    renderTodos()
}

function onSetSort(val) {
    setSort(val);
    renderTodos();
}

function onSortUp(){
    sortUp();
    renderTodos();
}

function onSortDown(){
    sortDown();
    renderTodos();
}