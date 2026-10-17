// Media kit content, copied from beacons.ai/techfren/mediakit and kept here
// so it can be edited by hand. Images live in /public/mediakit.
export const mediaKit = {
  handle: '@techfren',
  email: 'hi@techfren.net',
  categories: ['technology & science', 'software', 'ai', 'education'],
  totalFollowers: '150.0K',

  platforms: [
    { name: 'TikTok', followers: '78.3K', href: 'https://www.tiktok.com/@techfren' },
    { name: 'Instagram', followers: '47.2K', href: 'https://www.instagram.com/techfren' },
    { name: 'YouTube', followers: '13.7K', href: 'https://www.youtube.com/channel/UC1RO76_HDT13u-lPXOA0t9A' },
    { name: 'Twitch', followers: '475', href: 'https://www.twitch.tv/techfren' },
  ],
  otherPlatforms: [
    { name: 'Threads', followers: '3.0K', href: 'https://www.threads.net/@techfren' },
    { name: 'Discord', followers: '3.0K', href: 'https://discord.com/invite/cK9WeQ7jPq' },
    { name: 'LinkedIn', followers: '2.2K', href: 'https://www.linkedin.com/in/techfren/' },
    { name: 'X', followers: '1.9K', href: 'https://twitter.com/techfrenaj' },
    { name: 'GitHub', followers: '240', href: 'https://github.com/aj47/' },
  ],

  rates: [
    { name: 'Dedicated YouTube video', description: 'A full video on my YouTube channel built around your product', price: '$5,000', featured: true },
    { name: 'YouTube mid-roll integration', description: 'A sponsored segment inside one of my YouTube videos', price: '$2,000', featured: true },
    { name: 'Instagram / TikTok story', description: 'Story post on Instagram and TikTok', price: '$400' },
    { name: 'X / LinkedIn / Threads post', description: 'Text or image post on X, LinkedIn and Threads', price: '$200' },
    { name: 'Link on techfren.net quicklinks', description: '1 day. 14 days = $600', price: '$50' },
  ],

  brandPartners: [
    { name: 'OpenAI', href: 'https://openai.com/', logo: 'openai' },
    { name: 'Mozilla', href: 'https://mozilla.org/', logo: 'mozilla' },
    { name: 'Microsoft', href: 'https://microsoft.com/', logo: 'microsoft' },
    { name: 'Replit', href: 'https://replit.com/', logo: 'replit' },
    { name: 'Warp', href: 'https://warp.dev/', logo: 'warp' },
    { name: 'Gamma', href: 'https://gamma.app/', logo: 'gamma' },
    { name: 'HeyGen', href: 'https://heygen.com/', logo: 'heygen' },
    { name: 'Rosebud AI', href: 'https://rosebud.ai/', logo: 'rosebud' },
    { name: '10Web', href: 'https://10web.io/', logo: '10web' },
    { name: 'AppMap', href: 'https://appmap.io/', logo: 'appmap' },
  ],

  caseStudies: [
    {
      brand: 'Lazy AI',
      logo: '/mediakit/lazyai.jpg',
      type: 'Software demo',
      posts: [
        { platform: 'TikTok', views: '2.5M', image: '/mediakit/lazyai-tiktok.jpg' },
        { platform: 'Instagram', views: '3.4M', image: '/mediakit/lazyai-instagram.jpg' },
      ],
      results: [
        { value: '5.9M+', label: 'views' },
        { value: '100K+', label: 'shares' },
        { value: '300K+', label: 'likes' },
      ],
    },
    {
      brand: 'Crossover',
      logo: '/mediakit/logo-crossover.png',
      type: 'Job application demo',
      posts: [
        { platform: 'TikTok', views: '1.3M', image: '/mediakit/crossover-tiktok.jpg' },
        { platform: 'Instagram', views: '2.2M', image: '/mediakit/crossover-instagram.jpg' },
      ],
      results: [
        { value: '3.5M', label: 'views' },
        { value: '99.2K', label: 'likes' },
      ],
    },
  ],

  tiktok: {
    synced: 'Synced Oct 26, 2025 · last 10 posts',
    summary: [
      { value: '78.3K', label: 'Followers' },
      { value: '3.6%', label: 'Engagement' },
      { value: '48', label: 'Total videos' },
      { value: '94.7K', label: 'Total impressions' },
      { value: '4.0K', label: 'Total engagements' },
      { value: '9.5K', label: 'Avg views' },
      { value: '332', label: 'Avg likes' },
      { value: '20', label: 'Avg comments' },
    ],
    recentPosts: [
      { views: 1700, likes: 32, comments: 8 },
      { views: 427, likes: 10, comments: 1 },
      { views: 2900, likes: 56, comments: 7 },
      { views: 4300, likes: 101, comments: 20 },
      { views: 4700, likes: 65, comments: 8 },
      { views: 28800, likes: 879, comments: 36 },
      { views: 15900, likes: 673, comments: 23 },
      { views: 4700, likes: 214, comments: 26 },
      { views: 23100, likes: 983, comments: 51 },
      { views: 8200, likes: 308, comments: 18 },
    ],
  },
};
