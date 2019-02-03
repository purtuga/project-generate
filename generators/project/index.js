import {Generator} from "../../lib"

/**
 * Scaffolds out a new project
 */
class Project extends Generator {
    async prompting() {
        this.props = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Project name',
                default: this.appname // Default to current folder name
            }
        ]);
    }

    writing() {
        // COPY files to the destination
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(),
            this
        );

        // rename dot file
        [
            "_editorconfig",
            "_eslintrc.js",
            "_gitignore",
            "_package.json"
        ].forEach(fileName => {
            this.fs.copyTpl(
                this.templatePath(fileName),
                this.destinationPath(
                    `${fileName.endsWith("package.json") ? "" : "."}${fileName.substr(1)}`
                ),
                this
            );
        });
    }

    install() {}
}

//========================================[ EXPORTS ]=====
export { Project }
export default Project;