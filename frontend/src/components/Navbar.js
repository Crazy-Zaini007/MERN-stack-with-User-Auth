import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

import { useAuthContext } from '../hooks/useAuthContext'
const Navbar = () => {

  const {logout}=useLogout()
  const {user}=useAuthContext()
  const handleClick=()=>{

    logout()
  }
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout</h1>
        </Link>
        <nav>
         
          {!user && (
            <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
          )}
          {user && (
            <div>
            <button className='shadow' onClick={handleClick}>Log Out</button>
            <span> {user.email}</span>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar