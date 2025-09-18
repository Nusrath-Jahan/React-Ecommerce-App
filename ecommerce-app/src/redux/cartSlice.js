import { createSlice } from "@reduxjs/toolkit";
 const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.push({ ...product, quantity: 1 });
            }
        },

removeFromCart: (state, action) => {
    return state.filter(item => item.id !== action.payload);
},
increaseQty: (state, action) => {
    const item = state.find(p => p.id === action.payload);
    if (item ) item.quantity += 1;
},
decreaseQty: (state, action) => {
const item = state.find(p => p.id === action.payload);
if (item && item.quantity > 1) item.quantity -= 1;
}

    }
 })
 export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;
 export default cartSlice.reducer;



 //problems
 //1. why here write "addToCart: (state, action)"? what is the meaning of state and action here?
 //2. why here use "state.find" and "state.push"?
 //3. why here use "return state.filter"?
//4. what is the meaning of "action.payload"? 
//5. what is the meaning of "const product = action.payload"?
//6. what is the meaning of "const existing = state.find(item => item.id === product.id)"?
//7. what is the meaning of "if (existing) { existing.quantity += 1; } else { state.push({ ...product, quantity: 1 }); }"?
//8. what is the meaning of "const item = state.find(p => p.id === action.payload)"?

//answers
//1. In Redux Toolkit, when you define a reducer function inside createSlice, it automatically receives two parameters: state and action. 
//   - state: This represents the current state of the slice. In this case, it's the cart array.
//   - action: This is an object that contains information about the action being dispatched, including a type and an optional payload. 
//     The payload is where you typically pass data needed to update the state.
//2. The find() method is used to search for an element in an array that matches a specific condition.
//3. The filter() method is used to create a new array by removing elements that do not match a specific condition.
//4. action.payload is the data that is passed as an argument to the action function. It contains the information needed to update the state.
//5. product is a variable that holds the data from the action payload. 
//6. existing is a variable that holds the element from the cart array that matches the product's id.
//7. If the product already exists in the cart, its quantity is increased by 1. Otherwise, the product is added to the cart with a quantity of 1.
//8. item is a variable that holds the element from the cart array that matches the product's id.