import { FilesListSchema } from '@/store/lib/w3bstream/schema/filesList';
import Dexie, { Table } from 'dexie';
import { toJS } from 'mobx';

export interface Files {
  id?: string;
  data: FilesListSchema;
}

export interface Flows {
  id?: number;
  name: string;
  data: { nodes: any[]; edges: any[] };
}

class IndexDatabase extends Dexie {
  public files!: Table<Files>;
  public flows!: Table<Flows>;

  public constructor() {
    super('IndexDatabase');
    this.version(5).stores({
      files: '++id,data',
      flows: '++id,data,name'
    });
  }

  findFilesById(id: string) {
    return this.files.filter((i) => i.id == id).toArray();
  }

  async findFlowsById(id: number) {
    return await this.flows.filter((i) => i.id == id).toArray();
  }

  async findFlows() {
    try {
      return await this.flows.toArray();
    } catch (e) {
      return [];
    }
  }

  insertFlow(name: string, data: { nodes: any[]; edges: any[] }) {
    return this.flows.add({ name, data });
  }

  async updateFlowById(id: number, name, data: { nodes: any[]; edges: any[] }) {
    console.log('updateFlowById', id, name, data);
    return this.flows.update(id, {
      name,
      data:JSON.parse(JSON.stringify(data))
    });
  }
}
export const IndexDb = new IndexDatabase();
