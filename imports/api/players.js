import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
// import LiveMysql from "mysql-live-select";

// export const Players = new Mongo.Collection("players");

if (Meteor.isServer) {
  var liveDb = new LiveMysql(Meteor.settings.private.mysql);

  Meteor.publish("all.players", function () {
    console.log("Selecting players");
    try {
      const stuff = liveDb.select(
        `SELECT * FROM players ORDER BY score DESC`,
        null,
        LiveMysqlKeySelector.Index(),
        [{ table: "players" }]
      );
      return stuff;
    } catch (e) {
      console.error(`Something wrong: ${e.message}`);
    }
  });
}
