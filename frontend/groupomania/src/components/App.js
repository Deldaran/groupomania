import Banner from "../pages/Banner";
import { Login, SignUp} from "../pages/Login";
import {Modify} from "../pages/Modify"
import Body from "../pages/Body";
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import { HomeLayout } from "./HomeLayout";
import { ProtectedLayout } from "./ProtectdLayout"

// permet de créerune securité de la page et empecher les nom connécter d'y accéder 
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