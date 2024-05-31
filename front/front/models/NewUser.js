const { Schema, models, model } = require("mongoose");

const NewUserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true,},
}, {timestamps: true});

export const NewUser = models?.NewUser || model('NewUser', NewUserSchema);