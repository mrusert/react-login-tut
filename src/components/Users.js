import { useState, useEffect } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from "react-router-dom"

const Users = () => {
  const [users, setUsers] = useState()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController() // used to cancel axios request if component unmounts

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get('/users', {
                signal: controller.signal
            })
            console.log(response.data)
            isMounted && setUsers(response.data)
        } catch (err) {
            console.error(err)
            // take them to login page if refresh token expires, and return them to the page they were on after successly relogin
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    getUsers()
    // run cleanup function when component is unmounted 
    return () => {
        isMounted = false 
        controller.abort()
    }
  }, [axiosPrivate, location, navigate])
  return (
    <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
    </article>
  )
}

export default Users