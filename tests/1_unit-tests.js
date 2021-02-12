const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
let puzzleString =
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
let puzzleStringInvalid =
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.,";
let puzzleStringSolve =
    "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
let puzzleStringSolveInvalid =
    "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.377";
let puzzleStringSolveSolution =
    "135762984946381257728459613694517832812936745357824196473298561581673429269145378";

suite("UnitTests", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
        assert.equal(solver.solve(puzzleString).solution.length, 81);
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
        assert.equal(
            solver.validate(puzzleStringInvalid).error,
            "Invalid characters in puzzle"
        );
    });
    test("Logic handles a puzzle string that is not 81 characters in length", () => {
        assert.equal(
            solver.validate("123").error,
            "Expected puzzle to be 81 characters long"
        );
    });
    test("Logic handles a valid row placement", () => {
        assert.isTrue(solver.checkRowPlacement(puzzleString, "0", "7"));
    });
    test("Logic handles an invalid row placement", () => {
        assert.isFalse(solver.checkRowPlacement(puzzleString, "0", "1"));
    });
    test("Logic handles a valid column placement", () => {
        assert.isTrue(solver.checkColPlacement(puzzleString, "1", "7"));
    });
    test("Logic handles an invalid column placement", () => {
        assert.isFalse(solver.checkColPlacement(puzzleString, "1", "1"));
    });
    test("Logic handles a valid region (3x3 grid) placement", () => {
        assert.notInclude(
            solver.checkRegionPlacement(puzzleString, "0", "7").conflict,
            "region"
        );
    });
    test("Logic handles an invalid region (3x3 grid) placement", () => {
        assert.include(
            solver.checkRegionPlacement(puzzleString, "0", "2").conflict,
            "region"
        );
    });
    test("Valid puzzle strings pass the solver", () => {
        assert.isString(solver.solve(puzzleString).solution);
    });
    test("Invalid puzzle strings fail the solver", () => {
        assert.equal(
            solver.solve(puzzleStringSolveInvalid).error,
            "Puzzle cannot be solved"
        );
    });
    test("Solver returns the the expected solution for an incomplete puzzzle", () => {
        assert.equal(
            solver.solve(puzzleStringSolve).solution,
            puzzleStringSolveSolution
        );
    });
});
