import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import CasePuzzle from "../Case/CasePuzzle";
import { PuzzleLine, PuzzleContainer, PuzzleButtonValid } from "./style";

export default function Puzzle(props) {
  const [validityMatrix, setValidityMaxtix] = useState([]);

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
    const validityMatrix = [];
    for (let i = 0; i < data.hauteur; i++) {
      let line = [];
      for (let k = 0; k < data.longueur; k++) {
        line.push({
          isClicked: false,
          isValid: false,
          points: data.points[`${i},${k}`],
        });
      }
      validityMatrix.push(line);
    }
    return validityMatrix;
  }

  /**
   * Modifie la matrice de vérification à chaque fois que l'utilisateur clique sur une case
   * @param {Array} coordonnees coordonnees de la case cliqué dans la matrice du puzzle
   */
  function modifyValidityMatrix(coordonnees, method) {
    let newValidityMatrix = validityMatrix;
    let chooseCase = newValidityMatrix[coordonnees[0]][coordonnees[1]];
    chooseCase[method] = !chooseCase[method];
    setValidityMaxtix(newValidityMatrix);
  }

  function resetValidityMatrix() {
    let newMatrix = validityMatrix;
    for (let line of newMatrix) {
      for (let item of line) {
        item.isValid = false;
      }
    }
    setValidityMaxtix(newMatrix);
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
                data={data}
              />
            );
          })}
        </PuzzleLine>
      );
    });
    return test;
  }

  /**
   * Compte le nombre de case de la même couleur liée à une case donnée
   * @param {Array} coordonnees
   * @return {Number} Compte des cases de même couleur près d'un point
   */
  function verifyCase(coordonnees) {
    let caseLign = coordonnees[0];
    let caseColumn = coordonnees[1];
    let caseMatrix = validityMatrix[caseLign][caseColumn];

    modifyValidityMatrix([caseLign, caseColumn], "isValid");
    var count = 0;

    //Vérification de la case de droite
    let rightCase = validityMatrix[caseLign][caseColumn + 1];
    if (
      typeof rightCase != "undefined" &&
      rightCase["isValid"] == false &&
      rightCase["isClicked"] == caseMatrix["isClicked"]
    ) {
      count += verifyCase([caseLign, caseColumn + 1]);
    }

    //Vérification de la case de gauche
    if (caseColumn - 1 >= 0) {
      let leftCase = validityMatrix[caseLign][caseColumn - 1];
      if (
        typeof leftCase != "undefined" &&
        leftCase["isValid"] == false &&
        leftCase["isClicked"] == caseMatrix["isClicked"]
      ) {
        count += verifyCase([caseLign, caseColumn - 1]);
      }
    }

    //Vérification de la case d'en haut
    if (caseLign - 1 >= 0) {
      let upCase = validityMatrix[caseLign - 1][caseColumn];
      if (
        typeof upCase != "undefined" &&
        upCase["isValid"] == false &&
        upCase["isClicked"] == caseMatrix["isClicked"]
      ) {
        count += verifyCase([caseLign - 1, caseColumn]);
      }
    }

    //Vérification de la case d'en bas
    if (caseLign < validityMatrix.length - 1) {
      let downCase = validityMatrix[caseLign + 1][caseColumn];
      if (
        typeof downCase != "undefined" &&
        downCase["isValid"] == false &&
        downCase["isClicked"] == caseMatrix["isClicked"]
      ) {
        count += verifyCase([caseLign + 1, caseColumn]);
      }
    }

    count++;
    return count;
  }

  /**
   * parcours la validité des cases à objectif du puzzle. Si l'une est invalide, tout le puzzle le devient
   * @returns {boolean} Validité de la réponse proposée pour le puzzle
   */
  function verifyPuzzle() {
    const pointList = data.points;

    for (let pointCase in pointList) {
      let pointCount = pointList[pointCase];

      let caseCoordonnees = pointCase
        .split(",")
        .map((item) => parseInt(item, 10));

      if (verifyCase(caseCoordonnees) != pointCount) {
        resetValidityMatrix();
        return false;
      }
    }

    resetValidityMatrix();
    return true;
  }

  if (loading) return <div>Chargement du puzzle...</div>;
  if (error) return <div>Erreur lors du Chargement du puzzle</div>;

  return (
    <div style={{ textAlign: "center" }}>
      <PuzzleContainer>{getPuzzle()}</PuzzleContainer>
      <PuzzleButtonValid onClick={() => console.log(verifyPuzzle())}>
        Valider
      </PuzzleButtonValid>
    </div>
  );
}
