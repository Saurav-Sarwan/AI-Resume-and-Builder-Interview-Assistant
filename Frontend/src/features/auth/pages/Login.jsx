import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import AnimatedTitle from '../components/AnimatedTitle'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email.trim() && !password.trim()) {
            setError('Please enter email and password')
            return
        }

        const user = await handleLogin({ email, password })
        if (user) {
            navigate('/')
        } else {
            setError('Invalid email and password')
        }
    }

    if(loading){
        return (<main><svg width="60" height="60" viewBox="0 0 50 50"><g transform="rotate(0 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="0s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="0s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="0s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(30 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="0.15s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="0.15s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="0.15s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(60 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="0.3s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="0.3s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="0.3s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(90 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="0.44999999999999996s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="0.44999999999999996s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="0.44999999999999996s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(120 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="0.6s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="0.6s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="0.6s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(150 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="0.75s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="0.75s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="0.75s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(180 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="0.8999999999999999s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="0.8999999999999999s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="0.8999999999999999s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(210 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="1.05s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="1.05s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="1.05s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(240 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="1.2s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="1.2s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="1.2s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(270 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="1.3499999999999999s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="1.3499999999999999s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="1.3499999999999999s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(300 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="1.5s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="1.5s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="1.5s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(330 25 25)"><circle cx="25" cy="8" r="3" fill="#DDDDDD"><animate attributeName="r" values="3;1;3" dur="2s" begin="1.65s" repeatCount="indefinite"></animate><animate attributeName="cy" values="8;15;8" dur="2s" begin="1.65s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;0.3;1" dur="2s" begin="1.65s" repeatCount="indefinite"></animate></circle></g></svg>
                    <h1>Loading...</h1>
                </main>)
        
    }


    return (
        <main>
            <AnimatedTitle />
            <div className="form-container">
                <h1>Login</h1>
                {error && <p className='error-message'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>
                    <button className='button primary-button' >Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login