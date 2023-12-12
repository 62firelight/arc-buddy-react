const server = require('../server.js');
const destinyApi = require('node-destiny-2');
const QuriaAPI = require('quria').Quria;

const classMap = {
    0: 'Titan',
    1: 'Hunter',
    2: 'Warlock'
}

const raceMap = {
    0: 'Human',
    1: 'Awoken',
    2: 'Exo'
}

exports.searchDestinyPlayer = (req, res) => {
    const destiny = server.getDestiny();

    if (destiny == undefined) {
        console.log(`Couldn't create Destiny 2 API wrapper object!`);
        res.status(404).send(`Couldn't create Destiny 2 API wrapper object!`);
    }

    const name = req.params.name;
    const id = req.params.id;

    const bungieName = name + "#" + id;

    destiny.SearchDestinyPlayerByBungieName(-1, bungieName)
        .then(response => {
            const data = response.Response;
            res.status(200).send(data);
        })
        .catch(err => {
            console.error(`searchPlayer Error: ${err}`);
            res.status(404).send('Could not find specified Destiny player');
        });
};

exports.getHistoricalStats = (req, res) => {
    const destiny = server.getDestiny();

    if (destiny == undefined) {
        console.log(`Couldn't create Destiny 2 API wrapper object!`);
        res.status(404).send(`Couldn't create Destiny 2 API wrapper object!`);
    }

    const membershipType = req.params.type;
    const membershipId = req.params.id;

    destiny.GetHistoricalStatsForAccount(membershipId, membershipType)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            console.log(err);

            res.status(404).send('Could not find stats for specified Destiny player');
        });
};

exports.getProfile = (req, res) => {
    const destiny = server.getDestiny();

    if (destiny == undefined) {
        console.log(`Couldn't create Destiny 2 API wrapper object!`);
        res.status(404).send(`Couldn't create Destiny 2 API wrapper object!`);
    }

    const membershipType = req.params.type;
    const membershipId = req.params.id;

    destiny.GetProfile(membershipId, membershipType, {components: [100, 200]})
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            console.log(err);

            res.status(404).send('Could not find characters for specified Destiny player');
        });
};

exports.getVendors = (req, res) => {
    const destiny = server.getDestiny();
    if (destiny == undefined) {
        console.log(`Couldn't create Destiny 2 API wrapper object!`);
        res.status(404).send(`Couldn't create Destiny 2 API wrapper object!`);
        return;
    }

    const accessToken = server.getAccessToken();
    if (accessToken == undefined) {
        console.log(`Couldn't retrieve OAuth access token!`);
        res.status(404).send(`Couldn't retrieve OAuth access token!`);
        return;
    }
    
    destiny.GetVendors('2305843009301648414', '4611686018468181342', 3, { components: [400, 401, 402] }, { access_token: accessToken })
        .then((response) => {

            if (response.ErrorCode == 12 || response.error == true) {
                // attempt to refresh access token for next request
                server.refreshAccessToken()
                    .then((accessToken) => {
                        server.setAccessToken(accessToken);
                    });

                res.status(404).send('Insufficient privileges');
            } else {
                res.status(200).send(response);
            }
            
        })
        .catch((error) => {
            console.error(error);

            res.status(404).send("Couldn't fetch vendors");
        });

};