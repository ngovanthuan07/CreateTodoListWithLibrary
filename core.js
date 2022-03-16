export default function html([first, ...string], ...values){
    /*
    [first, ...string] => giá trị mảng đầy tiên trong mảng đầu tiên sẽ có first là phần tử mảng trong giá tị mảng đâu tiên
    còn string sẽ lấy chuỗi còn lại
     value sẽ lấy biến nội suy
     */
   return values.reduce(
       // shift là lấy gái trị đầu tiên của mảng và xóa giá trị đó khỏi mảng
       // [first] nối mảng
        (acc, cur) => acc.concat(cur, string.shift()),
        [first]
   )
   .filter(x => x && x !== true || x === 0)
   .join('')

}


export function createStore(reducer){
    let state = reducer()

    const roots = new Map()

    function render(){
        for(const [root,component] of roots){
            const output = component()
            root.innerHTML = output
        }
    }

    return {
        attach(component, root){
            roots.set(root, component)
            render()
        },
        connect(selector = state => state){
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), ...args))
        },
        dispatch(action, ...args){
            state = reducer(state, action, args)
            render()
        }
    }
}