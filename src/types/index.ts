import { ChangeEvent, FocusEvent } from 'react'

export interface FormInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  value: string
  type: string
  name: string
  label: string
  error: string | undefined
  placeholder: string
  variant?: 'textarea' | 'input'
}

export interface Posts {
  userId: number
  id: number
  title: string
  body: string
}

export type UsePaginationType = {
  setPage: (page: number) => void
  setNextPage: () => void
  setPreviousPage: () => void
  setPageSize: (pageSize: number, nextPage?: number) => void
  pageSize: number
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  previousEnabled: boolean
  nextEnabled: boolean
}
