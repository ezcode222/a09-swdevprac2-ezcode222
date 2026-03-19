import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "../../libs/getUserProfile";
import DateReserve from "../../components/DateReserve";

export default async function BookingPage() {
  const session = await getServerSession(authOptions);

  let profile = null;

  if ((session as any)?.user?.token) {
    profile = await getUserProfile((session as any).user.token);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Venue Booking</h1>

      {profile?.data && (
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <p>Name: {profile.data.name}</p>
          <p>Email: {profile.data.email}</p>
          <p>Tel: {profile.data.tel}</p>
          <p>Member Since: {profile.data.createdAt}</p>
        </div>
      )}

      <DateReserve />
    </main>
  );
}