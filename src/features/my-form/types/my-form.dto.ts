import { FormStatus, ShareRole, SharedUser, MyForm } from './my-form.type'

export interface MyFormDTO extends MyForm {
  formattedCreatedAt: string
  formattedUpdatedAt: string
  statusLabel: string
  shareSummary: string
}

export interface CreateFormInput {
  title: string
  description?: string
  sourceTemplateId?: number
  sourceTemplateName?: string
}

export interface UpdateFormInput {
  title?: string
  description?: string
  status?: FormStatus
  isPublic?: boolean
  sharedWith?: SharedUser[]
}
