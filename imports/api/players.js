import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

//Your client side DOES NOT REQUIRE ANY CHANGES - uses minimongo!!!
if (Meteor.isClient) {
  export default Players = new Mongo.Collection("players");
}

if (Meteor.isServer) {
  if (Meteor.settings.useVlasky) {
    const liveDb = new LiveMysql(Meteor.settings.private.mysql);

    Meteor.publish("all.players", function () {
      console.log("Selecting players");
      try {
        return liveDb.select(
          `SELECT * FROM players ORDER BY score DESC`,
          null,
          LiveMysqlKeySelector.Index(),
          [{ table: "players" }]
        );
      } catch (e) {
        console.error(`Something wrong: ${e.message}`);
      }
    });
  } else {
    Meteor.startup(function () {
      //Start of changes

      var mysqlStringConnection =
        "mysql://mikkel:password@127.0.0.1/leaderboard?debug=true&charset=utf8";

      var db = Mysql.connect(mysqlStringConnection);
      //"players" -> a table name inside your database.
      Players = db.meteorCollection("players", "players");

      //End of changes, that's it!

      //publish the collection as you used to do with Mongo.Collection
      Meteor.publish("all.players", function () {
        // console.log("all.players", Players, Dudes);
        return Players.find();
      });
    });
  }
}
Meteor.methods({
  "insert.players": (newPlayer) => {
    Players.insert(newPlayer);
  },
  "adjust.players": (id, increment) => {
    const player = Players.findOne({ id });
    console.log(player);
    if (player)
      Players.update({
        id,
        score: player.score + parseInt(increment),
      });
    else throw new Meteor.Error("Could not find player " + id);
  },
  "rm.players": (id, increment) => {
    Players.remove(id);
  },
});
