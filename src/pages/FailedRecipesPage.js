import { Typography, Container, Box } from "@mui/material";
import RecipesList from "../components/RecipesList";
import { useState, useEffect, useContext } from 'react'
import { RecipesContext } from "../App";

export default function FailedRecipesPage(){
    const {recipes, setRecipes} = useContext(RecipesContext)

    const recipesFiltered = recipes.filter(recipe => recipe.status === "failed")

    return(
        <Container>
            <Typography variant="h4">
                Failed Recipes
            </Typography>
            <RecipesList recipes={recipesFiltered} />
        </Container>
    )
}