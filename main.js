const titleTaskInput = document.querySelector('.newTask__title');
const deskTaskTextarea = document.querySelector('.newTask__descripshion');
const addTaskBtn = document.querySelector('.newTask__btn');
const taskContent = document.querySelector('.tasks__content');
const taskDone = document.querySelector('.tasks__done');
const unfulfilled =  document.querySelector('.tasks__unfulfilled');

//Макссив данных
let tasks;
//проверка, есть ли в лок.хран информация
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

//Хранилище для div class="tasks__task"
let taskContentElems = [];

//Создание отднотипных объектов
function Task(title, description) {
    this.title = title;
    this.description = description;
    this.comleted = false;
}

//Шаблон для зоздания новых task
const createTemplate = (task, index) => {
    return `
        <div class="tasks__task ${task.comleted ? 'checked' : ''}">
            <p class="tasks__title">${task.title}</p>
            <p class="tasks__descripshion">${task.description}</p>
            <div class="tasks__button">
                <a onclick="completeTask(${index})" class="tasks__completed tasks__btn ${task.comleted ? 'checked-btn' : ''}" href="#" >
                    <img class="tasks__img" src="https://img.icons8.com/nolan/32/realtime-protection.png" />
                </a>
                <a onclick="deleteTask(${index})" class="tasks__del tasks__btn" href="#">
                    <img class="tasks__img" src="https://img.icons8.com/nolan/32/recycle-bin.png" />
                </a>
            </div>
        </div>
    `
}

//Фильтруем выполненые/невыполненные 
const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.comleted == false);
    const completedTasks = tasks.length && tasks.filter(item => item.comleted == true);
    tasks = [...activeTasks, ...completedTasks];
    //Стчетчик
    taskDone.innerHTML = activeTasks.length;
    unfulfilled.innerHTML = completedTasks.length;
}

//Заполнение Html списка
const fillHtmlList = () => {
    taskContent.innerHTML = ''; //Отчистка
    if (tasks.length > 0) { //Проверка объектов в массиве
        filterTasks();
        tasks.forEach((item, index) => {
            taskContent.innerHTML += createTemplate(item, index)
        })
        taskContentElems = document.querySelectorAll('.tasks__task');
    }
}
//Вызов при инициализации страницы
fillHtmlList();

//Отправка на лок.хранилище
const updeteLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Вешаем класс
const completeTask = index => {
    tasks[index].comleted = !tasks[index].comleted;
    if (tasks[index].comleted) {
        taskContentElems[index].classList.add('checked');
    } else {
        taskContentElems[index].classList.remove('checked');
    }
    updeteLocal()
    fillHtmlList()
}

//При нажатии конопки происходит отправка объекта в массив
addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(titleTaskInput.value, deskTaskTextarea.value));
    updeteLocal();
    fillHtmlList();
    titleTaskInput.value = '';
    deskTaskTextarea.value = '';
})

//Удаление
const deleteTask = index => {
    taskContentElems[index].classList.add('delition')
    setTimeout(() => {
        tasks.splice(index, 1);
        updeteLocal();
        fillHtmlList();
    }, 500);
}