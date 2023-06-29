import { useContext, useState } from "react"
import { RecipesContext, SnackbarContext } from "../App"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./AlertDialog";
import { useLocation } from 'react-router-dom'

export default function DeleteIconComponent({ recipe }) {
    const { recipes, setRecipes } = useContext(RecipesContext)
    const { setSnackbarMessage, setSnackbarOpen } = useContext(SnackbarContext)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const confirmDeletion = (e) => {
        e.stopPropagation()
        setDeleteOpen(true)
    }

    const handleDelete = async (e) => {
        try {
            const response = await fetch(`http://localhost:3004/recipes/${recipe.id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                const recData = await response.json()
                const updatedRecipes = recipes.filter(r => r.id !== recipe.id)

                if(pathname.includes('/recipes/')){
                    navigate(-1)
                }
                else{
                    navigate(pathname)
                }
                setRecipes(updatedRecipes)
                setSnackbarMessage('Recipe Deleted')
                setSnackbarOpen(true)
            }
            else {
                console.log(`Error fetching recipes: ${response.status}`)
                setSnackbarMessage('Error deleting recipe')
                setSnackbarOpen(true)
            }
        }
        catch (error) {
            console.log('Error fetching recipes:', error)
            setSnackbarMessage('Error deleting recipe')
            setSnackbarOpen(true)
        }
    }
    return (
        <div>
            <IconButton onClick={confirmDeletion} >
                <DeleteIcon color="error" />
            </IconButton>
            <AlertDialog open={deleteOpen} setOpen={setDeleteOpen} message="Are you sure you wish to delete this recipe?" action={handleDelete} />

        </div>
    )
}