type LoginResponse = {
  success: boolean;
  token: string;
};

const loginUrls = [
  "https://a08-venue-explorer-backend.vercel.app/api/v1/auth/login",
  "https://a08-venue-explorer-backend-2.vercel.app/api/v1/auth/login",
  "https://a08-venue-explorer-backend-3.vercel.app/api/v1/auth/login",
];

export default async function userLogIn(
  userEmail: string,
  userPassword: string
): Promise<LoginResponse | null> {
  for (const url of loginUrls) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
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