var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  start();
});




function start() {
  inquirer
    .prompt([
    {
      name: "productId",
      type: "input",
      message: "What is the ID of the product you would like to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
            return true;
          }
          return false;
      }        
    },{
      name: "quantity",
      type: "input",
      message: "How many units you would like to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
            return true;
          }
          return false;
      } 
    }
])
    .then(function(answer) {
      var productId = answer.productId.trim();
      var quantity = answer.quantity.trim();

        if ((productId.length === 0) || (quantity.length === 0)) {
            console.log(`
            Please enter a valid ID and Quantity!
            `)
            start();
        } else {         
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.productId }, function(err, res) {

                if (res[0].stock_quantity > 0) {
                    var queryInStk = "UPDATE products SET stock_quantity = stock_quantity - 1 where ?"
                    connection.query(queryInStk, { item_id: answer.productId }, function(error, response) {
                        console.log('---------------------------------------------');
                        console.log(`You have purchased ${res[0].products_name}.`);
                        console.log(`Your total is: $${res[0].price}`);
                        console.log('---------------------------------------------');
                        connection.end();
                    })
                } else {
                    console.log('---------------------------------------------');
                    console.log(`Insufficient quantity!`);
                    console.log('---------------------------------------------');
                    start();
                };
            });
        };
    });
};