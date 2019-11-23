# project-generate
An easy way to add custom generators to your project.

[Yeoman](https://yeoman.io/) is great, but normally you need to have your generators packaged and installed as `npm` packages. This is usually not optimal for private projects or for generators that are project specific and not really reusable. This project uses Yeoman's generator functionally to enable the ability to create project specific generators which are store along with the Project.

## Install

```bash
npm i @purtuga/project-generate
```

## Usage
Installation will make available a script named `project-generate` under the `node_modules/.bin/` directory. Add the following `generate` script to your `package.json` under the `scripts` section so that you can run the generators using the `npm run` command:

```JSON
{
    "scripts": {
        "generate": "project-generate"
    }
}
```

Now, just run `npm run generate`.


## Generators
This utility looks for generators stored in directory named `generators`. This utility will look at the following locations in search of this directory:

- The current directory
- The root of the current project (determined by the closest `package.json` file)
- User's home directory
- This library's directory (picks up out-of-box generators)


Each generator is stored in a directory - the directory name is used as the generator name.

This tool provides some default generators which are opinionated to how I currently create projects. They are:

-   `project`: Create a new project that is based on my own `project-base` library
-   `generator`: Create a new generator (in your project's `generators` directory)


### `generator` Usage
This generator will scaffold out the structure for a new generator. It will prompt for the name and will output all files to the current project (determined by closest `package.json` file) under a directory named `generators`. If not running under a project, the files will be output to the current folder (`cwd`). 


## License

[MIT](./LICENSE)

