import {Box, Heading, Text} from '@chakra-ui/react';
import DateFormatter from '../DateFormatter/DateFormatter';
import {ReactNode} from 'react';
import {BLUE_MAIN} from '@/app/utulities/colors';
import styles from './SinglePost.module.scss';
import Footer from '../Footer/Footer';

type SinglePostProps = {
  title: string;
  date: string;
  content: ReactNode;
};

export default function SinglePost({title, date, content}: SinglePostProps) {
  return (
    <>
      <Box p={4}>
        <article>
          <Heading as="h1" size="3xl" my={8} color={BLUE_MAIN}>
            {title}
          </Heading>
          <Text fontSize="sm" fontWeight="medium" color="fg">
            <DateFormatter dateString={date} />
          </Text>
          <Box className={styles.content}>{content}</Box>
        </article>
      </Box>
      <Footer />
    </>
  );
}
