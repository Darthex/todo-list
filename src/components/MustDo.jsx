import React from "react";
import Task from "./Task.jsx";
import {nanoid} from "nanoid";

export default function MustDo() {

    const[mustDoTasks, setMustDoTasks] = React.useState([
        // {
        //     id: nanoid(),
        //     text: "Task 1",
        //     isComplete: false
        // }
    ])
    React.useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('must-do-react-data'))
        if(savedData){
            setMustDoTasks(savedData)
        }
    }, [])
    React.useEffect(() => {
        localStorage.setItem('must-do-react-data', JSON.stringify(mustDoTasks))
    }, [mustDoTasks])

    function newTask(text) {
        console.log(text)
        setMustDoTasks(prevState => [...prevState, {
            id:nanoid(),
            text: text,
            isComplete: false
        }])
    }
    function deleteTask(id) {
        setMustDoTasks(prevState => prevState.filter(value => value.id !== id))
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
        setMustDoTasks(prevState => prevState.map(value => {
            return value.id === id ?
                {...value, isComplete: !value.isComplete} : value
        }))
    }

    return(
        <div className="mustDo--mainBody">
            <h1 className="header">Must Do</h1>
            <textarea onChange={handleOnChange} onKeyDown={handleKey}
                rows="4"
                cols="50"
                      value={text}
                placeholder="Type to add a Task...">
            </textarea>
            {
                mustDoTasks.map(value => <Task key={value.id} text={value.text} id={value.id} delete={deleteTask} complete={value.isComplete} completed={handleComplete}/>)
            }
        </div>
    )
}
