import { IconButton, MenuItem } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { RecipesContext, SnackbarContext } from '../App';
import { useContext, useState } from 'react'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function FormDialog({ setOpen, open, action }) {

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [newRecipe, setNewRecipe] = useState({title:"", link:"", type:"Treats", status: "unused"})

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> 
                    Add New Recipe
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="recipe-name"
                        label="Recipe Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newRecipe.recipeName}
                        onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="recipe-link"
                        label="Recipe Link"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newRecipe.recipeLink}
                        onChange={(e) => setNewRecipe({...newRecipe, link: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="recipe-type"
                        select
                        defaultValue="Treats"
                        label="Recipe Type"
                        helperText="Select the recipe type"
                        onChange={(e) => setNewRecipe({...newRecipe, type: e.target.value})}
                    >
                        <MenuItem key="treats" value="Treats">
                            Treats
                        </MenuItem>
                        <MenuItem key="meal" value="Meal">
                            Meal
                        </MenuItem>
                        </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose()
                        // console.log(newRecipe)
                        action(newRecipe)
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default function AddNewRecipeComponent() {
    const { setSnackbarMessage, setSnackbarOpen } = useContext(SnackbarContext)
    const [newRecipe, setNewRecipe] = useState({})
    const [open, setOpen] = React.useState(false);
    const { recipes, setRecipes } = useContext(RecipesContext)

    const addRecipe = async (newRecipe) => {
        try {
            const response = await fetch(`http://localhost:3004/recipes`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newRecipe), // body data type must match "Content-Type" header
            })
            if (response.ok) {
                const newRecipeData = await response.json()
                setSnackbarMessage('Recipe Added')
                setSnackbarOpen(true)
                setRecipes([...recipes, newRecipeData])
            }
            else {
                console.log(`Error adding recipe: ${response.status}`)
                setSnackbarMessage('Error adding recipe')
                setSnackbarOpen(true)
            }
        }
        catch (error) {
            console.log('Error adding recipe:', error)
            setSnackbarMessage('Error adding recipe')
            setSnackbarOpen(true)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    return (
        <>
            <IconButton onClick={handleClickOpen} color="primary">
                <AddBoxIcon fontSize="large" />
            </IconButton>
            <FormDialog open={open} setOpen={setOpen} action={addRecipe} />
        </>
    )
}