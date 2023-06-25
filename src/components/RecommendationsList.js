import { Card, CardContent, Stack, Typography, IconButton, List, ListItem, Paper } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Recommendation from './Recommendation'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import FormDialog from './FormDialog';
import { SnackbarContext } from '../App';

export default function RecommendationsList() {
    const [recommendations, setRecommendations] = useState([])
    const { id: idParam } = useParams()
    const [showAddRec, setShowAddRec] = useState(false)
    const { setSnackbarMessage, setSnackbarOpen } = useContext(SnackbarContext)

    const handleAdd = async (recommendation) => {
        try {
            const response = await fetch(`http://localhost:3004/recommendations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: recommendation, recipeId: idParam }),
            });

            if (response.ok) {
                const recData = await response.json()
                const updatedRecs = [...recommendations, recData]
                setRecommendations(updatedRecs)
                setSnackbarMessage('Recommendation Added')
                setSnackbarOpen(true)
            }
            else {
                console.log(`Error fetching recipes: ${response.status}`)
                setSnackbarMessage('Error adding recommendation')
                setSnackbarOpen(true)
            }
            
        } catch (error) {
            console.log('Error adding recommendation:', error);
        }
    }

    const fetchRecommendations = async () => {
        try {
            const response = await fetch(`http://localhost:3004/recommendations?recipeId=${idParam}`)
            if (response.ok) {
                const recommendationsData = await response.json()
                setRecommendations(recommendationsData)
            }
            else {
                console.log('Error fetching recommendations: ', response.status)
            }
        }
        catch (error) {
            console.log('Error fetching recommendations:', error)
        }
    }

    useEffect(() => {
        fetchRecommendations()
    }, [])

    const renderedRecommendations = recommendations.map(rec => {
        return (
            <Recommendation
                key={rec.id}
                recommendation={rec}
                recommendations={recommendations} setRecommendations={setRecommendations} />
        )
    })

    return (
        <Card elevation={2}>
            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography variant="h6">
                        Recommendations:
                    </Typography>
                    <IconButton onClick={() => setShowAddRec(true)} color="primary">
                        <AddBoxIcon />
                    </IconButton>
                </Stack>
                <List>
                    {renderedRecommendations}
                </List>
                <FormDialog open={showAddRec} setOpen={setShowAddRec} title="Recommendations" bodyText="Add a recommendation for this recipe." placeholder="" action={handleAdd} />
            </CardContent>
        </Card>

    )
}