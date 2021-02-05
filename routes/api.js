"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route("/api/check").post(() => {});

    app.route("/api/solve").post((req, res) => {
        let puzzleString = req.body.puzzle;
        const regex = /[^0-9.]/;
        if (
            !puzzleString ||
            puzzleString.length !== 81 ||
            regex.test(puzzleString)
        ) {
            return res.json(solver.validate(puzzleString));
        } else {
            return res.json(solver.solve(puzzleString));
        }
    });
};
