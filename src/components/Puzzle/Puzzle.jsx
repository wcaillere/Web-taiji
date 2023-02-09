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
    let matrix = [];
    for (let i = 0; i < data.hauteur; i++) {
      let line = [];
      for (let k = 0; k < data.longueur; k++) {
        line.push(i);
      }
      matrix.push(line);
    }
    return matrix;
  }

  /**
   *
   * @returns Code html du puzzle
   */
  function getPuzzle() {
    const puzzleMatrix = createMatrix();
    let test = puzzleMatrix.map((line, index) => {
      return (
        <div className="puzzleLine" key={index}>
          {line.map((column, index) => {
            return (
              <CasePuzzle
                key={index}
                point={
                  data.points[`${column},${index}`]
                    ? data.points[`${column},${index}`]
                    : 0
                }
              />
            );
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
