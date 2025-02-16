// 'use client'
//
// import {useSearchParams} from "react-router-dom";
//
// const Pagination = ({ totalPages }: { totalPages: number }) => {
//
//     const [query, setQuery] = useSearchParams({page: '1'})
//     const currentPage = Number(query.get("page")) || 1;
//
//     return (
//         <div>
//             <button
//                 disabled={currentPage <= 1}
//                 onClick={() => setQuery({ page: (currentPage - 1).toString() })}
//             >
//                 Prev
//             </button>
//
//
//             <button
//                 disabled={currentPage >= totalPages}
//                 onClick={() => setQuery({ page: (currentPage + 1).toString() })}
//             >
//                 Next
//             </button>
//         </div>
//     );
// };
//
// export default Pagination;


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
