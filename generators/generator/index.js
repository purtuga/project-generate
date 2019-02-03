import {Generator, getConfig} from "../../lib";
import path from "path";

//============================================================

/**
 * Creates a new ???
 */
class Gen extends Generator {

    //-- Yeoman HOOK
    // initializing(){}

    //-- Yeoman HOOK
    async prompting() {
        this.props = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Thing name?',
                default: this.appname // Default to current folder name
            }
        ]);
    }

    //-- Yeoman HOOK
    // configuring() {}


    //-- Yeoman HOOK
    // default() {}


    //-- Yeoman HOOK
    async writing() {
        const packageJson = await getConfig();

        // Copy everything in `templates` to the destination
        // During copy, all answers are available under `props`
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(path.join(packageJson.getGeneratorsDir(), this.props.name)),
            this
        );
    }

    //-- Yeoman HOOK
    // conflicts() {}


    //-- Yeoman HOOK
    install() {}


    //-- Yeoman HOOK
    // end() {}
}

//========================================[ EXPORTS ]=====
export { Gen }
export default Gen;