import yeoman from 'yeoman-environment';

//======================================================================

/**
 * Runs a given generator
 * @param {String} generatorPath
 */
function run(generatorPath) {
    const response = new Promise((resolve, reject) => {
        var env = yeoman.createEnv([], {});
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
