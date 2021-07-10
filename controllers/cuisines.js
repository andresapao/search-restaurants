module.exports = () => {
    const csvjson = require('csvtojson');

    function fetchData()
    {
        return  csvjson().fromFile('./source_data/cuisines.csv');
    }

    const controller = {};
//    controller.getCuisines = (req, res) => res.status(200).json(cuisines);
    controller.getCuisines = () => fetchData();

    return controller;
};