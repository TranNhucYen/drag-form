
import { Template } from "../types/template.type"
import { TemplateDTO } from "../types/template.dto"
import { templateRepository } from "../repositories"

const CATEGORY_NAMES: Record<number, string> = {
  1: "Hành chính - Nhân sự",
  2: "Hợp đồng - Pháp lý",
  3: "Kinh doanh - Bán hàng",
  4: "Tài chính - Kế toán",
}

const OWNER_NAMES: Record<number, string> = {
  1: "DragForm Team",
  2: "Nguyễn Văn A",
}

function mapToTemplateDTO(template: Template): TemplateDTO {
  const { categoryId, ownerId, createdAt, updatedAt, ...rest } = template
  return {
    ...rest,
    categoryName: CATEGORY_NAMES[categoryId] || "Khác",
    ownerName: OWNER_NAMES[ownerId] || "Hệ thống",
    updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
  }
}

export const templateService = {
  async getTemplates(): Promise<TemplateDTO[]> {
    const templates = await templateRepository.findAll()
    return templates.map(mapToTemplateDTO)
  },

  async getTemplateById(id: number): Promise<TemplateDTO | null> {
    const template = await templateRepository.findById(id)
    if (!template) {
      return null
    }
    return mapToTemplateDTO(template)
  },
}