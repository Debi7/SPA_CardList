import React from 'react';
import Button from './Button';


interface PaginationProps {
  currentPage: number;
  totalPages: number; // общее количество стр
  onPageChange: (page: number) => void; // функция смены стр
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext
}) => {
  if (totalPages <= 1) return null; // не показывать пагинацию, если только одна страница

  //показываем только текущую страницу и несколько соседних
  const getVisiblePages = (currentPage: number, totalPages: number, maxPagesToShow: number = 2) => {
    const pages = [];
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(currentPage - half, 1);
    let end = Math.min(currentPage + half, totalPages);

    if (end - start + 1 < maxPagesToShow) {
      if (start === 1) {
        end = Math.min(start + maxPagesToShow - 1, totalPages);
      } else if (end === totalPages) {
        start = Math.max(end - maxPagesToShow + 1, 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);


  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Button onClick={onPrev}>
          Prev
        </Button>
      )}
      {visiblePages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages && (
        <Button onClick={onNext}>
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
