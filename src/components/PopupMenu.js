import { useState, useContext } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import { RecipesContext } from '../App';

export default function PopupMenu({ recipe, icon }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { recipes, setRecipes } = useContext(RecipesContext)

    const updateStatus = async (id, selection) => {
        try {
            const response = await fetch(`http://localhost:3004/recipes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...recipe, status: selection }),
            });

            if (response.ok) {
                const updatedRecipeData = await response.json();
                // Find the index of the recipe with the matching id
                const recipeIndex = recipes.findIndex((r) => r.id === id);

                if (recipeIndex !== -1) {
                    // Replace the recipe at the found index with the updated recipe
                    const updatedRecipes = [
                        ...recipes.slice(0, recipeIndex),
                        updatedRecipeData,
                        ...recipes.slice(recipeIndex + 1),
                    ]

                    // Update the recipes state with the updated recipes array
                    setRecipes(updatedRecipes);
                    
                } else {
                    console.log(`Error updating recipe: ${response.status}`);
                }
            }} catch (error) {
                console.log('Error updating recipe:', error);
            }
        };

        const handleClick = (event) => {
            event.stopPropagation()
            setAnchorEl(event.currentTarget);
        };

        const handleClose = (event, selection) => {
            event.stopPropagation()
            setAnchorEl(null);

            // Check if the selection is one of the valid options
            const validOptions = ['unused', 'favourite', 'failed', 'reattempt'];
            if (validOptions.includes(selection)) {
                updateStatus(recipe.id, selection);
            }
        }

        return (
            <div>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    aria-label={recipe.status} color="primary" >
                    {icon}
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={(e) => handleClose(e, 'unused')}>Unused</MenuItem>
                    <MenuItem onClick={(e) => handleClose(e, 'favourite')}>Favourite</MenuItem>
                    <MenuItem onClick={(e) => handleClose(e, 'failed')}>Failed</MenuItem>
                    <MenuItem onClick={(e) => handleClose(e, 'reattempt')}>Reattempt</MenuItem>
                </Menu>
            </div>
        );
    }