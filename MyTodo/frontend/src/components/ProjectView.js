import React from 'react'
import './styles.css';

class ProjectView extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'project': 0,
            'text': '',
            'todos': [],
        }
        this.fetchTasks = this.fetchTasks.bind(this)
    }

    componentWillMount(){
        this.fetchTasks()
    }

    fetchTasks(){
        console.log('Fetching...')
        fetch('http://127.0.0.1:8000/api/todos/')
        .then(response => response.json())
        .then(data =>
            this.setState({
                todos:data
            })
        )
    }


    render() {
        var tasks = this.state.todos
        var project = this.state.project

        return (
            <div>
                <p class="projectName">{project.name}</p>
                <div className="container">
                    <div id="task-container">

                        <div id="form-wrapper">
                            <form onSubmit={this.handleSubmit}  id="form">
                                <div className="flex-wrapper">
                                    <div style={{flex: 6}}>
                                        <input className="form-control" id="title"  type="text" name="title" placeholder="Create new task" />
                                    </div>

                                    <div style={{flex: 1}}>
                                        <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div  id="list-wrapper">
                            {tasks.map(function(task){
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
          );

    }
}

export default ProjectView;