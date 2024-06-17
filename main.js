const Core = require('./core');
const Table = require('cli-table3');
const chalk = require('chalk');

module.exports = (() => {
    class Main {
        static init(opt) {
            Core.tasks = [];
            switch (opt) {
                case '1': {
                    Core.copyTemplateFiles(Core.templateDir, Core.currentDir);
                    console.log(chalk.green('TASK COMPLETED: EXPRESS PROJECT BOILERPLATE'));
                    break;
                }

                case '2': {
                    Core.copyTemplateFiles(Core.templateDir2, Core.currentDir);
                    console.log(chalk.green('TASK COMPLETED: EXPRESS PROJECT BOILERPLATE'));
                    break;
                }

                default: {
                    console.log(chalk.red('ARGS NEEDED AFTER npx gen. input "2"'));
                    return;
                }
            }
            Main.displayTable();
        }

        static buildModels() {
            Core.tasks = [];
            Core.buildModels();
            Main.displayTable();
        }

        static buildDB() {
            Core.tasks = [];
            Core.buildDB();
            Main.displayTable();
        }

        static displayTable() {
            const table = new Table({
                head: [chalk.white('STATUS'), chalk.white('TASK'), chalk.white('DESCRIPTION')]
            });

            Core.tasks.forEach(task => {
                table.push([
                    task.STATUS,
                    task.TASK,
                    chalk.yellow(task.DESCRIPTION)
                ]);
            });

            console.log(table.toString());
        }
    }

    return Main;
})();
