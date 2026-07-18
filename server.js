const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.use(express.static("public"));


app.get("/", (req, res) => {
    res.send("My Week 2 API");
});

app.post("/user", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    res.json({
        message: `Hello, ${name}!`
    });
});


app.get("/user/:id", (req, res) => {
    const id = req.params.id;

    res.send(`User ${id} profile`);
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            error: "Invalid JSON"
        });
    }

    next(err);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
