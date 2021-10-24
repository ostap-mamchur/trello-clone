import { ListItem, IconButton, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemForm from "../ItemForm/ItemForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { deleteItem } from "../../features/listsSlice";

function Item({ _id, title, listId, index }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleEditClick = () => {
        setOpen(true);
    };

    const handleDeleteClick = () => {
        dispatch(deleteItem({ _id, listId }));
    };

    return (
        <Draggable draggableId={_id} index={index}>
            {(provided) => (
                <ListItem
                    draggable={true}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        padding: 1,
                        borderRadius: 2,
                        backgroundColor: "white",
                        marginBottom: 1,
                    }}
                    alignItems="flex-start"
                    secondaryAction={
                        <ButtonGroup >
                            <IconButton
                                onClick={handleEditClick}
                                edge="end"
                                aria-label="edit"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={handleDeleteClick}
                                edge="end"
                                aria-label="delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ButtonGroup>
                    }
                >
                    <div style={{marginRight: 50, wordBreak: "break-word"}}>{title}</div>
                    <ItemForm _id={_id} listId={listId} open={open} setOpen={setOpen} />
                </ListItem>
            )}
        </Draggable>
    );
}

export default Item;
