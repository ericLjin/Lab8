describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
      const entry1 = await page.click('journal-entry'); //click the first journal entry
      const urlStr = page.url();
      let containsEntry = urlStr.includes(`/#entry1`);
      expect(containsEntry).toBe(true);
    //Clicking on the first journal entry should update the URL to contain “/#entry1”
  });

  it('Test4: On first Entry page - checking page header title', async () => {
      const headerText = await page.$eval('h1', elem => elem.textContent);
      expect(headerText).toBe('Entry 1');
    //Clicking on the first journal entry should update the header text to “Entry 1”
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
      let entry = await page.$('entry-page');
      let data = await entry.getProperty('entry');
      let jsonObj = await data.jsonValue();
      expect(jsonObj.title).toBe('You like jazz?');
      expect(jsonObj.date).toBe('4/25/2021');
      expect(jsonObj.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
      expect(jsonObj.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
      expect(jsonObj.image.alt).toBe('bee with sunglasses');
    /*
     Clicking on the first journal entry should contain the following contents:
        {
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
      const bodyClasses = await page.$eval('body', elem => elem.classList);
      expect(bodyClasses[0]).toBe('single-entry');
    //Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
       await page.click('header > img'); //click the settings img
       const urlStr = page.url();
       let containsSettings = urlStr.includes(`/#settings`);
       expect(containsSettings).toBe(true);
    //Clicking on the settings icon should update the URL to contain “/#settings”
  });

  it('Test8: On Settings page - checking page header title', async () => {
      const headerText = await page.$eval('h1', elem => elem.textContent);
      expect(headerText).toBe('Settings');
    //Clicking on the settings icon should update the header to be “Settings”
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
      const bodyClasses = await page.$eval('body', elem => elem.classList);
      expect(bodyClasses[0]).toBe('settings');
    //Clicking on the settings icon should update the class attribute of <body> to ‘settings’
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
      await page.goBack();
      const urlStr = page.url();
      let containsEntry = urlStr.includes(`/#entry1`);
      expect(containsEntry).toBe(true);
    //Clicking on the back button should update the URL to contain ‘/#entry1’
  });

  it('Test11: Clicking the back button once should bring the user back to home page', async () => {
      await page.goBack();
      const headerText = await page.$eval('h1', elem => elem.textContent);
      expect(headerText).toBe('Journal Entries');
      //Clicking the back button once should bring the user back to the home page
  });

  it('Test12: On the homepage, the header title should be Journal Entries', async () => {
      const headerText = await page.$eval('h1', elem => elem.textContent);
      expect(headerText).toBe('Journal Entries');
      //When the user if on the homepage, the header title should be “Journal Entries”
  });

  it('Test13: On home page, <body> element should have no class attributes', async () => {
      const bodyClasses = await page.$eval('body', elem => elem.classList);
      expect(bodyClasses).toEqual({});
      //On the home page the <body> element should not have any class attribute
  });

  it('Test14: Click on entry2, URL should be /#entry2', async () => {
      const entries = await page.$$('journal-entry');
      const entryTwo = await entries[1].click();
      await page.waitForNavigation();
      const urlStr = page.url();
      let containsEntry = urlStr.includes(`/#entry2`);
      expect(containsEntry).toBe(true);
      //Verify the url is correct when clicking on the second entry
  });

  it('Test15: Click on entry2, check title is correct', async () => {
      const headerText = await page.$eval('h1', elem => elem.textContent);
      expect(headerText).toBe('Entry 2');
      //Verify the title is current when clicking on the second entry
  });

  it('Test16: Verify Entry2 page content is correct', async () => {
      let entry = await page.$('entry-page');
      let data = await entry.getProperty('entry');
      let jsonObj = await data.jsonValue();
      expect(jsonObj.title).toBe('Run, Forrest! Run!');
      expect(jsonObj.date).toBe('4/26/2021');
      expect(jsonObj.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
      expect(jsonObj.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
      expect(jsonObj.image.alt).toBe('forrest running');
      //Verify the entry page contents is correct when clicking on the second entry
  });

  it('Test17: Clicking on header should bring you back to main page', async () => {
      let header = await page.$('header > h1');
      await header.click(); //click the header text
      const headerText = await page.$eval('h1', elem => elem.textContent);
      expect(headerText).toBe('Journal Entries');//verify we are on mainpage
  });

  it('Test18: Click on Entry 10, check title ', async() => {
      const entries = await page.$$('journal-entry');
      const entryTwo = await entries[9].click();
      await page.waitForNavigation();
      const urlStr = page.url();
      let containsEntry = urlStr.includes(`/#entry10`);
      expect(containsEntry).toBe(true);
      //Verify the url is correct when clicking on 10th entry
  });

  it('Test19: Verify Title is correct for entry 10', async() => {
      const headerText = await page.$eval('h1', elem => elem.textContent);
      expect(headerText).toBe('Entry 10');
      //Verify the title is current when clicking on the 10th entry
  });

  it('Test20: Verify entry 10 has audio', async() => {
      let entry = await page.$('entry-page');
      let data = await entry.getProperty('entry');
      let jsonObj = await data.jsonValue();
      expect(jsonObj.audio).toBe('https://drive.google.com/uc?export=download&id=1luYh909US7ZBFe6uo440Vv_LNnRdnErT');
  });

});
