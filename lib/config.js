import findUp from "find-up";
import {promisify} from "util";
import {readFile} from "fs"
import path from "path"

//===================================================================
const readFileAsync = promisify(readFile);
const GENERATORS_DIR = "generators";

/**
 * A `package.json` content plus utility methods
 */
class PackageJson {
    /**
     * The root full directory path for the project (where `package.json` is located)
     * @name PackageJson#_directory
     * @public
     * @type {String}
     */

    /**
     * The full directory path to the `package.json` for the project
     * @name PackageJson#_location
     * @public
     * @type {String}
     */

    /**
     * Returns the `package.json` full path
     * @return {String}
     */
    getLocation() {
        return this._location;
    }

    /**
     * Returns the full directory path of where the `package.json` is located
     * @return {String}
     */
    getDirectory() {
        return this._directory;
    }

    /**
     * Returns the directory where generators should be store for the current project
     * @returns {string}
     */
    getGeneratorsDir() {
        return path.join(this._directory, GENERATORS_DIR);
    }
}


/**
 * Retrieves the configuration and returns it.
 *
 * @param {String} [cwd=process.cwd()]
 *
 * @return {Promise<PackageJson, Error>}
 */
async function getProjectPackageJson(cwd = process.cwd()) {
    const packageJsonPath = await findUp("package.json", { cwd });

    if (!packageJsonPath) {
        return addLocationToPackageJson(new PackageJson());
    }
    // let packageJson = readFileSync(packageJsonPath, "utf8");
    const packageJson = new PackageJson();

    Object.assign(
        packageJson,
        JSON.parse( await readFileAsync(packageJsonPath, "utf8") )
    );

    addLocationToPackageJson(packageJson, packageJsonPath);
    return packageJson;
}

function addLocationToPackageJson(packageJson, filePath) {
    Object.defineProperty(packageJson, "_location", {
        configurable: true,
        writable: true,
        value: filePath
    });
    Object.defineProperty(packageJson, "_directory", {
        configurable: true,
        writable: true,
        value: filePath ? path.dirname(filePath) : filePath
    });
    return packageJson;
}

//=====================================================[ EXPORTS ]===
export {
    GENERATORS_DIR,
    getProjectPackageJson
}

