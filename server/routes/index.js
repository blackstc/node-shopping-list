var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// constructor
function ItemLibrary() {
  this.items = [];
  this.id = 0;
}

// methods
ItemLibrary.prototype.addItem = function(name) {
  var newItem = {name: name, id: this.id};
  this.items.push(newItem);
  this.id += 1;
};

// create some instances
var storage = new ItemLibrary();
storage.addItem('Noodles');
storage.addItem('Tomatoes');
storage.addItem('Peppers');

// route handler
router.get('/items', function(req, res) {
  res.json(storage.items);
});

// post single item
router.post('/items', function(req, res) {
  var name = req.body.name;
  storage.addItem(name);
  res.json(storage.items);
});

// put a single item
router.put('/items/:id', function(req, res, next) {
  var items = storage.items.filter(function(item){
    return item.id === +req.params.id;
  });

  var name = req.body.name;

  if (items.length > 0) {
    items[0].name = name;
    res.json({message: "Name changed successfully", item: items});
  } else {
    storage.addItem(name);
    res.json({message: "Item has been added", items: storage.items});
  }
});

// delete a single item
router.delete('/items/:id', function(req, res, next) {
  var items = storage.items.filter(function(item){
    return item.id === +req.params.id;
  });

  if (items.length > 0) {
    for (var i = 0; i < storage.items.length; i++) {
      if (storage.items[i].id === +req.params.id) {
        var tempFood = storage.items.splice(i, 1);
        res.json({
          message: "the food is gone!",
          item:  tempFood
        });
      }
    }
  } else {
    res.json({message: "food doesn't exist"});
  }
});


module.exports = router;
