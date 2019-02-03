function User(){
    this.account = "";
    this.password = "";
}
function User(account,password){
    this.account = account;
    this.password = password;
}

function Item(id,name,price){
    this.id = id;
    this.name = name;
    this.price = price;
}

module.exports = {
    User: User,
    Item: Item
};