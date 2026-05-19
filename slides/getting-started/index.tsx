import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: {
    bg: '#f5efe0',
    text: '#202126',
    accent: '#0f6f73',
  },
  fonts: {
    display: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
    body: '"Inter", "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
  },
  typeScale: {
    hero: 118,
    body: 31,
  },
  radius: 8,
};

const colors = {
  parchment: '#f5efe0',
  paper: '#fff9ec',
  ink: '#202126',
  teal: '#0f6f73',
  deepTeal: '#06484e',
  gold: '#c79a3b',
  rose: '#a54848',
  sage: '#5f7c5d',
  plum: '#5c405e',
  line: '#d7bd79',
  muted: '#66706d',
};

const page: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
  background: colors.parchment,
  color: colors.ink,
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: 0,
};

const title: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--osd-font-display)',
  fontSize: 88,
  lineHeight: 1.04,
  fontWeight: 780,
  letterSpacing: 0,
};

const heroTitle: CSSProperties = {
  ...title,
  fontSize: 120,
  lineHeight: 0.98,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 30,
  lineHeight: 1.44,
  color: colors.muted,
};

const label: CSSProperties = {
  fontSize: 22,
  fontWeight: 820,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: colors.rose,
};

const ornamentCss = `
  @keyframes os-bloom {
    from { opacity: 0; transform: translateY(12px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .mucha-slide * { box-sizing: border-box; }
`;

const DecoCircle = ({ x, y, size, color }: { x: number; y: number; size: number; color: string }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: '50%',
      border: `3px solid ${color}`,
      opacity: 0.5,
    }}
  />
);

const Vine = ({ side }: { side: 'left' | 'right' }) => (
  <div
    style={{
      position: 'absolute',
      top: 102,
      bottom: 102,
      [side]: 54,
      width: 34,
      borderLeft: side === 'left' ? `3px solid ${colors.gold}` : undefined,
      borderRight: side === 'right' ? `3px solid ${colors.gold}` : undefined,
    }}
  >
    {Array.from({ length: 7 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: 42 + i * 118,
          [side === 'left' ? 'left' : 'right']: -12,
          width: 42,
          height: 72,
          border: `3px solid ${i % 2 ? colors.sage : colors.rose}`,
          borderRadius: side === 'left' ? '70% 20% 70% 20%' : '20% 70% 20% 70%',
          transform: `rotate(${side === 'left' ? -24 : 24}deg)`,
          background: colors.paper,
        }}
      />
    ))}
  </div>
);

const Frame = ({
  children,
  n,
  section = 'From chat to published deck',
  dark = false,
}: {
  children: ReactNode;
  n: string;
  section?: string;
  dark?: boolean;
}) => (
  <section
    className="mucha-slide"
    style={{
      ...page,
      background: dark ? colors.deepTeal : colors.parchment,
      color: dark ? colors.paper : colors.ink,
    }}
  >
    <style>{ornamentCss}</style>
    <DecoCircle x={-120} y={-180} size={420} color={dark ? colors.gold : colors.teal} />
    <DecoCircle x={1590} y={780} size={420} color={dark ? colors.rose : colors.gold} />
    <Vine side="left" />
    <Vine side="right" />
    <div style={{ position: 'absolute', inset: 52, border: `4px double ${colors.gold}` }} />
    <main
      style={{
        position: 'absolute',
        inset: '92px 116px 92px 116px',
        animation: 'os-bloom 520ms ease-out both',
      }}
    >
      {children}
    </main>
    <footer
      style={{
        position: 'absolute',
        left: 116,
        right: 116,
        bottom: 46,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 20,
        color: dark ? '#d8d2bd' : colors.muted,
      }}
    >
      <span>{section}</span>
      <span>{n}</span>
    </footer>
  </section>
);

