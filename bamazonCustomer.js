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
  var qry = 'SELECT * FROM products'
  connection.query(qry, function(errr, ress) {
    if (errr) throw errr;
    if (process.argv[2] === "purchase") {
        start();
    } else {
      console.log('-------------------------------------------------------------------');
      console.log(`Item Id | Products Name | Department Name | Price | Stock Quantity`);
      console.log('-------------------------------------------------------------------');
        for (var i = 0; i < ress.length; i++) {
            console.log(`${ress[i].item_id} | ${ress[i].products_name} | ${ress[i].department_name} | $${ress[i].price} | ${ress[i].stock_quantity}`)
        }
      console.log('-------------------------------------------------------------------');
      console.log(`Select a product to purchase by entering Item Id (run this: node bamazonCustomer.js purchase).`)
      console.log('-------------------------------------------------------------------');
        connection.end();
    }
  });
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
            console.log('-------------------------------------------------------------------');
            console.log(`
            Please enter a valid ID and Quantity!
            `)
            console.log('-------------------------------------------------------------------');
            start();
        } else {         
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.productId }, function(err, res) {

              if (quantity > res[0].stock_quantity) {
                console.log('---------------------------------------------');
                console.log(`Insufficient quantity!`);
                console.log('---------------------------------------------');
                start();
              } else if (res[0].stock_quantity > 0) {
                var queryInStk = "UPDATE products SET stock_quantity = stock_quantity - ? where item_id = ?"
                connection.query(queryInStk, [quantity, answer.productId], function(error, response) {
                    var price = parseFloat(res[0].price);
                    var quantity = parseFloat(answer.quantity);
                    var total = price * quantity;
                    console.log('---------------------------------------------');
                    console.log(`You have purchased ${res[0].products_name}.`);
                    console.log(`Price: ${price}`);
                    console.log(`Quantity purchased: ${quantity}`);
                    console.log(`Your total is: $${total}`);
                    console.log('---------------------------------------------');
                    connection.end();
                });
              };
            });
        };
    });
};