import Generator    from "yeoman-generator"

//==============================================[ EXPORTS ]=======
export * from "./config.js"
export * from "./find.js"
export * from "./run.js"
export {
    Generator, //--> DO NOT USE... Deprecated
    Generator as BaseGenerator
}
