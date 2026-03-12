"use server";

export async function getGithubRepo(language: string) {
  const token = process.env.GITHUB_TOKEN;

  // Debug: Check your console where 'npm run dev' is running. 
  // It should show 'Token Found' if your .env.local is correct.
  console.log(token ? "Uplink Secure: Token Found" : "Uplink Compromised: No Token Found");

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}&sort=stars&per_page=30`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 60 } // Cache results for 60 seconds to save quota
      }
    );

    if (response.status === 403) return { error: "RATE_LIMIT" };
    if (!response.ok) return { error: "FETCH_ERROR" };

    const data = await response.json();
    return { data: data.items };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { error: "SERVER_ERROR" };
  }
}