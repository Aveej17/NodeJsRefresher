const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) =>{

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>");
        res.write("</html>");
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            // console.log(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1]; // Extract message from the form data
            fs.writeFileSync('message.txt', message);  
        });
        res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
    }
    res.setHeader("Content-Type", "text/html")
    res.write("<html>");
    res.write("<head><title>My Page</title><head>");
    res.write("<body>Welcome<body>");
    res.write("</html>");
    res.end();
    
});
server.listen(4000);
