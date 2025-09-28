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
      
      // Check if currentPage is a valid number and within safe integer limits
      const isValidNumber = Number.isFinite(currentPage) &&
        currentPage <= Number.MAX_SAFE_INTEGER &&
        currentPage >= Number.MIN_SAFE_INTEGER

      // If page is not a valid number, extremely large, less than 1, or exceeds total pages
      if (!isValidNumber || currentPage < 1 || currentPage > totalPages) {
        // If page is extremely large or invalid, redirect to last page
        if (!isValidNumber || currentPage > totalPages) {
          redirectPage = totalPages
        }
          // If page is less than 1, redirect to page 1
        else if (currentPage < 1) {
          redirectPage = 1
        }
      }
      
      if (redirectPage) {
        const p = new URLSearchParams(params)
        p.set("page", String(redirectPage))
        navigate(`?${p.toString()}`, { replace: true })
      }
    }
  }, [currentPage, totalPages, params, navigate])

  // Safety check for extremely large or invalid page numbers
  const safeCurrentPage = Number.isFinite(currentPage) &&
    currentPage <= Number.MAX_SAFE_INTEGER &&
    currentPage >= Number.MIN_SAFE_INTEGER
    ? currentPage : totalPages

  if (!safeCurrentPage || !totalPages || totalPages < 1) return null

  const updatePage = (newPage) => {
    // Check if newPage is a valid number and within safe integer limits
    const isValidNumber = Number.isFinite(newPage) &&
      newPage <= Number.MAX_SAFE_INTEGER &&
      newPage >= Number.MIN_SAFE_INTEGER

    // If invalid number, default to last page
    let clampedPage = totalPages
    if (isValidNumber) {
      // Clamp the page number to valid range
      clampedPage = Math.max(1, Math.min(newPage, totalPages))
    }

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

        if (safeCurrentPage > 3) pages.push("...")

        const start = Math.max(2, safeCurrentPage)
        const end = Math.min(totalPages - 1, safeCurrentPage + 1)

        for (let i = start; i <= end; i++) pages.push(i)

        if (safeCurrentPage < totalPages - 2) pages.push("...")

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

      if (safeCurrentPage > 4) pages.push("...")

      const start = Math.max(2, safeCurrentPage - 2)
      const end = Math.min(totalPages - 1, safeCurrentPage + 2)

      for (let i = start; i <= end; i++) pages.push(i)

      if (safeCurrentPage < totalPages - 3) pages.push("...")

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
            aria-disabled={safeCurrentPage <= 1}
            className={safeCurrentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            onClick={(e) => {
              e.preventDefault()
              if (safeCurrentPage > 1) updatePage(safeCurrentPage - 1)
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
                  isActive={p === safeCurrentPage}
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
            aria-disabled={safeCurrentPage >= totalPages}
            className={
              safeCurrentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
            onClick={(e) => {
              e.preventDefault()
              if (safeCurrentPage < totalPages) updatePage(safeCurrentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
