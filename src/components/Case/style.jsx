import styled from "styled-components";

export const CaseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6px;
  border-radius: 2px;
  width: 35px;
  height: 35px;
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
  border-radius: 6px;
  margin: 2px;
`;
