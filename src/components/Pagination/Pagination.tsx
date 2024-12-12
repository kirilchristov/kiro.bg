import {Box, Button, Input, Text} from '@chakra-ui/react';
import {useState} from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [inputPage, setInputPage] = useState<string>(String(currentPage));

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputPage(String(page));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value); // Directly set the string value
  };

  const handleInputSubmit = () => {
    const page = parseInt(inputPage, 10);

    if (!inputPage || isNaN(page) || page < 1 || page > totalPages) {
      alert(`Моля въведете номер на страница между 1 и ${totalPages}`);
    } else {
      onPageChange(page);
      setInputPage(String(page));
    }
  };

  return (
    <Box display="flex" justifyContent="center" p="16px">
      <nav>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="1rem"
        >
          <Button
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
            variant="ghost"
          >
            {'<<'}
          </Button>
          <Text textStyle="sm" whiteSpace="nowrap">
            Страница {currentPage} от {totalPages}
          </Text>
          <Button
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="ghost"
          >
            {'>>'}
          </Button>
          <Input
            maxW={16}
            type="text"
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
          <Button
            onClick={handleInputSubmit}
            variant="ghost"
            disabled={Number(inputPage) <= 0 || !inputPage}
          >
            Давай!
          </Button>
        </Box>
      </nav>
    </Box>
  );
}
