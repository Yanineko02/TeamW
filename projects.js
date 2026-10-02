// Add only projects that TeamW has chosen to display.
// See README.md for the project fields and an example.
export const projects = [
  {
    name: '내몫봄',
    description: '서울 청년을 위한 주거·취업 지원사업을 찾고, 지원 내용과 준비 서류를 살펴본 뒤 공식 신청처로 이어주는 서비스입니다. 현재 테스트 서비스를 운영하고 있습니다.',
    visibility: 'private',
    introUrl: 'https://naemokbom-intro.vercel.app/',
    planningUrl: 'https://naemokbom-planning-hub.vercel.app/',
  },
  {
    name: 'TWPRO',
    description: '음악 제작과 라이브 방송을 위한 DAW 프로젝트입니다.',
    visibility: 'private',
    planningUrl: 'https://twpro-planning-site.vercel.app/',
  },
];

export function getProjectLink(project, kind = 'primary') {
  const value = kind === 'intro' ? project.introUrl : project.visibility === 'public'
    ? project.githubUrl
    : project.visibility === 'private'
      ? project.planningUrl
      : null;

  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    if (kind !== 'intro' && project.visibility === 'public' && url.hostname !== 'github.com') return null;
    return url.href;
  } catch {
    return null;
  }
}

