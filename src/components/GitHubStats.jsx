import { useEffect, useState } from 'react';
import { HStack, Text, Tooltip } from '@chakra-ui/react';
import { FaStar, FaCodeBranch, FaExclamationCircle } from 'react-icons/fa';

const GitHubStats = ({ repoUrl }) => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!repoUrl) return;
        
        // Extract owner and repo from GitHub URL
        const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return;
        
        const [, owner, repo] = match;
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        
        const data = await response.json();
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          issues: data.open_issues_count
        });
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError(err.message);
      }
    };

    fetchStats();
  }, [repoUrl]);

  if (!stats || error) return null;

  return (
    <HStack spacing={4} mt={2}>
      <Tooltip label="Stars" aria-label="Stars">
        <HStack spacing={1}>
          <FaStar color="#00ff00" />
          <Text fontSize="sm" color="#00ff00">{stats.stars}</Text>
        </HStack>
      </Tooltip>
      
      <Tooltip label="Forks" aria-label="Forks">
        <HStack spacing={1}>
          <FaCodeBranch color="#00ff00" />
          <Text fontSize="sm" color="#00ff00">{stats.forks}</Text>
        </HStack>
      </Tooltip>
      
      <Tooltip label="Open Issues" aria-label="Open Issues">
        <HStack spacing={1}>
          <FaExclamationCircle color="#00ff00" />
          <Text fontSize="sm" color="#00ff00">{stats.issues}</Text>
        </HStack>
      </Tooltip>
    </HStack>
  );
};

export default GitHubStats; 