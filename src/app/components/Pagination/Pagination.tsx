import {Button, Input, Text} from '@chakra-ui/react';
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
      alert(`Моля въведете номер на страница между 1 и ${totalPages}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <nav>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Button
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
            variant="ghost"
          >
            Назад
          </Button>
          <Text textStyle="sm" whiteSpace="nowrap">
            Страница {currentPage} от {totalPages}
          </Text>
          <Button
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="ghost"
          >
            Напред
          </Button>
          <Input
            maxW="sm"
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
            aria-label="Въведи номер на страница"
          />
          <Button onClick={handleInputSubmit} variant="ghost">
            Давай!
          </Button>
        </div>
      </nav>
    </div>
  );
}
