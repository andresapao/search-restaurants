module.exports = () => {
    const csvjson = require('csvtojson');

    function fetchData()
    {
        const convertedObj =  csvjson().fromFile('./source_data/cuisines.csv');
        let cuisines = [];
        convertedObj.then(res => cuisines = res);
        return cuisines;
    }

    const controller = {};
//    controller.getCuisines = (req, res) => res.status(200).json(cuisines);
    controller.getCuisines = async () => fetchData();

    return controller;
};