import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const AuthProtectedRoute = ({ component: Component, ...rest }) => {

    // const Signed = useSelector(state => state.Auth.signed)
    const Signed = true
    
    if (Signed) {
      return <Component />
    }
    
  
    const redirectTo = {
      pathname: 'log-in',
      state: {
        from: rest.location
      }
    }
  
    return <Navigate to={redirectTo} replace={true} />
  }

  export default AuthProtectedRoute