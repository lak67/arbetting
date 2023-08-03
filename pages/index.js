import {getData} from '../lib/fetchData'

export default function Home() {

  const getdatas = async () => {
    const res = await getData('odds')
    
    const data= res.data

const gamesById = {};

data.map((data) => {
  const id = data.id;
  if (!gamesById[id]) {
    gamesById[id] = {
      array1: [], //team a
      array2: [], //team b
      array3: [], //draw
    };
  }

  data.bookmakers.map((bookmaker) => {
    const gameData = {
      name: bookmaker.markets[0].outcomes[0].name,
      price: bookmaker.markets[0].outcomes[0].price,
      bookmaker: bookmaker.key,
      gameid: id,
    };
    gamesById[id].array1.push(gameData);

    const gameData2 = {
      name: bookmaker.markets[0].outcomes[1].name,
      price: bookmaker.markets[0].outcomes[1].price,
      bookmaker: bookmaker.key,
      gameid: id,
    };
    gamesById[id].array2.push(gameData2);

    const gameData3 = {
      name: bookmaker.markets[0].outcomes[2].name,
      price: bookmaker.markets[0].outcomes[2].price,
      bookmaker: bookmaker.key,
      gameid: id,
    };
    gamesById[id].array3.push(gameData3);
  });
});

    const gameCombinations = {};

    Object.values(gamesById).forEach((game) => {
      const gameId = game.array1[0].gameid; // Assuming all arrays have the same game ID
    
      if (!gameCombinations[gameId]) {
        gameCombinations[gameId] = [];
      }
    
      for (let i = 0; i < game.array1.length; i++) {
        for (let j = 0; j < game.array2.length; j++) {
          for (let k = 0; k < game.array3.length; k++) {
            const combination = [game.array1[i], game.array2[j], game.array3[k]];
            gameCombinations[gameId].push(combination);
          }
        }
      }
    });

    const passed = [];

Object.values(gameCombinations).forEach((combinations) => {
  combinations.forEach((combo) => {
    const test = 1 / combo[0].price + 1 / combo[1].price + 1 / combo[2].price;
    console.log(test*100)
    if ((test * 100) < 100) {
      console.log("DING")
      passed.push(combo);
    }
  });
});

console.log(passed);

  }

  return (
    <div>
      <h1>Home Page</h1>

      <br/>
      
    
    <div>
      <button className="rounded bg-blue-100" onClick={getdatas}>PressME</button>
    </div>
    </div>
  );
}
