const { error } = require("node:console")
const{productsLocators}=require("../locators/productsLocators")

class sauceProductspage{
    constructor(page){
        this.page=page
    }

    async clickLogout(){
        await this.page.click(productsLocators.menu)
        await this.page.click(productsLocators.logoutLink)
    }

    async clickAbout(){
        await this.page.click(productsLocators.menu)
        await this.page.click(productsLocators.aboutLink)
    }

    async verifyAllProductsDisplay(){
        const names=await this.page.locator(productsLocators.productNames).allTextContents()
        const description=await this.page.locator(productsLocators.productsDescription).allTextContents()
        const prices=await this.page.locator(productsLocators.productPrice).allTextContents()
        const buttonsCount=await this.page.locator(productsLocators.AddtoCartButtons).count()

        if(names.length===0){
            throw new error("no products found")
        }

        if(names.length!==description.length||names.length!==prices.length||names.length!==buttonsCount){
            throw new error("product names are not matching with desc or prices or add to cart")
        }
        
    }

    async addFirstProductToCart(){
        const buttons=await this.page.locator(productsLocators.AddtoCartButtons).first().click()
        await this.page.waitForTimeout(2000)
    }

    async addAllProductsToCart(){
        const buttons=await this.page.locator(productsLocators.AddtoCartButtons)
        const count=await buttons.count()
        for(let i=0; i<count; i++){
           await buttons.nth(i).click()
        }
    }

    async addSpecficProductsToCart(products){
        const productCards=this.page.locator(productsLocators.productItems)

        for(const product of products){
            const name=product.trim()
            let matchingCard
            let matches=0

            for(let i=0; i<await productCards.count(); i++){
                const card=productCards.nth(i)
                const productName=(await card.locator(productsLocators.productNames).textContent())?.trim()

                if(productName===name){
                    matchingCard=card
                    matches++
                }
            }

            if(matches!==1){
                throw new Error(`Expected one product named "${name}", found ${matches}`)
            }

            await matchingCard.getByRole("button",{name:"Add to cart",exact:true}).click()
        }

    }

}
module.exports={sauceProductspage}