#!/usr/bin/env node

const commands = process.argv.slice(2);
const cmd = commands[0];
const Core = require('./core.js');

switch (cmd) {
    case 'init': {
        Core.init(commands[1]);
        break;
    }
    case 'model-build': {
        Core.buildModels();
        break;
    }
    case 'client-build': {
        console.log('Client build command is not implemented yet.');
        break;
    }
    case 'help':
    default: {
        console.log(`
Usage: npx gen <command>

Commands:
init          Initialize the project with the template
model-build  Execute sequelize commandline: npx sequelize model:create
client-build  Pending.
help          Display this help message
        `);
        break;
    }
}
