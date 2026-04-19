import express from "express";
const router = express.Router()
export default router;

import employees from "../db/employees";

router.get("/", (req, res) => {
    res.send(employees);
});

router.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * employees.length);
    res.send(employees[randomIndex]);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const employee = employees.find((e) => e.id === +id);

    if (!employee) {
        return res.status(404).send("Employee not found");
    }
    res.send(employee);
});

router.post("/", (req, res) => {
    if (!req.body) {
        return res.status(400).send("Request is missing body.")
    }

    const { name } = req.body

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).send("Name is required.");
    }

    const newEmployee = {
        id: employees.length + 1,
        name: name
    };

    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});