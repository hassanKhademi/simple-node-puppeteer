const express = require('express');
const path = require('path');
const app = express();
const puppeteer = require('puppeteer-core');
const bodyParser = require('body-parser');
const fs = require('fs');
const port =80;
const pathToChrome = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
let isHideChromeOnPreccess = false;
let imageFileName = "example.png"

console.log('server ready to use ... on port: ' + port )

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
app.use('/', express.static(path.join(__dirname, 'public\\client\\dist\\client')))

app.get('/getScreenshot', async function (req, res) {

    let url = req.query.url;
    if (!url) {
        return res.send('send url queryParmas => url="https://www.exapmle.com"');
    }
    try {


        const browser = await puppeteer.launch({ executablePath: pathToChrome, headless: isHideChromeOnPreccess });
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({ path: imageFileName });
        await browser.close();

        fs.readFile(imageFileName, function (err, data) {

            if (err) {
                return res.send('con not serve image to client')
            }

            let base64 = 'data:image/png;base64,' + new Buffer.from(data, 'binary').toString('base64');
            //console.log('sssssss',base64);  
            res.send(base64);

        })

    } catch (e) {

        res.send('err call url ################', e);

    }
})
 
app.listen(port)