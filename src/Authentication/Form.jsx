import React, { useEffect, useState } from 'react'

const Form = ({setIsLoggedIn,setLoggedInUserName}) => {

  const [isLogin, setIsLogin] = useState(true)
  const [formText, setFormText] = useState("Login Form")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({});
  // localStorage.clear()
  
  useEffect(() => {
  const userdata=JSON.parse(localStorage.getItem("user"));
  console.log(userdata);
  setFormData(userdata);
  
  
  }, [])

  const handleClick=()=>{
   setIsLogin(prev=>!prev);
   if(formText==="Login Form")
   setFormText("Signup Form")
   else 
   setFormText("Login Form")
  }


  const handleLogin=(e)=>{
    e.preventDefault();
    console.log("email-"+email+" , password-"+password);
    const users=JSON.parse(localStorage.getItem("user"));
    const isUser=users.find((user)=>(user.email===email && user.password===password))
    
    if(isUser) {
      users.forEach((user)=>{
        if(user.email===email) setLoggedInUserName(user.username);
      })
      setIsLoggedIn(true)
      localStorage.setItem("loginDetail",JSON.stringify({"check":"true"}));
      
    }
    else alert("Not same");
    
    setEmail("");
    setPassword("")
    
  }
  const handleSignup=(e)=>{
    e.preventDefault();
    console.log("fullname-"+name+" , email-"+email+" , password-"+password);
    const users=JSON.parse(localStorage.getItem("user")) || [];
    const newUser={username:name,email:email,password:password}
    users.push(newUser);
    localStorage.setItem("user",JSON.stringify(users));
    
     setEmail("");
    setPassword("")
    setName("")
  }
  return (
    <div className='w-[100%] h-screen bg-[#123458] flex justify-center items-center'>
      <div className='w-[25%] min-w-[320px] h-[60%] min-h-[425px] p-4 bg-[#F1EFEC] flex flex-col rounded-lg  items-center gap-4'>
        <div className=' text-3xl p-2 font-sans font-bold'>{formText}</div>
        <div className='border-1 text-center w-[80%]  text-xl font-semibold flex rounded-md'>
          <button onClick={handleClick} className={`w-[50%] p-2 cursor-pointer rounded-sm ${isLogin?"text-white bg-[#123458]": ""}`}>
             Login</button> 
          <button onClick={handleClick} className={`w-[50%] p-2 cursor-pointer ${isLogin?"":"text-white bg-[#123458]"}`}> Signup</button>
        </div>
        {/* Login */}
        <div className='flex flex-col p-2 w-[100%] justify-center items-center'>
          <form className=' flex flex-col w-[100%] p-2 gap-4'>
          {!isLogin?
             <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Full Name'  className='p-2 border-2 rounded-lg'/>:""
          }
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email Address'  className='p-2 border-2 rounded-lg'/>
          <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='p-2 border-2 rounded-lg'/>
          {isLogin?
          <button className='bg-[#123458] p-2 text-white text-lg font-semibold rounded-lg cursor-pointer  hover:bg-blue-600' onClick={(e)=>handleLogin(e)}>Login</button>:
          <button className='bg-[#123458] p-2 text-white text-lg font-semibold rounded-lg cursor-pointer  hover:bg-blue-600' onClick={(e)=>handleSignup(e)}>Signup</button>
          }   
          </form>
          {isLogin?
          <div>Not a member? <a className='text-blue-700 cursor-pointer'>Create Account!</a></div>
        :
        <div>Already have a account? <a className='text-blue-700 cursor-pointer'>Login</a></div>}
        
        </div>
      </div>
    </div>
  )
}

export default Form