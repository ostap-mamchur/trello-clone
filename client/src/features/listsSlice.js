import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    lists: [],
};

export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
    const lists = await axios.get("/api/lists/");
    return await lists.data;
});

export const addList = createAsyncThunk(
    "lists/addList",
    async (initialList) => {
        const response = await axios.post("/api/lists/", initialList);
        return await response.data;
    }
);

export const deleteList = createAsyncThunk(
    "lists/deleteList",
    async ({ _id }) => {
        await axios.delete(`/api/lists/${_id}`);
        return { _id };
    }
);

export const deleteItem = createAsyncThunk(
    "lists/deleteItem",
    async ({ _id, listId }) => {
        await axios.delete(`/api/lists/${listId}/items/${_id}`);
        return { _id, listId };
    }
);

export const addItem = createAsyncThunk(
    "lists/addItem",
    async ({ title, listId }) => {
        const response = await axios.post(`/api/lists/${listId}/items/`, { title });
        const item = await response.data;
        return { item, listId };
    }
);

export const updateItem = createAsyncThunk(
    "lists/updateItem",
    async ({ _id, title, listId }) => {
        const response = await axios.patch(`/api/items/${_id}`, { title });
        const item = await response.data;
        return { item, listId };
    }
);

export const updateItemPosition = createAsyncThunk(
    "list/updateItemPosition",
    async ({
        _id,
        listSourceId,
        listDestinationId,
        destinationIndex,
        sourceIndex,
    }) => {
        axios.patch(`/api/lists/${listSourceId}/items/${_id}`, {
            listDestinationId,
            index: sourceIndex,
        });
        return {
            listSourceId,
            listDestinationId,
            sourceIndex,
            destinationIndex,
        };
    }
);

const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.lists = state.lists.concat(action.payload);
            })
            .addCase(addList.fulfilled, (state, action) => {
                state.lists.push(action.payload);
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                const { _id } = action.payload;
                state.lists = state.lists.filter((list) => list._id !== _id);
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                const { listId, _id } = action.payload;
                const existingList = state.lists.find(
                    (list) => list._id === listId
                );
                existingList.items = existingList.items.filter(
                    (item) => item._id !== _id
                );
            })
            .addCase(addItem.fulfilled, (state, action) => {
                const { item, listId } = action.payload;
                const existingList = state.lists.find(
                    (list) => list._id === listId
                );
                existingList.items.push(item);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const { item, listId } = action.payload;
                const existingList = state.lists.find(
                    (list) => list._id === listId
                );
                const existingItem = existingList.items.find(
                    (i) => i._id === item._id
                );
                existingItem.title = item.title;
                existingItem.updatedAt = item.updatedAt;
            })
            .addCase(updateItemPosition.fulfilled, (state, action) => {
                const {
                    listSourceId,
                    listDestinationId,
                    sourceIndex,
                    destinationIndex,
                } = action.payload;

                const sourceList = state.lists.find(
                    (list) => list._id === listSourceId
                );
                let item = sourceList.items.splice(sourceIndex, 1);
                item = JSON.parse(JSON.stringify(item, undefined, 2));
                const destinationList = state.lists.find(
                    (list) => list._id === listDestinationId
                );
                destinationList.items.splice(destinationIndex, 0, item[0]);
            });
    },
});

export default listsSlice.reducer;

export const selectAllLists = (state) => state.lists.lists;
export const selectItemById = (state, _id, listId) => {
    const list = state.lists.lists.find((list) => list._id === listId);
    const item = list.items.find((item) => item._id === _id);
    return item;
};
