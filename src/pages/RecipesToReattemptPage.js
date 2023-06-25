import { Typography, Container, Box } from "@mui/material";
import RecipesList from "../components/RecipesList";
import { useState, useEffect, useContext } from 'react'
import { RecipesContext } from "../App";

export default function RecipesToReattemptPage(){
  const {recipes, setRecipes} = useContext(RecipesContext)

  const recipesFiltered = recipes.filter(recipe => recipe.status === "reattempt")

    return(
        <Container>
            <Typography variant="h4">
                Recipes To Reattempt
            </Typography>
            <RecipesList recipes={recipesFiltered}/>
        </Container>
    )
}