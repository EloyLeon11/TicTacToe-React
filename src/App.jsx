import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "../constants"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"

function App() {

  const [board, setBoard] = useState(() => {
    // SI HAY UNA PARTIDA GUARDADA
    const boardFromStorage = window.localStorage.getItem("board")
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X
  })

  // NULL ES QUE NO HAY GANADOR, FALSE  ES QUE HAY UN EMPATE
  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  }


  const updateBoard = (index) => {

    // NO ACTAULIZAMOS ESTA POSICIÓN
    // SI YA TIENE ALGO

    if (board[index] || winner) return

    // actualizar tablero

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)


    // Cambiar el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // GUARDAR PARTIDA
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)

    // REVISAR SI HAY GANADOR
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      if (newWinner) {
        confetti()
        setWinner(newWinner)
      }
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // EMPATE
    }
  }


  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className="game">
        {
          board.map((square, index) => {

            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
