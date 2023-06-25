import { Typography, Snackbar } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { Outlet, useLocation } from 'react-router-dom'
import { createContext, useState, useEffect } from 'react'

export const RecipesContext = createContext()
export const SnackbarContext = createContext()

function App() {
  const location = useLocation()
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3004/recipes")
        if (response.ok) {
          const recipeData = await response.json()
          setRecipes(recipeData)
        }
        else {
          console.log(`Error fetching recipes: ${response.status}`)
        }
      }
      catch (error) {
        console.log('Error fetching recipes:', error)
      }
    }
    fetchData()
  }, [])


  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, filteredRecipes, setFilteredRecipes }}>
      <Sidebar>
        {location.pathname === "/" && <Typography>
          Welcome to your recipe organiser. With this application you can add recipes you'd like to make and mark them as favourites or failed! You can also leave some recommendations for when you make it again next time!
        </Typography>}
        <SnackbarContext.Provider value={{ snackbarMessage, setSnackbarMessage, snackbarOpen, setSnackbarOpen }}>
          <Outlet />  
        </SnackbarContext.Provider>
      </Sidebar >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </RecipesContext.Provider >
  );
}

export default App;
