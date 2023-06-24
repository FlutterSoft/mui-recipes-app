import { Typography, Container, Box } from "@mui/material";
import RecipesList from "../components/RecipesList";
import { useState, useEffect, useContext } from 'react'
import { RecipesContext } from "../App";

export default function FavouriteRecipesPage() {
  const { recipes, setRecipes } = useContext(RecipesContext)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3004/recipes?status=favourite")
  //       if (response.ok) {
  //         const recipeData = await response.json()
  //         setRecipes(recipeData)
  //       }
  //       else {
  //         console.log(`Error fetching recipes: ${response.status}`)
  //       }
  //     }
  //     catch (error) {
  //       console.log('Error fetching recipes:', error)
  //     }
  //   }
  //   fetchData()
  // }, [])


  return (
    <Container>
      <Typography variant="h4">
        Favourite Recipes
      </Typography>
      <RecipesList filter={true} filterBy='favourite' />
    </Container>
  )
}