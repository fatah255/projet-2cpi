"use client";
import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
const SearchInput = () => {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500);
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: { search: debouncedValue },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search for Boards !"
        className="w-full max-w-[516px] pl-9 "
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
        value={value}
      />
    </div>
  );
};

export default SearchInput;
