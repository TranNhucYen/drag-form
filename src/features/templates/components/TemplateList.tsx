'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, RefreshCw, AlertCircle, FileQuestion } from "lucide-react"
import Link from "next/link"
import { TemplateCard, TemplateCardSkeleton } from "./TemplateCard"
import { useTemplateList } from "../hooks/useTemplate"
import { TemplateStatus } from "../types/template.type"

export default function TemplateList() {
  const {
    templates,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    refetch,
  } = useTemplateList()

  return (
    <div className="w-full mx-auto flex flex-col gap-6">
      {/* Header section */}
      <div className="flex justify-between items-center w-full border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Các form mẫu</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Khám phá và sử dụng các mẫu biểu mẫu chuẩn có sẵn.
          </p>
        </div>
        <Link href="/editor">
          <Button className="cursor-pointer gap-1.5">
            <Plus className="size-4" />
            Tạo biểu mẫu mới
          </Button>
        </Link>
      </div>

      {/* Filter and Search section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Status Tabs */}
        <Tabs
          value={selectedStatus}
          onValueChange={setSelectedStatus}
          className="w-full md:w-auto"
        >
          <TabsList className="grid grid-cols-4 md:flex h-9 bg-slate-100 p-1">
            <TabsTrigger value="all" className="text-xs">
              Tất cả
            </TabsTrigger>
            <TabsTrigger value={TemplateStatus.ACTIVE} className="text-xs">
              Đang hoạt động
            </TabsTrigger>
            <TabsTrigger value={TemplateStatus.DRAFT} className="text-xs">
              Bản nháp
            </TabsTrigger>
            <TabsTrigger value={TemplateStatus.ARCHIVED} className="text-xs">
              Đã lưu trữ
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm biểu mẫu..."
            className="pl-9 h-9 text-xs focus-visible:ring-1 focus-visible:ring-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-5 shrink-0" />
            <span>{error}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            className="border-red-300 hover:bg-red-100 text-red-700 gap-1.5 cursor-pointer"
          >
            <RefreshCw className="size-3.5" />
            Thử lại
          </Button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <TemplateCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && templates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-center">
          <FileQuestion className="size-12 text-slate-300 mb-3" />
          <h3 className="text-base font-semibold text-slate-700">
            Không tìm thấy biểu mẫu phù hợp
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            {searchTerm
              ? `Không có kết quả nào khớp với "${searchTerm}". Hãy thử từ khóa khác.`
              : "Hiện tại chưa có biểu mẫu nào trong danh mục này."}
          </p>
          {searchTerm && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4 text-xs cursor-pointer"
              onClick={() => setSearchTerm("")}
            >
              Xóa tìm kiếm
            </Button>
          )}
        </div>
      )}

      {/* Templates grid */}
      {!isLoading && !error && templates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  )
}