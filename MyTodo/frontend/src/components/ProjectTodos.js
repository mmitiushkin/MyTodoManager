import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './styles.css';
import React from 'react'
import axiosInstance from "../axiosAPI";


const ProjectTodos = ({projectList}) => {
    const [projects, setProjects] = useState(projectList)

    function getProjects(){
        axiosInstance
        .get('/projects/')
        .then(response => {
            const projects = response.data
            console.log('projects from func', projects)
            setProjects(projects)
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        window.localStorage.setItem('projects', projects);
    }, [projects]);


    console.log(projects)
    let { id } = useParams();
    console.log('prList: ', projectList)
    console.log('id: ', id)
    let currentProjects = projects.filter((project) => project.id == parseInt(id))
    let todoList = currentProjects[0].todos
    console.log('todoList: ', todoList)

    const [text, setText] = useState('')
    const [todos] = useState(todoList)
    console.log('txt: ', text)

    const deleteItem = () => {
        console.log(123)
    }


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

        axiosInstance
        .post('/todo-create/', {'text': text, 'project': currentProjects[0].id})
        .then(response => {
            const todos = response.data
            console.log(todos)
            console.log('done')
            getProjects()
            console.log('after sub', projects)
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
                                    <div style={{flex:1}}>
                                        <button onClick={() => deleteItem(task)} className="green">-</button>
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