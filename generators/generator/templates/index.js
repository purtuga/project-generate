/**
 * Retrieve the Generator constructor (`class`)
 *
 * @param BaseGenerator Generator base class provided by `project-generate`
 * @return Generator
 */
export function getGenerator({ BaseGenerator }) {
    //--[ ?? ]--------------------------------------------------------
    //  REFERENCE:
    //  -   Yeoman: https://yeoman.io/authoring/running-context.html
    //  -   Template language: https://ejs.co/
    //      Quick list of tags:
    //          <%      'Scriptlet' tag, for control-flow, no output
    //          <%_     ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
    //          <%=     Outputs the value into the template (HTML escaped)
    //          <%-     Outputs the unescaped value into the template
    //          <%#     Comment tag, no execution, no output
    //          <%%     Outputs a literal '<%'
    //          %>      Plain ending tag
    //          -%>     Trim-mode ('newline slurp') tag, trims following newline
    //          _%>     ‘Whitespace Slurping’ ending tag, removes all whitespace after it
    //----------------------------------------------------------------


    /**
     * Creates a new thing
     */
    return class extends BaseGenerator {

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
}
