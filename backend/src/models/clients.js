/*
Campos
    name
    email
    password
    birthdate
    status
    isVerified
    loginAttemps
    timeOut
*/

import mongoose, {Schema, model} from "mongoose"

const clientsSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    birthdate:{
        type: Date
    },
    status:{
        type: String
    },
    isVerified:{
        type: Boolean
    },
    loginAttemps:{
        type: Number
    },
    timeOut:{
        type: Number
    },
}, {
    timestamps: true,
    strict: false
})

export default model("Clients", clientsSchema)