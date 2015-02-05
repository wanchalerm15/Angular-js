var ex = require('express');
var app = ex();

var server = require('http').Server(app);

app.get('/',function(req,res){
    res.sendFile(__dirname+"/public_html/index.html");
});
app.use(ex.static(__dirname+"/public_html"));

server.listen(7777,function(){
    console.log('Server Start...port 7777');
});