import React from "react";
import {nanoid} from "nanoid";
import Task from "./Task.jsx";

export default function MayDo() {

    const[mayDoTasks, setMayDoTasks] = React.useState([
        // {
        //     id: nanoid(),
        //     text: "Task 1",
        //     isComplete: false
        // }
    ])
    React.useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('may-do-react-data'))
        if(savedData){
            setMayDoTasks(savedData)
        }
    }, [])
    React.useEffect(() => {
        localStorage.setItem('may-do-react-data', JSON.stringify(mayDoTasks))
    }, [mayDoTasks])

    function newTask(text) {
        console.log(text)
        setMayDoTasks(prevState => [...prevState, {
            id:nanoid(),
            text: text,
            isComplete: false
        }])
    }
    function deleteTask(id) {
        setMayDoTasks(prevState => prevState.filter(value => value.id !== id))
    }

    const [text, setText] = React.useState("")
    function handleOnChange(e) {
        setText(e.target.value)
    }
    function handleKey(e) {
        if(e.key === "Enter") {
            e.preventDefault()
            submit()
        }
    }
    function submit() {
        newTask(text)
        setText("")
    }
    function handleComplete(id) {
        setMayDoTasks(prevState => prevState.map(value => {
            return value.id === id ?
                {...value, isComplete: !value.isComplete} : value
        }))
    }

    return(
        <div className="mayDo--mainBody">
            <h1 className="header">If I Have Time</h1>
            <textarea onChange={handleOnChange} onKeyDown={handleKey}
                      rows="4"
                      cols="50"
                      value={text}
                      placeholder="Type to add a Task...">
            </textarea>
            {
                mayDoTasks.map(value => <Task key={value.id} text={value.text} id={value.id} delete={deleteTask} complete={value.isComplete} completed={handleComplete}/>)
            }
        </div>
    )
}