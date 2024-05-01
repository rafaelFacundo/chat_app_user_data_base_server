import express from "express";
import fs from "fs";
import https from "https";

//++++++++++++++++++++++++++++++++++++++++
// I DID NOT CREATE THE HTTPS SERVER BECAUSE OF PROBLEMS WITH THE CERTIFICATES
// BUT I WILL SEARCH HOW TO FIX THESE PROBLEMS WITH THE CERTIFICATE
// BASICALLY I CAN NOT TEST THE SERVER ON THE LOCALHOST

// this is my app, basically this app const will contain all the express functions
// like to create the server, add routers, etc
// in other words it's my express app
const app = express();

// going to create a https server
// this server will receive requests from the chat app that I am working on
// and basically will be a crud application for the users data base of the chat application
// that is, for exemple, when some one wants to create a new user account in the chat app
// the application will make a request to this server to create a new account
// and so on to the other functionalities of a crud application like update and delete an user.

// first, to create a https server, we need the ssl certificate and key
// i generated the selfsigned certificate with openssl and will read it with the fs package from node
const ssl_certificate = fs.readFileSync("./server.crt");
const ssl_key = fs.readFileSync("./server.key");

// now I am going to create a object that contains the certificate and the key
const credentials = { key: ssl_key, cert: ssl_certificate };

// creating the https server
const httpsServer = https.createServer(app, credentials);

httpsServer.listen(8080);
