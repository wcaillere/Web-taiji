import React from "react";
import { CaseContainer } from "./style";

export default function CasePuzzle(props) {
  /**
   * Calcul le nom de point à afficher sur une case
   */
  function calculPoint(pointNumber) {
    let array = new Array(pointNumber).fill(0);
    return array.map((item, index) => {
      return <i className="fa-solid fa-circle" key={index}></i>;
    });
  }

  return <CaseContainer>{calculPoint(props.point)}</CaseContainer>;
}
