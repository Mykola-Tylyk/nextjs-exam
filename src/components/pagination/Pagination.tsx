"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentPage = Number(searchParams.get("page")) || 1;
    console.log(currentPage);

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            <button disabled={currentPage <= 1} onClick={() => updatePage(currentPage - 1)}>
                Prev
            </button>

            <button disabled={currentPage >= totalPages} onClick={() => updatePage(currentPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
