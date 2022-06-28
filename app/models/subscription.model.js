const sql = require("./db.js");

const Subscription = function (Subscription) {
  this.title = Subscription.title;
  this.general = Subscription.general;
  this.specialist = Subscription.specialist;
  this.physiotherapy = Subscription.physiotherapy;
  this.extraOne = Subscription.extraOne;
  this.extraTwo = Subscription.extraTwo;
};

Subscription.create = (newSubscription, result) => {
  console.log('test2')
  console.log(newSubscription)
sql.query("INSERT INTO subscriptions SET ?", newSubscription, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      res.json(err)
      return;
    }

    console.log("created sub: ", { id: res.insertId, ...newSubscription });
    result(null, { id: res.insertId, ...newSubscription });
  });
};


Subscription.getAll = (title, result) => {
    let query = "SELECT * FROM subscriptions";
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("subscription: ", res);
      result(null, res);
    });
  };

  Subscription.remove = (id, result) => {
    sql.query("DELETE FROM subscriptions WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted subscriptions with id: ", id);
      result(null, res);
    });
  };

  Subscription.removeAll = result => {
    sql.query("DELETE FROM subscriptions", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} subscriptions`);
      result(null, res);
    });
  };
  module.exports = Subscription;