// Milestone order and approximate periods come from AJ's September 8 sketch
// and the accompanying stream. See docs/timeline-content.md for link evidence.
// Keep dates as periods until exact build dates are confirmed.
// Screenshot viewBoxes preserve the original supplied image without recreating UI.
export const timeline = [
  {
    id: 'aug-8', date: 'Aug 8–12', period: 'The first experiments',
    projects: [
      { id: 'agentbattler', name: 'AgentBattler', category: 'AI agents', description: 'Coding-agent benchmarks with inspectable results.', crop: [160, 417, 130, 75], videoId: 'e6eIZd1zHOQ', seconds: 2051, linkLabel: 'Demo · 34:11' },
      { id: 'transcribe', name: 'Ultra Live Transcribe', category: 'Creator tools', description: 'Live transcription with an AI co-host.', crop: [449, 391, 180, 121], videoId: '_7YmZIomwW0', linkLabel: 'Short' },
    ],
  },
  {
    id: 'late-aug', date: 'Late August', period: 'Building the tools I need',
    projects: [
      { id: 'discord', name: 'TechFren Discord bots', category: 'Community', description: 'Bots connecting Discord, AI agents, and a community web app.', crop: [678, 222, 208, 96], videoId: 'LYPTe4tpV3Q', linkLabel: 'Short' },
      { id: 'hook-ledger', name: 'Hook Ledger', category: 'Creator tools', description: 'Find stream highlights, edit clips, and schedule posts.', crop: [669, 367, 222, 156], videoId: 'e6eIZd1zHOQ', seconds: 1548, linkLabel: 'Demo · 25:48' },
    ],
  },
  {
    id: 'sep-1', date: 'Sep 1', period: 'Putting it out in the world',
    projects: [
      { id: 'opencourt', name: 'OpenCourt', category: 'Tennis + AI', description: 'AI analysis of tennis footage.', crop: [949, 232, 212, 136], videoId: 'e6eIZd1zHOQ', seconds: 2231, linkLabel: 'Demo · 37:11' },
      { id: 'community', name: 'Tech Friend Community', category: 'Community', description: 'Discord chat and a community leaderboard on the web.', crop: [982, 446, 144, 65], videoId: 'e6eIZd1zHOQ', seconds: 80, linkLabel: 'Demo · 1:20' },
      { id: 'x-video', name: '200k+ views on X', category: 'Creative experiment', description: 'A Pocoj video about ChatGPT’s $80 usage reset.', crop: [1141, 447, 66, 63], videoId: 'yYGrFcTdjhk', linkLabel: 'Short' },
    ],
  },
  {
    id: 'sep-8', date: 'Sep 8', period: 'A new face for TechFren',
    projects: [
      { id: 'pocoj', name: '3D Pocoj avatar', category: 'Animation', description: 'A host with lip sync and my cloned voice.', crop: [1245, 448, 57, 72], videoId: 'e6eIZd1zHOQ', seconds: 790, linkLabel: 'Demo · 13:10' },
    ],
  },
];

export function projectLink(project) {
  if (project.videoId) return `https://www.youtube.com/watch?v=${project.videoId}${project.seconds != null ? `&t=${project.seconds}s` : ''}`;
  return project.url;
}
