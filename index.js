const express = require('express')
const { spawn } = require('child_process')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    var largeDataSet = [];
    
    const python = spawn('python', ['script3.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log(`child process close with code ${data}`);
        largeDataSet.push(data.toString());
    });
    // in case of error
    python.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(largeDataSet.join(""))
    });
    
   })
   app.listen(port, () => console.log(`Example app listening on port 
   ${port}!`))