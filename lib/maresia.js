const http = require('http');

// ------------------- START ---------------------------------------
function start(msg, port) {
  var serverSettings = function(req, res){
    res.setEncoding('utf8');
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify({
      data: msg
    }));
    res.end();
  }
  var server = http.createServer(serverSettings);

  server.listen(port);
  console.log(`Server On ${port}`)

  return port;
};



function calendar(
  self,
  options = { month: 1, season: 'summer', semester: 1 },
  ){ 
    var postData = JSON.stringify({
      'ano': self,
      'mês': options.month,
      'estação': options.season,
      'semestre': options.semester,
    });
    const headers = {
      hostname: 'localhost:5500',
      port: 80,
      path: '/calendar',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    const req = http.request(headers, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    req.write(postData);
    req.end();
}

module.exports = {
  calendar,
  start
}