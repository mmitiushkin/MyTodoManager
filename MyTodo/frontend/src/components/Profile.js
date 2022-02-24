import {Link} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return(
            <div>
                <p><Link to={`/projects/${project.id}`}>{project.name}</Link></p>
            </div>
    )
}

const ProjectList = ({projects, user_id}) => {
    let filteredProjects = projects.filter((project) => project.user == parseInt(user_id))
    return (
        <div>
            <h2>Profile Page</h2>
            <ul>
                {filteredProjects.map(function(project){
                    return(
                        <li>{<ProjectItem project={project}/>}</li>
                    )})
                }
            </ul>
        </div>
    )
}

export default ProjectList;