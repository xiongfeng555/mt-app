import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cart = new Schema({
    id: {
        type: String,
        require: true
    },
    detail: {
        type: Array,
        require: true
    },
    cartNo: { //购物车id
        type: String,
        require: true
    },
    user: { //用户
        type: String,
        require: true
    },
    time: { //时间
        type: String,
        require: true
    }
})

export default mongoose.model('Cart', Cart)