import express from "express";
import * as fsPromise from 'fs/promises';
import { RingApi } from 'ring-client-api';
const app = express();
// const server = http.createServer(app);
const PORT = process.env.PORT ?? 9999;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}. View: http://localhost:${PORT}`);
});
// app.use(express.json())
// and use / as a base for serving static content from ./public
app.use("/", express.static("./public"));
app.get("/armHome", (req, res) => {
    if (!checkAuth(req, res))
        return;
    location.armHome().then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        res.status(500).send(err);
    });
});
app.get("/armAway", (req, res) => {
    if (!checkAuth(req, res))
        return;
    location.armAway().then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        res.status(500).send(err);
    });
});
app.get("/disarm", (req, res) => {
    if (!checkAuth(req, res))
        return;
    location.disarm().then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        res.status(500).send(err);
    });
});
app.get("/status", (req, res) => {
    if (!checkAuth(req, res))
        return;
    location.getAlarmMode().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});
function checkAuth(req, res) {
    if (req.query.auth === SECRET) {
        return true;
    }
    else {
        res.sendStatus(401);
        return false;
    }
}
const PATH = './.secret';
let TOKEN;
let SECRET;
function loadSecret() {
    fsPromise.readFile(PATH).then((data) => {
        let json = JSON.parse(data.toString());
        TOKEN = json.token;
        SECRET = json.secret;
        initRing();
    }).catch((err) => {
        throw new Error(`${PATH} not found.\n${err}`);
    });
}
function saveSecret(newData) {
    fsPromise.writeFile(PATH, newData).then(() => {
        console.log('Saved new token');
    }).catch((err) => {
        throw new Error(`failed to save new token to ${PATH}.\n${err}`);
    });
}
let ring;
let location;
async function initRing() {
    ring = new RingApi({
        refreshToken: TOKEN
    });
    ring.onRefreshTokenUpdated.subscribe(async ({ newRefreshToken, oldRefreshToken }) => {
        if (!newRefreshToken || !oldRefreshToken || newRefreshToken === oldRefreshToken) {
            return;
        }
        console.log('New Token Generated');
        saveSecret(JSON.stringify({ secret: SECRET, token: newRefreshToken }));
    });
    const locations = await ring.getLocations();
    location = locations[0];
    if (location.hasHubs) {
        let alarmMode = await location.getAlarmMode();
        // console.log(ring.disarm())
    }
    else {
        console.log('[ring] this location has no hubs');
    }
}
loadSecret();
