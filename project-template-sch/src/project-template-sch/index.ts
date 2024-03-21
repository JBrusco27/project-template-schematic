import { MergeStrategy, Rule, SchematicContext, Tree, apply, applyTemplates, chain, mergeWith, move, schematic, strings, url } from '@angular-devkit/schematics';
import { projectSchematic } from './project-schematic';
import { addRouteDeclarationToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { exec} from 'child_process';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import * as ts from 'typescript';

export function projectTemplateSch(options: projectSchematic): Rule {
return (tree: Tree, _context: SchematicContext) => {

	function routingModification(mainModulePath: string, objectToAdd: any) {
		
		const text = tree.read(mainModulePath)!.toString();

		const source = ts.createSourceFile(
		  mainModulePath,
		  text,
		  ts.ScriptTarget.Latest,
		  true
		);

		const recorder = tree.beginUpdate(mainModulePath);

		const change = addRouteDeclarationToModule(
			source,
			'./src/app',
			`\n	{
			path: '${objectToAdd.path}',
				${ Object.keys(objectToAdd)[1]}: ${objectToAdd[Object.keys(objectToAdd)[1]]}
			}`
		  ) as InsertChange;
		
		recorder.insertLeft(change.pos, change.toAdd)

		tree.commitUpdate(recorder);

	}

	const allOptions: projectSchematic = {
		projectName: options.projectName,
		specificComponentName: options.specificComponentName,
		prodApiUrl: options.prodApiUrl,
		qaApiUrl: options.qaApiUrl,
		devApiUrl: options.devApiUrl
	};

	const projectName = options.projectName;

	const appRoutes = [
		{
			path: 'inicio',
			loadChildren: `() => import('./features/home/home.module').then((m) => m.HomeModule),`
		},
		{
			path: 'admin',
			loadChildren: `() => import('./features/admin/admin.module').then((m) => m.AdminModule),`
		},
		{
			path: 'usuarios',
			loadChildren: `() => import('./features/user/user.module').then((m) => m.UserModule),`
		},
		{
			path: '**',
			redirectTo: `'/admin/login'`
		}
	  ]

		return chain([
			async () => {
				await createProject(options, _context, dasherize(projectName)).then(() => {
                    console.log('Project created successfully.');
					// process.chdir(dasherize(projectName))
                }).catch(err => {
                    console.error('Error creating project:', err);
                });
			},
			mergeWith(
				apply(url('./files/src/environments'), [
				applyTemplates({
					prodApiUrl: allOptions.prodApiUrl,
					qaApiUrl: allOptions.qaApiUrl,
					devApiUrl: allOptions.devApiUrl
				}),
				move(`${dasherize(projectName)}/src/environments`)
				])
			),
			async () => {
				
				const angularJsonPath = `${dasherize(projectName)}/angular.json`;
				const angularJsonBuffer = tree.read(angularJsonPath);

				if(!angularJsonBuffer){
					throw new Error("angular.json not found");
				}

				const angularJsonString = angularJsonBuffer.toString('utf-8');
				const angularJson = JSON.parse(angularJsonString);

				const ToAddAssetsObject = { "glob": "**/*", "input": "src/assets/", "output": "/assets/" }
				const ToAddFileReplacementsProduction = [ 
					{
						"replace": "src/environments/environment.ts",
						"with": "src/environments/environment.prod.ts"
					}
				]

				const ToAddFileReplacementsDevelopment = [
					{
						"replace": "src/environments/environment.ts",
						"with": "src/environments/environment.dev.ts"
					}
				]
				
				const ToAddFileReplacementsQa = [
					{
						"replace": "src/environments/environment.ts",
						"with": "src/environments/environment.qa.ts"
					}
				]		

				const ToAddBrowserTargetServeQa = {
					"browserTarget": "import-export:build:qa"
				}
					
				Object.keys(angularJson.projects).forEach((projectName) => {
					const project = angularJson.projects[projectName]

					if(project.architect && project.architect.build){
						const buildAssets = project.architect.build.options.assets
						const testAssets = project.architect.test.options.assets
						const buildConfigurations = project.architect.build.configurations
						const serveConfigurations = project.architect.serve.configurations

						if(Array.isArray(testAssets) && Array.isArray(buildAssets) && typeof(buildConfigurations) === 'object'){
							testAssets.push(ToAddAssetsObject);
							buildAssets.push(ToAddAssetsObject);
							buildConfigurations.production['fileReplacements'] = ToAddFileReplacementsProduction;
							buildConfigurations.development['fileReplacements'] = ToAddFileReplacementsDevelopment;
							buildConfigurations['qa'] = {};
							buildConfigurations.qa['fileReplacements'] = ToAddFileReplacementsQa;
							serveConfigurations['qa'] = ToAddBrowserTargetServeQa;
						}
						
						const updatedAngularJson = JSON.stringify(angularJson,  null, 2);
						tree.overwrite(angularJsonPath, updatedAngularJson);
					}
				})

			},
			mergeWith(
				apply(url('./files/htaccess'), [
				applyTemplates({
					projectName: allOptions.projectName,
					dasherize: strings.dasherize
				}),
				move(`${dasherize(projectName)}/htaccess`)
				])
			),
			mergeWith(
				apply(url('./files/src/styles'), [
				applyTemplates({}),
				move(`${dasherize(projectName)}/src`)
				]),
				MergeStrategy.Overwrite
			),
			()=>{
				tree.overwrite(`${dasherize(projectName)}/src/app/app.component.html`, '<app-main-layout></app-main-layout>')
				appRoutes.forEach(e => {
					routingModification(`${dasherize(projectName)}/src/app/app-routing.module.ts`, e);
				})
			},
			mergeWith(
				apply(url('./files/src/app/appFiles'), [
				applyTemplates({}),
				move(`${dasherize(projectName)}/src/app`)
				]),
				MergeStrategy.Overwrite
			),
			// RUNS CORE MODULE SCHEMATIC
			schematic("core-module", allOptions),
			// RUNS FEATURES MODULE SCHEMATIC
			schematic("features-module", allOptions),
			// RUNS FEATURES MODULE SCHEMATIC
			schematic("shared-module", allOptions),
			// RUNS ADD DEPENDENCY SCHEMATIC
			schematic("add-dependency", allOptions),
			()=>{

				const tailwindConfigContent = 
				`/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,ts}",
	],
	theme: {
		screens: {
			'xs': '375px',
			// => @media (min-width: 375px) { ... }

			'sm': '640px',
			// => @media (min-width: 640px) { ... }

			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		extend: {},
	},
	plugins: [],
}`

				tree.overwrite(`${dasherize(projectName)}/tailwind.config.js`, tailwindConfigContent);

			}
		])
		
		return tree;
	};
	}

	async function createProject(_options: any, _context: SchematicContext, projectName: string): Promise<void> {
		return new Promise<void>((resolve) => {
			try {
				const command = `ng new ${projectName} --skip-install --skip-tests --style=css --routing`;
				exec(command, (error, stdout, stderr) => {
					if (error) {
						console.error('Error:', error);
					}
					if (stderr) {
						console.error('Error:', stderr);
					}
					console.log(stdout);
					resolve();
				});
			} catch (error) {
				console.error('Error creating project:', error);
				resolve();
			}
		});
	}

// function execAsync(command: string): Promise<void> {
//     return new Promise<void>((resolve, reject) => {
//         try {
//             const commandOutput = exec(command).toString();
//             console.log(commandOutput);
//             resolve();
//         } catch (error) {
//             reject(error);
//         }
//     });
// }
