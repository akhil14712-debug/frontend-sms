import React, { useState } from 'react'

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
  return (

    <>
    <form>
        <input type="text" placeholder='Enter your email'></input>
        <input type="text" placeholder='Enter your password'></input>
        <button>submit</button>
    </form>
    </>
  )
}

export default Login