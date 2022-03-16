export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(action)
        console.log('Prev State: ', prevState)
        console.log('Action Arguments: ', args)
        const nextSate = reducer(prevState, action, args)
        console.log('Next Sate', nextSate)
        console.groupEnd()
        return nextSate
    }
}