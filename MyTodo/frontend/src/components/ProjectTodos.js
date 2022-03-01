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
            setProjects(projects)
        })
        .catch(error => console.log(error));
    }

    let { id } = useParams();

    let currentProjects = projects.filter((project) => project.id == parseInt(id))
    let todoList = currentProjects[0].todos

    const [text, setText] = useState('')

    useEffect(() => {
        getProjects()
    }, []);

    const deleteTodo = (pk) => {
        axiosInstance
        .delete(`/todo-delete/${pk}`)
        .then(response => {
            const todos = response.data
            getProjects()
            setText('')
        })
        .catch(error => console.log(error));
    }


    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        setText(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosInstance
        .post('/todo-create/', {'text': text, 'project': currentProjects[0].id})
        .then(response => {
            const todos = response.data
            getProjects()
            setText('')
        })
        .catch(error => console.log(error));
    }

    return (
        <div>
        <div>
            <p class="projectName">{currentProjects[0].name}</p>
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
                                        <button onClick={() => deleteTodo(task.id)} className="green">-</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>

                    </div>

                </div>
            </div>
        </div>
        </div>
    )
}





export default ProjectTodos;