import React, { useRef } from 'react'
import { useSetUser } from '../API/TSMMutations';
import { useUserName } from '../API/TSMQuery';
import { UserAuth } from '../types/User';

  
export default function SignIn() {
    const setUsers=useSetUser()

    const inputRef = useRef<HTMLInputElement>(null)

    const { data, isLoading, error, refetch } = useUserName(inputRef.current?.value||"");

   
    const handleSigin=async()=>{
        // setUser(true)
        let username = inputRef.current?.value;

        if (username) {
            console.log("ReFETCh")
          await refetch(); // Manually trigger the username check
          username=""

        }

        if (data?.exists) {
          console.log('User exists, proceed with authentication.');
          // Add password validation or further logic here
        } else {
          console.error('User does not exist.');
        }
    }
    
    const handleSignUp=()=>{
        if (inputRef.current) {
            console.log(inputRef.current.value,"Hello")
             setUsers.mutate({UserName:inputRef.current.value})
          }
    }
    return (
        <div>
            <h1>Sign In</h1>
            <input ref={inputRef} type='text' placeholder='Enter UserName'></input>
            <button onClick={handleSigin} >SignIn</button>
            <button onClick={handleSignUp}>SignUP</button>
        </div>
    )
}
