"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route("/api/check").post((req, res) => {
        return console.log("check");
    });

    app.route("/api/solve").post((req, res) => {
        return res.json(solver.validate(req.body.puzzle));
    });
};
