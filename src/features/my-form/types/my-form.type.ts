export enum FormStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export enum ShareRole {
  VIEWER = 'viewer',
  EDITOR = 'editor',
}

export interface SharedUser {
  id: string
  email: string
  role: ShareRole
  addedAt: Date | string
}

export interface MyForm {
  id: number
  title: string
  description?: string
  status: FormStatus
  fieldsCount: number
  responsesCount: number
  isPublic: boolean
  sharedWith: SharedUser[]
  sourceTemplateId?: number
  sourceTemplateName?: string
  createdAt: Date | string
  updatedAt: Date | string
}
