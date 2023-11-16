const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const { invokeAction } = require('./contacts');

invokeAction(argv);
