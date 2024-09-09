import { useApp } from "../ThemedApp";
import {
   Box,
   AppBar,
   Toolbar,
   Typography,
   IconButton,
} from "@mui/material";
import {
   Menu as MenuIcon,
   Add as AddIcon,
   LightMode as LightModeIcon,
   DarkMode as DarkModeIcon,
} from "@mui/icons-material";
export default function Header() {
   const { showForm, setShowForm, mode, setMode, showDrawer, setShowDrawer } = useApp();

   return (
      <AppBar position="static">
         <Toolbar>
            <IconButton
               onClick={() => setShowDrawer(!showDrawer)}
               color="inherit"
               edge="start">
               <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1, ml: 2 }}>Yaycha</Typography>
            <Box>
               <IconButton
                  color="inherit"
                  onClick={() => setShowForm(!showForm)}>
                  <AddIcon />
               </IconButton>
               {mode === "dark" ? (
                  <IconButton
                     color="inherit"
                     edge="end"
                     onClick={() => setMode("light")}>
                     <LightModeIcon />
                  </IconButton>
               ) : (
                  <IconButton
                     color="inherit"
                     edge="end"
                     onClick={() => setMode("dark")}>
                     <DarkModeIcon />
                  </IconButton>
               )}
            </Box>


         </Toolbar>
      </AppBar>
   );
}