import React from "react";
import { PuzzleNavigation, NavButton, NavSelect } from "./style";

export default function Puzzlenav() {
  return (
    <PuzzleNavigation>
      <NavButton>{"<<"}</NavButton>
      <NavSelect>
        <option>1</option>
      </NavSelect>
      <NavButton>{">>"}</NavButton>
    </PuzzleNavigation>
  );
}
