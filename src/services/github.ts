let GITHUB_USERNAME = "";

export function setGitHubUsername(username: string) {
  GITHUB_USERNAME = username;
}

const BASE = () => `https://api.github.com/users/${GITHUB_USERNAME}`;

export async function fetchGitHubProfile() {
  const res = await fetch(BASE());
  if (!res.ok) throw new Error("GitHub Profile Error");
  return await res.json();
}

export async function fetchGitHubRepositories() {
  const res = await fetch(`${BASE()}/repos?sort=updated&per_page=100`);
  if (!res.ok) throw new Error("GitHub Repo Error");
  return await res.json();
}