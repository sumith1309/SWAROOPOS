"use client";

import { useState, useCallback } from "react";

type Cell = "X" | "O" | null;

const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(board: Cell[]): Cell {
  for (const [a,b,c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function aiMove(board: Cell[]): number {
  // Try to win
  for (const [a,b,c] of LINES) {
    const cells = [board[a], board[b], board[c]];
    if (cells.filter(c => c === "O").length === 2 && cells.includes(null)) {
      return [a,b,c][cells.indexOf(null)];
    }
  }
  // Block player
  for (const [a,b,c] of LINES) {
    const cells = [board[a], board[b], board[c]];
    if (cells.filter(c => c === "X").length === 2 && cells.includes(null)) {
      return [a,b,c][cells.indexOf(null)];
    }
  }
  // Center
  if (!board[4]) return 4;
  // Random corner
  const corners = [0,2,6,8].filter(i => !board[i]);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  // Random
  const empty = board.map((c, i) => c === null ? i : -1).filter(i => i !== -1);
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function TicTacToeApp() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Cell>(null);
  const [score, setScore] = useState({ x: 0, o: 0, draw: 0 });

  const handleClick = useCallback((i: number) => {
    if (board[i] || gameOver) return;
    const newBoard = [...board];
    newBoard[i] = "X";

    const w = checkWinner(newBoard);
    if (w) { setBoard(newBoard); setWinner(w); setGameOver(true); setScore(s => ({ ...s, x: s.x + 1 })); return; }
    if (newBoard.every(c => c !== null)) { setBoard(newBoard); setGameOver(true); setScore(s => ({ ...s, draw: s.draw + 1 })); return; }

    // AI move
    const ai = aiMove(newBoard);
    newBoard[ai] = "O";
    const w2 = checkWinner(newBoard);
    if (w2) { setBoard(newBoard); setWinner(w2); setGameOver(true); setScore(s => ({ ...s, o: s.o + 1 })); return; }
    if (newBoard.every(c => c !== null)) { setBoard(newBoard); setGameOver(true); setScore(s => ({ ...s, draw: s.draw + 1 })); return; }

    setBoard(newBoard);
  }, [board, gameOver]);

  const reset = () => { setBoard(Array(9).fill(null)); setGameOver(false); setWinner(null); };

  return (
    <div className="p-5 bg-[#F8FAFC] min-h-[400px] flex flex-col items-center">
      {/* Score */}
      <div className="flex gap-6 mb-5 text-center">
        <div><div className="text-[20px] font-bold text-[#3B82F6]">{score.x}</div><div className="text-[10px] text-[#94A3B8] uppercase">You (X)</div></div>
        <div><div className="text-[20px] font-bold text-[#94A3B8]">{score.draw}</div><div className="text-[10px] text-[#94A3B8] uppercase">Draw</div></div>
        <div><div className="text-[20px] font-bold text-[#EF4444]">{score.o}</div><div className="text-[10px] text-[#94A3B8] uppercase">AI (O)</div></div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {board.map((cell, i) => (
          <button key={i} onClick={() => handleClick(i)}
            className={`w-20 h-20 rounded-[12px] text-[28px] font-bold transition-all cursor-pointer ${
              cell ? "bg-white shadow-sm" : "bg-white/50 hover:bg-white hover:shadow-sm"
            } border border-[rgba(0,0,0,0.06)]`}
            style={{ color: cell === "X" ? "#3B82F6" : cell === "O" ? "#EF4444" : "transparent" }}
          >
            {cell || "\u00b7"}
          </button>
        ))}
      </div>

      {/* Status */}
      {gameOver && (
        <div className="text-center mb-4">
          <p className="text-[16px] font-heading font-bold text-[#0F172A] mb-2">
            {winner === "X" ? "You Win!" : winner === "O" ? "AI Wins!" : "Draw!"}
          </p>
          <button onClick={reset} className="px-4 py-2 rounded-full bg-[#3B82F6] text-white text-[13px] font-medium cursor-pointer hover:bg-[#2563EB] transition-colors">
            Play Again
          </button>
        </div>
      )}
      {!gameOver && <p className="text-[13px] text-[#94A3B8]">Your turn (X)</p>}
    </div>
  );
}
