import { Typography, Container, Box } from "@mui/material";
import RecipesList from "../components/RecipesList";
import { useContext } from 'react'
import { RecipesContext } from "../App";

export default function FavouriteRecipesPage() {
  const { recipes, setRecipes } = useContext(RecipesContext)
  const recipesFiltered = recipes.filter(recipe => recipe.status === "favourite")

  return (
    <Container>
      <Typography variant="h4">
        Favourite Recipes
      </Typography>
      <RecipesList recipes={recipesFiltered} />
    </Container>
  )
}