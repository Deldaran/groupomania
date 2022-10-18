import Banner from "./Banner";
import { Login, SignUp} from "../pages/Login";
import {Modify} from "../pages/Modify"
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
                        <Route path="listmodify" element={(<Banner/>,<Modify/>)}/>
                  </Route>
               </Routes>
      )
}