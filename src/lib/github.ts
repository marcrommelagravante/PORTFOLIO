import { siteConfig } from "@/content/site";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubContributionResult = {
  available: boolean;
  username: string;
  profileUrl: string;
  totalContributions?: number;
  weeks?: ContributionDay[][];
  reason?: string;
};

/**
 * Fetches GitHub contribution data on the server when GITHUB_TOKEN is configured.
 * Never fabricates contribution counts or squares when live data is unavailable.
 */
export async function getGitHubContributions(): Promise<GitHubContributionResult> {
  const username = siteConfig.githubUsername;
  const profileUrl = siteConfig.githubUrl;
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!token) {
    return {
      available: false,
      username,
      profileUrl,
      reason:
        "Live contribution data requires a server-side GITHUB_TOKEN environment variable.",
    };
  }

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        available: false,
        username,
        profileUrl,
        reason: `GitHub API returned status ${response.status}.`,
      };
    }

    const json = await response.json();
    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return {
        available: false,
        username,
        profileUrl,
        reason: "Could not load contribution calendar for this profile.",
      };
    }

    const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };

    const weeks: ContributionDay[][] = calendar.weeks.map(
      (week: {
        contributionDays: {
          date: string;
          contributionCount: number;
          contributionLevel: string;
        }[];
      }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: levelMap[day.contributionLevel] ?? 0,
        }))
    );

    return {
      available: true,
      username,
      profileUrl,
      totalContributions: calendar.totalContributions,
      weeks,
    };
  } catch {
    return {
      available: false,
      username,
      profileUrl,
      reason: "Unable to reach GitHub API at this time.",
    };
  }
}
