#!/usr/bin/env node

require = require("esm")(module);
const readline = require('readline');
const run = require("../lib/run.js").run;
const {find, findByName } = require("../lib/find.js");
const CWD = process.env.INIT_CWD || process.cwd();


// If no generator name, then show list
let runInstance;
if (!process.argv[2]) {
    runInstance = showGeneratorList()
} else {
    runInstance = runRequestedGenerator(process.argv[2]);
}

runInstance
    .then(() => process.exit() )
    .catch(e => {
        console.error(e);
        process.exit(1);
    });


function ask(question) {
    return new Promise(resolve => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout})
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        })
    });
}

async function showGeneratorList() {
    const generatorList = await find();
    console.log(`
--[ PROJECT GENERATORS ]-------------------------------------------------------

${
        generatorList
            .map((generator, i) => `  [${i}] ${generator.name}`)
            .join("\n")
        }

-------------------------------------------------------------------------------`
    );
    let response = await  ask("Which generator should be run (enter number)? ");
    if (response) {
        const index = Number(response);

        if (generatorList[index]) {
            await run(generatorList[index].path, CWD)
        } else {
            console.log(`Unknown option (${response}). Exiting!`);
        }
    }
}

async function runRequestedGenerator(generatorName) {
    const generatorPath = await findByName(generatorName);
    if (!generatorPath) {
        throw new Error(`Generator '${generatorName}' not found!`);
    }
    return run(generatorPath.path, CWD);
}

