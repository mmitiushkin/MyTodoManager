import { Link } from 'react-router-dom'
const Home = () => {
    let is_auth = false
    const token = localStorage.getItem('access_token')

    if (token != null){
        is_auth = true
    }

    return (
        <div>
            <h2>Home Page</h2>
            <p>Hello there!</p>

            <p>This is the TODO manager for making tasks and to not to think about everything at once</p>
            {is_auth ? <p></p> : <p>To start please <Link to="login/">login</Link></p>}

        </div>
    )
}

export default Home;