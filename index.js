const puppeteer = require('puppeteer');
const express = require('express');
const url = require('url');
const path = require('path');
const fs = require('fs/promises');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/api/make', async (req, res) => {
  const website = req.query.website;
  const captureData = {
    website,
    ipAddress: req.ip,
  };
  await saveCaptureData(captureData);

  if (!website || !isValidURL(website)) {
    return res.status(400).send({message: `Invalid '${website}' URL!!`});
  }

  const parsedUrl = url.parse(website);
  const hostname = parsedUrl.hostname;
  const prefix = Math.random().toString(36).substring(2, 14);
  const fileOrigin = `${prefix}-${hostname}`;
  const imgOutput = `public/${fileOrigin}.png`;
  const pdfOutput = `public/${fileOrigin}.pdf`;

  try {
    await takeScreenshot(website, imgOutput, pdfOutput);
  } catch (error) {
    return res.status(500).send({message: 'Error taking screenshot' + error});
  }

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const response = {
    screenshot_path: `${baseUrl}/download/${fileOrigin}.png`,
    pdf_path: `${baseUrl}/download/${fileOrigin}.pdf`,
  };

  res.send(response);
});

function isValidURL(url) {
  const urlRegex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}

async function takeScreenshot(url, imgOutput, pdfOutput) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: imgOutput, fullPage: true, type: 'png'  });
  await page.pdf({ path: pdfOutput, format: 'A4', printBackground: true, });

  await browser.close();
}

async function saveCaptureData(data) {
  try {
    const existingData = await fs.readFile(dataFilePath, 'utf-8');
    const jsonData = JSON.parse(existingData);

    jsonData.push(data);

    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
  } catch (error) {
    await fs.writeFile(dataFilePath, JSON.stringify([data], null, 2), 'utf-8');
  }
}

app.use('/download', express.static(path.join(__dirname, 'public')));
app.listen(port);
