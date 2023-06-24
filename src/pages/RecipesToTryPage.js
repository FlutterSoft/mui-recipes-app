import { useState, useEffect, useContext } from 'react'
import { Container, Typography } from '@mui/material'
import RecipesList from '../components/RecipesList'
import { RecipesContext } from '../App'

export default function RecipesToTryPage(){
  const {recipes, setRecipes} = useContext(RecipesContext)
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch("http://localhost:3004/recipes?status=unused")
    //         if (response.ok) {
    //           const recipeData = await response.json()
    //           setRecipes(recipeData)
    //         }
    //         else {
    //           console.log(`Error fetching recipes: ${response.status}`)
    //         }
    //       }
    //       catch (error) {
    //         console.log('Error fetching recipes:', error)
    //       }
    //     }
    //     fetchData()
    //   }, [])


    return(
        <Container>
            <Typography variant="h4">
                Recipes To Try
            </Typography>
            <RecipesList filter={true} filterBy='unused' />
        </Container>
    )
}