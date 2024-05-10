import {
  Box,
  Heading,
  Text,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import CollapsibleSection from "./CollapsibleSection"

import videos from "../techfren_videos.json";

export default function ShortFormVideos() {
  // const [videoThumbnails, VideoThumbnails] = useState([]);

  // const populateThumbnails = async () => {
  //   for (const video in videos.splice(0, videoCount)) {
  //     if (!videoThumbnails[video])
  //       videoThumbnails[video] = await fetchTikTokThumbnail(
  //         videos[video]["tiktok link"]
  //       );
  //   }
  // };
	//
  // useEffect(() => {
  //   populateThumbnails();
  // }, []);
  return (
    <CollapsibleSection title="ShortForm Content" defaultOpen={true}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {videos?.slice(0, 6).map((video, index) => {
          return (
            <Link key={index} href={video["tiktok link"]} isExternal>
              <Box
                height={719}
                p={4}
                boxShadow="md"
                borderWidth="1px"
                borderRadius="lg"
                align="start"
              >
                {/* <AspectRatio ratio={9 / 16}>
                    <Image src={videoThumbnails[index]} />
                  </AspectRatio> */}
                <Heading size="md" mt={2}>
                  {video["video caption / description"]?.slice(0, 20)}
                </Heading>
                <Text fontSize="sm">Views: {video["video views"]}</Text>
                <Text fontSize="sm">Likes: {video["likes"]}</Text>
                <Text fontSize="sm">Comments: {video["comments"]}</Text>
                <Text fontSize="sm">Duration: {video["video duration"]}</Text>
                Watch Video
              </Box>
            </Link>
          );
        })}
      </SimpleGrid>
    </CollapsibleSection>
  );
}
