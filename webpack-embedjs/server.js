var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static('dist'));
app.use(express.static('src'));

app.get("*", (req, res) => {
   fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
});

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://blog.chatboot.com:8080/index.html");
})