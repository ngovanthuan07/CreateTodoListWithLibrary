import storage from './util/storage.js'

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editId: null,

}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

const actions = {
    add({todos}, title){
        if(title){
            // create auto id
            let id;
            do
            {
                id = uuidv4()
            } while(todos.some(todo => todo.id === id))
            
            todos.push({
                id,
                title, 
                completed: false
            })
        }
        storage.set(todos)
    }, 
    toggle({todos}, id) {
        const index = todos.findIndex(todo => todo.id === id)
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos)
    },
    toggleAll({ todos }, completed) {
        todos.forEach(todo => todo.completed = completed)
        storage.set(todos)
    },
    destroy({todos}, id) {
        if(id){
            const index = todos.findIndex(todo => todo.id === id)
            todos.splice(index, 1)
            storage.set(todos)
        }
    },
    switchFilter(state, filter) {
        state.filter = filter
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },
    startEdit(state, id){
        if(id){
            state.editId = id
        }
    },
    endEdit(state, title) {
        if(state.editId !== null){
            if(title){
                const index = state.todos.findIndex(todo => todo.id === state.editId)
                state.todos[index].title = title
                storage.set(state.todos)
            } else{
                this.destroy(state, state.editId)
            }
            state.editId = null
        }
    },
    cancelEdit(state){
        state.editId = null
    }

}


export default function reduce(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
}