function User(){
    this.account = ""
    this.password = ""
}
function User(account,password){
    this.account = account
    this.password = password
}

module.exports = {
    User: User
};