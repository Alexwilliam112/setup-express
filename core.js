const fs = require('fs');
const path = require('path');

const templateDir = path.join(__dirname, 'assets');
const templateDir2 = path.join(__dirname, 'assets2');
const currentDir = process.cwd();

function copyTemplateFiles(srcDir, destDir) {
    fs.readdirSync(srcDir).forEach(file => {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);
        if (fs.lstatSync(srcFile).isDirectory()) {
            if (!fs.existsSync(destFile)) {
                fs.mkdirSync(destFile);
            }
            copyTemplateFiles(srcFile, destFile);
        } else {
            fs.copyFileSync(srcFile, destFile);
        }
    });
}

function init(opt) {
    switch (opt) {
        case '1': {
            copyTemplateFiles(templateDir, currentDir);
            break;
        }
    
        case '2': {
            copyTemplateFiles(templateDir2, currentDir);
            break;
        }
    }
    console.log('Template generated successfully!');
}

module.exports = {
    init
};
