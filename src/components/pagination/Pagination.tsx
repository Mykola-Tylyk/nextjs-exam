'use client'

import {useSearchParams} from "react-router-dom";

const Pagination = ({ totalPages }: { totalPages: number }) => {

    const [query, setQuery] = useSearchParams({page: '1'})
    const currentPage = Number(query.get("page")) || 1;

    return (
        <div>
            <button
                disabled={currentPage <= 1}
                onClick={() => setQuery({ page: (currentPage - 1).toString() })}
            >
                Prev
            </button>


            <button
                disabled={currentPage >= totalPages}
                onClick={() => setQuery({ page: (currentPage + 1).toString() })}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;