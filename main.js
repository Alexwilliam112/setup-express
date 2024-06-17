const Core = require('./core');

module.exports = (() => {
    class Main {
        static init(opt) {
            switch (opt) {
                case '1': {
                    Core.copyTemplateFiles(Core.templateDir, Core.currentDir);
                    console.log("\x1b[32m", 'TASK COMPLETED: EXPRESS PROJECT BOILERPLATE');
                    break;
                }

                case '2': {
                    Core.copyTemplateFiles(Core.templateDir2, Core.currentDir);
                    console.log("\x1b[32m", 'TASK COMPLETED: EXPRESS PROJECT BOILERPLATE');
                    break;
                }

                default: {
                    console.log("\x1b[31m", 'ARGS NEEDED AFTER npx gen. input "2"');
                    break;
                }
            }
        }

        static buildModels() {
            Core.buildModels();
        }
    }
    return Main;
})();
