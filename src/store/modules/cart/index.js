import axios from "axios";
import * as types from './mutation-types'

const state = {
    cartItems: [],
    checkout: false
};

const mutations = {
    [types.UPDATE_CART_ITEMS] (state, payload){
        state.cartItems = payload
    },
    [types.CHECKOUT_CART] (state) {
        state.checkout = true;
    }
};

const actions = {
    getCartItems ({ commit }){
        axios.get("/api/cart").then((response) => {
            commit(types.UPDATE_CART_ITEMS, response.data)
        })
    },
    addCartItem ({ commit }, cartItem){
        axios.post("/api/cart", cartItem).then((response) => {
            commit("UPDATE_CART_ITEMS", response.data)
        })
    },
    removeCartItem ({ commit }, cartItem){
        axios.post("/api/cart/delete", cartItem).then((response) => {
            commit("UPDATE_CART_ITEMS", response.data)
        })
    },
    removeCartItemAll ({ commit }){
        axios.post("/api/cart/delete/all").then((response) => {
            commit("UPDATE_CART_ITEMS", response.data)
        })
    },
    checkoutCart ({ commit }) {
        axios.post('/api/cart/checkout').then((response) => {
            commit(types.CHECKOUT_CART, response.data)
            //commit(types.UPDATE_CART_ITEMS, response.data)
        })
    }
};

const getters = {
    cartItems: (state) => state.cartItems,
    cartTotal: (state) => {
        return state.cartItems
            .reduce((acc, cartItem) => {
                return cartItem.quantity * cartItem.price + acc
            }, 0)
            .toFixed(2)
    },
    cartQuantity: (state) => {
        return state.cartItems
            .reduce((acc, cartItem) => {
                return cartItem.quantity + acc;
            }, 0)
    }
};

const cartModule = {
    state,
    mutations,
    actions,
    getters
}
export default cartModule;