const Panel = ({
  children,
  tone = 'light',
  style,
}: {
  children: ReactNode;
  tone?: 'light' | 'teal' | 'rose' | 'ink';
  style?: CSSProperties;
}) => {
  const palette =
    tone === 'teal'
      ? { bg: colors.teal, fg: colors.paper, border: colors.gold }
      : tone === 'rose'
        ? { bg: colors.rose, fg: colors.paper, border: colors.gold }
        : tone === 'ink'
          ? { bg: colors.ink, fg: colors.paper, border: colors.gold }
          : { bg: colors.paper, fg: colors.ink, border: colors.line };

  return (
    <div
      style={{
        background: palette.bg,
        color: palette.fg,
        border: `2px solid ${palette.border}`,
        padding: 34,
        boxShadow: '10px 10px 0 rgba(32,33,38,0.08)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Step = ({ num, head, copy }: { num: string; head: string; copy: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '86px 1fr', gap: 24, alignItems: 'start' }}>
    <div
      style={{
        width: 68,
        height: 68,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        background: colors.gold,
        color: colors.ink,
        fontSize: 28,
        fontWeight: 860,
      }}
    >
      {num}
    </div>
    <div>
      <div style={{ fontSize: 34, fontWeight: 820, lineHeight: 1.1 }}>{head}</div>
      <p style={{ ...body, fontSize: 25, marginTop: 10 }}>{copy}</p>
    </div>
  </div>
);

const Pill = ({ children, color = colors.teal }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      minHeight: 44,
      padding: '5px 17px',
      border: `2px solid ${color}`,
      color,
      background: colors.paper,
      fontSize: 23,
      fontWeight: 780,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const Cover: Page = () => (
  <Frame n="01 / 10" section="Case study">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 470px', gap: 72, alignItems: 'center', height: '100%' }}>
      <div>
        <div style={label}>Conversation recap</div>
        <h1 style={{ ...heroTitle, marginTop: 34 }}>小白如何請 Codex 教學做簡報</h1>
        <p style={{ ...body, marginTop: 42, maxWidth: 980 }}>
          這不是抽象教學，而是我們剛剛實際走過的一次流程：安裝環境、踩坑、修正架構、接上 GitHub，最後發布成網頁簡報。
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 46, flexWrap: 'wrap' }}>
          <Pill>Node.js</Pill>
          <Pill color={colors.rose}>open-slide</Pill>
          <Pill color={colors.plum}>GitHub Pages</Pill>
        </div>
      </div>
      <Panel tone="teal" style={{ minHeight: 650, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 1 }}>10</div>
          <div style={{ width: 260, height: 260, margin: '26px auto', borderRadius: '50%', border: `6px double ${colors.gold}` }} />
          <div style={{ fontSize: 34, fontWeight: 760 }}>steps to publish</div>
        </div>
      </Panel>
    </div>
  </Frame>
);

const StartPoint: Page = () => (
  <Frame n="02 / 10">
    <div style={{ display: 'grid', gridTemplateColumns: '0.96fr 1.04fr', gap: 56, height: '100%', alignItems: 'center' }}>
      <div>
        <div style={label}>The first question</div>
        <h2 style={{ ...title, marginTop: 30 }}>一開始不是寫程式，是先弄懂「怎麼接上」。</h2>
        <p style={{ ...body, marginTop: 34 }}>
          我們先把 open-slide、GitHub、GitHub Pages 的角色拆開，避免把工具、版本庫和發布服務混在一起。
        </p>
      </div>
      <div style={{ display: 'grid', gap: 22 }}>
        <Step num="1" head="open-slide" copy="負責本機預覽與把 React 投影片 build 成靜態網站。" />
        <Step num="2" head="GitHub" copy="負責保存版本、讓每次改動可以追蹤和回復。" />
        <Step num="3" head="Pages / Vercel / Netlify" copy="負責把 build 出來的 dist 變成線上網址。" />
      </div>
    </div>
  </Frame>
);

const FolderPlan: Page = () => (
  <Frame n="03 / 10">
    <div style={label}>Workspace design</div>
    <h2 style={{ ...title, marginTop: 28 }}>我們先設計資料夾，再開始建立專案。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 70 }}>
      <Panel style={{ minHeight: 440 }}>
        <div style={{ fontSize: 42, fontWeight: 850, color: colors.teal }}>原本想法</div>
        <p style={{ ...body, marginTop: 26 }}>
          把整個 presentations 放在 T 槽 Obsidian 裡，讓簡報和筆記一起管理。
        </p>
        <div style={{ marginTop: 34, fontFamily: 'monospace', fontSize: 24, lineHeight: 1.5 }}>
          T:\●Obsidian\4.輸出工作區\簡報
        </div>
      </Panel>
      <Panel tone="teal" style={{ minHeight: 440 }}>
        <div style={{ fontSize: 42, fontWeight: 850 }}>最後架構</div>
        <p style={{ ...body, color: '#e8dfc8', marginTop: 26 }}>
          C 槽 Codex 放開發專案，T 槽 Obsidian 放 PDF、連結、筆記和封存輸出。
        </p>
        <div style={{ marginTop: 34, fontFamily: 'monospace', fontSize: 24, lineHeight: 1.5 }}>
          C:\Documents\Codex\open-slide-workspace
        </div>
      </Panel>
    </div>
  </Frame>
);

