import { Mongo } from "meteor/mongo";

const Spotteds = new Mongo.Collection("spotteds");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("spotteds", function spottedsPublication() {
    return Spotteds.find();
  });
}

export default Spotteds;
