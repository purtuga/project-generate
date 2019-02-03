import findUp from "find-up";
import {promisify} from "util";
import {readFile} from "fs"
import path from "path"

//===================================================================
const readFileAsync = promisify(readFile);
const GENERATORS_DIR = "generators";

/**
 * A package.json content plus utility methods
 */
class PackageJson {
    getGeneratorsDir() {
        return path.join(this._directory, GENERATORS_DIR);
    }
}


/**
 * Retrieves the configuration and returns it.
 *
 * @return {Promise<PackageJson, Error>}
 *  The returned object will have two additional (non-enumerable) properties:
 *  -   `_location`: the path to the `package.json` file
 *  -   `_directory`: the directory path where the package.json is located
 */
async function getConfig(cwd = process.cwd()) {
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
    getConfig
}