const EnvironmentFix: Page = () => (
  <Frame n="04 / 10">
    <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 58, alignItems: 'center', height: '100%' }}>
      <div>
        <div style={label}>Environment check</div>
        <h2 style={{ ...title, marginTop: 30 }}>第一個關卡：Node、npm、Git。</h2>
        <p style={{ ...body, marginTop: 34 }}>
          Git 補裝完成，Node 從 v18 升到 v24，npm 在 PowerShell 被 Execution Policy 擋住，所以改用 npm.cmd。
        </p>
      </div>
      <Panel tone="ink" style={{ fontFamily: 'monospace', fontSize: 30, lineHeight: 1.75 }}>
        <span style={{ color: colors.gold }}>&gt;</span> git version 2.54.0.windows.1<br />
        <span style={{ color: colors.gold }}>&gt;</span> node -v<br />
        v24.15.0<br />
        <span style={{ color: colors.gold }}>&gt;</span> npm.cmd -v<br />
        11.12.1
      </Panel>
    </div>
  </Frame>
);

const FirstPitfall: Page = () => (
  <Frame n="05 / 10">
    <div style={label}>The useful failure</div>
    <h2 style={{ ...title, marginTop: 28 }}>我們真的在 T 槽踩到 open-slide 的坑。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 70 }}>
      <Panel tone="rose" style={{ minHeight: 430 }}>
        <div style={{ fontSize: 42, fontWeight: 850 }}>發生什麼</div>
        <p style={{ ...body, color: '#f4ead5', marginTop: 26 }}>
          npm install 卡在 esbuild.exe，Git 又回報 dubious ownership。T 槽其實是 RaiDrive / 網路掛載磁碟。
        </p>
      </Panel>
      <Panel style={{ minHeight: 430 }}>
        <div style={{ fontSize: 42, fontWeight: 850, color: colors.teal }}>學到什麼</div>
        <p style={{ ...body, marginTop: 26 }}>
          JS 專案要把 node_modules 放在本機檔案系統。同步碟或網路碟適合放輸出，不適合當開發根目錄。
        </p>
      </Panel>
    </div>
  </Frame>
);

const WorkingProject: Page = () => (
  <Frame n="06 / 10" dark>
    <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 56, alignItems: 'center', height: '100%' }}>
      <div>
        <div style={{ ...label, color: colors.gold }}>Working path</div>
        <h2 style={{ ...title, color: colors.paper, marginTop: 30 }}>改到 C 槽 Codex 工作區後，一次成功。</h2>
        <p style={{ ...body, color: '#d8d2bd', marginTop: 34 }}>
          專案成功啟動，open-slide dev server 跑在 localhost:5173，這就是之後每天編輯和預覽的入口。
        </p>
      </div>
      <Panel tone="ink" style={{ background: '#11171a', fontFamily: 'monospace', fontSize: 29, lineHeight: 1.65 }}>
        C:\Users\scarc\Documents\Codex\<br />
        open-slide-workspace\decks\<br />
        2026-05-first-open-slide<br /><br />
        <span style={{ color: colors.gold }}>$</span> npm.cmd run dev<br />
        Local: http://localhost:5173/
      </Panel>
    </div>
  </Frame>
);

