import { useParams } from 'react-router-dom'
import { useState } from 'react'
import './styles.css';
import React from 'react'
import axiosInstance from "../axiosAPI";


const ProjectTodos = ({projectList}) => {
    let { id } = useParams();
    console.log('prList: ', projectList)
    console.log('id: ', id)
    let currentProjects = projectList.filter((project) => project.id == parseInt(id))
    let todoList = currentProjects[0].todos
    console.log('asdf: ', todoList)

    const [text, setText] = useState('')
    const [todos] = useState(todoList)
    console.log('txt: ', text)




    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        console.log('Name:', name)
        console.log('Value:', value)
        setText(value)
        console.log('txt: ', text)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(text)
        console.log(currentProjects[0].id)

        axiosInstance
        .post('/todo-create/', {'text': text, 'project': currentProjects[0].id})
        .then(response => {
            const todos = response.data
            console.log(todos)
            console.log('done')
        })
        .catch(error => console.log(error));

    }

    return (
        <div>
        <div>
            <p class="projectName">Project</p>
            <div className="container">
                <div id="task-container">

                    <div id="form-wrapper">
                        <form onSubmit={handleSubmit} id="form">
                            <div className="flex-wrapper">
                                <div style={{flex: 6}}>
                                    <input onChange={handleChange} className="form-control" id="title"  type="text" name="title" placeholder="Create new task" />
                                </div>

                                <div style={{flex: 1}}>
                                    <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div  id="list-wrapper">
                        {todoList.map(function(task){
                            return(
                                <div className="task-wrapper flex-wrapper-two">
                                    <div style={{flex:7}}>
                                        <span class="mySpan">{task.text}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
        </div>
    )
}





export default ProjectTodos;