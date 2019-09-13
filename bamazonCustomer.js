var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  showSql()
  // start();
})

function validateInput(input) {
  if (input == "exit") {
    connection.end()
  } else if (isNaN(input) === false) {
    return true
  } else {
    console.log("Input needs to be an integer, please try again. Type 'exit' at any time to quit.")
    return false
  }
}

function showSql() {
  connection.query("SELECT item_id, product_name, price FROM products", function (err, results) {
    if (err) throw err;

    console.table(results)

    inquirer
      .prompt([
        {
          name: "purchaseID",
          type: "input",
          message: "Which item would you like to buy? (type in the item's ID!)",
          validate: function validateInput(input) {
            if (input == "exit") {
              connection.end()
            } else if (isNaN(input) === false && input >= 1 && input <= 10 && Number.isInteger(parseFloat(input))) {
              return true
            } else {
              console.log("\n\n Item ID needs to be an integer between 1 and 10, please try again. Type 'exit' at any time to quit. \n")
              return false
            }
          }
        },
        {
          name: "purchaseCount",
          type: "input",
          message: "\nHow many would you like to purchase?",
          validate: function validateInput(input) {
            if (input == "exit") {
              connection.end()
            } else if (isNaN(input) === false && Number.isInteger(parseFloat(input)) && parseInt(input) > 0) {
              return true
            } else {
              console.log("\n\n Input needs to be an integer greater than 0, please try again. Type 'exit' at any time to quit. \n")
              return false
            }
          }
        }])
      .then(function (answer) {

        var itemIDRequested = parseInt(answer.purchaseID)
        var quantityRequested = parseInt(answer.purchaseCount)

        connection.query(
          "select * from products where ?",
          {
            item_id: itemIDRequested
          },
          function (err, results) {
            if (err) throw err;

            var numInStock = results[0].stock_quantity
            var price = results[0].price
            var productName = results[0].product_name


            if (quantityRequested > numInStock) {
              console.log("\nCant buy " + quantityRequested + " " + productName + "s, there are only " + numInStock + " in stock.")
            } else {

              var remainingStock = numInStock - quantityRequested
              var totalPrice = price * quantityRequested

              connection.query(
                "update products set ? where ?",
                [
                  {
                    stock_quantity: remainingStock
                  },
                  {
                    item_id: itemIDRequested
                  }
                ],
                function (err) {
                  if (err) throw err;

                  console.log("\n Congrats! Purchased " + quantityRequested + " " + productName + "s for $" + totalPrice)
                })
            }

            connection.end()

          })
      });
  })
}
