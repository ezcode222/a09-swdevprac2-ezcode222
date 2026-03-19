import { VenueByIdJson } from "../../interface";

const venueBaseUrls = [
  "https://a08-venue-explorer-backend.vercel.app/api/v1/venues",
  "https://a08-venue-explorer-backend-2.vercel.app/api/v1/venues",
  "https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues",
];

export default async function getVenue(vid: string): Promise<VenueByIdJson> {
  for (const baseUrl of venueBaseUrls) {
    try {
      const response = await fetch(`${baseUrl}/${vid}`, { cache: "no-store" });
      if (!response.ok) continue;

      const data: VenueByIdJson = await response.json();
      return data;
    } catch {
      continue;
    }
  }

  throw new Error(`Cannot fetch venue ${vid} from all backends`);
}