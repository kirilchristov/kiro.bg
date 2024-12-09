import {Box, Heading, Text} from '@chakra-ui/react';
import DateFormatter from '../DateFormatter/DateFormatter';
import {ReactNode} from 'react';

type SinglePostProps = {
  title: string;
  date: string;
  content: ReactNode;
};

export default function SinglePost({title, date, content}: SinglePostProps) {
  return (
    <Box p={4}>
      <article>
        <Heading as="h1" size="3xl">
          {title}
        </Heading>
        <Text fontSize="sm" fontWeight="medium" color="fg">
          <DateFormatter dateString={date} />
        </Text>
        <div>{content}</div>
      </article>
    </Box>
  );
}
