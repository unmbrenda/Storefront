var keys = require('./keys').mysql;
var mysql = require('mysql');
var Table = require('cli-table');
var inquire = require('inquirer');

async function query(sql, args) {
  var config = {
    host: keys.host,
    port: keys.port,
    user: keys.username,
    password: keys.password,
    database: "bamazon"
  };

  return new Promise((resolve, reject) => {

    var connection = mysql.createConnection(config);
    connection.query(sql, args, (err, rows, cols) => {
      connection.end();
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

showInventory = async function () {

  const inventoryQuery = `
      select p.productId, p.productName, p.price
      from product p
      order by p.productId
    `;

  const inventory = await query(inventoryQuery);

  let table = new Table({
    head: ['\x1b[33mID', '\x1b[33mProduct Name', '\x1b[33mPrice'],
    colWidths: [4, 45, 15]
  });

  let rows = inventory.map((x) => {
    return [
      x.productId,
      x.productName,
      '$' + ' '.repeat(12 - x.price.toFixed(2).toString().length) + x.price.toFixed(2)
    ];
  });

  rows.forEach(row => {
    table.push(row);
  });
  console.log(table.toString());

  return
}

getProduct = async function (productId) {


  productQuery = `
      select p.productId, p.productName, p.price, p.stock
      from product p
      where p.productId = ?
    `;

  let product = await query(productQuery, [productId]);

  return {
    id: product[0].productId,
    name: product[0].productName,
    price: product[0].price,
    stock: product[0].stock
  }
}

showInventory().then(function () {
  questions = [
    {
      name: "productId",
      message: "What item (ID) would you like to purchase?",
      type: "input"
    },
    {
      name: "quantity",
      message: "What quantity would you like to purchase?",
      type: "input"
    }

  ];
  inquire.prompt(questions).then(function (answers) {
    getProduct(answers.productId).then(function (rows) {
      
      if (answers.quantity > rows.stock) {
        return console.log("Sorry you have requested more than our stock.")
      }
      return console.log(`You have requested ${answers.quantity} unit(s) of ${rows.name}\nThat comes to \$${rows.price * answers.quantity}`);
    })
  })
})


