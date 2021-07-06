const restaurantRoutes = require('./routes/restaurants');

module.exports = (app) =>
{
    restaurantRoutes(app);
}
