require("dotenv").config();
const express = require("express");
const { google } = require("googleapis");
const request = require("request");
const cors = require("express");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParser = require("body-parser");
const axios = require("axios");

const {
  PORT = 3000,
  CLIENT_OAUTH_ID,
  CLIENT_OAUTH_SECRET,
  YOUTUBE_CHANNEL_ID,
} = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const oauth2Client = new google.auth.OAuth2(
  CLIENT_OAUTH_ID,
  CLIENT_OAUTH_SECRET,
  `http://localhost:${PORT}/channel`
);

app.get("/", (_req, res) => res.send("Service Available!"));
app.get("/getURL", (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userID: req.body.userid,
    }),
  });

  request(url, (err, response, _body) => {
    console.log("error: ", err);
    console.log("statusCode: ", response && response.statusCode);
    res.send({ url });
  });
});

app.get("/channel", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  //console.log(code);

  const tokens = await oauth2Client.getToken(code);
  //console.log(tokens);

  try {
    const { data } = await axios({
      method: "GET",
      headers: {
        authorization: `Bearer ${tokens.tokens.access_token}`,
      },
      "Content-Type": "application/json",
      url: "https://www.googleapis.com/youtube/v3/channels",
      params: {
        part: "id",
        part: "snippet",
        part: "contentDetails",
        id: YOUTUBE_CHANNEL_ID,
      },
    });

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Service listening on port ${PORT}`));
