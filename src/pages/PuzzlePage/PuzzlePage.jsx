import React from "react";
import Puzzle from "../../components/Puzzle/Puzzle";
import Puzzlenav from "../../components/PuzzleNav/Puzzlenav";
import { useState } from "react";
import "./PuzzlePage.css";
import useAxios from "axios-hooks";

export default function PuzzlePage() {
  const [puzzleId, setPuzzleId] = useState(1);

  const [{ data, loading, error }] = useAxios("http://localhost:3000/puzzles");

  if (loading) return <div>Test</div>;
  if (error) return <div>Test error</div>;

  return (
    <div>
      <h1>Puzzle {puzzleId}</h1>
      <Puzzlenav
        puzzleId={puzzleId}
        changePuzzleId={setPuzzleId}
        puzzleList={data}
      />
      <Puzzle id={puzzleId} />
    </div>
  );
}
