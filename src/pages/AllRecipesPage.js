import { Typography, Container, Box, IconButton, Stack } from "@mui/material";
import RecipesList from "../components/RecipesList";
import { useContext } from 'react'
import { RecipesContext } from '../App'
import AddNewRecipeComponent from "../components/AddNewRecipeComponent";
export default function AllRecipesPage() {

    const { recipes } = useContext(RecipesContext)

    return (
        <Container>
            <Typography ml={1.5} variant="h4">
                All Recipes
            </Typography>
            <AddNewRecipeComponent />
            <RecipesList recipes={recipes} />
        </Container>
    )
}