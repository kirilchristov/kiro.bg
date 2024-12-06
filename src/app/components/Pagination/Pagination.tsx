import {useState} from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [inputPage, setInputPage] = useState(currentPage);

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputPage(page);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setInputPage(value);
    }
  };

  const handleInputSubmit = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      onPageChange(inputPage);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  return (
    <nav>
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <div>
        <input
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleInputSubmit();
            }
          }}
          min={1}
          max={totalPages}
          aria-label="Enter page number"
        />
        <button onClick={handleInputSubmit}>Go</button>
      </div>
    </nav>
  );
}
