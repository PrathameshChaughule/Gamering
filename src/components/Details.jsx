import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/games").then((res) => {
      const g = res.data.find((g) => g.id === Number(id));
      setGame(g);
    });
  }, [id]);

  if (!game) return <p>Game not found</p>;

  return (
    <div>
      <h1>{game.title}</h1>
      <p>{game.company}</p>
      <img src={game.image} alt={game.title} />
      <p>Price: {game.price}</p>
    </div>
  );
}

export default Details;
