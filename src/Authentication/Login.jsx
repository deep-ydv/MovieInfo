import React from 'react'

const Login = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName,setLoggedInUserName]=useState("");
 useEffect(() => {
    const login=JSON.parse(localStorage.getItem("loginDetail"));
    console.log(login)
    if(login && login.check==="true")
    setIsLoggedIn(true);
 }, [])

  return (
    <div>Login</div>
  )
}

export default Login