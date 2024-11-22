const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const data=require("./urls.json");
async function checkCSPViolations(urls) {
  const browser = await puppeteer.launch();
  const cspViolations = [];

  for (const url of urls) {
    console.log("fetching :", url);

    try {
      const page = await browser.newPage();

      // Collect CSP violations
      page.on("console", (msg) => {
        console.log(msg.text());
        if (msg.text().includes("Refused to")) {
          cspViolations.push({
            url: url,
            violation: msg.text(),
            timestamp: new Date().toISOString(),
          });
        }
      });

      // Enable CSP reporting
      await page.goto(url, { waitUntil: ["networkidle0", "domcontentloaded","load","networkidle0"], timeout: 59000 });
      try {
        await page.click(`#accept-recommended-btn-handler`);
        await page.hover(`body`);
      } catch (error) {}
      // Optional: Take screenshots for visual reference
      await page.screenshot({
        path: path.join(
          __dirname,
          `screenshots/${new URL(url).toString().split("/").pop()}.png`
        ),
      });

      await page.close();
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
    }
  }

  await browser.close();

  // Save violations to a JSON file
  const outputPath = path.join(__dirname, "csp-violations.json");
  fs.writeFileSync(outputPath, JSON.stringify(cspViolations, null, 2));

  return cspViolations;
}

// Example usage

checkCSPViolations(data.urls)
  .then((violations) => {
    console.log("CSP Violations Found:", violations);
  })
  .catch(console.error);
