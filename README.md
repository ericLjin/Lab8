# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? 1

2. No, as this messaging feature would most likely require reliance on and interaction with other components, which is not something that unit tests are suited for.

3. Yes, max message length is fairly separate from other components, and so will not be affected by other changes to the application.

4. Running the tests would not cause a browser UI to be created / popup if "headless" is set to true.

5. You could add a line like `await page.click('header > img');` to click the settings wheel, bringing you to the settings page
