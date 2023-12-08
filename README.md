# Arc Buddy 

Arc Buddy is a web application that uses the [Bungie.Net API](https://bungie-net.github.io/) to look up statistics for [Destiny 2](https://store.steampowered.com/app/1085660/Destiny_2/) players. This is meant to be a more lightweight rewrite of the [original Arc Buddy app](https://github.com/62firelight/ArcBuddy-349) which uses React rather than Angular for the front-end.

Contributions are welcome, but keep in mind that this project was initially built as part of a University course. It was mainly for me to practice calling an external API and then transforming the responses into something displayable on a web page. I also used this application to practice developing with React, Angular and Express.js. 

## Developer Quick-start

1. Clone the repository using `git clone https://github.com/62firelight/arc-buddy-react.git`
2. Run `npm install` inside the backend and frontend folders to install dependencies
3. Acquire an API key. DIM has [instructions](https://github.com/DestinyItemManager/DIM/blob/master/docs/CONTRIBUTING.md#get-your-own-api-key) on how to do this
4. Create an environment variable called `ARC_KEY`
5. Inside the backend folder, run `node server.js` to start the back-end server at http://localhost:3000/
6. Inside the frontend folder, run `npm run dev` to start the front-end server at http://localhost:4000/

## Using the Application

You can search for a Bungie Name using the provided search bar. A Bungie Name takes after the format `Guardian#1234`. You can use my Bungie name (62firelight#8173) to test the application. Once finished typing a Bungie Name, you can push "Enter" or click the "Search" to begin a search. 

An unsuccessful search should return an error message. Otherwise, if the search was successful, you should see the stats for the Destiny 2 player that you've searched for, along with a few filters on the left-hand side.

## Special Thanks

* Bungie for providing such an extensive API ([GitHub](https://github.com/Bungie-net/api))
* brandonmanke for providing an easy-to-use API wrapper that made calling the API much easier ([GitHub](https://github.com/brandonmanke/node-destiny-2))
* FraWolf and Kasui92 for creating Quria, an up-to-date API wrapper ([GitHub](https://github.com/FraWolf/quria))
