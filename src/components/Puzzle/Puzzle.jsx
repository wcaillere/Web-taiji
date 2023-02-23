import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import CasePuzzle from "../Case/CasePuzzle";
import { PuzzleLine, PuzzleContainer } from "./style";

export default function Puzzle(props) {
  const [ValidityMatrix, setValidityMaxtix] = useState([]);

  const [{ data, loading, error }] = useAxios(
    `http://localhost:3000/puzzles/${props.id}`
  );

  // Initialise une matrice de vérification lorsque la data est chargée
  // Qui sera ensuite utilisée pour vérifier la validation du puzzle
  useEffect(() => {
    if (data) {
      setValidityMaxtix(createValidityMatrix());
    }
  }, [data]);

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
   * Créé une matrice de vérification en fonction de la hauteur et de la largeur du puzzle récupéré par l'appel axios
   * @returns
   */
  function createValidityMatrix() {
    const ValidityMatrix = [];
    for (let i = 0; i < data.hauteur; i++) {
      let line = [];
      for (let k = 0; k < data.longueur; k++) {
        line.push({
          isClicked: false,
          isValid: false,
          points: data.points[`${i},${k}`],
        });
      }
      ValidityMatrix.push(line);
    }
    return ValidityMatrix;
  }

  /**
   * Modifie la matrice de vérification à chaque fois que l'utilisateur clique sur une case
   * @param {Array} coordonnees coordonnees de la case cliqué dans la matrice du puzzle
   */
  function modifyValidityMatrix(coordonnees) {
    let newValidityMatrix = ValidityMatrix;
    let chooseCase = newValidityMatrix[coordonnees[0]][coordonnees[1]];
    chooseCase.isClicked = !chooseCase.isClicked;
    setValidityMaxtix(newValidityMatrix);
    console.log(ValidityMatrix);
  }

  /**
   *
   * @returns Code html du puzzle
   */
  function getPuzzle() {
    const puzzleMatrix = createMatrix();
    let test = puzzleMatrix.map((line, index) => {
      return (
        <PuzzleLine key={index}>
          {line.map((lineNumber, columnNumber) => {
            return (
              <CasePuzzle
                key={columnNumber}
                coordonnees={[lineNumber, columnNumber]}
                point={
                  data.points[`${lineNumber},${columnNumber}`]
                    ? data.points[`${lineNumber},${columnNumber}`]
                    : 0
                }
                modifyValidityMatrix={modifyValidityMatrix}
              />
            );
          })}
        </PuzzleLine>
      );
    });
    return test;
  }

  if (loading) return <div>Chargement du puzzle...</div>;
  if (error) return <div>Erreur lors du Chargement du puzzle</div>;

  return (
    <div>
      <PuzzleContainer>{getPuzzle()}</PuzzleContainer>
    </div>
  );
}
