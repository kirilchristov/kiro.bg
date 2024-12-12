/* eslint-disable no-unused-vars */
import {Box, Button, Input, Text} from '@chakra-ui/react';

type PaginationProps = {
  currentPage: string;
  totalPages: string;
  inputPage: string;
  onPageChange: (page: string) => void;
  onInputChange: (value: string) => void;
  onInputSubmit: () => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  inputPage,
  onPageChange,
  onInputChange,
  onInputSubmit,
}: PaginationProps) {
  return (
    <Box display="flex" justifyContent="center" p="16px">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        {/* Previous Page Button */}
        <Button
          onClick={() => onPageChange(String(Number(currentPage) - 1))}
          disabled={Number(currentPage) <= 1}
          variant="ghost"
        >
          {'<<'}
        </Button>

        {/* Current Page Info */}
        <Text textStyle="sm" whiteSpace="nowrap">
          Страница {currentPage} от {totalPages}
        </Text>

        {/* Next Page Button */}
        <Button
          onClick={() => onPageChange(String(Number(currentPage) + 1))}
          disabled={Number(currentPage) >= Number(totalPages)}
          variant="ghost"
        >
          {'>>'}
        </Button>

        {/* Page Number Input */}
        <Input
          maxW={16}
          type="text"
          value={inputPage}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onInputSubmit();
            }
          }}
          aria-label="Въведи номер на страница"
        />

        {/* Submit Button */}
        <Button
          onClick={onInputSubmit}
          variant="ghost"
          disabled={Number(inputPage) <= 0 || !inputPage}
        >
          Давай!
        </Button>
      </Box>
    </Box>
  );
}
