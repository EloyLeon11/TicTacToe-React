import { WINNER_COMBOS } from "../../constants"
export const checkWinnerFrom = (boardTocheck) =>  {
    // REVISAMOS TODAS LAS COMBINACIONES GANADORAS
    // PARA VES SI HAY X o O GANÓ
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if (
        boardTocheck[a] &&
        boardTocheck[a] == boardTocheck[b] &&
        boardTocheck[a] == boardTocheck[c]
      ) {
        return boardTocheck[a]
      }
    }   
    
    // si no hay ganador
    return null
  }

  export const checkEndGame = (newBoard) =>{

    // REVISAMOS SI HAY UN EMPATE SI NO HAY MÁS ESPACIOS VACÍOS EN EL TABLERO
    return newBoard.every((square) => square != null)
  }

