const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

module.exports = (() => {
    class Core {
        static templateDir = path.join(__dirname, 'assets');
        static templateDir2 = path.join(__dirname, 'assets2');
        static currentDir = process.cwd();
        static tasks = [];

        static copyTemplateFiles(srcDir, destDir) {
            fs.readdirSync(srcDir).forEach(file => {
                const srcFile = path.join(srcDir, file);
                const destFile = path.join(destDir, file);

                if (fs.lstatSync(srcFile).isDirectory()) {
                    if (!fs.existsSync(destFile)) {
                        fs.mkdirSync(destFile);
                    }
                    Core.copyTemplateFiles(srcFile, destFile);
                } else {
                    if (fs.existsSync(destFile)) {
                        console.log(chalk.red(`File already exists: ${destFile}`));
                        Core.tasks.push({ STATUS: chalk.red('FAILED'), TASK: `Copy ${file}`, DESCRIPTION: `File already exists: ${destFile}` });
                    } else {
                        fs.copyFileSync(srcFile, destFile);
                        console.log(chalk.green(`Copied: ${destFile}`));
                        Core.tasks.push({ STATUS: chalk.green('SUCCESS'), TASK: `Copy ${file}`, DESCRIPTION: destFile });
                    }
                }
            });
        }

        static buildModels() {
            const schemaPath = path.join(Core.currentDir, 'schema.js');

            if (fs.existsSync(schemaPath)) {
                const schema = require(schemaPath);

                try {
                    const configSrc = path.join(__dirname, 'lib', 'config.json');
                    const configDest = path.join(Core.currentDir, 'config', 'config.json');
                    execSync(`npx sequelize-cli init`, { stdio: 'inherit' });

                    if (fs.existsSync(configSrc)) {
                        fs.copyFileSync(configSrc, configDest);
                        console.log(chalk.green(`Copied config.json to: ${configDest}`));
                        Core.tasks.push({ STATUS: chalk.green('SUCCESS'), TASK: 'Copy config.json', DESCRIPTION: `Copied config.json to: ${configDest}` });
                    } else {
                        console.log(chalk.red('Source config file not found'));
                        Core.tasks.push({ STATUS: chalk.red('FAILED'), TASK: 'Copy config.json', DESCRIPTION: 'Source config file not found' });
                    }

                } catch (err) {
                    console.log(chalk.red(`ERROR INITIALIZING SEQUELIZE: ${err.message}`));
                    Core.tasks.push({ STATUS: chalk.red('FAILED'), TASK: 'Sequelize init', DESCRIPTION: `ERROR INITIALIZING SEQUELIZE: ${err.message}` });
                }

                Object.keys(schema).forEach(table => {
                    const model = schema[table];

                    const attributes = Object.entries(model.attributes)
                        .map(([name, type]) => `${name}:${type}`)
                        .join(',');

                    const modelSql = `npx sequelize-cli model:generate --name ${model.model_name} --attributes ${attributes}`;

                    try {
                        execSync(modelSql, { stdio: 'inherit' });
                        console.log(chalk.green(`Generated model ${model.model_name}`));
                        Core.tasks.push({ STATUS: chalk.green('SUCCESS'), TASK: `Generate model ${model.model_name}`, DESCRIPTION: modelSql });
                    } catch (error) {
                        console.log(chalk.red(`Error generating model ${model.model_name}: ${error.message}`));
                        Core.tasks.push({ STATUS: chalk.red('FAILED'), TASK: `Generate model ${model.model_name}`, DESCRIPTION: `Error: ${error.message}` });
                    }
                });

            } else {
                console.log(chalk.red('SCHEMA FILE NOT FOUND'));
                Core.tasks.push({ STATUS: chalk.red('FAILED'), TASK: 'Load schema', DESCRIPTION: 'SCHEMA FILE NOT FOUND' });
            }
        }

        static buildDB() {
            try {
                execSync(`npx sequelize-cli db:drop`, { stdio: 'inherit' });
                execSync(`npx sequelize-cli db:create`, { stdio: 'inherit' });
                execSync(`npx sequelize-cli db:migrate`, { stdio: 'inherit' });
                console.log(chalk.green('Database created and migrated successfully'));
                Core.tasks.push({ STATUS: chalk.green('SUCCESS'), TASK: 'Database creation and migration', DESCRIPTION: 'Database created and migrated successfully' });

            } catch (err) {
                console.log(chalk.red(`ERROR EXECUTING BUILD DB: ${err.message}`));
                Core.tasks.push({ STATUS: chalk.red('FAILED'), TASK: 'Database creation and migration', DESCRIPTION: `ERROR EXECUTING BUILD DB: ${err.message}` });
            }
        }
    }

    return Core;
})();
