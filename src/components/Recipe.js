import { Snackbar, Box, Button, Typography, Container, ListItemText, ListItem, List, Link, Stack, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { icons } from '../consts/icons'
import PopupMenu from './PopupMenu';
import { RecipesContext,SnackbarContext } from "../App";
import EditableTitle from "./EditableTitle";
import EditableLink from "./EditableLink";
import DeleteIconComponent from './DeleteIconComponent'
import RecommendationsList from './RecommendationsList'

export default function Recipe() {
    const { id: idParam } = useParams()
    const [recipe, setRecipe] = useState({})
    const { recipes, setRecipes } = useContext(RecipesContext)
    const navigate = useNavigate()
    const { setSnackbarMessage, setSnackbarOpen } = useContext(SnackbarContext)

    useEffect(() => {
        if (recipes.length === 0) return; // Return if recipes context is empty
        const fetchRecipe = () => {
            const result = recipes.find(({ id }) => id === Number(idParam));
            if (result) {
                setRecipe(result);
            }
        };

        fetchRecipe()
    }, [idParam, recipes])

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
                    <EditableTitle recipe={recipe}  />
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Stack direction="column" alignItems="center" justifyContent="center">
                            <DeleteIconComponent recipe={recipe} />
                            <Typography variant="caption">Delete</Typography>
                        </Stack>
                        <Stack direction="column" justifyContent="center" alignItems="center">
                            <PopupMenu recipe={recipe} icon={icons[recipe.status]} />
                            <Typography variant="caption">
                                {String(recipe.status)?.charAt(0).toUpperCase() + String(recipe.status)?.slice(1)}
                            </Typography>
                        </Stack>

                    </Stack>
                </Stack>
                <EditableLink recipe={recipe}  />

            </Box>
            <RecommendationsList />
        </Container>

    )
}