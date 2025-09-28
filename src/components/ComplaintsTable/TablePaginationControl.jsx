"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function PaginationControls({ currentPage, totalPages }) {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // breakpoint: md
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-redirect for invalid page numbers
  useEffect(() => {
    if (currentPage && totalPages && totalPages > 0) {
      let redirectPage = null
      
      // If page is less than 1, redirect to page 1
      if (currentPage < 1) {
        redirectPage = 1
      }
      // If page exceeds total pages, redirect to last page
      else if (currentPage > totalPages) {
        redirectPage = totalPages
      }
      
      if (redirectPage) {
        const p = new URLSearchParams(params)
        p.set("page", String(redirectPage))
        navigate(`?${p.toString()}`, { replace: true })
      }
    }
  }, [currentPage, totalPages, params, navigate])

  if (!currentPage || !totalPages || totalPages < 1) return null

  const updatePage = (newPage) => {
    // Clamp the page number to valid range
    const clampedPage = Math.max(1, Math.min(newPage, totalPages))
    const p = new URLSearchParams(params)
    p.set("page", String(clampedPage))
    navigate(`?${p.toString()}`)
  }

  const getPageNumbers = () => {
    const pages = []

    // --- MOBILE: compact style ---
    if (isMobile) {
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)

        if (currentPage > 3) pages.push("...")

        const start = Math.max(2, currentPage)
        const end = Math.min(totalPages - 1, currentPage + 1)

        for (let i = start; i <= end; i++) pages.push(i)

        if (currentPage < totalPages - 2) pages.push("...")

        pages.push(totalPages)
      }
      return pages
    }

    // --- DESKTOP: professional style ---
    if (totalPages <= 10) {
      // Show all if small enough
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      // Sliding window of 7 numbers + ellipsis
      pages.push(1)

      if (currentPage > 4) pages.push("...")

      const start = Math.max(2, currentPage - 2)
      const end = Math.min(totalPages - 1, currentPage + 2)

      for (let i = start; i <= end; i++) pages.push(i)

      if (currentPage < totalPages - 3) pages.push("...")

      pages.push(totalPages)
    }
    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) updatePage(currentPage - 1)
            }}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {getPageNumbers().map((p, index) =>
          p === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault()
                  updatePage(Number(p))
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) updatePage(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
