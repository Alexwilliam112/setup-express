const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = (() => {
    class Core {
        static templateDir = path.join(__dirname, 'assets');
        static templateDir2 = path.join(__dirname, 'assets2');
        static currentDir = process.cwd();

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
                    fs.copyFileSync(srcFile, destFile);
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
                        console.log('Config file overwritten successfully.');
                    } else {
                        console.error('Source config file not found.');
                    }

                } catch (err) {
                    console.log(`ERROR INITIALIZING SEQUELIZE: ${err}`);
                }

                Object.keys(schema).forEach(table => {
                    const model = schema[table];

                    const attributes = Object.entries(model.attributes)
                        .map(([name, type]) => `${name}:${type}`)
                        .join(',');

                    const modelSql = `npx sequelize-cli model:generate --name ${model.model_name} --attributes ${attributes}`;

                    try {
                        execSync(modelSql, { stdio: 'inherit' });
                        console.log(`Model ${model.model_name} created successfully.`);
                    } catch (error) {
                        console.error('Error running Sequelize CLI:', error);
                    }
                });

            } else {
                console.error('SCHEMA FILE NOT FOUND.');
            }
        }
    }

    return Core;
})();
