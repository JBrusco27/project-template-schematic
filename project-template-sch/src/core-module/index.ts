import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { Rule, SchematicContext, Tree, apply, applyTemplates, chain, externalSchematic, mergeWith, move, url} from '@angular-devkit/schematics';
import { addBootstrapToModule, addDeclarationToModule, addExportToModule, addImportToModule, addProviderToModule } from '@schematics/angular/utility/ast-utils';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import * as ts from 'typescript';

export function coreModule(_options: any): Rule {
  return (Tree: Tree, context: SchematicContext) => {

    context.logger.info('Adding Core Module...');

    const projectName = _options.projectName
    const appPath = 'src/app';
    const corePath = 'src/app/core';
    const coreModulePath = 'src/app/core/core.module.ts';

    function moduleModification(mainModulePath: string, targetPath: string, className: string, type: string): void{

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

    const coreImports = [
      {className: 'MatToolbarModule', path: '@angular/material/toolbar'},
      {className: 'MatButtonModule', path: '@angular/material/button'},
      {className: 'MatIconModule', path: '@angular/material/icon'},
      {className: 'MatSidenavModule', path: '@angular/material/sidenav'},
      {className: 'MatListModule', path: '@angular/material/list'},
      {className: 'MatTooltipModule', path: '@angular/material/tooltip'},
      {className: 'MatDialogModule', path: '@angular/material/dialog'},
      {className: 'MatMenuModule', path: '@angular/material/menu'},
      {className: 'MatProgressSpinnerModule', path: '@angular/material/progress-spinner'},
      {className: 'RouterModule', path: '@angular/router'},
      {className: 'BrowserAnimationsModule', path: '@angular/platform-browser/animations'},
      {className: 'BrowserModule', path: '@angular/platform-browser'},
      {className: 'HttpClientModule', path: '@angular/common/http'}
    ]

    const coreComponentDeclarations = [
      {className: 'FooterComponent', path: './components/footer/footer.component'},
      {className: 'LoaderComponent', path: './components/loader/loader.component'},
      {className: 'MenuComponent', path: './components/menu/menu.component'},
      {className: 'ToolbarComponent', path: './components/toolbar/toolbar.component'}
    ]
    

    return chain([
      // || ADDS CORE MODULE || //
      externalSchematic('@schematics/angular', 'module', {
        name: 'core',
        flat: false,
        routing: false,
        path: `${dasherize(projectName)}/${appPath}`,
        project: 'app'
      }),
      ()=>{
        coreImports.forEach(e => {
          moduleModification(`${dasherize(projectName)}/${coreModulePath}`,e.path, e.className, 'import');
        })
      },
      // - CORE SERVICES - //
      mergeWith(
        apply(url('./files/app/core/services'), [
          applyTemplates({}),
          move(`${dasherize(projectName)}/${corePath}/services`)
        ])
      ),
      // - CORE INTERCEPTORS - //
      mergeWith(
        apply(url('./files/app/core/interceptors'), [
          applyTemplates({}),
          move(`${dasherize(projectName)}/${corePath}/interceptors`)
        ])
      ),
      // - CORE COMPONENTS - //
      mergeWith(
        apply(url('./files/app/core/components'), [
          applyTemplates({
            projectName: projectName
          }),
          move(`${dasherize(projectName)}/${corePath}/components`)
        ]),
      ),
      () => {
        coreComponentDeclarations.forEach(e => {
          moduleModification(`${dasherize(projectName)}/${coreModulePath}`,e.path, e.className, 'declaration');
          moduleModification(`${dasherize(projectName)}/${coreModulePath}`,e.path, e.className, 'export');
        });
      },
      // - CORE LAYOUTS - //
        mergeWith(
          apply(url('./files/app/core/layouts'), [
            applyTemplates({}),
            move(`${dasherize(projectName)}/${corePath}/layouts`)
          ]),
        ),
        () =>{
          moduleModification(`${dasherize(projectName)}/${coreModulePath}`,'./layouts/main-layout/main-layout.component', 'MainLayoutComponent', 'declaration');
          moduleModification(`${dasherize(projectName)}/${coreModulePath}`,'./layouts/main-layout/main-layout.component', 'MainLayoutComponent', 'export');
        }
    ])(Tree, context)
    return Tree;
  };

}