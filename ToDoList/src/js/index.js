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
        store.getLocalStorage() && this.setState(store.getLocalStorage())
    }
    
    const render = () => {

    }

    const addNewThing = () => {
        const input = $(".todo-input");
    }
}

const app = new App();
app.init();