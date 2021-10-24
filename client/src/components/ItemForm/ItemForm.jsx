import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem, selectItemById } from "../../features/listsSlice";

function ItemForm({ _id, listId, open, setOpen }) {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    const item = useSelector((state) => selectItemById(state, _id, listId));

    useEffect(() => {
        if (item) {
            setTitle(item.title);
        }
    }, [item, setTitle]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmitClick = () => {
        if (title) {
            item
                ? dispatch(
                      updateItem({
                          ...item,
                          title,
                          listId,
                      })
                  )
                : dispatch(
                      addItem({
                          title,
                          listId,
                      })
                  );
            setTitle("");
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Item</DialogTitle>
            <DialogContent>
                <TextField
                    onChange={handleTitleChange}
                    value={title}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmitClick}>
                    {listId ? "Create" : "Edit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ItemForm;
