/**
 * TODO:
 */

const fs = require('fs');
const path = require('path');

// Read from customer

// Add new customer

// Increment all counters by 1

// Add new data en .json

/**
 * Others things to do here.
 *
 * 1- add proper error handling.
 * 2- add unit tests.
 * 3- separate modules.
 * 4- use with promises.
 */

function getCustomer() {
  return {
    'name': new Date().toString(),
		'order_count': Math.floor(Math.random() * 1000),
		'address': new Date().toString()
  };
}

function incrementOrderCount(customers) {
  const incrementedCustomers = customers.map((customer) => {
    return {
      ...customer,
      'order_count': customer.order_count + 1
    };
  });

  return incrementedCustomers;
}

function readData() {
  const json = fs.readFileSync(path.join(__dirname, 'customers.json'));
  const customers = [ ...JSON.parse(json) , getCustomer()];

  return customers;
}

function writeData(customers) {
  const json = JSON.stringify(customers, null, 2);

  fs.writeFileSync(path.join(__dirname, 'customers.json'), json);
}

function registerWatcher() {
  fs.watchFile(path.join('customers.json'), (curr, prev) => {
    console.log('customer json accessed !!');
    console.log(`${prev.atime} => ${curr.atime}`);

    process.exit(0);
  });
}

function main() {
  try {
    registerWatcher();

    const customers = readData();
    const incrementedCustomers = incrementOrderCount(customers);

    writeData(incrementedCustomers);
  } catch (error) {
    console.error(error);
  }
}

main();
