import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { Turns} from './constants'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import './App.css'



function App() {
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? Turns.X
  })

  const [winner, setWinner] = useState(null)

  

  const restGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((Square) => Square != null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)// Todo: Check if game is over
    }
  }


  return(
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={restGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key = {index}
                index = {index}
                updateBoard ={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn == Turns.X}>
          {Turns.X}
        </Square>
        <Square isSelected={turn == Turns.O}>
          {Turns.O}
        </Square>
      </section>
      <WinnerModal restGame={restGame} winner={winner}/>
    </main>
  )  
}

export default App
