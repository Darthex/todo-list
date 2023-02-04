import React from "react";
import {nanoid} from "nanoid";
import Task from "./Task.jsx";

export default function ShouldDo() {

    const[shouldDoTasks, setShouldDoTasks] = React.useState([
        // {
        //     id: nanoid(),
        //     text: "Task 1",
        //     isComplete: false
        // }
    ])
    React.useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('should-do-react-data'))
        if(savedData){
            setShouldDoTasks(savedData)
        }
    }, [])
    React.useEffect(() => {
        localStorage.setItem('should-do-react-data', JSON.stringify(shouldDoTasks))
    }, [shouldDoTasks])

    function newTask(text) {
        console.log(text)
        setShouldDoTasks(prevState => [...prevState, {
            id:nanoid(),
            text: text,
            isComplete: false
        }])
    }
    function deleteTask(id) {
        setShouldDoTasks(prevState => prevState.filter(value => value.id !== id))
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
        setShouldDoTasks(prevState => prevState.map(value => {
            return value.id === id ?
                {...value, isComplete: !value.isComplete} : value
        }))
    }

    return(
        <div className="shouldDo--mainBody">
            <h1 className="header">Should Do</h1>
            <textarea onChange={handleOnChange} onKeyDown={handleKey}
                rows="4"
                cols="50"
                      value={text}
                placeholder="Type to add a Task...">
            </textarea>
            {
                shouldDoTasks.map(value => <Task key={value.id} text={value.text} id={value.id} delete={deleteTask} complete={value.isComplete} completed={handleComplete}/>)
            }
        </div>
    )
}