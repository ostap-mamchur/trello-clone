import { AppBar, Toolbar, Typography } from "@mui/material";
import ListForm from "../ListForm/ListForm";

function Navbar() {
    return (
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    Trello Clone
                </Typography>
                <ListForm />
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
