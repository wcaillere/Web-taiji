import React from "react";
import { PuzzleNavigation, NavButton, NavSelect } from "./style";

export default function Puzzlenav(props) {
  /**
   * Affiche le puzzle suivant
   */
  function nextPuzzle() {
    props.changePuzzleId(props.puzzleId + 1);
  }

  /**
   * Affiche le puzzle précédent
   */
  function previousPuzzle() {
    props.changePuzzleId(props.puzzleId - 1);
  }

  return (
    <PuzzleNavigation>
      <NavButton onClick={previousPuzzle} puzzleId={props.puzzleId}>
        {"<<"}
      </NavButton>
      <NavSelect>
        <option>1</option>
      </NavSelect>
      <NavButton onClick={nextPuzzle} puzzleId={props.puzzleId}>
        {">>"}
      </NavButton>
    </PuzzleNavigation>
  );
}
