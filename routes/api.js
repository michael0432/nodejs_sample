var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var object = require('./object');


// api : register
// input : account / password
// output : Promise -> reslove(0) or reslove(1) or reject

function register_db(account,password){
    return new Promise(function(resolve, reject){
      MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
        if (err) reject(err);
        var db = client.db('mydb');
        db.collection('Account',function(err,collection){
          if(err) reject(err);
          collection.find({account:account}).toArray(function(err,items){
            if(err) reject(err);
            if(items.length == 0){
              collection.insertOne({account:account, password:password },function(err, result){
                if(err) reject(err);
                resolve(1);
              });
            }
            else{
              resolve(0);
            }
          })
        })
      })
    });
}

// api : login
// input : account / password
// output : Promise -> reslove(0) or reslove(1) or reject
function login_db(account,password){
    return new Promise(function(reslove, reject){
        MongoClient.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true }, function (err, client){
            if (err) reject(err);
            var db = client.db('mydb');
            db.collection('Account',function(err,collection){
                if(err) reject(err);
                collection.find({account:account}).toArray(function(err,items){
                    if(err) reject(err);
                    if(items.length == 1){
                        if(items[0].account == account && items[0].password == password){
                            reslove(1);
                        }
                        else{
                            reslove(0);
                        }
                    }
                    else{
                        reslove(0);
                    }
                })
            })
        })
    })
}

// api : get_user_data - for user page
// input : None
// output : Promise -> reslove(user_object) or reject
function get_user_data(account){
    return new Promise(function(reslove, reject){
        MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client){
            if (err) reject(err);
            var db = client.db('mydb');
            db.collection('Account',function(err,collection){
                if(err) reject(err);
                collection.find({account:account}).toArray(function(err,items){
                    if(err) reject(err);
                    if(items.length == 1){
                        var user_obj = new object.User(items[0].account , items[0].password);
                        reslove(user_obj)
                    }
                })
            })
        })
    });
}

function add_item(i){
    return new Promise(function(reslove, reject){
        MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client){
            if (err) reject(err);
            var db = client.db('mydb');
            db.collection('Item',function(err,collection){
                if(err) reject(err);
                collection.find({id:i.id}).toArray(function(err,items){
                    if(err) reject(err);
                    if(items.length == 0){
                        collection.insertOne({id:i.id, name:i.name, price:i.price, image_path:i.image_path, category:i.category, key_word: i.key_word, average_score:i.average_score},function(err, result){
                            if(err) reject(err);
                            reslove(i);
                          }); 
                    }
                    else{
                        reslove(0);
                    }
                });
            });
        });
    });
}

function get_all_item(){
    return new Promise(function(reslove, reject){
        MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client){
            if (err) reject(err);
            var db = client.db('mydb');
            db.collection('Item',function(err,collection){
                if(err) reject(err);
                collection.find().toArray(function(err,items){
                    if(err) reject(err);
                    reslove(items);
                });
            });
        });
    });     
}

module.exports = {
    regis: register_db,
    login: login_db,
    get_user_data: get_user_data,
    add_item: add_item,
    get_all_item: get_all_item
};