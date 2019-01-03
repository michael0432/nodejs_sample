var MongoClient = require('mongodb').MongoClient;

function dbcreate(){
  MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
    if(err) throw err;
    //Write databse Insert/Update/Query code here..
    console.log('mongodb is running!');
    var db = client.db('mydb');
    db.collection('Persons',function(err,collection){
      collection.insertOne({ id:1, firstName:'Steve', lastName:'Jobs' });
      collection.insertOne({ id:2, firstName:'Bill', lastName:'Gates' });
      collection.insertOne({ id:3, firstName:'James', lastName:'Bond' });
  
      collection.count(function(err,count){
          if(err) throw err;
          console.log('Total Rows:'+count);
      });
    });
    client.close(); //關閉連線
  });
  return;
}
function dbdelete(){
  //delete
MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
  if(err) throw err;
  //Write databse Insert/Update/Query code here..
  console.log('mongodb is running!');
  var db = client.db('mydb');
  db.collection('Persons',function(err,collection){
    collection.deleteOne({id:2},{w:1},function(err,result){
        if(err) throw err;
        console.log('Document Removed Successfully!');
        });
    });
  client.close(); //關閉連線
});
  return;
}


function dbupdate(){
//update
MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
  if(err) throw err;
  //Write databse Insert/Update/Query code here..
  console.log('mongodb is running!');
  var db = client.db('mydb');
  db.collection('Persons',function(err,collection){
    collection.update({id:1},{ $set: { firstName:'James', lastName:'Gosling'} },
      {w:1}, function(err, result){
          if(err) throw err;
          console.log('Document Updated Successfully');
         });
     });
  client.close(); //關閉連線
});
return;
}

function dbquery(){

MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
  if(err) throw err;
  //Write databse Insert/Update/Query code here..
  console.log('mongodb is running!');
  var db = client.db('mydb');
  db.collection("Persons",function(err,collection){
    collection.find({firstName:"Bill"}).toArray(function(err,items){
        if(err) throw err;
        console.log(items);
        console.log("We found "+items.length+" results!");
    });
  });
  client.close(); //關閉連線
});
return;
}
module.exports = {
  create: dbcreate,
  delete: dbdelete,
  update: dbupdate,
  query: dbquery
}