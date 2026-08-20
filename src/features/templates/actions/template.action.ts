'use server'

import { TemplateDTO } from "../types/template.dto"
import { templateService } from "../services/template.service"

export async function getTemplatesAction(): Promise<TemplateDTO[]> {
  try {
    const templates = await templateService.getTemplates()
    return templates
  } catch (error) {
    console.error("Lỗi khi tải danh sách biểu mẫu:", error)
    throw new Error("Không thể tải danh sách biểu mẫu")
  }
}

export async function getTemplateByIdAction(id: number): Promise<TemplateDTO | null> {
  try {
    const template = await templateService.getTemplateById(id)
    return template
  } catch (error) {
    console.error(`Lỗi khi tải biểu mẫu id ${id}:`, error)
    throw new Error("Không thể tải thông tin biểu mẫu")
  }
}

