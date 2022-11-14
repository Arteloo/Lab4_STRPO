const mysql = require("mysql2");
const express = require("express");
 
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
 
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "DiplomaDB",
  password: ""
});
connection.connect( function(err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
app.set("view engine", "hbs");
});
// получение списка пользователей
app.get("/", function(req, res){
    connection.query("SELECT * FROM Machines", function(err, data) {
      if(err) return console.log(err);
      res.render("index.hbs", {
          Machines: data
      });
    });
});
app.get("/create", function(req, res){
  res.render("create.hbs");
});
app.get("/edit", function(req, res){
  res.render("edit.hbs");
});
app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});
