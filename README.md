# Assignment 1 - ITPM Automated Testing Project

## Project Overview
This project contains automated test cases for testing a Singlish-to-Sinhala translation system using Playwright. The tests validate both functional correctness and UI behavior of the translation application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Tests](#running-the-tests)
- [Test Configuration](#test-configuration)
- [Test Reports](#test-reports)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before running the tests, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Git** (optional, for cloning the repository)
  - Download from: https://git-scm.com/

## Installation

Follow these steps to set up the project:

### Step 1: Clone or Download the Repository

**Option A - Using Git:**
```bash
git clone <your-repository-url>
cd <repository-folder-name>
```

**Option B - Manual Download:**
1. Download the ZIP file from the repository
2. Extract the contents
3. Navigate to the project folder in your terminal/command prompt

### Step 2: Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

This will install:
- Playwright test framework
- Required browsers (Chromium, Firefox, WebKit)
- All necessary dependencies

### Step 3: Install Playwright Browsers

If browsers are not automatically installed, run:

```bash
npx playwright install
```

Or to install a specific browser:

```bash
npx playwright install chromium
```

## Project Structure

```
project-root/
│
├── tests/
│   ├── functional.spec.js    # Positive & negative functional test cases
│   ├── ui-tests.spec.js      # UI-related test cases
│                  
│
├── playwright.config.js               # Playwright configuration file
├── package.json                       # Project dependencies
├── package-lock.json                  # Locked dependency versions
├── README.md                          # This file
└── test-results/                      # Generated after test execution
    └── reports/                       # HTML test reports
```

## Running the Tests

### Run All Tests

To execute all test cases:

```bash
npx playwright test
```

### Run Specific Test Files

To run only positive functional tests:
```bash
npx playwright test tests/positive-functional.spec.js
```

To run only negative functional tests:
```bash
npx playwright test tests/negative-functional.spec.js
```

To run only UI tests:
```bash
npx playwright test tests/ui-tests.spec.js
```

### Run Tests in Headed Mode (with browser visible)

```bash
npx playwright test --headed
```

### Run Tests with Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests with UI Mode (Interactive)

```bash
npx playwright test --ui
```

## Test Configuration

The `playwright.config.js` file contains the following key configurations:

- **Timeout**: Default test timeout is set to 30 seconds
- **Retries**: Tests retry once on failure
- **Browsers**: Tests run on Chromium, Firefox, and WebKit
- **Base URL**: Configured to https://www.swifttranslator.com/
- **Screenshots**: Captured only on test failure
- **Videos**: Recorded only on first retry

You can modify these settings in `playwright.config.js` as needed.

## Test Reports

### View HTML Report

After test execution, generate and view the HTML report:

```bash
npx playwright show-report
```

This will open an interactive HTML report in your default browser showing:
- Test results (Pass/Fail)
- Execution time
- Screenshots (for failed tests)
- Detailed error messages
- Test traces

### View Last Test Results

```bash
npx playwright show-report
```

## Test Case Categories

### Positive Functional Tests (Pos_Fun_xxxx)
- Tests where the system correctly converts Singlish to Sinhala
- Covers: sentence structures, tenses, mixed language, formatting, etc.
- Expected Status: **Pass**

### Negative Functional Tests (Neg_Fun_xxxx)
- Tests where the system fails or behaves incorrectly
- Covers: joined words, spacing issues, misspellings, special characters
- Expected Status: **Fail** (documents system limitations)

### UI Tests (Pos_UI_xxxx / Neg_UI_xxxx)
- Tests related to user interface behavior
- Covers: real-time output updates, input clearing, etc.

## Troubleshooting

### Issue: "Cannot find module '@playwright/test'"
**Solution:**
```bash
npm install
```

### Issue: "Browser not installed"
**Solution:**
```bash
npx playwright install
```

### Issue: "Timeout exceeded"
**Solution:**
- Increase timeout in `playwright.config.js`
- Check your internet connection
- Verify the website URL is accessible

### Issue: "Tests are failing unexpectedly"
**Solution:**
- Run tests in headed mode to observe: `npx playwright test --headed`
- Check if the website structure has changed
- Verify your Node.js version is 16 or higher
- Clear browser cache and retry

### Issue: "Permission denied" errors
**Solution:**
- On Linux/Mac: Run with sudo if needed
- On Windows: Run terminal as Administrator
- Check file permissions in the project directory

## Additional Commands

### Clear test results and cache
```bash
rm -rf test-results playwright-report .playwright
```

### Update Playwright to latest version
```bash
npm install -D @playwright/test@latest
npx playwright install
```

### Run a single test case
```bash
npx playwright test -g "test case name"
```

## Notes

- Tests are designed to run against https://www.swifttranslator.com/
- Test execution may take several minutes depending on the number of test cases
- Some tests are expected to fail (negative test cases) - this is intentional
- Screenshots and videos are only captured for failed tests to save space

## Support

For issues or questions:
1. Check the Playwright documentation: https://playwright.dev/
2. Review test results in the HTML report
3. Run tests in debug mode for detailed investigation

## Author

Name : Samaranayaka R R 
Registration Number : IT23836754 
Course : IT3040 - ITPM  
Date : 2026/01/30
