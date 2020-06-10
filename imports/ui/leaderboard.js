import { Mongo } from "meteor/mongo";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
// import { Players } from "../api/players";
import ScoreItem from "./ScoreItem";

const Players = new Mongo.Collection("players");
export const Leaderboard = () => {
  const { players, isLoading } = useTracker(() => {
    const subscription = Meteor.subscribe("all.players");
    const players = Players.find({}).fetch();
    console.log(subscription.ready(), subscription);
    return {
      players,
      isLoading: !subscription.ready(),
    };
  });

  const insert = () => {};

  return (
    <div className="score">
      <ol className="score-list">
        {players.map((player) => (
          <ScoreItem key={player.id} item={player} />
        ))}
      </ol>
      <form className="score-insert-player" onSubmit={insert}>
        <input placeholder="New player's name..." />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
