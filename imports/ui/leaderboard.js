import { Mongo } from "meteor/mongo";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
// import { Players } from "../api/players";
import ScoreItem from "./ScoreItem";

const Players = new Mongo.Collection("players");

export const Leaderboard = () => {
  const [name, setName] = React.useState("");
  const { players, isLoading } = useTracker(() => {
    const subscription = Meteor.subscribe("all.players");
    const players = Players.find({}, { sort: { score: -1 } }).fetch();
    return {
      players,
      isLoading: !subscription.ready(),
    };
  });

  const insert = async (e) => {
    e.preventDefault();
    await Meteor.callAsync("insert.players", { name, score: 0 });
    setName("");
    return false;
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const adjustScore = async (id, increment) => {
    await Meteor.callAsync("adjust.players", id, increment);
  };

  const remove = async (id) => {
    await Meteor.callAsync("rm.players", id);
  };

  return (
    <div className="score">
      <ol className="score-list">
        {players.map((player) => (
          <ScoreItem
            key={player.id}
            item={player}
            adjust={adjustScore}
            remove={remove}
          />
        ))}
      </ol>
      <form
        className="score-insert-player"
        onSubmit={(e) => {
          return insert(e);
        }}
      >
        <input onChange={changeName} placeholder="New player's name..." />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
