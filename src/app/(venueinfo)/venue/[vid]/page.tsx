import getVenue from "../../../../libs/getVenue";

export const dynamic = "force-dynamic";

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

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;
  const venueJson = await getVenue(vid);
  const venue = venueJson.data;

  return (
    <main className="p-8 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-6 max-w-4xl">
        <img
          src={normalizeDriveImage(venue.picture)}
          alt={venue.name}
          className="w-80 h-56 object-cover rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>
          <p>Name: {venue.name}</p>
          <p>Address: {venue.address}</p>
          <p>District: {venue.district}</p>
          <p>Province: {venue.province}</p>
          <p>Postal Code: {venue.postalcode}</p>
          <p>Tel: {venue.tel}</p>
          <p>Daily Rate: {venue.dailyrate}</p>
        </div>
      </div>
    </main>
  );
}