import { useEffect, useState, useContext } from 'react'
import Recipe from './Recipe'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { Typography, Link } from '@mui/material';
import { icons } from '../consts/icons'
import PopupMenu from './PopupMenu';
import { RecipesContext } from '../App';

export default function RecipesList({filter, filterBy}) {
  const { recipes, setRecipes } = useContext(RecipesContext)

  const navigate = useNavigate()

  const handleStatusChange = (e) => {
    e.stopPropagation()
    console.log('hi')
  }
  let recipesFinal = {}

  if(filter){
    console.log(filter)
    recipesFinal = recipes.filter(recipe => recipe.status === filterBy)
  }
  else{
    recipesFinal = recipes
  }

  return (
    <div>
      {/* <h2>{title}</h2> */}
      <TableContainer component={Paper} sx={{mt:3}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#42a5f5' }}>
            <TableRow >
              <TableCell>
                <Typography variant="button">
                  Recipe Name
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="button">
                  Type
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="button">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="button">
                  Link
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="button">
                  Modify
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipesFinal.map((row) => (
              <TableRow
                key={row.title}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer'
                }}
                hover={true}
                onClick={() => navigate(`/recipes/${row.id}`)}
              >
                <TableCell key={row.id} component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">

                    <PopupMenu recipe={row} icon={icons[row.status]} handleClick={handleStatusChange}/>

                  </TableCell>
                <TableCell align="right" >
                  <Link
                    href={row.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="black"
                    underline="none"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      '&:hover': {
                        color: '#42a5f5',
                        textDecoration: 'underline',
                      },
                      '&:visited': {
                        color: '#black',
                      },
                    }}
                  >
                    <OpenInNewIcon />
                  </Link>
                </TableCell>
                <TableCell align="right">Icons</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}