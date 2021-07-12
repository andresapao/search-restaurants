module.exports = () => {
    const csvjson = require('csvtojson');
    function applyDistanceCriteria(obj, req)
    {
        if(req.query.distance && Number.isNaN(Number.parseInt(req.query.distance))) throw new Error("Invalid distance")
        if(req.query.distance < 1 || req.query.distance > 10) throw new Error("Distance should be between 1 and 10")                
        return (req.query.distance === undefined || Number.parseInt(obj.distance) <= Number.parseInt(req.query.distance));
    }
    function applyNameCriteria(obj, req)
    {
        return (req.query.name === undefined || obj.name.toUpperCase().includes(req.query.name.toUpperCase()));
    }
    function applyRatingCriteria(obj, req)
    {
        if(req.query.rating && Number.isNaN(Number.parseInt(req.query.rating))) throw new Error("Invalid rating")
        if(req.query.rating < 1 || req.query.rating > 5) throw new Error("Rating should be between 1 and 5")        
        return (req.query.rating === undefined  || Number.parseInt(obj.customer_rating) >= Number.parseInt(req.query.rating));
    }
    function applyCuisineCriteria(obj, req)
    {
        return (req.query.cuisine  === undefined || obj.cuisineDesc.toUpperCase().includes(req.query.cuisine.toUpperCase()));
    }
    let restaurants = [];    
    const convertedObj =  csvjson().fromFile('./source_data/restaurants.csv');
    cuisinesController = require('./cuisines')();

    let cuisines = [];
    cuisinesObj = cuisinesController.getCuisines();
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
        try
        {
            let result = restaurants.filter(obj => applyNameCriteria(obj, req) && applyRatingCriteria(obj, req) && applyDistanceCriteria(obj, req) && applyCuisineCriteria(obj, req));
            result = result.sort(compare).splice(0,5);
            return res.status(200).json(result);
        }
        catch(err)
        {
            return res.status(500).json({message: err.toString()});
        }
    }
    function compare( a, b ) {

        let distanceComparison = (Number.parseInt(a.distance) - Number.parseInt(b.distance));
        let ratingComparison = (Number.parseInt(b.customer_rating) - Number.parseInt(a.customer_rating));            
        let priceComparison = (Number.parseInt(a.price) - Number.parseInt(b.price));            
        return distanceComparison || ratingComparison || priceComparison;
      }
      
    return controller;
};  