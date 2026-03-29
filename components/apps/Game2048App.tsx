"use client";

import { useState, useEffect, useCallback } from "react";

type Board = number[][];

const SIZE = 4;

const COLORS: Record<number, { bg: string; text: string }> = {
  0: { bg: "#F1F5F9", text: "transparent" },
  2: { bg: "#E2E8F0", text: "#475569" },
  4: { bg: "#CBD5E1", text: "#334155" },
  8: { bg: "#FED7AA", text: "#9A3412" },
  16: { bg: "#FDBA74", text: "#9A3412" },
  32: { bg: "#FB923C", text: "white" },
  64: { bg: "#F97316", text: "white" },
  128: { bg: "#FBBF24", text: "white" },
  256: { bg: "#F59E0B", text: "white" },
  512: { bg: "#EAB308", text: "white" },
  1024: { bg: "#84CC16", text: "white" },
  2048: { bg: "#3B82F6", text: "white" },
};

function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandom(board: Board): Board {
  const b = board.map(r => [...r]);
  const empty: [number, number][] = [];
  b.forEach((row, r) => row.forEach((cell, c) => { if (cell === 0) empty.push([r, c]); }));
  if (empty.length === 0) return b;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  b[r][c] = Math.random() < 0.9 ? 2 : 4;
  return b;
}

function slideRow(row: number[]): { row: number[]; score: number } {
  const filtered = row.filter(v => v !== 0);
  let score = 0;
  const merged: number[] = [];
  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      merged.push(filtered[i] * 2);
      score += filtered[i] * 2;
      i += 2;
    } else {
      merged.push(filtered[i]);
      i++;
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return { row: merged, score };
}

function moveLeft(board: Board): { board: Board; score: number; moved: boolean } {
  let totalScore = 0;
  let moved = false;
  const newBoard = board.map(row => {
    const { row: newRow, score } = slideRow(row);
    totalScore += score;
    if (newRow.some((v, i) => v !== row[i])) moved = true;
    return newRow;
  });
  return { board: newBoard, score: totalScore, moved };
}

function rotate(board: Board): Board {
  return board[0].map((_, i) => board.map(row => row[i]).reverse());
}

function move(board: Board, dir: "left" | "right" | "up" | "down"): { board: Board; score: number; moved: boolean } {
  let b = board;
  const rotations: Record<string, number> = { left: 0, up: 1, right: 2, down: 3 };
  for (let i = 0; i < rotations[dir]; i++) b = rotate(b);
  const result = moveLeft(b);
  let rb = result.board;
  for (let i = 0; i < (4 - rotations[dir]) % 4; i++) rb = rotate(rb);
  return { board: rb, score: result.score, moved: result.moved };
}

function isGameOver(board: Board): boolean {
  for (const dir of ["left", "right", "up", "down"] as const) {
    if (move(board, dir).moved) return false;
  }
  return true;
}

export default function Game2048App() {
  const [board, setBoard] = useState<Board>(() => addRandom(addRandom(emptyBoard())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleMove = useCallback((dir: "left" | "right" | "up" | "down") => {
    if (gameOver) return;
    const result = move(board, dir);
    if (!result.moved) return;
    const newBoard = addRandom(result.board);
    const newScore = score + result.score;
    setBoard(newBoard);
    setScore(newScore);
    if (newScore > best) setBest(newScore);
    if (isGameOver(newBoard)) setGameOver(true);
  }, [board, score, best, gameOver]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, "left" | "right" | "up" | "down"> = {
        ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down",
      };
      if (map[e.key]) { e.preventDefault(); handleMove(map[e.key]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleMove]);

  const reset = () => { setBoard(addRandom(addRandom(emptyBoard()))); setScore(0); setGameOver(false); };

  const getColor = (v: number) => COLORS[v] || { bg: "#1E293B", text: "white" };

  return (
    <div className="p-5 bg-[#F8FAFC] min-h-[400px] flex flex-col items-center">
      {/* Score */}
      <div className="flex gap-4 mb-4 w-full max-w-[280px]">
        <div className="flex-1 bg-white rounded-[10px] p-2 text-center border border-[rgba(0,0,0,0.04)]">
          <div className="text-[9px] text-[#94A3B8] uppercase font-semibold">Score</div>
          <div className="text-[20px] font-bold text-[#0F172A]">{score}</div>
        </div>
        <div className="flex-1 bg-white rounded-[10px] p-2 text-center border border-[rgba(0,0,0,0.04)]">
          <div className="text-[9px] text-[#94A3B8] uppercase font-semibold">Best</div>
          <div className="text-[20px] font-bold text-[#3B82F6]">{best}</div>
        </div>
        <button onClick={reset} className="px-3 rounded-[10px] bg-[#0F172A] text-white text-[12px] font-medium cursor-pointer hover:bg-[#1E293B] transition-colors">New</button>
      </div>

      {/* Board */}
      <div className="bg-[#CBD5E1] rounded-[14px] p-2 mb-4">
        <div className="grid grid-cols-4 gap-1.5">
          {board.flat().map((cell, i) => {
            const { bg, text } = getColor(cell);
            return (
              <div key={i} className="w-16 h-16 rounded-[10px] flex items-center justify-center font-bold transition-all"
                style={{ backgroundColor: bg, color: text, fontSize: cell >= 1000 ? "16px" : cell >= 100 ? "20px" : "24px" }}>
                {cell || ""}
              </div>
            );
          })}
        </div>
      </div>

      {gameOver && <p className="text-[14px] font-heading font-bold text-[#EF4444] mb-2">Game Over!</p>}
      <p className="text-[11px] text-[#94A3B8]">Use arrow keys to play</p>

      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-1 mt-3 md:hidden">
        <div />
        <button onClick={() => handleMove("up")} className="h-10 rounded-lg bg-white border border-[rgba(0,0,0,0.06)] text-[#475569] cursor-pointer">{"\u2191"}</button>
        <div />
        <button onClick={() => handleMove("left")} className="h-10 rounded-lg bg-white border border-[rgba(0,0,0,0.06)] text-[#475569] cursor-pointer">{"\u2190"}</button>
        <button onClick={() => handleMove("down")} className="h-10 rounded-lg bg-white border border-[rgba(0,0,0,0.06)] text-[#475569] cursor-pointer">{"\u2193"}</button>
        <button onClick={() => handleMove("right")} className="h-10 rounded-lg bg-white border border-[rgba(0,0,0,0.06)] text-[#475569] cursor-pointer">{"\u2192"}</button>
      </div>
    </div>
  );
}
