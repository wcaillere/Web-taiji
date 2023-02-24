import React from "react";
import Puzzle from "../../components/Puzzle/Puzzle";
import Puzzlenav from "../../components/PuzzleNav/Puzzlenav";
import { useState } from "react";
import "./PuzzlePage.css";

export default function PuzzlePage() {
  const [puzzleId, setPuzzleId] = useState(1);

  return (
    <div>
      <h1>Puzzle {puzzleId}</h1>
      <Puzzlenav puzzleId={puzzleId} changePuzzleId={setPuzzleId} />
      <Puzzle id={puzzleId} />
    </div>
  );
}
