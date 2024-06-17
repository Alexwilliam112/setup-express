#!/usr/bin/env node

const Table = require('cli-table3');
const chalk = require('chalk');
const commands = process.argv.slice(2);
const cmd = commands[0];
const Main = require('./main');

switch (cmd) {
    case 'init': {
        const opt = commands[1];
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

    case 'build-client': {
        Main.buildClient();
        break;
    }

    case 'help':
    default: {
        const helpList = [
            {
                number: 1,
                commandLine: 'init',
                Function: 'Initialize the project with the template'
            },
            {
                number: 2,
                commandLine: 'build-model',
                Function: 'Execute sequelize create models'
            },
            {
                number: 3,
                commandLine: 'build-db',
                Function: 'Execute sequelize create db and migrate all'
            },
            {
                number: 4,
                commandLine: 'build-client',
                Function: 'Build react-app on VITE framework'
            },
            {
                number: 5,
                commandLine: 'build-client',
                Function: 'Build react-app on VITE framework'
            },
            {
                number: 6,
                commandLine: 'help',
                Function: 'Display this command lists message'
            },
        ]

        const table = new Table({
            head: [chalk.white('NO.'), chalk.white('COMMANDS'), chalk.white('DESCRIPTIONS')]
        });

        helpList.forEach(cli => {
            table.push([
                cli.number,
                chalk.yellow(cli.commandLine),
                cli.Function
            ]);
        });
        
        console.log(`==========================================`);
        console.log(chalk.bold.yellow('SKYNET-15 BUILD TOOL by Alexander William'));
        console.log(`==========================================`);
        console.log(chalk.blue(`Usage: npx gen <command>`));
        console.log(table.toString());
        break;
    }
}
