import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Form from './Form'
import './ManagerLogin.css'


const ManagerLogin = () => {



    const fields = [
        { name: "email", type: "text", required: true },
        { name: "password", type: "password", required: true },
    ]

    const { login, manager } = useAppContext()

    if (manager)
        return <Navigate to="/" />

    return (
        <div className="managerLogin">
            <h1>התחברות מנהלים</h1>
            <Form fields={fields} onSubmit={(values) => {
                console.log(values)
                login(values)
            }} />
        </div>
    )
}

export default ManagerLogin