import path from "path"
import yeoman from 'yeoman-environment';
import {BaseGenerator} from "../lib";


//======================================================================
/**
 * Runs a given generator
 *
 * @param {String} generatorPath
 * @param {String} [cwd=process.cwd()]
 *
 * @return {Promise}
 */
async function run(generatorPath, cwd = process.cwd()) {
    const env = yeoman.createEnv([], { cwd });
    const {getGenerator, default: Gen} = await import(generatorPath);
    const GeneratorConstructor = getGenerator ? getGenerator({ BaseGenerator }) : Gen;
    const generatorNameId = path.basename(generatorPath);

    env.registerStub(GeneratorConstructor, generatorNameId, env.resolveModulePath(generatorPath));
    await new Promise((resolve, reject) => {
        env.run(generatorNameId, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

//=======================================================[ EXPORTS ]=====
export { run }
