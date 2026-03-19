import { VenueJson, VenueItem } from "../../interface";
import Card from "./Card";

function normalizeDriveImage(url: string) {
  const idFromQuery = url.match(/[?&]id=([^&]+)/);
  if (idFromQuery) {
    return `https://drive.google.com/thumbnail?id=${idFromQuery[1]}&sz=w1000`;
  }

  const idFromFilePath = url.match(/\/d\/([^/]+)/);
  if (idFromFilePath) {
    return `https://drive.google.com/thumbnail?id=${idFromFilePath[1]}&sz=w1000`;
  }

  return url;
}

export default async function VenueCatalog({
  venuesJson,
}: {
  venuesJson: Promise<VenueJson>;
}) {
  const venues = await venuesJson;

  return (
    <div className="px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Select your venue</h1>
        <p className="text-gray-600 mt-2">
          Explore 3 fabulous venues in our venue catalog
        </p>
      </div>

      <div className="flex justify-center gap-8 flex-wrap">
        {venues.data.map((venue: VenueItem) => (
          <Card
            key={venue.id}
            vid={venue.id}
            venueName={venue.name}
            imgSrc={normalizeDriveImage(venue.picture)}
          />
        ))}
      </div>
    </div>
  );
}