import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
//import { useHistory } from 'react-router-dom';

export const useResetPwd = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    //const history = useHistory();


    const resetpwd = async (email,password,newpassword) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/resetPwd', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password, newpassword })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
           // localStorage.setItem('user', JSON.stringify(json))
          // history.push('/');

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // update loading state
            setIsLoading(false)
        }
    }

    return { resetpwd, isLoading, error }
}