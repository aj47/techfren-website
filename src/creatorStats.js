// Audience numbers shown on the homepage. YouTube subscribers and total
// followers have no keyless browser API, so update these by hand. Discord
// members and GitHub stars are refreshed live and fall back to these values.
export const creatorStats = {
  asOf: '2026-09-28',
  youtubeSubscribers: 13700,
  totalFollowers: 130000,
  discordMembers: 3560,
  topRepo: { name: 'SpeakMCP', repo: 'aj47/SpeakMCP', stars: 149 },
};

export const YOUTUBE_CHANNEL_ID = 'UC1RO76_HDT13u-lPXOA0t9A';
// "UULF" + channel ID suffix is the channel's long-form uploads playlist (no Shorts).
export const YOUTUBE_LATEST_PLAYLIST = `UULF${YOUTUBE_CHANNEL_ID.slice(2)}`;
export const TWITCH_CHANNEL = 'techfren';
export const DISCORD_INVITE = 'cK9WeQ7jPq';

export function formatCount(value) {
  if (value >= 1000) {
    const thousands = value / 1000;
    return `${thousands >= 100 ? Math.round(thousands) : Number(thousands.toFixed(1))}K`;
  }
  return String(value);
}
