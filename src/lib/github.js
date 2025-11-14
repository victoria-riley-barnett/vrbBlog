export async function getGitHubStats() {
  try {
    const response = await fetch('https://api.github.com/users/victoria-riley-barnett/repos?per_page=100', {
      headers: {
        'User-Agent': 'vrbBlog',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    const starCount = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
    
    return { starCount };
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    return { starCount: 0 };
  }
}