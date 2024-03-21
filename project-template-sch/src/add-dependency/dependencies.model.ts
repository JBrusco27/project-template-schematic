
export interface depOptions {
    installWithAlternativeMethod: boolean,
    alternativeMethodCommand: string,
    reqExtraCommand: boolean,
    extraCommand: string
}

// export declare enum DependencyType {
//     Default = "--save-prod",
//     Dev = "--save-dev",
//     Optional = "--save-optional"
// }

export interface NodeDependency {
    flags: string,
    name: string,
    version:string,
}

export interface Dependencies {
    dependency: NodeDependency,
    depOptions: depOptions,
}