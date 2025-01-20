import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

export function formatPagination<T>(paginatedResult: Pagination<T>): {
  items: T[];
  pagination: IPaginationMeta;
} {
  const { meta, items } = paginatedResult;
  const { totalPages, currentPage } = meta;

  return {
    items,
    pagination: {
      ...meta,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
    },
  };
}
