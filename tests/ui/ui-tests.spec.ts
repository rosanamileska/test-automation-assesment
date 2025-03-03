import { test, expect } from '@playwright/test';

 // Runs before each test and redirects to the url
test.beforeEach(async ({ page }) => {
    await page.goto('/');
});


// Runs after each test and closes the page
test.afterEach(async ({ page }) => {
    await page.close();
})

// Test scenarios for unsuccessful login
test('Verify unsuccessful login with invalid password', async ({ page }) => {
    // Filling up the login form
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('test123');
    await page.locator("[type=submit]").click();

    // Validates the received error message
    await expect(page.getByRole('heading', { name: 'Epic sadface: Username and password do not match any user in this service' })).toBeVisible();
});

test('Verify that the username field is required', async ({ page }) => {
    // Filling up the login form
    await page.getByPlaceholder('Username').fill('');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator("[type=submit]").click();

    // Validates the received error message
    await expect(page.getByRole('heading', { name: 'Epic sadface: Username is required' })).toBeVisible();
});

test('Verify that the password field is required', async ({ page }) => {
    // Filling up the login form
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('');
    await page.locator("[type=submit]").click();

    // Validates the received error message
    await expect(page.getByRole('heading', { name: 'Epic sadface: Password is required' })).toBeVisible();
});

test('Verify successful login', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator("[type=submit]").click();

    // Expect a page to redirect different URL
    await expect(page).toHaveURL('/inventory.html');
});

// Test for successful checkout
test('Verify successful checkout', async ({ page }) => {
    // Navigating to the website and logging in the user successfully
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator("[type=submit]").click();

    // Adding one product in the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Adding second product in the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Redirecting to the cart page
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Clicking on the checkout button
    await page.locator('[data-test="checkout"]').click();

    // Continuing the checkout flow with adding shipping information and submitting
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('3438LE');
    await page.locator("[type=submit]").click()

    //Validating the final total price
    const expectedTotalPrice = 43.18; 
    const priceTotal = page.locator('[data-test="total-label"]');
    const priceText = await priceTotal.innerText();
    const finalPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));

    // Finishing the checkout
    await (page.getByRole('button', { name: 'finish' })).click();

    // Validating the successful checkout
    await expect (page.locator('[data-test="checkout-complete-container"]')).toBeVisible();

    // Validating the final price
    expect(finalPrice).toEqual(expectedTotalPrice);

});

// Test that sorts the items by name Z-A
test('Verify that the items are sorted by name Z-A ', async ({ page }) => {

    // Filling up the login form
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator("[type=submit]").click();
  
    // Selects the sorting option Z-A
    await page.locator('[data-test="product-sort-container"]').selectOption('za');

    // Validating that the order of the items is changed with checking that different item is in viewport
    await expect (page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')).toBeInViewport();

  });


  

  
  

  