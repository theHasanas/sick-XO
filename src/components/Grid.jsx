import React from 'react'
import { useState, useEffect } from 'react'

const Grid = () => {
  const [counter, setCounter] = useState(0)
  const [winner, setWinner] = useState(null)
  const [grid, setGrid] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])

  const currentPlayer = () => (counter % 2 === 0 ? 'X' : 'O')
  //
  //
  //
  ///
  ///
  const click = (i, j) => {
    if (grid[i][j] !== '') return
    console.log('counter', counter)

    setGrid((oldGrid) => {
      const gridCopy = [...oldGrid]
      gridCopy[i][j] = currentPlayer()
      return gridCopy
    })

    console.log('click happened')
    if (counter >= 8 && winner === null) {
      document.getElementById('name').innerHTML = `<span style=display:block;>
      <img src='https://cdn.discordapp.com/attachments/776132307014647818/779925561039388672/emoji.png'/></span>
      <p class=glow>No one won!</p>`
      setTimeout(() => {
        reset()
      }, 20000)
    }
    setCounter((counter) => counter + 1)
  }

  const reset = () => {
    setCounter(0)
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ])
    setWinner(null)
    document.getElementById('name').innerHTML = ''
  }

  const win = (p) => {
    console.log('player at win ' + p + '\n' + '-------------------')
    const r1 = [grid[0][0], grid[0][1], grid[0][2]].join() === `${p},${p},${p}`
    const r2 = [grid[1][0], grid[1][1], grid[1][2]].join() === `${p},${p},${p}`
    const r3 = [grid[2][0], grid[2][1], grid[2][2]].join() === `${p},${p},${p}`

    const c1 = [grid[0][0], grid[1][0], grid[2][0]].join() === `${p},${p},${p}`
    const c2 = [grid[0][1], grid[1][1], grid[2][1]].join() === `${p},${p},${p}`
    const c3 = [grid[0][2], grid[1][2], grid[2][2]].join() === `${p},${p},${p}`

    const d1 = [grid[0][0], grid[1][1], grid[2][2]].join() === `${p},${p},${p}`
    const d2 = [grid[0][2], grid[1][1], grid[2][0]].join() === `${p},${p},${p}`

    return r1 || r2 || r3 || c1 || c2 || c3 || d1 || d2
  }
  //
  const checkWinner = () => {
    let checkPlayer = currentPlayer() === 'X' ? 'O' : 'X'
    if (win(checkPlayer)) {
      setWinner(checkPlayer)
    }
  }
  // const child1 = useRef(null)
  useEffect(() => {
    checkWinner()
    // let timer = null
    if (winner != null) {
      document.getElementById('name').innerHTML = `<span style=display:block;>
      <img src='https://cdn.discordapp.com/attachments/776132307014647818/779919375939403836/emoji.png'/></span>
      <p class=glow>${winner} Won!!</p>`
      setTimeout(() => {
        reset()
      }, 20000)
    }
    return () => {
      clearTimeout(null)
    }
  })

  return (
    <div className='wrapper'>
      <h1 style={{ marginTop: 15, marginBottom: 15 }} className='glow'>
        {currentPlayer()} Turn!
      </h1>
      {grid.map((row, i) => {
        return (
          <div className='row' key={i}>
            {row.map((cell, j) => (
              <div className='cell' key={j} onClick={() => click(i, j)}>
                <p id='movetxt' key={j}>
                  {cell}
                </p>
              </div>
            ))}
          </div>
        )
      })}
      <div id='name'></div>
    </div>
  )
}

export default Grid
