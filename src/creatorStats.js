// Audience numbers shown on the homepage. Total followers has no keyless
// browser API, so update it by hand. Discord members are refreshed live and
// fall back to this value.
export const creatorStats = {
  asOf: '2026-09-28',
  totalFollowers: 130000,
  discordMembers: 3560,
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
