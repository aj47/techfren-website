import projects from './projects.json';
import { timeline } from './timeline';

// These existing portfolio projects also have build-log milestones. Keep one
// entry for each, enriched with its original repository and project links.
const projectMatches = {
  agentbattler: 'Agent Battler',
  discord: 'TechFren Discord Bot',
};
const matchedNames = new Set(Object.values(projectMatches));

export const portfolioTimeline = timeline.map(group => ({
  ...group,
  projects: group.projects.map(milestone => {
    const project = projects.find(item => item.name === projectMatches[milestone.id]);
    return {
      ...milestone,
      github: project?.github,
      live: milestone.id === 'agentbattler' ? 'https://agentbattler.com' : project?.live,
      openSource: !!project,
    };
  }),
}));

export const openSourceProjects = projects.filter(project => !project.name.includes('(Contributor)') && !matchedNames.has(project.name));
export const contributions = projects.filter(project => project.name.includes('(Contributor)'));
export const milestoneCount = portfolioTimeline.reduce((count, group) => count + group.projects.length, 0);
export const workCount = milestoneCount + openSourceProjects.length + contributions.length;
export const openSourceCount = projects.filter(project => !project.name.includes('(Contributor)')).length;

export function matchesSearch(project, query) {
  const text = `${project.name} ${project.description} ${project.category || ''}`.toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).every(word => text.includes(word));
}
