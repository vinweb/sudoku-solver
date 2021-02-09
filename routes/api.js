"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route("/api/check").post((req, res) => {
        //rows:
        let coordinateArray = [...req.body.coordinate];
        let row = coordinateArray[0];
        let col = coordinateArray[1];
        let puzzleString = req.body.puzzle;
        let rows = [];
        for (let i = 0; i < puzzleString.length; i += 9) {
            rows.push(puzzleString.slice(i, i + 9));
        }
        //cols:
        let cols = [];
        let cols2d = [];
        for (let j = 0; j < 9; j++) {
            for (let i = 0; i < 9; i++) {
                cols2d.push(rows[i].slice(j, j + 1));
            }
        }
        let cols1d = [].concat(...cols2d);
        let colString = cols1d.join("");
        for (let i = 0; i < colString.length; i += 9) {
            cols.push(colString.slice(i, i + 9));
        }
        //regions:
        let regions = [];
        let subreg = [];
        for (let i = 0; i < puzzleString.length; i += 3) {
            subreg.push(puzzleString.slice(i, i + 3));
        }
        for (let j = 0; j < 27; j += 9) {
            for (let i = 0; i < 3; i++) {
                regions.push(
                    [subreg[j + i], subreg[j + i + 3], subreg[j + i + 6]].join(
                        ""
                    )
                );
            }
        }
    });

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
