function User(){
    this.account = "";
    this.password = "";
}

function User(account,password){
    this.account = account;
    this.password = password;
}

function Item(id,shop_id,name,price,image_path,category,key_word,average_score){
    this.id = id;
    this.shop_id = shop_id;
    this.name = name;
    this.price = price;
    this.image_path = image_path;
    this.category = category;
    this.key_word = key_word;
    this.average_score = average_score;
}

module.exports = {
    User: User,
    Item: Item
};
