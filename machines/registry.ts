export interface ParamDefinition {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  description: string;
  category: 'Kích Thước' | 'Kết Cấu' | 'Vật Tư';
}

export interface MachineMetadata {
  slug: string;
  name: string;
  code: string;
  category: string;
  description: string;
  material: string;
  params: ParamDefinition[];
  defaultParams: Record<string, number>;
}

export const MACHINE_REGISTRY: Record<string, MachineMetadata> = {};

export const ALL_MACHINES = Object.values(MACHINE_REGISTRY);
