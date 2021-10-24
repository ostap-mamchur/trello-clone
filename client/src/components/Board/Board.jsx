import {
    List,
    Card,
    IconButton,
    CardHeader,
    Typography,
    CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Item from "../Item/Item";
import { useDispatch } from "react-redux";
import { deleteList } from "../../features/listsSlice";
import ItemForm from "../ItemForm/ItemForm";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

function Board({ _id, name, items }) {
    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        if (items.length === 0) {
            dispatch(deleteList({ _id }));
        }
    };

    const [open, setOpen] = useState(false);

    const handleOpenFormClick = () => {
        setOpen(true);
    };

    return (
        <>
            <Card
                sx={{
                    marginRight: 3,
                    width: 300,
                    height: 500,
                    overflow: "auto",
                    backgroundColor: "secondary.light",
                    borderRadius: 2,
                }}
            >
                <CardHeader
                    action={
                        <>
                            <IconButton
                                onClick={handleOpenFormClick}
                                aria-label="add"
                            >
                                <AddIcon />
                            </IconButton>
                            <IconButton
                                onClick={handleDeleteClick}
                                aria-label="delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }
                    title={
                        <Typography variant="h6" component="div" sx={{ wordBreak: "break-word" }}>
                            {name}
                        </Typography>
                    }
                />
                <CardContent>
                    <Droppable droppableId={_id}>
                        {(provided) => (
                            <List
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {items.map((item, index) => (
                                    <Item
                                        key={item._id}
                                        index={index}
                                        {...item}
                                        listId={_id}
                                    />
                                ))}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </CardContent>
            </Card>

            <ItemForm listId={_id} open={open} setOpen={setOpen} />
        </>
    );
}

export default Board;
