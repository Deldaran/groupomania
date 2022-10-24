import { Navigate, useOutlet } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

// permet de rediriger vers la page login si non connécté
export const ProtectedLayout = () => {
  const { user } = useAuth();
  const [verifyState,setVerifyState] = useState();
  const outlet = useOutlet();
  // verifi si le token est valid
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
