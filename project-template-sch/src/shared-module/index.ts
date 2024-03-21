import { Rule, SchematicContext, Tree, apply, applyTemplates, chain, externalSchematic, mergeWith, move, strings, url} from "@angular-devkit/schematics";
import { addBootstrapToModule, addDeclarationToModule, addExportToModule, addImportToModule, addProviderToModule } from "@schematics/angular/utility/ast-utils";
import { applyToUpdateRecorder } from "@schematics/angular/utility/change";
import * as ts from 'typescript'
import { projectSchematic } from "../project-template-sch/project-schematic";
import { dasherize } from "@angular-devkit/core/src/utils/strings";

export function sharedModule(_options: projectSchematic): Rule {
	return (Tree: Tree, context: SchematicContext) => {
		
	context.logger.info('Adding Shared Module...');

	const projectName = _options.projectName
  const sharedPath = 'src/app/shared';
  const appPath = 'src/app';
  const sharedModulePath = 'src/app/shared/shared.module.ts';

  const sharedImports = [
    {className: 'RouterModule', path: '@angular/router'},
    {className: 'ReactiveFormsModule', path: '@angular/forms'},
    {className: 'MaterialModule', path: './material.module'},
    {className: 'FormsModule', path: '@angular/forms'},
    {className: 'CdkAccordionModule', path: '@angular/cdk/accordion'},
  ]

  const sharedExports = [
    {className: 'CommonModule', path: '@angular/common'},
    {className: 'RouterModule', path: '@angular/router'},
    {className: 'ReactiveFormsModule', path: '@angular/forms'},
    {className: 'MaterialModule', path: './material.module'},
    {className: 'FormsModule', path: '@angular/forms'},
  ]

  const sharedProviders = [
    {className: 'UtilsService', path: './services/utils.service'},
  ]

  const sharedDeclarations = [
    {className: 'DynamicErrorComponent', path: './components/dynamic-error/dynamic-error.component'},
    {className: 'DynamicFieldComponent', path: './components/dynamic-field/dynamic-field.component'},
    {className: 'DynamicFormComponent', path: './components/dynamic-form/dynamic-form.component'},
    {className: 'DynamicInputComponent', path: './components/field-types/dynamic-input/dynamic-input.component'},
    {className: 'DynamicSelectComponent', path: './components/field-types/dynamic-select/dynamic-select.component'},
    {className: 'DynamicRadioComponent', path: './components/field-types/dynamic-radio/dynamic-radio.component'},
    {className: 'DynamicCheckboxComponent', path: './components/field-types/dynamic-checkbox/dynamic-checkbox.component'},
    {className: 'DynamicFileComponent', path: './components/field-types/dynamic-file/dynamic-file.component'},
    {className: 'DynamicTextareaComponent', path: './components/field-types/dynamic-textarea/dynamic-textarea.component'},
    {className: 'DynamicDateComponent', path: './components/field-types/dynamic-date/dynamic-date.component'},
    {className: 'DynamicTimeComponent', path: './components/field-types/dynamic-time/dynamic-time.component'},
    {className: 'DynamicCountryComponent', path: './components/field-types/dynamic-country/dynamic-country.component'},
    {className: 'DynamicTimezoneComponent', path: './components/field-types/dynamic-timezone/dynamic-timezone.component'},
    {className: 'DynamicUnitComponent', path: './components/field-types/dynamic-unit/dynamic-unit.component'},
    {className: 'ModalVerificaEliminarComponent', path: './components/modals/modal-elimina-tipo/modal-verifica-eliminar.component'}
  ]

  return chain([
      // || ADDS SHARED MODULE || //
      externalSchematic('@schematics/angular', 'module', {
          name: 'shared',
          flat: false,
          routing: false,
          path: `${dasherize(projectName)}/${appPath}`,
          project: 'app'
      }),
      ()=>{
          sharedImports.forEach(e => {
              moduleModification(Tree, `${dasherize(projectName)}/${sharedModulePath}`,e.path, e.className, 'import');
          })
          sharedExports.forEach(e => {
              moduleModification(Tree, `${dasherize(projectName)}/${sharedModulePath}`,e.path, e.className, 'export');
          })
          sharedProviders.forEach(e => {
              moduleModification(Tree, `${dasherize(projectName)}/${sharedModulePath}`,e.path, e.className, 'provider');
          })
          sharedDeclarations.forEach(e => {
              moduleModification(Tree, `${dasherize(projectName)}/${sharedModulePath}`,e.path, e.className, 'declaration');
          })
      },
      // || ADDS ALL SHARED FILES & FOLDERS || //
      mergeWith(
        apply(url('./files/app/shared/'), [
          applyTemplates({
            dasherize: strings.dasherize,
            classify: strings.classify,
            underscore: strings.underscore,
            camelize: strings.camelize,
            specificComponent: _options.specificComponentName,
            specificComponentUppercase: _options.specificComponentName.toUpperCase()
          }),
          move(`${dasherize(projectName)}/${sharedPath}`)
        ])
      ),
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