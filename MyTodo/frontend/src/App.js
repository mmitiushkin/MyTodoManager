import logo from './logo.svg';
import './App.css';
import React from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import ProjectTodos from "./components/ProjectTodos.js";
import Profile from "./components/Profile.js";
import Login from './components/login';
import Signup from "./components/signup";
import Home from "./components/home";
import jwt from 'jwt-decode';

import axios from 'axios'
import axiosInstance from "./axiosAPI";

import './assets/css/fontawesome-all.min.css'
import './assets/css/main.css'
import './assets/css/noscript.css'




class  App  extends React.Component {

    constructor(prop) {
        super(prop)
        this.state = {
            'todos': [],
            'projects': [],
            'users': [],
            'token': '',
        }
        this.getProjects = this.getProjects.bind(this)
        this.getToken = this.getToken.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.getCurrentUser = this.getCurrentUser.bind(this)
    }

    getToken(){
        const token = localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null;
        this.setState({
            'token': token
        })
        console.log(token)
    }

    getCurrentUser(){
        const token = localStorage.getItem('access_token')
        if (token !== null){
            const decoded = jwt(token)
            const user = decoded.user_id
            return user
        }
    }

    is_auth() {
        return !!this.state.token
    }

    handleLogout() {
        axiosInstance
        .post('/blacklist/', {"refresh_token": localStorage.getItem("refresh_token")})
        .then(response => {
        })
        .catch(error => console.log(error));

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        }


    getProjects(){
        axiosInstance
        .get('/projects/')
        .then(response => {
            const projects = response.data
            console.log(projects)
            this.setState({
                'projects': projects
            })
        })
        .catch(error => console.log(error));
    }

    getTodos(){
        axiosInstance
        .get('/todos/')
        .then(response => {
            const todos = response.data
            console.log(todos)
            this.setState({
                'todos': todos
            })
        })
        .catch(error => console.log(error));
    }


    get_data(){
        this.getProjects()
        this.getTodos()
        this.getToken()
        this.getCurrentUser()
    }


    componentWillMount() {
        this.get_data()
    }


    render(){
        const user = this.getCurrentUser()
        console.log(user)

        return(
            <div class="container">

                <div id="page-wrapper">

                    <BrowserRouter>
                        <header id="header">
                            <h1 id="logo"><a href="index.html">TODO</a></h1>
                            <nav id="nav">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li>{this.is_auth() ? <Link to="/profile">Profile</Link> : null} </li>
                                    <li>{this.is_auth() ? <button className="button" onClick={() => this.handleLogout()}> Logout </button> : <Link className="button primary" to={"/login/"}>Sign In</Link> }</li>
                                </ul>
                            </nav>
                        </header>

                        <Routes>
                            <Route path="/projects/:id" element={<ProjectTodos projectList={this.state.projects}/> } />
                            <Route exact path={"/login/"} element={<Login/>}/>
                            <Route exact path={"/signup/"} element={<Signup/>}/>
                            <Route exact path={"/"} element={<Home/>}/>
                            <Route path="/profile" element={<Profile projects={this.state.projects} user_id={user}/> } />
                        </Routes>

                        <footer id="footer">
                            <ul class="icons">
                                <li><a href="#" class="icon brands alt fa-twitter"><span class="label">Twitter</span></a></li>
                                <li><a href="#" class="icon brands alt fa-facebook-f"><span class="label">Facebook</span></a></li>
                                <li><a href="#" class="icon brands alt fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
                                <li><a href="#" class="icon brands alt fa-instagram"><span class="label">Instagram</span></a></li>
                                <li><a href="#" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>
                                <li><a href="#" class="icon solid alt fa-envelope"><span class="label">Email</span></a></li>
                            </ul>
                            <ul class="copyright">
                                <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="#">mmitiushkin</a></li>
                            </ul>
                        </footer>
                    </BrowserRouter>
                </div>
            </div>

        )
    }
}


export default App;
