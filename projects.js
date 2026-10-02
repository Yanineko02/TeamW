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
    description: '음악 제작과 라이브 방송 오디오를 함께 다루는 Windows 우선 DAW 프로젝트입니다. 개인 모니터링과 방송용 믹스를 분리하는 방향으로 기획 중이며, 실행 가능한 제품은 아직 없습니다.',
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

