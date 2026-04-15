import type { Pagination } from "@/api/students-api";


interface PaginationWidgetParams {
    pagination?: Pagination;
    page: number;
    onPrevPage: () => void;
    onNextPage: () => void;
}

export const PaginationWidget = ({ pagination, page, onPrevPage, onNextPage}: PaginationWidgetParams) => {

    return (


        <div>
            {/* 📌 Pagination Controls */}
            < div style={{ marginTop: "16px", display: "flex", gap: "8px" }
            }>
                <button
                    onClick={onPrevPage}
                    disabled={page === 1}
                >
                    ⬅ Prev
                </button>

                <span>
                    Page {pagination?.page} of {pagination?.totalPages}
                </span>

                <button
                    onClick={onNextPage}
                    disabled={page === pagination?.totalPages}
                >
                    Next ➡
                </button>
            </div >
        </div>



    );
}