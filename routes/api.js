var express = require('express');
var MongoClient = require('mongodb').MongoClient;

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

function login_db(account,password){
    return new Promise(function(reslove, reject){
        MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client){
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

module.exports = {
    regis: register_db,
    login: login_db
};