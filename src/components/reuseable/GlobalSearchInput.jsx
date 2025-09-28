import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GlobalSearchInput({placeholder="Search by subject or ref no"}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultKeyword = searchParams.get("keyword") || "";
  const [value, setValue] = useState(defaultKeyword);
  const debounced = useDebounce(value, 500);

  useEffect(() => {
    const currentKeyword = searchParams.get("keyword") || "";
    if (debounced === currentKeyword) return;

    const newParams = new URLSearchParams(searchParams);
    if (debounced) {
      newParams.set("keyword", debounced);
    } else {
      newParams.delete("keyword");
    }
    newParams.set("page", 1); // reset pagination
    navigate(`?${newParams.toString()}`);
  }, [debounced, searchParams, navigate]);

  return (
    <div className="relative w-full  max-w-md">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-8 border-primary/40 rounded-lg border-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
