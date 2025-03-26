import { useState, useEffect } from 'react';
import { Image, Box, Skeleton } from '@chakra-ui/react';

const LinkPreview = ({ url }) => {
  const [faviconUrl, setFaviconUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFaviconUrl = () => {
      try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
      } catch (error) {
        console.error('Error parsing URL:', error);
        return null;
      }
    };

    setFaviconUrl(getFaviconUrl());
    setLoading(false);
  }, [url]);

  if (loading) {
    return <Skeleton height="24px" width="24px" borderRadius="sm" />;
  }

  return (
    <Box 
      position="relative" 
      h="24px" 
      w="24px" 
      bg="rgba(0, 255, 0, 0.05)"
      borderRadius="sm"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      {faviconUrl && (
        <Image
          src={faviconUrl}
          alt="Website favicon"
          maxH="16px"
          maxW="16px"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
    </Box>
  );
};

export default LinkPreview; 