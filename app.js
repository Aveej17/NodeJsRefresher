const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) =>{

    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write("<html>");
        res.write("<head><title>Enter Message</title><head>");
        res.write("<body><form action='/message' method='POST'><input type='text'><button type='submit'>Send</button></form><body>");
        res.write("</html>");
        return res.end();
    }
    
    // if(url === '/message' && method === 'POST'){
    //     const body = [];
    //     req.on('data', (chunk)=>{
    //         console.log(chunk);
    //         body.push(chunk);
    //     });

    //     req.on('end', ()=>{
    //         const parsedBody = Buffer.concat(body).toString();
    //         console.log(parsedBody);
    //         fs.writeFileSync('message.txt', parsedBody);
    //     })

    //     res.statusCode = 302;
    //     res.setHeader('Location', '/');
    //     return res.end();

    // }
    if (url === '/message' && method === 'POST') {
        console.log(method);
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);

        });
    
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
    
            // Asynchronous write
            fs.writeFileSync('message.txt', parsedBody, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('Message saved successfully!');
                }
            });
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
