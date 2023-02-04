import React from "react";
import {nanoid} from "nanoid";
import Task from "./Task.jsx";

export default function CouldDo() {

    const[couldDoTasks, setCouldDoTasks] = React.useState([
        // {
        //     id: nanoid(),
        //     text: "Task 1",
        //     isComplete: false
        // }
    ])
    React.useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('could-do-react-data'))
        if(savedData){
            setCouldDoTasks(savedData)
        }
    }, [])
    React.useEffect(() => {
        localStorage.setItem('could-do-react-data', JSON.stringify(couldDoTasks))
    }, [couldDoTasks])

    function newTask(text) {
        console.log(text)
        setCouldDoTasks(prevState => [...prevState, {
            id:nanoid(),
            text: text,
            isComplete: false
        }])
    }
    function deleteTask(id) {
        setCouldDoTasks(prevState => prevState.filter(value => value.id !== id))
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
        setCouldtDoTasks(prevState => prevState.map(value => {
            return value.id === id ?
                {...value, isComplete: !value.isComplete} : value
        }))
    }

    return(
        <div className="couldDo--mainBody">
            <h1 className="header">Could Do</h1>
            <textarea onChange={handleOnChange} onKeyDown={handleKey}
                      rows="4"
                      cols="50"
                      value={text}
                      placeholder="Type to add a Task...">
            </textarea>
            {
                couldDoTasks.map(value => <Task key={value.id} text={value.text} id={value.id} delete={deleteTask} complete={value.isComplete} completed={handleComplete}/>)
            }
        </div>
    )
}
