import styled from "styled-components";

export const CaseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  width: 30px;
  height: 30px;
  font-size: 8px;
  background: ${(props) => (props.isClicked ? "white" : "")};
  color: ${(props) => (props.isClicked ? "black" : "white")};
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    background: ${(props) => (props.isClicked ? "" : "grey")};
  }
`;

export const CaseBorder = styled.div`
  border: white solid 2px;
  margin: 2px;
`;
