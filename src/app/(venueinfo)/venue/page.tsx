import VenueCatalog from "../../../components/VenueCatalog";
import getVenues from "../../../libs/getVenues";

export const dynamic = "force-dynamic";

export default function VenuePage() {
  const venuesJson = getVenues();

  return (
    <main className="bg-gray-100 min-h-screen">
      <VenueCatalog venuesJson={venuesJson} />
    </main>
  );
}