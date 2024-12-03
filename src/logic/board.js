import { Winner_combos } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of Winner_combos) {
      const [a, b, c] = combo 
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
}