import Link from 'next/link';
import DateFormatter from '../DateFormatter/DateFormatter';
import {Image, Text, Heading, Stack, Box} from '@chakra-ui/react';

type ListPostItemProps = {
  id: string;
  slug: string;
  title: string;
  date: string;
  postImage?: string;
};

export default function ListPostItem({
  title,
  date,
  slug,
  postImage,
}: ListPostItemProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      shadow="md"
    >
      <Link href={`/${slug}`}>
        <Stack>
          {postImage && (
            <Image
              src={postImage}
              alt={title}
              borderRadius="lg"
              objectFit="cover"
              maxH="auto"
            />
          )}
          <Heading as="h2" size="md">
            {title}
          </Heading>
          <Text fontSize="sm" fontWeight="medium" color="fg">
            <DateFormatter dateString={date} />
          </Text>
        </Stack>
      </Link>
    </Box>
  );
}
