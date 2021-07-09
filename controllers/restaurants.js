module.exports = () => {
    const csvjson = require('csvtojson');
    function applyDistanceCriteria(obj, req)
    {
        return (req.query.distance === undefined || obj.distance <= req.query.distance);
    }
    function applyNameCriteria(obj, req)
    {
        return (req.query.name === undefined || obj.name.toUpperCase().includes(req.query.name.toUpperCase()));
    }
    function applyRatingCriteria(obj, req)
    {
        return (req.query.rating === undefined || obj.customer_rating >= req.query.rating);
    }
    function applyCuisineCriteria(obj, req)
    {
        return (req.query.cuisine === undefined || obj.cuisineDesc.toUpperCase().includes(req.query.cuisine.toUpperCase()));
    }
    let restaurants = [];    
    const convertedObj =  csvjson().fromFile('./source_data/restaurants.csv');
//    cuisinesController = require('./cuisines')();

    const cuisinesObj =  csvjson().fromFile('./source_data/cuisines.csv');
    let cuisines = [];
    cuisinesObj.then(res =>  new Promise(res));
    convertedObj.then(res =>  
    {
        restaurants = res;
        const result = Array.from(restaurants);
        cuisinesObj.then((ret => 
            {
                cuisines = ret
                result.forEach((item) =>
                {
                    item.cuisineDesc = (cuisines.find(obj => obj.id === item.cuisine_id)).name;
                }
                );
            }));

    });

    const controller = {};
    controller.getRestaurants = (req, res) => res.status(200).json(restaurants);
    controller.applySearch = (req, res) =>
    {
        const result = restaurants.filter(obj => applyNameCriteria(obj, req) && applyRatingCriteria(obj, req) && applyDistanceCriteria(obj, req) && applyCuisineCriteria(obj, req));

        return res.status(200).json(result);
    }

    return controller;
};