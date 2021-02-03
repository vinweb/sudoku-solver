class SudokuSolver {
    validate(puzzleString) {
        const regex = /[^0-9.]/;
        if (!puzzleString) return { error: "Required field missing" };
        if (puzzleString.length !== 81)
            return { error: "Expected puzzle to be 81 characters long" };
        if (regex.test(puzzleString))
            return { error: "Invalid characters in puzzle" };
        this.solve(puzzleString);
    }

    checkRowPlacement(puzzleString, row, column, value) {}

    checkColPlacement(puzzleString, row, column, value) {}

    checkRegionPlacement(puzzleString, row, column, value) {}

    solve(puzzleString) {
        return { solution: puzzleString };
    }
}

module.exports = SudokuSolver;
