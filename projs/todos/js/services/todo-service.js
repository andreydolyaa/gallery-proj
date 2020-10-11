const STORAGE_KEY = 'todoDB';

var gFilterBy = 'ALL';
var gSort = 'NONE';
var gImportance = 0;
var gTodos = _createTodos();


function getTodosForDisplay() {
    var res = [];
    if (gFilterBy === 'ALL') res = gTodos;
    else res = gTodos.filter(function (todo) {
        return (
            gFilterBy === 'DONE' && todo.isDone ||
            gFilterBy === 'ACTIVE' && !todo.isDone
        )
    })
    /// sort can happen here on res according to gSortBy
    return res;
}

function addTodo(txt) {
    gTodos.unshift(_createTodo(txt))
    saveToStorage(STORAGE_KEY, gTodos);
}

function removeTodo(id) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id
    })
    var approve = confirm('Are you sure?'); /// confirm is controller's responsibility
    if (approve) {
        gTodos.splice(idx, 1);
        saveToStorage(STORAGE_KEY, gTodos);
    } else return;
}

function toggleTodo(id) {
    var todo = gTodos.find(function (todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone;
    saveToStorage(STORAGE_KEY, gTodos);
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    var count = gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count += 1
        return count;
    }, 0)
    return count;
}
function getActiveTodosCount1() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}

function setImportance(val) {
    gImportance = val;
}



function setSort(val) {
    if (val === 'IMPORTANCE') {
        gTodos.sort(function (a, b) {
            return a.importance - b.importance;
        });

    } else if (val === 'TIME') {
        gTodos.sort(function (a, b) {
            return a.timeStamp - b.timeStamp;
        });
    } else if (val === 'TXT') {
        gTodos.sort(function (a, b) {
            if (a.txt.toUpperCase() < b.txt.toUpperCase()) return -1;
            if (a.txt.toUpperCase() > b.txt.toUpperCase()) return 1;
            return 0;
        });
    }
    gSort = val;
}



function sortUp() {
    return setSort(gSort);
}



function sortDown() {
    if (gSort === 'IMPORTANCE') {
        gTodos.sort(function (a, b) {
            return b.importance - a.importance;
        });
    }
    if (gSort === 'TIME') {
        gTodos.sort(function (a, b) {
            return b.timeStamp - a.timeStamp;
        });
    }
    if (gSort === 'TXT') {
        gTodos.sort(function (a, b) {
            if (b.txt.toUpperCase() < a.txt.toUpperCase()) return -1;
            if (b.txt.toUpperCase() > a.txt.toUpperCase()) return 1;
            return 0;
        });
    }
}


// Those functions are PRIVATE - not to be used outside this file!
function _createTodo(txt) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        time: setTime(),
        timeStamp: Date.now(),
        importance: gImportance === 0 ? 1 : gImportance
    };
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos) {
        todos = [];
    }
    return todos;
}



