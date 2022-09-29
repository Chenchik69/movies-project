import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

const Login = () => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [sessionId, setSessionId] = useState('')
    const [accountId, setAccountId] = useState('')
    const [token, setToken] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const getToken = async () => {
            const tokenAuth = await (await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_APIKEY}`)).json()
            setToken(tokenAuth?.request_token)
        }
        getToken()
    },[])
    
    const goHome = () => {
        navigate('/u/layout', {replace:true})
    }

    const signIn = async () => {
        const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_APIKEY}&request_token=${token}&username=${login}&password=${pass}`
        const response = await fetch(url, {
            method: 'POST'
       })
       const data = await response.json()
       
       const sessId = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_APIKEY}&request_token=${token}`, {method: 'POST'})
       const dataSession = await sessId.json()
       console.log('dataSession',dataSession)
       setSessionId(dataSession?.session_id)
       
        const account = await fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_APIKEY}&session_id=${dataSession?.session_id}`)
        const dataAccount = await account.json()
        console.log('dataAccount',dataAccount)
        setAccountId(dataAccount?.id)

        if(dataAccount?.id) {
            console.log('success')
            goHome()
        }
        // Сделать что б прекидівало на хоум
    }

    return(
        <>
            <label>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </label>
            <label>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
            </label>
            <button onClick={signIn}>Login</button>
        </>
    )
}

export default Login