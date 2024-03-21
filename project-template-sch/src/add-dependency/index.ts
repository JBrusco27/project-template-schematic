import { Rule, SchematicContext, Tree} from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { execSync } from "child_process";
import { Dependencies } from "./dependencies.model";
import { dasherize } from "@angular-devkit/core/src/utils/strings";
import { projectSchematic } from "../project-template-sch/project-schematic";

export function installDependency(options: projectSchematic): Rule {
    return (tree: Tree, context: SchematicContext) => {

        context.logger.info('Installing dependencies...');

        const projectName = options.projectName;

        return new Promise<void>((resolve, reject) => {
            (async () => {

                const dep: Dependencies[] = 
                [
                    {
                        dependency: {
                            flags: '--save-prod',
                            name: '@angular-eslint/schematics',
                            version: 'latest',
                        },
                        depOptions: {
                            installWithAlternativeMethod:true,
                            alternativeMethodCommand:'ng add @angular-eslint/schematics --skip-confirmation',
                            reqExtraCommand: false,
                            extraCommand: ''
                        }
                    },
                    {
                        dependency: {
                            flags: '--save-dev',
                            name: 'postcss',
                            version: 'latest',
                        },
                        depOptions: {
                            installWithAlternativeMethod:false,
                            alternativeMethodCommand:'',
                            reqExtraCommand: false,
                            extraCommand: ''
                        }
                    },
                    {
                        dependency: {
                            flags: '--save-dev',
                            name: 'tailwindcss',
                            version: 'latest',
                        },
                        depOptions: {
                            installWithAlternativeMethod:false,
                            alternativeMethodCommand:'',
                            reqExtraCommand: true,
                            extraCommand: 'npx tailwind init'
                        }
                    },
                    {
                        dependency: {
                            flags: '--save-dev',
                            name: 'autoprefixer',
                            version: 'latest',
                        },
                        depOptions: {
                            installWithAlternativeMethod:false,
                            alternativeMethodCommand:'',
                            reqExtraCommand: false,
                            extraCommand: ''
                        }
                    },
                    {
                        dependency: {
                            flags: '--save-prod',
                            name: 'luxon',
                            version: 'latest',
                        },
                        depOptions: {
                            installWithAlternativeMethod:false,
                            alternativeMethodCommand:'',
                            reqExtraCommand: false,
                            extraCommand: ''
                        }
                    },
                    {
                        dependency: {
                            flags: '--save-prod',
                            name: '@angular/material',
                            version: 'latest',
                        },
                        depOptions: {
                            installWithAlternativeMethod:true,
                            alternativeMethodCommand:'ng add @angular/material --skip-confirmation',
                            reqExtraCommand: false,
                            extraCommand: ''
                        }
                    },
                ];

                await installDependencies(tree, context, dep, projectName);

                context.addTask(new NodePackageInstallTask());

                resolve();
            })().catch(error => reject(error));
        });
    };
}

async function installDependencies(tree: Tree, context: SchematicContext, dependencies: Dependencies[], projectName: string, index = 0): Promise<void> {
    process.chdir(dasherize(projectName))

    if (index >= dependencies.length) {
        return;
    }

    const dependency = dependencies[index];

    if(!dependency.depOptions.installWithAlternativeMethod){
        try {
            await execAsync(`npm add ${dependency.dependency.name}@${dependency.dependency.version} ${dependency.dependency.flags}`);
        } catch (error) {
            console.error(`Error executing command`, error);
        }
    }else{
        try {
            await execAsync(`${dependency.depOptions.alternativeMethodCommand}`);
        } catch (error) {
            console.error(`Error executing command`, error);
        }
    }

    if (dependency.depOptions.reqExtraCommand) {
        try {
            await execAsync(`${dependency.depOptions.extraCommand}`);
        } catch (error) {
            console.error(`Error executing command`, error);
        }
    }

    console.log('--------------------')
    process.chdir('..');
    await installDependencies(tree, context, dependencies, dasherize(projectName), index + 1);

}

function execAsync(command: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            const commandOutput = execSync(command).toString();
            console.log(commandOutput);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

// function getLatestVersion(packageName: string): string {
//     try {
//       const commandOutput = execSync(`npm show ${packageName} version`).toString();
//       const latestVersion = commandOutput.trim();
//       return latestVersion;
//     } catch (error) {
//       console.error(`Error getting latest version of ${packageName}:`, error);
//       return 'latest';
//     }
//   }