import { Paper, Button } from "@mui/material"
import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import '../styles/LoginPage.css'

const Login = () => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [token, setToken] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const getToken = async () => {
            const tokenAuth = await (await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_APIKEY}`)).json()
            setToken(tokenAuth?.request_token)
        }
        getToken()
    },[])
    
    const goHome = () => {
        navigate('/u/layout/home', {replace:true})
    }

    const signIn = async () => {
        const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_APIKEY}&request_token=${token}&username=${login}&password=${pass}`
        const response = await fetch(url, {
            method: 'POST'
        })
        const data = await response.json()

        const sessId = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_APIKEY}&request_token=${token}`, {method: 'POST'})
        const dataSession = await sessId.json()

        const account = await fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_APIKEY}&session_id=${dataSession?.session_id}`)
        const dataAccount = await account.json()
        dispatch({type: 'SET_USER', payload: dataAccount})

        if(dataAccount?.id) {
            goHome()
        }
    }

    return(
        <>
            <Paper className="login-box" >
                <h2>Login</h2>
                <div className="user-box">
                    <input 
                        type="text" 
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className='user-box_input'
                        required
                    />
                    <label className='user-box_label'>Username</label>
                </div>
                <div className="user-box">
                    <input 
                        type="password" 
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className='user-box_input'
                        required
                    />
                    <label className='user-box_label'>Password</label>
                </div>
                
                <Button onClick={signIn} variant="outlined" color="secondary" size="large">Login</Button>
            </Paper>
        </>
    )
}

export default Login

// пока нет токена дизейблить кнопку