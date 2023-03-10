import { useState, useEffect } from "react";
import { CaseBorder, CaseContainer } from "./style";

export default function CasePuzzle(props) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false);
  }, [props.data]);
  /**
   * Calcul le nom de point à afficher sur une case
   */
  function calculPoint(pointNumber) {
    let array = new Array(pointNumber).fill(0);
    return array.map((item, index) => {
      return (
        <i
          className="fa-solid fa-circle"
          key={index}
          style={{ margin: "1px" }}
        ></i>
      );
    });
  }

  return (
    <CaseBorder>
      <CaseContainer
        isClicked={isClicked}
        onClick={() => {
          setIsClicked(!isClicked);
          props.modifyValidityMatrix(props.coordonnees, "isClicked");
        }}
      >
        {calculPoint(props.point)}
      </CaseContainer>
    </CaseBorder>
  );
}
