import Link from 'next/link';
import DateFormatter from '../DateFormatter/DateFormatter';
import {Text, Heading, Stack, Box} from '@chakra-ui/react';
import NextImage from 'next/image';
import {BLUE_MAIN} from '@/app/utulities/colors';

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
          <Heading as="h1" size="3xl" color={BLUE_MAIN}>
            {title}
          </Heading>
          <Text fontSize="sm" fontWeight="medium" color="fg">
            <DateFormatter dateString={date} />
          </Text>
          {postImage && (
            <Box
              position="relative"
              width="100%"
              height="auto"
              maxH="600px"
              overflow="hidden"
              borderRadius="lg"
            >
              <NextImage
                src={postImage}
                alt={title}
                width={800}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
              />
            </Box>
          )}
        </Stack>
      </Link>
    </Box>
  );
}
