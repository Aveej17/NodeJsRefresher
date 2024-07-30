const fs = require('fs');

const requestHandler = (req, res) =>{

    const url = req.url;
    const method = req.method;
    if (url === '/') {

        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Error');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("<html>");
            res.write("<head><title>Enter Message</title></head>");
            res.write(`<body><p>${data}</p>`);
            res.write("<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>");
            res.write("</html>");
            return res.end();
        });
        return; // Ensure no further processing happens for this request
    
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            // console.log(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1]; // Extract message from the form data
            fs.writeFile('message.txt', message, (err)=>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });   
        });
        
    }
}

module.exports = requestHandler;