import { Template } from './template.type'

export interface TemplateDTO extends Omit<Template, 'categoryId' | 'ownerId' | 'createdAt' | 'updatedAt'> {
  categoryName: string
  ownerName: string
  updatedAt: Date | string
} 