import {Generator} from "@purtuga/project-generate/lib";

//===============================================================

/**
 * Creates a new thing
 */
class NewThing extends Generator {

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
    writing() {
        // Copy everything in `templates` to the destination
        // During copy, all answers are available under `props`
        // For More on mem-fs, See:
        // https://github.com/sboudrias/mem-fs-editor#mem-fs-editor---
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(),
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
export { NewThing }
export default NewThing;