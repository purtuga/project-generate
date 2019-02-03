#!/usr/bin/env node -r esm

require = require("esm")(module);
const readline = require('readline');
const run = require("../lib/run.js").run;
const path = require("path");
const find = require("../lib/find.js").find;

// If no generator name, then show list
if (!process.argv[2]) {
    (async function(){
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
                await run(generatorList[index].path)
            } else {
                console.log(`Unknown option (${response}). Exiting!`);
            }
        }
    })()
        .catch(console.error)
        .then(() => process.exit() );

} else {
    run(path.resolve(__dirname, "../generators/project"));
}

function ask(question) {
    return new Promise(resolve => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout})
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        })
    });
}