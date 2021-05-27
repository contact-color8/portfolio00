const http = require('http');
const cors = require('cors');

const server = http.createServer();
const corsOptions = {
    origin: 'https://github.com/contact-color8/usersystem.git'
}

app.use(express.static(path.join(__dirname, 'public')), cors(corsOptions));

server.on('request', function(req, res){
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write('<html><body><h1>Hello World!!!</h1></body></html>');
    res.end();
});

server.listen(8000, 'localhost');

console.log('server listening...');


