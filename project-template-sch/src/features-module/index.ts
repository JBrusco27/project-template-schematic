import { Rule, SchematicContext, Tree, apply, applyTemplates, chain, externalSchematic, mergeWith, move, strings, url } from "@angular-devkit/schematics";
import { addBootstrapToModule, addDeclarationToModule, addExportToModule, addImportToModule, addProviderToModule, addRouteDeclarationToModule } from "@schematics/angular/utility/ast-utils";
import { InsertChange, applyToUpdateRecorder } from "@schematics/angular/utility/change";
import * as ts from 'typescript';
import { projectSchematic } from "../project-template-sch/project-schematic";
import { dasherize } from "@angular-devkit/core/src/utils/strings";

export function featuresModule(_options: projectSchematic): Rule {
	return (Tree: Tree, context: SchematicContext) => {
		
	context.logger.info('Adding Features Module...');

	const specificComponent = _options.specificComponentName
	const projectName = _options.projectName
	const featuresPath = 'src/app/features';

	const adminImports = [
		{className: 'AdminRoutingModule', path: './admin-routing.module'},
		{className: 'SharedModule', path: 'src/app/shared/shared.module'}
	  ]

	const adminProviders = [
		{className: 'SuggestionService', path: './services/suggestion.service'},
		{className: 'LoginService', path: './services/login.service'}
	  ]

	const adminDeclarations = [
		{className: 'LoginComponent', path: './components/login/login.component'},
		{className: 'SuggestionComponent', path: './components/suggestion/suggestion.component'},
		{className: 'HelpInfoComponent', path: './components/help-info/help-info.component'}
	  ]

	const adminRoutes = [
		{
			path: 'login',
			component: 'LoginComponent',
			fileToAddPath:'./components/login/login.component',
			needsToImport: true
		},
		{
			path: '',
			component: 'LoginComponent',
			fileToAddPath:'./components/login/login.component',
			needsToImport: false
		},
		{
			path: 'sugerencia',
			component: 'SuggestionComponent',
			fileToAddPath:'./components/suggestion/suggestion.component',
			needsToImport: true
		},
		{
			path: 'help-info',
			component: 'HelpInfoComponent',
			fileToAddPath:'./components/help-info/help-info.component',
			needsToImport: true
		},
	  ]

	const userImports = [
		{className: 'UserRoutingModule', path: './user-routing.module'},
		{className: 'SharedModule', path: 'src/app/shared/shared.module'}
	  ]

	const userDeclarations = [
		{className: 'UserAddComponent', path: './components/user-add/user-add.component'},
		{className: 'UserListComponent', path: './components/user-list/user-list.component'},
	  ]

	const userRoutes = [
		{
			path: 'crear',
			component: 'UserAddComponent',
			fileToAddPath:'./components/user-add/user-add.component',
			needsToImport: true
		},
		{
			path: '',
			component: 'UserListComponent',
			fileToAddPath:'./components/user-list/user-list.component',
			needsToImport: true
		}
	  ]

	const homeImports = [
		{className: 'HomeRoutingModule', path: './home-routing.module'}
	  ]

	const homeDeclarations = [
		{className: 'HomeComponent', path: './components/home/home.component'},
	  ]

	return chain([
		// || ADDS ADMIN MODULE || //
		externalSchematic('@schematics/angular', 'module', {
		name: 'admin',
		flat: false,
		routing: true,
		path: `${dasherize(projectName)}/${featuresPath}`,
		project: 'app'
		}),
		()=>{
		adminImports.forEach(e => {
			moduleModification(Tree, `${dasherize(projectName)}/${featuresPath}/admin/admin.module.ts`,e.path, e.className, 'import');
		})
		adminDeclarations.forEach(e => {
			moduleModification(Tree, `${dasherize(projectName)}/${featuresPath}/admin/admin.module.ts`,e.path, e.className, 'declaration');
		})
		adminProviders.forEach(e => {
			moduleModification(Tree, `${dasherize(projectName)}/${featuresPath}/admin/admin.module.ts`,e.path, e.className, 'provider');
		})
		adminRoutes.forEach(e => {
			routingModification(Tree, `${dasherize(projectName)}/${featuresPath}/admin/admin-routing.module.ts`,e.fileToAddPath, e.path, e.component, e.needsToImport);
		})
		},
		mergeWith(
			apply(url('./files/app/features/admin/services'), [
			  applyTemplates({
				camelize: strings.camelize,
				projectName: projectName
			  }),
			  move(`${dasherize(projectName)}/${featuresPath}/admin/services`)
			])
		),
		mergeWith(
			apply(url('./files/app/features/admin/components'), [
			  applyTemplates({}),
			  move(`${dasherize(projectName)}/${featuresPath}/admin/components`)
			])
		),
		// || ADDS USER MODULE || //
		externalSchematic('@schematics/angular', 'module', {
			name: 'user',
			flat: false,
			routing: true,
			path: `${dasherize(projectName)}/${featuresPath}`,
			project: 'app'
		}),
		()=>{
			userImports.forEach(e => {
				moduleModification(Tree, `${dasherize(projectName)}/${featuresPath}/user/user.module.ts`,e.path, e.className, 'import');
			})
			userDeclarations.forEach(e => {
				moduleModification(Tree, `${dasherize(projectName)}/${featuresPath}/user/user.module.ts`,e.path, e.className, 'declaration');
			})
			userRoutes.forEach(e => {
				routingModification(Tree, `${dasherize(projectName)}/${featuresPath}/user/user-routing.module.ts`,e.fileToAddPath, e.path, e.component, e.needsToImport);
			})
		},
		mergeWith(
			apply(url('./files/app/features/user/services'), [
			  applyTemplates({
				camelize: strings.camelize,
				projectName: projectName
			  }),
			  move(`${dasherize(projectName)}/${featuresPath}/user/services`)
			])
		),
		mergeWith(
			apply(url('./files/app/features/user/components'), [
			  applyTemplates({}),
			  move(`${dasherize(projectName)}/${featuresPath}/user/components`)
			])
		),
		// || ADDS HOME MODULE || //
		externalSchematic('@schematics/angular', 'module', {
		name: 'home',
		flat: false,
		routing: true,
		path: `${dasherize(projectName)}/${featuresPath}`,
		project: 'app'
		}),
		()=>{
			homeImports.forEach(e => {
				moduleModification(Tree, `${dasherize(projectName)}/${featuresPath}/home/home.module.ts`,e.path, e.className, 'import');
			})
			homeDeclarations.forEach(e => {
				moduleModification(Tree, `${dasherize(projectName)}/${featuresPath}/home/home.module.ts`,e.path, e.className, 'declaration');
			})
		},
		mergeWith(
			apply(url('./files/app/features/home/components'), [
			  applyTemplates({}),
			  move(`${dasherize(projectName)}/${featuresPath}/home/components`)
			])
		),
		externalSchematic('@schematics/angular', 'module', {
			name: specificComponent,
			flat: false,
			routing: true,
			path: `${dasherize(projectName)}/${featuresPath}`,
			project: 'app'
			}),
			mergeWith(
				apply(url('./files/app/features/specificComponent/'), [
				  applyTemplates({
					camelize: strings.camelize,
					classify: strings.classify,
					dasherize: strings.dasherize,
					underscore: strings.underscore,
					specificComponent: specificComponent,
					specificComponentUppercase: specificComponent.toUpperCase()
				  }),
				  move(`${dasherize(projectName)}/${featuresPath}/${dasherize(specificComponent)}/`)
				])
			)
	])
	return Tree;
		
	};
};

