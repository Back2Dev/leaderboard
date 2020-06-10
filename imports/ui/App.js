import React from "react";
import { Info } from "./Info.js";
import { Leaderboard } from "./leaderboard";

export const App = () => (
  <div>
    <h1>Welcome to Meteor/mysql Leaderboard!</h1>
    <Info />
    <Leaderboard></Leaderboard>
  </div>
);
