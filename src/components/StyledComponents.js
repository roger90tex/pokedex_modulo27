import styled from "styled-components";

export const Container =styled.div `
    text-align:center;
    margin-top:20px;
    `;
export const Title = styled.h1`
    color: #333;
    `;
export const Form= styled.form`
    display:flex;
    justify-content: center;
    margin:20px 0;
    `;
export const Input=styled.input`
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    `;
export const PokemonList= styled.ul`
    list-style: none;
    padding:0;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    `;

export const PokemonItem= styled.li`
    margin:10px;
    text-align:center;
    background: white;
    border: 1px solid #ddd;
    border-radius:5px;
    box-shadow: 0 2px 5px rgba(0,0 0, 0.1);
    padding: 10px;
    width:150px;
    transition: transform .2s ease, box-shadow 0.2s ease;

    &:hover{
        transform: scale(1.1);
        box-shadow: 0 4 px 10px rgba (0,0,0, 0.2);
        }
    `;

export const PokemonImage= styled.img`
    width: 80px;
    height:80px;
    `;
export const PaginationButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    background-color: ${(props) => (props.isActive ? "#4CAF50" : "#ddd")};
    color: ${(props) => (props.isActive ? "white" : "black")};
    border: none;
    cursor: pointer;
  `;