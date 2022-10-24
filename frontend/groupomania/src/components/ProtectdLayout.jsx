import { Navigate, useOutlet } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const [verifyState,setVerifyState] = useState();
  const outlet = useOutlet();
    const verify = async ()=>{
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
    useEffect(() => {
      verify();
    }, []);

  if (!user && !verifyState ) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};
