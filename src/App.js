import { Typography } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { Outlet } from 'react-router-dom'

function App() {
  return (
      <Sidebar> 
        <Outlet />
      </Sidebar>
  );
}

export default App;
