var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TicketSchema = new Schema({
      title: {
        type: String
      },
      type: {
        type: String
      },
      value: {
        type: Number
      },
      count:{
        type: Number
      },
      percent: {
        type: Number
      }
});

// "_id": "5a36ff62a434022548fe3e2d",
//               "title": "Alfa",
//               "type": "asdftyqwwer",
//               "value": 234,
//               "count": 2,
//               "percent": 0,
//               "__v": 0

module.exports = mongoose.model("Ticket",TicketSchema);
