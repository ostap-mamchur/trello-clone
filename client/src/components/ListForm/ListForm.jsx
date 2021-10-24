import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../features/listsSlice";

function ListForm() {
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const handleSaveClick = () => {
        if (name) {
            dispatch(
                addList({
                    name,
                })
            );
            setName("");
            setIsOpen(false);
        }
    };

    const handleOpenForm = () => {
        setIsOpen(true);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCloseForm = () => {
        setIsOpen(false);
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button onClick={handleOpenForm} variant="contained" color="secondary">
                Add board
            </Button>
            <Dialog open={isOpen} onClose={handleCloseForm}>
                <DialogTitle>Board</DialogTitle>
                <DialogContent>
                    <TextField
                        inputProps={{ maxLength: 16 }}
                        onChange={handleNameChange}
                        value={name}
                        autoFocus
                        margin="dense"
                        label="Name"
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm}>Cancel</Button>
                    <Button onClick={handleSaveClick}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ListForm;
