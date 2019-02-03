import yeoman from 'yeoman-environment';

//======================================================================

/**
 * Runs a given generator
 *
 * @param {String} generatorPath
 * @param {String} [cwd=process.cwd()]
 *
 * @return {Promise}
 */
function run(generatorPath, cwd = process.cwd()) {
    const response = new Promise((resolve, reject) => {
        var env = yeoman.createEnv([], { cwd });
        env.run(generatorPath, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
    response.catch(console.error);
    return response;
}

//=======================================================[ EXPORTS ]=====
export { run }
