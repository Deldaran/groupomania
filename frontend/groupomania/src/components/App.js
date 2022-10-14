import Banner from "./Banner";
import { Login, SignUp} from "../pages/Login";
import Body from "./Body";
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import { HomeLayout } from "./HomeLayout";
import { ProtectedLayout } from "./ProtectdLayout"

export default function App(){
      return (
               <Routes>
                  <Route element={<HomeLayout />}>
                        <Route index element={<Login />}/>
                        <Route path="/signUp" element={<SignUp />} />
                  </Route>
                  
                  <Route path="/dashboard" element={<ProtectedLayout />}>
                        <Route path="list" element={(<Banner/>,<Body/>)}/>
                  </Route>
               </Routes>
      )
}