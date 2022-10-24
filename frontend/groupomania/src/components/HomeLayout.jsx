import { useEffect } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

//permet d'aller sur la page une fois connecté 
export const HomeLayout = () => {
  const { user } = useAuth();
  const [verifyState,setVerifyState] = useState();
  const outlet = useOutlet();
  //verifi si le token est valid
    const verify = async ()=>{
      if(user){
      const token = user.token
      const res = await fetch('http://localhost:3000/auth/verify', {
        method:'POST',
        headers:{
        'Authorization': 'Bearer  ' + user.token,
        },
        body: user
      })
      .then(res => res.json())
      setVerifyState(res)
      }
      else{
        setVerifyState(false)
      }
    }
    useEffect(() => {
      verify();
    }, []);

  if (user && verifyState) {
    return <Navigate to="/dashboard/list" replace />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};