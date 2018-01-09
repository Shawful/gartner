var express = require('express');
var cors = require('cors');
var app = express();
var server = require('http').createServer(app);
var http = require('https');
var path = require('path');



app.use(cors());

server.listen(4000);

app.use(express.static(path.join(__dirname + '/')));
