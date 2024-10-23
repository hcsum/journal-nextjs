"use client";

import { Stack, Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  return (
    <Stack spacing={2}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => {
          window.location.href = `/posts/?page=${page}`;
        }}
      />
    </Stack>
  );
};

export default Pagination;
