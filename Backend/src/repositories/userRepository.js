import User from "../models/User.js";

const createUser = (data) => User.create(data);

const findByEmail = (email) => User.findOne({ email });

const findById = (id) => User.findById(id);

const findByIdAndUpdate = (id, cartData) => User.findByIdAndUpdate(id, {cartData});

export { createUser, findByEmail, findById , findByIdAndUpdate};
