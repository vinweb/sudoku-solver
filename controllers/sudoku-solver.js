const solveSudoku = require("./sudoku");
let conflict = [];
let rows = [];

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

    checkRowPlacement(puzzleString, row, value) {
        conflict = [];
        for (let i = 0; i < puzzleString.length; i += 9) {
            rows.push(puzzleString.slice(i, i + 9));
        }
        if (rows[row].includes(value)) {
            conflict.push("row");
        }
        //console.log(conflict);
    }

    checkColPlacement(column, value) {
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
        if (cols[column - 1].includes(value)) {
            conflict.push("column");
        }
        //console.log(conflict);
    }

    checkRegionPlacement(puzzleString, region, value) {
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
        if (regions[region].includes(value)) {
            conflict.push("region");
        }
        if (conflict.length == 0) {
            return { valid: true };
        } else {
            return { valid: false, conflict: conflict };
        }
    }

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
