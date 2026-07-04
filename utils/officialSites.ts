/** Official government portal URLs where known (destination + service). */
const OFFICIAL_SITES: Record<string, Record<string, string>> = {
  thailand: {
    tdac: 'https://tdac.immigration.go.th/',
  },
};

export function getOfficialSiteUrl(destinationSlug?: string, serviceSlug?: string): string | undefined {
  if (!destinationSlug || !serviceSlug) return undefined;
  return OFFICIAL_SITES[destinationSlug]?.[serviceSlug];
}
