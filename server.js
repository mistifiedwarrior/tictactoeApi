const fs = require('fs');
const express = require('express');
const data = [null, null, null, null, null, null, null, null, null];

const CURRENT_PLAYER = 'X';
const NEXT_PLAYER = 'O';

const app = express();
app.use(express.json());

const isWinner = (data) => {
  return (
    (data[0] === data[1] && data[0] === data[2] && data[2] !== null) ||
    (data[3] === data[4] && data[3] === data[5] && data[5] !== null) ||
    (data[6] === data[7] && data[6] === data[8] && data[8] !== null) ||
    (data[0] === data[3] && data[0] === data[6] && data[6] !== null) ||
    (data[1] === data[4] && data[1] === data[7] && data[7] !== null) ||
    (data[2] === data[5] && data[2] === data[8] && data[8] !== null) ||
    (data[0] === data[4] && data[0] === data[8] && data[8] !== null) ||
    (data[2] === data[4] && data[2] === data[6] && data[6] !== null)
  );
};

let turn = 0;

app.get('/tile/:no', (req, res) => {
  const tileStatus = req.params.no;
  if (!data[tileStatus - 1] == null) {
    return res.json({msg: 'already filled'});
  }
  if (turn >= 9) {
    return res.json({msg: 'GAME DRAW !!'});
  }
  const symbol = turn % 2 == 1 ? CURRENT_PLAYER : NEXT_PLAYER;
  data[tileStatus - 1] = symbol;
  if (isWinner(data)) {
    return res.send({Winner: `${symbol} is Winner`});
  }
  turn++;
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server starts on ${PORT}`));
