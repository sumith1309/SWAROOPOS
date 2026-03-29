"use client";

import { useState } from "react";

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [reset, setReset] = useState(false);

  const handleNumber = (n: string) => {
    if (reset) { setDisplay(n); setReset(false); }
    else setDisplay(display === "0" ? n : display + n);
  };

  const handleOp = (nextOp: string) => {
    const current = parseFloat(display);
    if (prev !== null && op) {
      const result = calculate(prev, current, op);
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOp(nextOp);
    setReset(true);
  };

  const handleEquals = () => {
    if (prev === null || !op) return;
    const current = parseFloat(display);
    const result = calculate(prev, current, op);
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setReset(true);
  };

  const calculate = (a: number, b: number, operation: string): number => {
    switch (operation) {
      case "+": return a + b;
      case "-": return a - b;
      case "\u00d7": return a * b;
      case "\u00f7": return b !== 0 ? a / b : 0;
      case "%": return a % b;
      default: return b;
    }
  };

  const handleClear = () => { setDisplay("0"); setPrev(null); setOp(null); };
  const handleToggleSign = () => setDisplay(String(-parseFloat(display)));
  const handlePercent = () => setDisplay(String(parseFloat(display) / 100));
  const handleDot = () => { if (!display.includes(".")) setDisplay(display + "."); };

  const buttons = [
    { label: "AC", action: handleClear, style: "fn" },
    { label: "\u00b1", action: handleToggleSign, style: "fn" },
    { label: "%", action: handlePercent, style: "fn" },
    { label: "\u00f7", action: () => handleOp("\u00f7"), style: "op" },
    { label: "7", action: () => handleNumber("7"), style: "num" },
    { label: "8", action: () => handleNumber("8"), style: "num" },
    { label: "9", action: () => handleNumber("9"), style: "num" },
    { label: "\u00d7", action: () => handleOp("\u00d7"), style: "op" },
    { label: "4", action: () => handleNumber("4"), style: "num" },
    { label: "5", action: () => handleNumber("5"), style: "num" },
    { label: "6", action: () => handleNumber("6"), style: "num" },
    { label: "-", action: () => handleOp("-"), style: "op" },
    { label: "1", action: () => handleNumber("1"), style: "num" },
    { label: "2", action: () => handleNumber("2"), style: "num" },
    { label: "3", action: () => handleNumber("3"), style: "num" },
    { label: "+", action: () => handleOp("+"), style: "op" },
    { label: "0", action: () => handleNumber("0"), style: "num wide" },
    { label: ".", action: handleDot, style: "num" },
    { label: "=", action: handleEquals, style: "op" },
  ];

  const getStyle = (style: string) => {
    if (style.includes("op")) return "bg-[#3B82F6] text-white hover:bg-[#2563EB] font-semibold";
    if (style.includes("fn")) return "bg-[#E2E8F0] text-[#475569] hover:bg-[#CBD5E1] font-medium";
    return "bg-white text-[#0F172A] hover:bg-[#F8FAFC] border border-[rgba(0,0,0,0.06)] font-medium";
  };

  return (
    <div className="p-4 bg-[#F8FAFC] min-h-[400px]">
      {/* Display */}
      <div className="bg-white rounded-[14px] p-4 mb-4 border border-[rgba(0,0,0,0.04)] shadow-sm">
        <div className="text-right">
          {prev !== null && op && <div className="text-[12px] text-[#94A3B8] font-mono">{prev} {op}</div>}
          <div className="text-[36px] font-heading font-bold text-[#0F172A] tracking-tight truncate">{display}</div>
        </div>
      </div>
      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className={`${btn.style.includes("wide") ? "col-span-2" : ""} h-12 rounded-[12px] text-[18px] transition-all active:scale-95 cursor-pointer ${getStyle(btn.style)}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
