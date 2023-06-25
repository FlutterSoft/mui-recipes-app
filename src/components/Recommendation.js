import { Snackbar, Stack, ListItem, IconButton, Divider, Box, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState, useContext } from 'react'
import { SnackbarContext } from '../App'

export default function Recommendation({ recommendation, recommendations, setRecommendations}) {
    const { setSnackbarMessage, setSnackbarOpen } = useContext(SnackbarContext)

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3004/recommendations/${recommendation.id}`,{
                method: 'DELETE'
            })
            if (response.ok) {
                const recData = await response.json()
                const updatedRecs = recommendations.filter( (r) => {
                    if(r.id !== recommendation.id){
                        return r
                    }
                    else return
                })
                setRecommendations(updatedRecs)
                setSnackbarMessage('Recommendation Deleted')
                setSnackbarOpen(true)
            }
            else {
                console.log(`Error fetching recipes: ${response.status}`)
                setSnackbarMessage('Error deleting recommendation')
                setSnackbarOpen(true)
            }
        }
        catch (error) {
            console.log('Error fetching recipes:', error)
            setSnackbarMessage('Error deleting recommendation')
            setSnackbarOpen(true)
        }
    }

    return (
        <Box >
            <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
                <ListItem key={recommendation.id}>
                    <ListItemText primary={recommendation.body} />
                </ListItem>
                <IconButton onClick={handleDelete} color="primary">
                    <DeleteIcon />
                </IconButton>
            </Stack>
            <Divider />

        </Box>
    )
}