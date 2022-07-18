const store = {
    setLocalStorage(item){
        localStorage.setItem("todo", JSON.stringify(item));
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem("todo"));
    }
}

export default store;