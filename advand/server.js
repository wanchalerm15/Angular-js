var exp = require('express');
var app = exp();
var http = require('http').Server(app);

/*--------------------------------------------------------*/

app.use(exp.static(__dirname+'/webroot'));
app.get('/',function(request,respon){
    respon.sendFile(__dirname+'/webroot/index.html');
});
http.listen(9999,function(){
    console.log('Server start....');
    console.log('post 9999');
});