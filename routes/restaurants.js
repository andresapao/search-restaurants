module.exports = app => {
    const controller = require('../controllers/restaurants')();
  
    app.get('/api/restaurants', controller.getRestaurants);
    app.get('/api/restaurants/search', controller.applySearch);    
  }