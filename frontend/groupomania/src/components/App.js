import Banner from "./Banner";
import { Login, SignUp} from "../pages/Login";
import Body from "./Body";
import { BrowserRouter as Router, Routes , Route, Navigate,useNavigate } from 'react-router-dom'
import useToken from './useToken';
import { HomeLayout } from "./HomeLayout";
import { ProtectedLayout } from "./ProtectdLayout"

export default function App(){
    const { token, setToken } = useToken();
      return (
               <Routes>
                  <Route element={<HomeLayout />}>
                        <Route index element={<Login setToken={setToken} />}/>
                        <Route path="/signUp" element={<SignUp setToken={setToken}/>} />
                  </Route>
                  
                  <Route path="/dashboard" element={<ProtectedLayout />}>
                        <Route path="list" element={(<Banner/>,<Body/>)}/>
                  </Route>
               </Routes>
      )
}