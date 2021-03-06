import React, { useState } from 'react';
import Square from './square';
import * as chess_utils from './chess_utils.js'; 
const DIMS = 8;

const WHITE_KING = "\u2654";
const WHITE_QUEEN = "\u2655";
const WHITE_ROOK = "\u2656";
const WHITE_BISHOP = "\u2657";
const WHITE_KNIGHT = "\u2658";
const WHITE_PAWN = "\u2659";
const BLACK_KING = "\u265A";
const BLACK_QUEEN = "\u265B";
const BLACK_ROOK = "\u265C";
const BLACK_BISHOP = "\u265D";
const BLACK_KNIGHT = "\u265E";
const BLACK_PAWN = "\u265F";
const pieceLookup = {
    K: WHITE_KING,
    Q: WHITE_QUEEN,
    R: WHITE_ROOK,
    B: WHITE_BISHOP,
    N: WHITE_KNIGHT,
    P: WHITE_PAWN,
    k: BLACK_KING,
    q: BLACK_QUEEN,
    r: BLACK_ROOK,
    b: BLACK_BISHOP,
    n: BLACK_KNIGHT,
    p: BLACK_PAWN,
}

const DumbBoard = ({position, highlightList, handleClick}) => {
    console.log(position)
    const [reverse, setReverse] = useState(false);

    const renderSquare = (piece, boardCoord) => {
        const highlighted = highlightList.includes(chess_utils.boardCoord2uci(boardCoord))
        const colorClass = (boardCoord.row % 2 === boardCoord.col % 2) ? "square-black" : "square-white"

        return (
            <Square
                key={chess_utils.boardCoord2key(DIMS, boardCoord)}
                piece={piece}
                onClick={() => handleClick(boardCoord)}
                highlighted={highlighted}
                colorClass={colorClass}
            />
        );
    }

    const renderRow = (row, rowInd, reverse) => {
        const [startInd, endInd, indStep] = !reverse ? [0, DIMS, 1] : [DIMS-1, -1, -1]
        let rowElement = [];

        for (let colInd=startInd; colInd !== endInd; colInd += indStep) {
            rowElement.push(renderSquare(pieceLookup[row[colInd]], {row: rowInd, col: colInd}))
        }
        return (
            <div key={100+rowInd} className="board-row">
                {rowElement}
            </div>
        )
    }

    const renderBoard = () => {
        // Really need the old school loops - reversing causes problems, as does auto
        // generation of index with forEach
        const [startInd, endInd, indStep] = reverse ? [0, DIMS, 1] : [DIMS-1, -1, -1]
        let boardElement = [];
    
        for (let rowInd=startInd; rowInd !== endInd; rowInd += indStep) {
            boardElement.push(renderRow(position[rowInd], rowInd, reverse))
        }
        return boardElement;
    }

    const handleReverseClick = (reverseIn) => {
        setReverse(reverseIn)
    }

    return (
        <>
            <button onClick={() => handleReverseClick(!reverse)}>
                {reverse ? '^' : 'v'}
            </button>
            <div className="game-board">
                {renderBoard()}
            </div>
        </>
    );
}

export default DumbBoard;