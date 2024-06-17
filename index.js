#!/usr/bin/env node

const commands = process.argv.slice(2);
const cmd = commands[0];
const Main = require('./main');

switch (cmd) {
    case 'init': {
        const opt = commands[1]
        Main.init(opt);
        break;
    }

    case 'build-model': {
        Main.buildModels();
        break;
    }

    case 'build-db': {
        Main.buildDB();
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
build-model   Execute sequelize create models
build-db      Execute sequelize create db and migrate all
client-build  Pending.
help          Display this help message
        `);
        break;
    }
}
