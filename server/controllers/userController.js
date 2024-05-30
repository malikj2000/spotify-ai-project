import { db } from '../models/index.js';
const { User } = db;

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const newUser = await User.create({ firstName, lastName, email });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const users = await User.truncate();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error deleting all users:', error);
        res.status(500).json({ error: 'Failed to delete all users' });
    }
}