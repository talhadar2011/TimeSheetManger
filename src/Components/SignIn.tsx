import React from 'react'
interface SignInProps {
    User: boolean;
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
export default function SignIn({User,setUser}:SignInProps) {

    const handleSigin=()=>{
        setUser(true)
    }
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={handleSigin} >SignIn</button>
        </div>
    )
}
