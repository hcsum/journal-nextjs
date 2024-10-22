"use client";

import { Stack, Pagination as MuiPagination } from "@mui/material";
import { useRouter } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const router = useRouter();

  return (
    <Stack spacing={2}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => {
          router.push(`?page=${page}`);
        }}
      />
    </Stack>
  );
};

export default Pagination;
