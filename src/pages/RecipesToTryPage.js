import { useState, useEffect, useContext } from 'react'
import { Container, Typography } from '@mui/material'
import RecipesList from '../components/RecipesList'
import { RecipesContext } from '../App'

export default function RecipesToTryPage(){
  const {recipes, setRecipes} = useContext(RecipesContext)

  const recipesFiltered = recipes.filter(recipe => recipe.status === "unused")

    return(
        <Container>
            <Typography variant="h4">
                Recipes To Try
            </Typography>
            <RecipesList recipes={recipesFiltered} />
        </Container>
    )
}