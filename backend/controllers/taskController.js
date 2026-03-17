const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            userId: req.userId,
        });

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 5, status, search } = req.query;

        const query = {
            userId: req.userId,
        };
        console.log("User ID:", req.userId);

        if (status) query.status = status;

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        console.log(req.query);
        const tasks = await Task.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { title, description, status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};