"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface TagSelectorProps {
  tags: string[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

export default function TagSelector({
  tags,
  selectedTags,
  onTagsChange
}: TagSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!isInitialized.current && tags.length > 0 && selectedTags.length === 0) {
      onTagsChange(tags)
      isInitialized.current = true
    }
  }, [tags, selectedTags, onTagsChange])

  const filteredTags = tags.filter(tag =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort()

  const areAllSelected = selectedTags.length > 0 && selectedTags.length === tags.length

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const handleToggleSelectAll = () => {
    if (areAllSelected) {
      onTagsChange([])
    } else {
      onTagsChange(tags)
    }
  }
  
  const handleClear = () => {
    onTagsChange([])
    setSearchTerm("")
  }

  return (
    <>
      <div className="p-4 border-b border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">标签筛选</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleSelectAll}
              className="text-xs"
            >
              {areAllSelected ? '取消全选' : '全选'}
            </Button>
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                清空 ({selectedTags.length})
              </Button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索标签..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-wrap gap-2">
          {filteredTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              onClick={() => handleToggleTag(tag)}
              className="cursor-pointer transition-colors hover:bg-primary/80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </>
  )
}