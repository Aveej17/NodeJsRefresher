const http = require('http');


const server = http.createServer((req, res) =>{
    // console.log(req.url, req.method, req.headers);
    // console.log("URL: "+ req.url);
    // console.log("METHOD : " +req.method);
    // console.log("HEADERS :" +req.headers);
    res.setHeader("Content-Type", "text/html")
    res.write("<html>");
    res.write("<head><title>My Page</title><head>");
    res.write("<body>Welcome<body>");
    res.write("</html>");
    res.end();
    
});
server.listen(4000);
