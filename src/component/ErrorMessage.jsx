import RobotError from '../images/error.gif'

const ErrorMessage = () => {
    return (
        <img style={{ display: 'block', width: "250px", height: "250px",objectFit: 'contain', margin: "0 auto"}}  src={RobotError} alt="Error"/>
    )
}

export default ErrorMessage;