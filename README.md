# CSP Check Tool

Hello, world! This tool is designed to help you identify missing or incorrect Content Security Policy (CSP) URLs that are not included in your domain's configuration. By scanning the provided URLs, it detects which ones are not covered by your current CSP settings.

## Features

- Scans URLs to check for missing or incorrectly configured CSP entries.
- Generates a detailed report of CSP violations in the `csp-violations.json` file.
- Captures screenshots of each scanned URL for visual verification, stored in the `screenshots` folder.

## Installation

To get started with the CSP Check Tool, follow these steps:

### 1. Install Dependencies
Install the required dependencies by running the following command:

``` npm install```

### 2. Install Dependencies
Install the required dependencies by running the following command:
```mv urls.json.example urls.json ```

### 3. Add URLs to Scan
Open the ```urls.json``` file and add the list of URLs you want to scan for missing CSP entries. Each URL will be checked against your CSP configuration.

### 3. Run the Tool
After adding the URLs to ```urls.json```, run the tool with the following command:
```node index.js ```

## Results

- **CSP Violations**: The tool will generate a report detailing any CSP violations in a file named `csp-violations.json`.
- **Screenshots**: Screenshots of each URL scanned will be saved in the `screenshots` folder for visual reference.

## License

This tool is open-source and available under the [MIT License](LICENSE).

