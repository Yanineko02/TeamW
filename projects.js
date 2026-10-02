// Add only projects that TeamW has chosen to display.
// See README.md for the project fields and an example.
export const projects = [];

export function getProjectLink(project) {
  const value = project.visibility === 'public'
    ? project.githubUrl
    : project.visibility === 'private'
      ? project.planningUrl
      : null;

  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    if (project.visibility === 'public' && url.hostname !== 'github.com') return null;
    return url.href;
  } catch {
    return null;
  }
}

