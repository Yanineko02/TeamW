// Add only projects that TeamW has chosen to display.
// See README.md for the project fields and an example.
export const projects = [
  {
    name: '내몫봄',
    description: '청년이 확인해 볼 정부·지자체 지원사업을 찾고 공식 신청처까지 안내하는 서비스입니다.',
    visibility: 'private',
    planningUrl: 'https://naemokbom-planning-hub.vercel.app/',
  },
  {
    name: 'DAW 프로젝트',
    description: '설명 준비 중',
    visibility: 'pending',
  },
];

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

