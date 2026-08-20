import { MyForm, FormStatus, SharedUser } from '../types/my-form.type'
import { MyFormDTO, CreateFormInput, UpdateFormInput } from '../types/my-form.dto'
import { myFormRepository } from '../repositories'

const STATUS_LABELS: Record<FormStatus, string> = {
  [FormStatus.ACTIVE]: 'Đang sử dụng',
  [FormStatus.DRAFT]: 'Bản nháp',
  [FormStatus.ARCHIVED]: 'Đã lưu trữ',
}

function mapToDTO(form: MyForm): MyFormDTO {
  const createdDate = new Date(form.createdAt)
  const updatedDate = new Date(form.updatedAt)

  let shareSummary = 'Riêng tư'
  if (form.isPublic) {
    shareSummary = 'Công khai (có link)'
  } else if (form.sharedWith && form.sharedWith.length > 0) {
    shareSummary = `Chia sẻ (${form.sharedWith.length} người)`
  }

  return {
    ...form,
    createdAt: createdDate.toISOString(),
    updatedAt: updatedDate.toISOString(),
    formattedCreatedAt: createdDate.toLocaleDateString('vi-VN'),
    formattedUpdatedAt: updatedDate.toLocaleDateString('vi-VN'),
    statusLabel: STATUS_LABELS[form.status] || form.status,
    shareSummary,
  }
}

export const myFormService = {
  async getMyForms(): Promise<MyFormDTO[]> {
    const forms = await myFormRepository.findAll()
    return forms.map(mapToDTO)
  },

  async getMyFormById(id: number): Promise<MyFormDTO | null> {
    const form = await myFormRepository.findById(id)
    if (!form) return null
    return mapToDTO(form)
  },

  async createForm(input: CreateFormInput): Promise<MyFormDTO> {
    const created = await myFormRepository.create({
      title: input.title,
      description: input.description,
      status: FormStatus.DRAFT,
      sourceTemplateId: input.sourceTemplateId,
      sourceTemplateName: input.sourceTemplateName,
    })
    return mapToDTO(created)
  },

  async updateForm(id: number, input: UpdateFormInput): Promise<MyFormDTO | null> {
    const updated = await myFormRepository.update(id, input)
    if (!updated) return null
    return mapToDTO(updated)
  },

  async deleteForm(id: number): Promise<boolean> {
    return await myFormRepository.delete(id)
  },

  async duplicateForm(
    id: number,
    customData?: { title?: string; description?: string }
  ): Promise<MyFormDTO | null> {
    const duplicated = await myFormRepository.duplicate(id, customData)
    if (!duplicated) return null
    return mapToDTO(duplicated)
  },

  async updateFormStatus(id: number, status: FormStatus): Promise<MyFormDTO | null> {
    const updated = await myFormRepository.updateStatus(id, status)
    if (!updated) return null
    return mapToDTO(updated)
  },

  async updateFormSharing(
    id: number,
    sharing: { isPublic: boolean; sharedWith: SharedUser[] }
  ): Promise<MyFormDTO | null> {
    const updated = await myFormRepository.updateSharing(id, sharing)
    if (!updated) return null
    return mapToDTO(updated)
  },
}
