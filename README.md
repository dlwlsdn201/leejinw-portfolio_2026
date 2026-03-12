# Lee Jinwoo | 프론트엔드 개발자 포트폴리오 (2026)

5년차 프론트엔드 개발자 이진우의 포트폴리오 사이트입니다.  
Astro 6 기반의 풀페이지 레이아웃과 Content Collections를 활용한 콘텐츠 관리 구조로 구성되어 있습니다.

사이트 바로가기 [![Netlify Status](https://api.netlify.com/api/v1/badges/6b9ca043-3813-4da1-a5c7-719ec936e26f/deploy-status)](https://app.netlify.com/projects/dev-leejinw-2026/deploys)

---

## 기술 스택

| 구분           | 기술                                  |
| -------------- | ------------------------------------- |
| **프레임워크** | Astro 6, React 19                     |
| **스타일링**   | Tailwind CSS 4, PrimeReact, PrimeFlex |
| **배포**       | Netlify (SSR, Serverless)             |
| **이메일**     | Nodemailer (Gmail SMTP)               |
| **폰트**       | Pretendard Variable                   |

---

## 프로젝트 구조

```
/
├── public/                 # 정적 에셋
├── src/
│   ├── assets/             # 이미지, SVG 등
│   ├── components/         # 공통 컴포넌트 (DotNavigator 등)
│   ├── content/            # Content Collections 데이터
│   │   ├── career/         # 경력, 학력, 자격증 (JSON/MD)
│   │   └── projects/       # 프로젝트 목록 (MD)
│   ├── features/           # 섹션별 기능 모듈
│   │   ├── intro/          # 인트로 섹션
│   │   ├── career/         # 경력 타임라인
│   │   ├── projects/       # 프로젝트 그리드
│   │   ├── album/          # 앨범/갤러리
│   │   └── contact/        # 연락처 폼
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro     # 메인 페이지
│   │   └── api/
│   │       └── sendEmail.ts  # 이메일 전송 API
│   ├── styles/
│   └── content.config.ts   # Content Collections 스키마
├── astro.config.mjs
└── package.json
```

---

## 주요 기능

- **풀페이지 스크롤**: 데스크톱에서 휠 기반 섹션 전환, 모바일에서는 일반 스크롤
- **DotNavigator**: 현재 섹션 표시 및 클릭 시 해당 섹션으로 이동
- **경력 타임라인**: `src/content/career/` 데이터 기반 렌더링
- **프로젝트 그리드**: `src/content/projects/` MD 파일 기반 프로젝트 카드
- **앨범 섹션**: 이미지 그리드 갤러리
- **연락처 폼**: 이메일 전송 API (`/api/sendEmail`) 연동

---

## 실행 방법

### 사전 요구사항

- Node.js 18+
- pnpm (권장)

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (localhost:4321)
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 결과물 미리보기
pnpm preview
```

---

## 콘텐츠 관리

### 경력 (Career)

`src/content/career/` 하위에 JSON 또는 MD 파일을 추가합니다.

- `company.json`, `graduation.json`, `certificates.json` 등
- 스키마: `order`, `period`, `title`, `subTitle`, `description`, `icon`, `color`, `skills`

### 프로젝트 (Projects)

`src/content/projects/` 하위에 MD 파일을 추가합니다.

```yaml
---
order: 1
title: "프로젝트명"
summary: "한 줄 요약"
thumbnail: "이미지 URL"
tags: ["Next.js", "React"]
repoUrl: "https://github.com/..."
liveUrl: "https://..."
---
# 프로젝트 상세 설명 (Markdown)
```

---

## 환경 변수 (배포 시)

이메일 전송 API를 사용하려면 Netlify 환경 변수에 다음을 설정합니다.

| 변수명       | 설명                     |
| ------------ | ------------------------ |
| `EMAIL_USER` | Gmail 계정 (SMTP 인증용) |
| `EMAIL_PASS` | Gmail 앱 비밀번호        |

> Gmail SMTP 사용 시 [앱 비밀번호](https://support.google.com/accounts/answer/185833) 발급이 필요합니다.

---

## 배포

- **플랫폼**: Netlify
- **빌드 명령**: `pnpm build`
- **출력 디렉터리**: `dist/` (Astro 기본값)
- **Adapter**: `@astrojs/netlify` (SSR, Serverless)

---

## 라이선스

개인 포트폴리오 용도로 사용됩니다.
