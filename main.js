const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

async function connectToDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/Information");
        console.log("Connected to database");
    } catch (err) {
        console.error("Error connecting to DB", err);
    }
}

connectToDB();

const sch = new mongoose.Schema({
    name: String,
    email: String,
    id: Number
});

const Monmodel = mongoose.model("studentLists", sch);

// Route to get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Monmodel.find();
        res.json(students);
    } catch (err) {
        res.status(500).send("Error retrieving data");
    }
});

// Route to get a specific student by ID
app.get('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await Monmodel.findOne({ id: studentId });
        if (student) {
            res.json(student);
        } else {
            res.status(404).send("Student not found");
        }
    } catch (err) {
        res.status(500).send("Error retrieving data");
    }
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
});