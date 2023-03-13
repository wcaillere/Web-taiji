import React from "react";
import { PuzzleNavigation, NavButton, NavSelect } from "./style";

export default function Puzzlenav(props) {
  /**
   * Affiche le puzzle suivant
   */
  function nextPuzzle() {
    if (props.puzzleId < props.puzzleList.length) {
      props.changePuzzleId(props.puzzleId + 1);
    }
  }

  /**
   * Affiche le puzzle précédent
   */
  function previousPuzzle() {
    if (props.puzzleId != 1) {
      props.changePuzzleId(props.puzzleId - 1);
    }
  }

  /**
   * Génère le code jsx pour le select de l'id d'un puzzle
   * @returns {JSX} code jsx des options du select
   */
  function getSelect() {
    return props.puzzleList.map((item) => {
      return <option key={item.id}>{item.id}</option>;
    });
  }

  /**
   * Gère le choix d'un puzzle dans le select
   */
  function handleChangePuzzle(ev) {
    props.changePuzzleId(ev.target.value);
  }

  return (
    <PuzzleNavigation>
      <NavButton onClick={previousPuzzle} puzzleId={props.puzzleId}>
        {"<<"}
      </NavButton>
      <NavSelect onChange={handleChangePuzzle}>{getSelect()}</NavSelect>
      <NavButton onClick={nextPuzzle} puzzleId={props.puzzleId}>
        {">>"}
      </NavButton>
    </PuzzleNavigation>
  );
}
