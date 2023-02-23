import React from "react";
import Puzzle from "../../components/Puzzle/Puzzle";
import { useState } from "react";

export default function PuzzlePage() {
  const [puzzleId, setPuzzleId] = useState(1);

  return (
    <div>
      <h1>Puzzle {puzzleId}</h1>
      <Puzzle id={puzzleId} />
    </div>
  );
}
