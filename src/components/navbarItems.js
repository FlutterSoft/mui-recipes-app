import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelIcon from '@mui/icons-material/Cancel';
import QuizIcon from '@mui/icons-material/Quiz';
import ListIcon from '@mui/icons-material/List';
import ReplayIcon from '@mui/icons-material/Replay';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <ListIcon />,
        label: 'All Recipes',
        route: 'all-recipes',
    },
    {
        id: 1,
        icon: <QuizIcon />,
        label: 'Recipes To Try',
        route: 'recipes-to-try',
    },
    {
        id: 2,
        icon: <FavoriteIcon />,
        label: 'Favourite Recipes',
        route: 'favourites',
    },
    {
        id: 3,
        icon: <CancelIcon />,
        label: 'Failed Recipes',
        route: 'failed',
    },
    {
        id: 4,
        icon: <ReplayIcon />,
        label: 'Recipes To Reattempt',
        route: 'recipes-to-reattempt',
    },
]
