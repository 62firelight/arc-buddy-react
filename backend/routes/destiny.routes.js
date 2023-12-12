module.exports = (app) => {
    const destiny = require('../controllers/destiny.controller.js');
    
    app.get('/api/players/:name/:id', destiny.searchDestinyPlayerByBungieName);

    app.get('/api/players/account/:type/:id', destiny.getHistoricalStatsForAccount);

    app.get('/api/players/character/:type/:id', destiny.getProfile);

    app.get('/api/vendors', destiny.getVendors);
};