import { Typography, Container, Box } from "@mui/material";
import RecipesList from "../components/RecipesList";
import { useState, useEffect, useContext } from 'react'
import { RecipesContext } from '../App'

export default function AllRecipesPage(){

  const { recipes } = useContext(RecipesContext)

    return(
        <Container>
            <Typography variant="h4">
                All Recipes
            </Typography>
            <RecipesList filter={false} />
        </Container>
    )
}