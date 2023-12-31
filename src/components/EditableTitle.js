import { Stack, Typography, IconButton, Box, TextField, Button, Snackbar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect, useContext } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save'
import { RecipesContext, SnackbarContext } from '../App';

export default function EditableTitle({ recipe }) {
    const [status, setStatus] = useState('readonly') // status can be: readonly - editing - saving - error
    const [title, setTitle] = useState('')
    const { recipes, setRecipes } = useContext(RecipesContext)
    const { setSnackbarMessage, setSnackbarOpen } = useContext(SnackbarContext)
    
    useEffect(() => {
        if (recipe && recipe.title) {
            setTitle(recipe.title);
        }
    }, [recipe]);

    const handleClickEdit = (e) => {
        setStatus('editing')
    }
    const handleClickSave = async (e) => {
        setStatus('saving')
        try {
            const response = await fetch(`http://localhost:3004/recipes/${recipe.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...recipe, title: title }),
            })
            if (response.ok) {
                const updatedRecipeData = await response.json();
                // Find the index of the recipe with the matching id
                const recipeIndex = recipes.findIndex((r) => r.id === recipe.id);

                if (recipeIndex !== -1) {
                    // Replace the recipe at the found index with the updated recipe
                    const updatedRecipes = [
                        ...recipes.slice(0, recipeIndex),
                        updatedRecipeData,
                        ...recipes.slice(recipeIndex + 1),
                    ]

                    // Update the recipes state with the updated recipes array
                    setRecipes(updatedRecipes);
                    setStatus('readonly')
                    setSnackbarMessage('Title updated')
                    setSnackbarOpen(true)
                }
            }
            else {
                console.log('Error saving title', response.status)
                setStatus('error')
                setSnackbarMessage('Error saving title')
                setSnackbarOpen(true)

            }
        }
        catch (error) {
            console.log('Error saving title', error)
            setStatus('error')
            setSnackbarMessage('Error saving title')
            setSnackbarOpen(true)
        }

    }
    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    return (
        <Box>
            {status === 'readonly' &&
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography sx={{maxWidth: '30rem'}} component="h2" variant="h4" >
                        {recipe.title}
                    </Typography>
                    <Stack mx={1} direction="column" alignItems="center" justifyContent="center" >
                        <IconButton onClick={handleClickEdit} color="primary">
                            <EditIcon />
                        </IconButton>
                        <Typography align="center" variant="caption">
                            Edit Title
                        </Typography>
                    </Stack>
                </Stack>
            }
            {status === 'editing' &&
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <TextField id="standard-basic" label="" value={title} onChange={handleChange} />
                    <Button size="medium" onClick={handleClickSave} color="primary" variant="outlined" sx={{ ml: 3 }}>
                        Save
                    </Button>
                </Stack>
            }
            {status === 'saving' &&
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <TextField disabled id="standard-basic" label="" value={title} />
                    <LoadingButton sx={{ ml: 3 }} loading loadingPosition="start" startIcon={<SaveIcon />} size="medium" onClick={handleClickSave} color="primary" variant="outlined">
                        Saving
                    </LoadingButton>
                </Stack>
            }
            {status === 'error' &&
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <TextField id="standard-basic" focused color="warning" label="Error Saving" value={title} onChange={handleChange} />
                    <Button size="medium" onClick={handleClickSave} color="error" variant="outlined" sx={{ ml: 3 }}>
                        Save
                    </Button>
                </Stack>
            }
        </Box>
    )
}