var express = require('express');
var Portfolio = require('./../models/Portfolio');
var Ticket = require('./../models/Ticket');
var router = express.Router();

router.get('/portfolio',function(req,res){
    Portfolio.find({},function (err, portfolios){
      if (err) return console.error(err);
      if (!portfolios) return console.error("portfolio are:"+ portfolios);
      var portfolioMap = {};
      portfolios.forEach(function(portfolio){
        console.log(portfolio)
          portfolioMap[portfolio._id] = portfolio;
      })
      res.send(portfolioMap);
    }).populate('tickets').exec();;
});

router.get('/portfolio/:name',function(req,res){
    const name = req.params.name;

    Portfolio.get(name).then(function(portfolio,err){
      if(err) console.log(err);
      if(!portfolio) console.log(portfolio);
      res.send(portfolio);
    });
});

router.post('/portfolio/:name&:type', function(req,res){
    const name = req.params.name;
    const type = req.params.type;
    console.log(name,+' '+type);
    var tickets = [];
    var ticketName = ["Alfa","Apple","Tinkof"]
    for (var i = 0; i < 3; i++) {
        tickets.push(new Ticket({
            name:ticketName[i],
            type: type,
            count: i,
            value: getRandomArbitary(0,300),
            percent: i
        }));
    }

    for (var i = 0; i < 3; i++) {
        var ticket = tickets[i];
        ticket.save(function(err, ticket){
          if (err) console.log(err);
        });
    }
    var fields = {
      name: name,
      stratDate: new Date(),
      startBalance: 0,
      realBalance: 0,
      currency: '',
      tickets: tickets
    };

    var portfolio = new Portfolio(fields);
    portfolio.save(function(err, portfolio){
      if (err) return console.error(err);
      res.status(200).send({successful: "successful"});
    });
});

function getRandomArbitary(min, max)
{
  return Math.random() * (max - min) + min;
}

module.exports = router;
