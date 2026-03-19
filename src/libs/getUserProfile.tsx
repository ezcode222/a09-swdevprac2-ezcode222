type UserProfile = {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    tel: string;
    role: string;
    createdAt: string;
    __v: number;
  };
};

const profileUrls = [
  "https://a08-venue-explorer-backend.vercel.app/api/v1/auth/me",
  "https://a08-venue-explorer-backend-2.vercel.app/api/v1/auth/me",
  "https://a08-venue-explorer-backend-3.vercel.app/api/v1/auth/me",
];

export default async function getUserProfile(
  token: string
): Promise<UserProfile | null> {
  for (const url of profileUrls) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!response.ok) continue;

      const data = await response.json();
      return data;
    } catch {
      continue;
    }
  }

  return null;
}