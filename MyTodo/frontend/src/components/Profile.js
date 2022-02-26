import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import './styles.css';

import axiosInstance from "../axiosAPI";

const ProjectItem = ({project}) => {
    return(
            <div class="mytext">
                <p><Link to={`/projects/${project.id}`}>{project.name}</Link></p>
            </div>
    )
}

const ProjectList = ({projectList, user_id}) => {

    const [projects, setProjects] = useState(projectList)
    console.log(projectList)
    console.log(projects)

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

    console.log(projects)
    console.log('prList: ', projects)

    const [text, setText] = useState('')
    console.log('txt: ', text)
    let filteredProjects = projects.filter((project) => project.user == parseInt(user_id))

    useEffect(() => {
        getProjects()
    }, []);

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
        .post('/project-create/', {'name': text, 'user': parseInt(user_id)})
        .then(response => {
            const projects = response.data
            console.log('done')
            getProjects()
            console.log('after sub', projects)
        })
        .catch(error => console.log(error));
    }

    return (
        <div>
            <header class="major">
                <h2>Profile Page</h2>
            </header>
            <section>
                <form onSubmit={handleSubmit} id="form">
                    <div class="row gtr-uniform gtr-50">
                        <div style={{flex: 6}}>
                            <input onChange={handleChange} className="form-control" id="title"  type="text" name="title" placeholder="Create new project" />
                        </div>

                        <div style={{flex: 1}} class="col-12">
                            <ul class="actions">
                                <li><input type="submit" value="Submit" class="primary" /></li>
                            </ul>
                        </div>
                    </div>
                </form>
            </section>

            <ul>
                {filteredProjects.map(function(project){
                    return(
                        <li key={project.id}>{<ProjectItem project={project}/>}</li>
                    )})
                }
            </ul>

        </div>
    )
}

export default ProjectList;