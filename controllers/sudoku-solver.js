const solveSudoku = require("./sudoku");

class SudokuSolver {
    validate(puzzleString) {
        const regex = /[^0-9.]/;
        if (!puzzleString) return { error: "Required field missing" };
        if (puzzleString.length !== 81)
            return { error: "Expected puzzle to be 81 characters long" };
        if (regex.test(puzzleString)) {
            return { error: "Invalid characters in puzzle" };
        }
    }

    checkRowPlacement(puzzleString, row, column, value) {
        let rows = [];
        for (let i = 0; i < puzzleString.length; i += 9) {
            rows.push(puzzleString.slice(i, i + 9));
        }
        if (rows[row].includes(value)) {
            return { valid: false };
        } else {
            return { valid: true };
        }
    }

    checkColPlacement(puzzleString, row, column, value) {}

    checkRegionPlacement(puzzleString, row, column, value) {}

    solve(puzzleString) {
        let puzzleStringZeros = puzzleString.replace(/[.]/gi, "0");
        let puzzleArrayStrings = puzzleStringZeros.split("");
        let numberArray = puzzleArrayStrings.map((i) => {
            return Number(i);
        });
        let sudoku = [];
        while (numberArray.length) sudoku.push(numberArray.splice(0, 9));
        let sudokuSolved = solveSudoku(sudoku);
        if (sudokuSolved[0].includes(0)) {
            return { error: "Puzzle cannot be solved" };
        } else {
            let sudokuSolved1d = [].concat(...sudokuSolved);
            return {
                solution: sudokuSolved1d.join(""),
            };
        }
    }
}

module.exports = SudokuSolver;
