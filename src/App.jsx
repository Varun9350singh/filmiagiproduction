
import Home from "./component/Home/Home";
import Layout from "./component/Layout/Layout";

import {createBrowserRouter, RouterProvider } from "react-router-dom";
import ModelPage from "./component/modelPage/ModelPage";
import TeamPage from "./component/TeamPage/TeamPage";
import NotFound from "./component/NotFound/NotFound";


function App() {

  const router =createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {path:'', element:<Home/>},
        {path:'artist/:artistId',element:<ModelPage/>},
        {path:'team/:teamId',element:<TeamPage/>}
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])



  return (
    <RouterProvider router={router} />
  );
}

export default App;
