import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";


const AuthContext = createContext();
async function signUpUser(credentials){
  return fetch('http://localhost:3000/auth/signup',{
      method: 'POST',
      headers:{
          'content-Type':'application/json'
      },
      body: JSON.stringify(credentials)
      })
      .then(data => data.json())
      
}
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
    data={restoken}
    if(restoken === "false"){
      setUser(null)
        navigate("/", { replace: true });
      }
      else{
        setUser((restoken));
      navigate("/dashboard/list");
      }
  };
  const signUp = async (data) => {
    let restoken = await signUpUser(data)
    data={data,restoken}
    if(restoken === "true"){
      setUser((data));
      navigate("/dashboard/list");
      }
      else{
        setUser(null)
        navigate("/SignUp", { replace: true });
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
      logout,
      signUp
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};