const { readFileSync, writeFileSync, existsSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");
const { app } = require("electron");

// This is the name of the folder in which the user's data files will be saved.
const appFolderName = "electron-template";
if(!appFolderName.length) throw new Error("Please set the app folder name in public/Storage.js");

module.exports = class Storage {
    constructor(options) {
        const userDataPath = join(app.getPath("userData"), "applications-data", appFolderName);
        Storage.verifyAppDirectory(userDataPath);

        /**
         * @readonly
         */
        this.filename = options.filename;
        /**
         * @readonly
         */
        this.path = join(userDataPath, `${this.filename}.json`);
        this.data = this.parseDataFile(options.defaults);
    }

    parseDataFile(defaults) {
        try {
            return JSON.parse(readFileSync(this.path).toString());
        } catch {
            return defaults;
        }
    }

    save() {
        try {
            writeFileSync(this.path, JSON.stringify(this.data));
        } catch(err) {
            console.error(err);
        }
    }

    static verifyAppDirectory(path) {
        if(!existsSync(path)) mkdirSync(path, { recursive: true });
    }
}