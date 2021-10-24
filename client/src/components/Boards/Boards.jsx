import { Box } from "@mui/material";
import Board from "../Board/Board";
import { selectAllLists, updateItemPosition } from "../../features/listsSlice";
import { useDispatch, useSelector } from "react-redux";

import { DragDropContext } from "react-beautiful-dnd";

function Boards() {
    const lists = useSelector(selectAllLists);
    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        
        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;
        dispatch(
            updateItemPosition({
                _id: draggableId,
                listSourceId: source.droppableId,
                listDestinationId: destination.droppableId,
                destinationIndex: destination.index,
                sourceIndex: source.index,
            })
        );
    };

    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
        >
            <Box
                sx={{
                    display: "inline-flex",
                    overflow: "auto",
                    padding: 4,
                }}
            >
                {lists.map((list) => (
                    <Board key={list._id} {...list} />
                ))}
            </Box>
        </DragDropContext>
    );
}

export default Boards;
