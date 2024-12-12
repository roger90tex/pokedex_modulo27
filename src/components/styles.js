import styled from "styled-components";

export const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${({ active }) => (active ? "#4CAF50" : "#ddd")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? "#45a049" : "#bbb")};
  }
`;

export const PokemonItem = styled.li`
  margin: 10px;
  text-align: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 150px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;
export const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
`;
