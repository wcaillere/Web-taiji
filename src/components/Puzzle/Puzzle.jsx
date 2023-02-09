import React from "react";
import useAxios from "axios-hooks";
import CasePuzzle from "../Case/CasePuzzle";

export default function Puzzle(props) {
  const [{ data, loading, error }] = useAxios(
    "http://localhost:3000/puzzles/1"
  );

  /**
   * Créé une matrice en fonction de la hauteur et de la largeur du puzzle récupéré par l'appel axios
   * @returns {array} Tableau de tableaux de zéro
   */
  function createMatrix() {
    return new Array(data.hauteur).fill(new Array(data.longueur).fill(0));
  }

  /**
   *
   * @returns Code html du puzzle
   */
  function getPuzzle() {
    const puzzleMatrix = createMatrix();
    let test = puzzleMatrix.map((ligne, index) => {
      return (
        <div key={index}>
          {ligne.map((colonne, index) => {
            return <CasePuzzle key={index} />;
          })}
        </div>
      );
    });
    return test;
  }

  if (loading) return <div>Chargement du puzzle...</div>;
  if (error) return <div>Erreur lors du Chargement du puzzle</div>;

  return <div>{getPuzzle()}</div>;
}
