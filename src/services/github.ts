let GITHUB_USERNAME = "";

export function setGitHubUsername(username: string) {
  GITHUB_USERNAME = username;
}

const getBaseUrl = () =>
  `https://api.github.com/users/${GITHUB_USERNAME}`;

export async function fetchGitHubProfile() {
  const response = await fetch(getBaseUrl());

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub profile");
  }

  return response.json();
}

export async function fetchGitHubRepositories() {
  const response = await fetch(
    `${getBaseUrl()}/repos?sort=updated&per_page=100`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
}