export function moduleModification(Tree: Tree, mainModulePath: string, targetPath: string, className: string, type: string): void{

	const recorder = Tree.beginUpdate(mainModulePath);
	const text = Tree.read(mainModulePath)!.toString();

	const source = ts.createSourceFile(
	  mainModulePath,
	  text,
	  ts.ScriptTarget.Latest,
	  true
	);

	let addAction: any;
	switch (type) {
	  case 'export':  
		addAction = addExportToModule(source, mainModulePath, className, targetPath)
		break;
	  case 'import':
		addAction = addImportToModule(source, mainModulePath, className, targetPath)
		break;
	  case 'declaration':
		addAction = addDeclarationToModule(source, mainModulePath, className, targetPath)
		break;
	  case 'provider':
		addAction = addProviderToModule(source, mainModulePath, className, targetPath)
		break;
	  case 'bootstrap':
		addAction = addBootstrapToModule(source, mainModulePath, className, targetPath)
		break;
	  default:
		addAction = addImportToModule(source, mainModulePath, className, targetPath)
		break;
	}

	applyToUpdateRecorder(
	  recorder,
	  addAction
	);

	Tree.commitUpdate(recorder);
  }

export function routingModification(Tree: Tree, mainModulePath: string, fileToAddPath: string, routeLiteral: string, componentName: string,  needsToImport: boolean) {

	const text = Tree.read(mainModulePath)!.toString();

	const source = ts.createSourceFile(
	  mainModulePath,
	  text,
	  ts.ScriptTarget.Latest,
	  true
	);

	const recorder = Tree.beginUpdate(mainModulePath);

	const routeCont = `\n	{
	path: '${routeLiteral}', 
	component: ${componentName}
}`

	const change = addRouteDeclarationToModule(
		source,
		'./src/app',
		routeCont
	  ) as InsertChange;
	
	recorder.insertLeft(change.pos, change.toAdd)
	
	Tree.commitUpdate(recorder);

	if(needsToImport){
		Tree.overwrite(mainModulePath, `import { ${componentName} } from '${fileToAddPath}';\n${Tree.read(mainModulePath)!.toString()}`)
	}
	
}
