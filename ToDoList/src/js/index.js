const $ = (query) => document.querySelector(query);

const store = {
    setLocalStorage(item){
        localStorage.setItem("todo", JSON.stringify(item));
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem("todo"));
    }
}
function App(){
    this.toDoList = {
        today: [],
        week: [],
        month: []
    };
    this.category = "today";
    this.setState = (toDoList) => {
        this.toDoList = toDoList;
    }
    this.init = () => {
        store.getLocalStorage() && this.setState(store.getLocalStorage());
        render();
    }
    const updateCount = () => {
        $(".todo-count").innerText = `총 ${this.toDoList[this.category].length}개`;
    }

    const render = () => {
        const newToDoList = this.toDoList[this.category].map((todo, index) => {
            return `
                <li data-index=${index}>
                    <span class="${todo.done ? 'done' : ''} todo-title">${todo.name}</span>
                    <div class="todo-btn-zone">
                        <button class="todo-list-btn complete-btn">${todo.done ? '취소' : '완료'}</button>
                        <button class="todo-list-btn update-btn">수정</button>
                        <button class="todo-list-btn remove-btn">삭제</button>
                    </div>
                </li>
            `
        }).join("");
        $(".todo-list").innerHTML = newToDoList;
        updateCount();
    }

    const addNewThing = () => {
        const input = $(".todo-input");
        if(!input.value){
            alert("할 일을 입력하고 확인을 눌러주세요");
            return;
        }
        this.toDoList[this.category].push({name: input.value});
        store.setLocalStorage(this.toDoList);
        input.value = "";
        render();
    }

    $(".input-submit").addEventListener("click", addNewThing);
    $(".todo-input").addEventListener("keydown", e => {
        if(e.key === "Enter"){
            addNewThing();
        }
    });

    const updateTodo = (index) => {
        const newToDoName = prompt("할 일을 수정해주세요", this.toDoList[this.category][index].name);
        if(newToDoName){
            this.toDoList[this.category][index].name = newToDoName;
            store.setLocalStorage(this.toDoList);
            render();
        }
    };

    const removeTodo = (index) => {
        if(confirm(`"${this.toDoList[this.category][index].name}"을(를) 삭제하겠습니까?`)){
            this.toDoList[this.category].splice(index, 1);
            store.setLocalStorage(this.toDoList);
            render();
        }
    }

    const doneTodo = (index) => {
        this.toDoList[this.category][index].done = !this.toDoList[this.category][index].done;
        store.setLocalStorage(this.toDoList);
        render();
    }

    $(".todo-list").addEventListener("click", e => {
        if(e.target.classList.contains("update-btn")){
            updateTodo(e.target.closest("li").dataset.index);
            return;
        }
        if(e.target.classList.contains("remove-btn")){
            removeTodo(e.target.closest("li").dataset.index);
            return;
        }
        if(e.target.classList.contains("complete-btn")){
            doneTodo(e.target.closest("li").dataset.index);
            return;
        }
    })
}

const app = new App();
app.init();