import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function ComplaintSort() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ✅ Sort field validation
  const allowedSorts = ["createdAt", "updatedAt"];
  const paramSort = searchParams.get("sortBy");
  const defaultSort = allowedSorts.includes(paramSort) ? paramSort : "updatedAt";
  const [sortBy, setSortBy] = useState(defaultSort);

  // ✅ Order validation
  const allowedOrders = ["asc", "desc"];
  const paramOrder = searchParams.get("order");
  const defaultOrder = allowedOrders.includes(paramOrder) ? paramOrder : "desc";
  const [order, setOrder] = useState(defaultOrder);

  // 🔽 Update sortBy + order
  useEffect(() => {
    const currentSort = searchParams.get("sortBy") || "updatedAt";
    const currentOrder = searchParams.get("order") || "desc";
    if (sortBy === currentSort && order === currentOrder) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", sortBy);
    newParams.set("order", order);
    newParams.set("page", "1");
    navigate(`?${newParams.toString()}`);
  }, [sortBy, order, searchParams, navigate]);

  return (
    <div className="flex items-center flex-wrap gap-3 px-4 ">
      {/* Sort By Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="primaryBorder" className="flex items-center gap-2 max-xs:w-full">
            Sort By: {sortBy === "createdAt" ? "Submission Date" : "Last Update Date"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setSortBy("createdAt")}>
            Submission Date
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy("updatedAt")}>
            Last Update Date
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Order Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="primaryBorder" className="flex items-center gap-2 max-xs:w-full">
            Order: {order === "asc" ? "Ascending" : "Descending"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Order</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOrder("asc")}>
            Ascending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOrder("desc")}>
            Descending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
