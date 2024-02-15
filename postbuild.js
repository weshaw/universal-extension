import fs from 'fs';
import path from 'path';

//JSZip'node-zip';
import JSZip from 'jszip';

// manifest.json
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'));

const extensiondir = path.join(process.cwd(), 'extension');
const distPath = path.join(process.cwd(), 'dist');

const zip = new JSZip();

// add all files from distPath and subdirs to a zip archive and save into extensiondir
const extName = `${manifest.name.replace(/\s/g, '_').toLowerCase()}`;
const extfolder = path.join(extensiondir, extName);

// delete all files and directories in extfolder
if (fs.existsSync(extfolder)) {
    fs.rm(extfolder, { recursive: true, force: true }, (error) => {
        if (error) {
            console.error('An error occurred:', error);
        }
    });
    fs.mkdirSync(extfolder);
}

const addDir = (dir, zip) => {
    const files = fs.readdirSync(dir);
    const extFolderPath = path.join(extfolder, dir.replace(distPath, ''));
    if (!fs.existsSync(extFolderPath)) {
        fs.mkdirSync(extFolderPath);
    }
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            addDir(filePath, zip);
        } else {
            // add file to extFolder
            fs.copyFileSync(filePath, path.join(extFolderPath, file));
            zip.file(filePath.replace(distPath, ''), fs.readFileSync(filePath));
        }
    });
};
addDir(distPath, zip);

// save the zip file
zip.generateAsync({type: 'nodebuffer'}).then(content => {
    // filename snake case
    const zipName = `${extName}.zip`;
    fs.writeFileSync(path.join(extensiondir, zipName), content);
});
console.log('');
console.log('Extension created successfully in:');
console.log(extensiondir);
console.log('');
