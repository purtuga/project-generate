import { getProjectPackageJson, GENERATORS_DIR } from "./config.js";
import path from "path";
import {promisify} from "util"
import {existsSync, readdir, stat} from "fs"

//==================================================================
const readdirAsync = promisify(readdir);
const statAsync = promisify(stat);


/**
 * Find all available generators and return a list of them.
 * Generators are stored in a directory named `generators` under each
 * of the paths that will be searched. Each directory is assume to be
 * a generator.
 */
async function find() {
    const searchPaths = new Set();
    const response = [];
    const prjPackageJson = await getProjectPackageJson();

    searchPaths.add(process.cwd());

    // Add the user's project root
    if (prjPackageJson && prjPackageJson.getDirectory()) {
        searchPaths.add(prjPackageJson.getDirectory());
    }

    // Add this project's generators
    searchPaths.add(path.resolve(__dirname, ".."));

    for (const dirPath of searchPaths) {
        const generatorsPath = path.join(dirPath, GENERATORS_DIR);

        if (existsSync(generatorsPath)) {
            response.push(...(await getGeneratorsFromFolder(generatorsPath)))
        }
    }

    return response;
}

async function getGeneratorsFromFolder(folderPath) {
    const dirContent = await readdirAsync(folderPath);
    const response = [];

    for (let i = 0, t = dirContent.length; i < t; i++) {
        const dirItemPath = path.join(folderPath, dirContent[i]);
        const dirItemStat = await statAsync(dirItemPath);

        if (dirItemStat.isDirectory()) {
            response.push({
                name: path.basename(dirContent[i]),
                path: dirItemPath
            });
        }
    }

    return response;
}


//================================================[ EXPORTS ]====
export { find };
