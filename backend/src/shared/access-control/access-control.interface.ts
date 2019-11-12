export interface ACLDefinition {
  role: string;
  resource: string;
  action: string;
  attributes: string;
}

export type ACLDefinitions = ACLDefinition[];
