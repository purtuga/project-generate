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
                message: 'Project name (should be valid npm name)',
                default: this.appname.replace(/ /g, "-") // Default to current folder name
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
            this.fs.move(
                this.destinationPath(fileName),
                this.destinationPath(
                    `${fileName.endsWith("package.json") ? "" : "."}${fileName.substr(1)}`
                )
            );
        });
    }

    install() {}
}

//========================================[ EXPORTS ]=====
export { Project }
export default Project;