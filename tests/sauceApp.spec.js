const { test, expect } = require("@playwright/test")
const { sauceLoginpage } = require("../pages/sauceLoginpage")
const { detailsEnvConfig } = require("../utils/detailsEnvConfig")
const { loginLocators } = require("../locators/loginLocators")
const { sauceProductspage } = require("../pages/sauceProductspage")
const{productsLocators}=require("../locators/productsLocators")
const{productsData}=require("../test-data/productsData")

let loginpage
let productspage
test.describe("sauce apps", async () => {

    test.beforeEach("beforeeach", async ({ page }) => {
        loginpage = new sauceLoginpage(page)
        productspage = new sauceProductspage(page)

        await loginpage.navigate()
        await loginpage.login(detailsEnvConfig.username, detailsEnvConfig.password)

    })

    test("click logout", async ({ page }) => {
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productspage.clickLogout()
        await expect(page.locator(loginLocators.loginButton)).toBeVisible()
    })

    test("click aboutlink",async({page})=>{
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productspage.clickAbout()
        await expect(page.locator(productsLocators.aboutLogo)).toBeVisible()
    })

    test("add specific product", async({page})=>{
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productspage.addSpecficProductsToCart(productsData)
        // await page.pause()
        await expect(page.locator(".shopping_cart_badge")).toHaveText(String(productsData.length))
        await page.locator(productsLocators.shoppingCartLink).click()

        const cartProducts=await page.locator(productsLocators.cartProductNames).allTextContents()
        expect(cartProducts.sort()).toEqual([...productsData].sort())
    })

})
