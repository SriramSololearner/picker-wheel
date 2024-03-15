import { createSlice } from "@reduxjs/toolkit";


export interface Istate {
    isLoading: boolean,
    data: {
        id: number;
        option: string;
        style: {
            backgroundColor: string;
        };
        isChecked: boolean;
        image?: {
            uri: string;
            sizeMultiplier?: number
        }
    }[];

}

const initialState: Istate = {
    isLoading: false,
    data: [
        {
            id: 1,
            option: "better luck next time",
            style: { backgroundColor: "#EE4040" },
            isChecked: true,
            image: {
                uri: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
                sizeMultiplier: 0.5
            }
        },
        {
            id: 2,
            option: "won ₹70",
            style: { backgroundColor: "#F0CF50" },
            isChecked: true,
        },
    ]
}


const Slider = createSlice({
    name: "Slider",
    initialState,
    reducers: {
        handleSubmit: (state, action) => {
            const { payload } = action;
            state.data.push(payload);
        },
        handlerDel: (state, action) => {

            state.data = state.data.filter((item) => item.id !== action.payload)
        },
        handlerCopyText: (state, action) => {
            const { payload } = action
            const newData = [...state.data];
            let findData = state.data.find((obj) => obj.id === payload);

            findData && newData.splice(payload, 0, findData);
            const newArr = newData.map((eachObj, index) => ({
                ...eachObj,
                id: index + 1,
            }));
            state.data = newArr;
        },
        handlerUpload: (state, action) => {
            const { payload } = action
            state.data.push(payload)
        },
        handlerShuffle: (state) => {
            const newData = state.data.sort(() => Math.random() - 0.5);
            const newArr = newData.map((eachObj, index) => ({
                ...eachObj,
                id: index + 1,
            }));
            state.data = newArr;
        },
        handlerEdit: (state, action) => {
            const { payload } = action;
            const newData = [...state.data];
            console.log(payload.objId)
            newData[payload.objId - 1].option = payload.value;
            state.data = newData;
        },
        handlerCheck: (state, action) => {
            const { payload } = action;
            ; const newData = [...state.data];
            if (payload.checked) {
                newData[payload.currobj.id - 1] = {
                    ...newData[payload.currobj.id - 1],
                    isChecked: true,
                };
            } else {
                newData[payload.currobj.id - 1] = {
                    ...newData[payload.currobj.id - 1],
                    isChecked: payload.checked,
                };
            }
            state.data = newData;
        },
        handlerDragAndDrop: (state, action) => {
            const { payload } = action
            state.data = payload
        }
    },
})

export const { handleSubmit,
    handlerDel, handlerCopyText,
    handlerUpload, handlerShuffle,
    handlerDragAndDrop,
    handlerCheck, handlerEdit } = Slider.actions
export default Slider.reducer;