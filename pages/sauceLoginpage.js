const{loginLocators}=require("../locators/loginLocators")
const{detailsEnvConfig}=require("../utils/detailsEnvConfig")

class sauceLoginpage{
    constructor(page){
        this.page=page
    }

    async navigate(){
        await this.page.goto(detailsEnvConfig.url)
    }

    async login(username,password){
        await this.page.fill(loginLocators.usernameInput,username)
        await this.page.fill(loginLocators.passwordInput,password)
        await this.page.click(loginLocators.loginButton)
    }
}
module.exports={sauceLoginpage}