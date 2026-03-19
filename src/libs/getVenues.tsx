import { VenueJson } from "../../interface";

const venueUrls = [
  "https://a08-venue-explorer-backend.vercel.app/api/v1/venues",
  "https://a08-venue-explorer-backend-2.vercel.app/api/v1/venues",
  "https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues",
];

export default async function getVenues(): Promise<VenueJson> {
  for (const url of venueUrls) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) continue;

      const data: VenueJson = await response.json();
      return data;
    } catch {
      continue;
    }
  }

  throw new Error("Cannot fetch venues from all backends");
}