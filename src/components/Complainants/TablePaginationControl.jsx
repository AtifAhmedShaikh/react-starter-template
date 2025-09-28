import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaginationControls({ currentPage = 1, totalPages = 1 }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const pagesToShow = useMemo(() => {
        const pages = [];
        const maxVisiblePages = 5; // Maximum number of visible page buttons

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than or equal to max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Calculate start and end pages
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            // Adjust start page if end page is at the maximum
            if (endPage === totalPages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    }, [currentPage, totalPages]);

    const handlePageChange = (page) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", page.toString());
            return newParams;
        });
    };

    if (totalPages <= 1) {
        return null; // Don't render pagination if there's only one page or no pages
    }

    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious 
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                )}

                {pagesToShow[0] > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink onClick={() => handlePageChange(1)} className="cursor-pointer">
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {pagesToShow[0] > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}

                {pagesToShow.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={page === currentPage}
                            className="cursor-pointer"
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {pagesToShow[pagesToShow.length - 1] < totalPages && (
                    <>
                        {pagesToShow[pagesToShow.length - 1] < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink onClick={() => handlePageChange(totalPages)} className="cursor-pointer">
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext 
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
