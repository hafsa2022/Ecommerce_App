import User from "../models/User.js";

const createUser = (data) => User.create(data);

const findByEmail = (email) => User.findOne({ email });

const findById = (id) => User.findById(id);

export { createUser, findByEmail, findById };
