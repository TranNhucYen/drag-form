import { MyForm, FormStatus, SharedUser } from '../types/my-form.type'

export interface IMyFormRepository {
  findAll(): Promise<MyForm[]>
  findById(id: number): Promise<MyForm | null>
  create(data: Partial<MyForm>): Promise<MyForm>
  update(id: number, data: Partial<MyForm>): Promise<MyForm | null>
  delete(id: number): Promise<boolean>
  duplicate(
    id: number,
    customData?: { title?: string; description?: string }
  ): Promise<MyForm | null>
  updateStatus(id: number, status: FormStatus): Promise<MyForm | null>
  updateSharing(
    id: number,
    sharing: { isPublic: boolean; sharedWith: SharedUser[] }
  ): Promise<MyForm | null>
}

export const drizzleMyFormRepository: IMyFormRepository = {
  async findAll() {
    throw new Error('Method not implemented')
  },
  async findById() {
    throw new Error('Method not implemented')
  },
  async create() {
    throw new Error('Method not implemented')
  },
  async update() {
    throw new Error('Method not implemented')
  },
  async delete() {
    throw new Error('Method not implemented')
  },
  async duplicate() {
    throw new Error('Method not implemented')
  },
  async updateStatus() {
    throw new Error('Method not implemented')
  },
  async updateSharing() {
    throw new Error('Method not implemented')
  },
}
