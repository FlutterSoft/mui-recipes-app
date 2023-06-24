import { Box, Button, Typography, Container, ListItemText, ListItem, List, Link, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { icons } from '../consts/icons'
import PopupMenu from './PopupMenu';
import { RecipesContext } from "../App";

export default function Recipe() {
    const { id: idParam } = useParams()
    const [recipe, setRecipe] = useState({})
    const { recipes, setRecipes } = useContext(RecipesContext)
    const [recommendations, setRecommendations] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (recipes.length === 0) return; // Return if recipes context is empty
        const fetchRecipe = () => {
            const result = recipes.find(({ id }) => id === Number(idParam));
            if (result) {
                setRecipe(result);
            }
        };

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

        fetchRecipe()
        fetchRecommendations()
    }, [idParam, recipes])

    const renderedRecommendations = recommendations.map(rec => {
        return (
            <ListItem key={rec.id}>
                <ListItemText primary={rec.body} />
            </ListItem>
        )
    })

    return (
        <Container>
            <Box>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 3 }}
                >
                    Go Back
                </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Stack direction="row" justifyContent="space-between"
                    alignItems="center">
                    <Typography component="h2" variant="h4" >
                        {recipe.title}
                    </Typography>
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <PopupMenu recipe={recipe} icon={icons[recipe.status]} />
                        <Typography variant="caption">
                            {recipe.status}
                        </Typography>

                    </Stack>
                </Stack>
                <Link href={recipe.link} target="_blank" underline="hover" sx={{ ml: 0.3 }}>
                    Link to recipe
                </Link>
            </Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Recommendations:
                    </Typography>
                    <List >
                        {renderedRecommendations}
                    </List>
                </CardContent>
            </Card>

        </Container>

    )
}