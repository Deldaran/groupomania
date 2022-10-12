import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();
async function loginUser(credentials){
  return fetch('http://localhost:3000/auth/login',{
      method : 'POST',
      headers:{'content-Type':'application/json'},
      body: JSON.stringify(credentials)
  })
  .then(res =>  res.json())

}

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    let restoken = await loginUser(data)
    data={data,restoken}
    if(restoken== "false"){
      setUser(null)
        navigate("/", { replace: true });
      }
      else{
        setUser((data));
      navigate("/dashboard/list");
      }
  };
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};