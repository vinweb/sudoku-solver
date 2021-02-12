"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route("/api/check").post((req, res) => {
        if (!req.body.coordinate || !req.body.value || !req.body.puzzle) {
            return res.json({ error: "Required field(s) missing" });
        }
        let coordinateArray = [...req.body.coordinate];
        let row;
        let column = coordinateArray[1];
        let puzzleString = req.body.puzzle;
        let value = req.body.value;
        let region;

        const regex = /[^1-9.]/;
        const regexValue = /[1-9]/;
        if (puzzleString.length !== 81)
            return res.json({
                error: "Expected puzzle to be 81 characters long",
            });
        if (regex.test(puzzleString)) {
            return res.json({ error: "Invalid characters in puzzle" });
        }
        if (!regexValue.test(value) || value.length !== 1) {
            return res.json({ error: "Invalid value" });
        }

        switch (coordinateArray[0]) {
            case "A":
                row = "0";
                break;
            case "B":
                row = "1";
                break;
            case "C":
                row = "2";
                break;
            case "D":
                row = "3";
                break;
            case "E":
                row = "4";
                break;
            case "F":
                row = "5";
                break;
            case "G":
                row = "6";
                break;
            case "H":
                row = "7";
                break;
            case "I":
                row = "8";
                break;
            default:
                row = "9";
        }
        switch (req.body.coordinate) {
            case "A1":
            case "A2":
            case "A3":
            case "B1":
            case "B2":
            case "B3":
            case "C1":
            case "C2":
            case "C3":
                region = "0";
                break;
            case "D1":
            case "D2":
            case "D3":
            case "E1":
            case "E2":
            case "E3":
            case "F1":
            case "F2":
            case "F3":
                region = "3";
                break;
            case "G1":
            case "G2":
            case "G3":
            case "H1":
            case "H2":
            case "H3":
            case "I1":
            case "I2":
            case "I3":
                region = "6";
                break;
            case "A4":
            case "A5":
            case "A6":
            case "B4":
            case "B5":
            case "B6":
            case "C4":
            case "C5":
            case "C6":
                region = "1";
                break;
            case "D4":
            case "D5":
            case "D6":
            case "E4":
            case "E5":
            case "E6":
            case "F4":
            case "F5":
            case "F6":
                region = "4";
                break;
            case "G4":
            case "G5":
            case "G6":
            case "H4":
            case "H5":
            case "H6":
            case "I4":
            case "I5":
            case "I6":
                region = "7";
                break;
            case "A7":
            case "A8":
            case "A9":
            case "B7":
            case "B8":
            case "B9":
            case "C7":
            case "C8":
            case "C9":
                region = "2";
                break;
            case "D7":
            case "D8":
            case "D9":
            case "E7":
            case "E8":
            case "E9":
            case "F7":
            case "F8":
            case "F9":
                region = "5";
                break;
            case "G7":
            case "G8":
            case "G9":
            case "H7":
            case "H8":
            case "H9":
            case "I7":
            case "I8":
            case "I9":
                region = "8";
                break;
            default:
                region = "9";
        }

        if (region === "9") {
            return res.json({ error: "Invalid coordinate" });
        }
        solver.checkRowPlacement(puzzleString, row, value);
        solver.checkColPlacement(puzzleString, column, value);
        return res.json(
            solver.checkRegionPlacement(puzzleString, region, value)
        );
    });

    app.route("/api/solve").post((req, res) => {
        let puzzleString = req.body.puzzle;
        const regex = /[^1-9.]/;
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