const GitHubFlow: Page = () => (
  <Frame n="07 / 10">
    <div style={label}>GitHub connection</div>
    <h2 style={{ ...title, marginTop: 28 }}>接上 GitHub 的本質是把本機資料夾和 repo 綁起來。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26, marginTop: 72 }}>
      {[
        ['Commit', '把目前檔案記錄成一個版本。'],
        ['Remote', '把本機 repo 指向 GitHub repo。'],
        ['Push', '把版本上傳到 GitHub，觸發後續發布。'],
      ].map(([head, copy], index) => (
        <Panel key={head} tone={index === 1 ? 'teal' : 'light'} style={{ minHeight: 360 }}>
          <div style={{ fontSize: 30, color: index === 1 ? colors.gold : colors.rose, fontWeight: 850 }}>0{index + 1}</div>
          <div style={{ fontSize: 42, fontWeight: 850, marginTop: 26 }}>{head}</div>
          <p style={{ ...body, color: index === 1 ? '#e8dfc8' : colors.muted, marginTop: 24 }}>{copy}</p>
        </Panel>
      ))}
    </div>
  </Frame>
);

const Publish: Page = () => (
  <Frame n="08 / 10">
    <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 56, alignItems: 'center', height: '100%' }}>
      <div>
        <div style={label}>Publish moment</div>
        <h2 style={{ ...title, marginTop: 30 }}>GitHub Pages 一開始失敗，原因不是 build。</h2>
        <p style={{ ...body, marginTop: 34 }}>
          repo 原本是 Private，免費 GitHub Pages 不能發布 private repo。改 Public 並選 GitHub Actions 後，重新觸發部署就成功。
        </p>
      </div>
      <div style={{ display: 'grid', gap: 22 }}>
        <Step num="1" head="Build success" copy="npm run build 能產生 dist，代表 open-slide 沒問題。" />
        <Step num="2" head="Deploy failed" copy="Pages 還沒啟用或 repo visibility 不符合條件。" />
        <Step num="3" head="HTTP 200" copy="最後公開網址成功回應，線上簡報正式成立。" />
      </div>
    </div>
  </Frame>
);

const Template: Page = () => (
  <Frame n="09 / 10">
    <div style={label}>Reusable template</div>
    <h2 style={{ ...title, marginTop: 28 }}>環境跑通後，我們做了一個 deck-template。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 70 }}>
      <Panel style={{ minHeight: 430 }}>
        <div style={{ fontSize: 42, fontWeight: 850, color: colors.teal }}>母版的用途</div>
        <p style={{ ...body, marginTop: 26 }}>
          不必每次從官方範例開始拆。複製母版、改主題、安裝依賴、開 dev server，就能開始做新簡報。
        </p>
      </Panel>
      <Panel tone="ink" style={{ minHeight: 430, fontFamily: 'monospace', fontSize: 26, lineHeight: 1.55 }}>
        Copy-Item -Recurse deck-template decks\new-deck<br />
        cd decks\new-deck<br />
        npm.cmd install<br />
        npm.cmd run dev
      </Panel>
    </div>
  </Frame>
);

const Closing: Page = () => (
  <Frame n="10 / 10" dark>
    <div style={{ height: '100%', display: 'grid', alignItems: 'center' }}>
      <div>
        <div style={{ ...label, color: colors.gold }}>Final workflow</div>
        <h2 style={{ ...heroTitle, color: colors.paper, marginTop: 34, maxWidth: 1320 }}>
          最後我們得到的不是一份簡報，而是一條可重複的簡報生產線。
        </h2>
        <div style={{ display: 'flex', gap: 18, marginTop: 56, flexWrap: 'wrap' }}>
          <Pill color={colors.gold}>本機開發</Pill>
          <Pill color={colors.gold}>Codex 改稿</Pill>
          <Pill color={colors.gold}>localhost 預覽</Pill>
          <Pill color={colors.gold}>GitHub 版本</Pill>
          <Pill color={colors.gold}>Pages 發布</Pill>
        </div>
      </div>
    </div>
  </Frame>
);

export const meta: SlideMeta = {
  title: '小白如何請 Codex 教學做簡報',
};

export default [
  Cover,
  StartPoint,
  FolderPlan,
  EnvironmentFix,
  FirstPitfall,
  WorkingProject,
  GitHubFlow,
  Publish,
  Template,
  Closing,
] satisfies Page[];
