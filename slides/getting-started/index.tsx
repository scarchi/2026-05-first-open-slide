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
    hero: 108,
    body: 28,
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
  shell: '#eadfca',
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

const h1: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--osd-font-display)',
  fontSize: 108,
  lineHeight: 0.98,
  fontWeight: 800,
  letterSpacing: 0,
};

const h2: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--osd-font-display)',
  fontSize: 78,
  lineHeight: 1.03,
  fontWeight: 780,
  letterSpacing: 0,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 28,
  lineHeight: 1.42,
  color: colors.muted,
};

const eyebrow: CSSProperties = {
  fontSize: 21,
  fontWeight: 840,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: colors.rose,
};

const css = `
  @keyframes bloom {
    from { opacity: 0; transform: translateY(12px) scale(0.99); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .deck * { box-sizing: border-box; }
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
      opacity: 0.48,
    }}
  />
);

const Vine = ({ side }: { side: 'left' | 'right' }) => (
  <div
    style={{
      position: 'absolute',
      top: 104,
      bottom: 104,
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
          top: 38 + i * 118,
          [side === 'left' ? 'left' : 'right']: -12,
          width: 42,
          height: 70,
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
  section = 'open-slide + GitHub operating model',
  dark = false,
}: {
  children: ReactNode;
  n: string;
  section?: string;
  dark?: boolean;
}) => (
  <section
    className="deck"
    style={{
      ...page,
      background: dark ? colors.deepTeal : colors.parchment,
      color: dark ? colors.paper : colors.ink,
    }}
  >
    <style>{css}</style>
    <DecoCircle x={-128} y={-188} size={430} color={dark ? colors.gold : colors.teal} />
    <DecoCircle x={1580} y={780} size={430} color={dark ? colors.rose : colors.gold} />
    <Vine side="left" />
    <Vine side="right" />
    <div style={{ position: 'absolute', inset: 52, border: `4px double ${colors.gold}` }} />
    <main
      style={{
        position: 'absolute',
        inset: '92px 116px 92px 116px',
        animation: 'bloom 500ms ease-out both',
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
  tone?: 'light' | 'teal' | 'rose' | 'ink' | 'shell';
  style?: CSSProperties;
}) => {
  const palette =
    tone === 'teal'
      ? { bg: colors.teal, fg: colors.paper, border: colors.gold }
      : tone === 'rose'
        ? { bg: colors.rose, fg: colors.paper, border: colors.gold }
        : tone === 'ink'
          ? { bg: colors.ink, fg: colors.paper, border: colors.gold }
          : tone === 'shell'
            ? { bg: colors.shell, fg: colors.ink, border: colors.line }
            : { bg: colors.paper, fg: colors.ink, border: colors.line };

  return (
    <div
      style={{
        background: palette.bg,
        color: palette.fg,
        border: `2px solid ${palette.border}`,
        padding: 30,
        boxShadow: '9px 9px 0 rgba(32,33,38,0.08)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Step = ({ num, head, copy }: { num: string; head: string; copy: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr', gap: 22, alignItems: 'start' }}>
    <div
      style={{
        width: 62,
        height: 62,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        background: colors.gold,
        color: colors.ink,
        fontSize: 25,
        fontWeight: 880,
      }}
    >
      {num}
    </div>
    <div>
      <div style={{ fontSize: 32, fontWeight: 840, lineHeight: 1.12 }}>{head}</div>
      <p style={{ ...body, fontSize: 24, marginTop: 8 }}>{copy}</p>
    </div>
  </div>
);

const Pill = ({ children, color = colors.teal }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      minHeight: 42,
      padding: '5px 16px',
      border: `2px solid ${color}`,
      color,
      background: colors.paper,
      fontSize: 22,
      fontWeight: 800,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const CodeBlock = ({ children }: { children: ReactNode }) => (
  <Panel tone="ink" style={{ fontFamily: 'monospace', fontSize: 25, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
    {children}
  </Panel>
);

const Cover: Page = () => (
  <Frame n="01 / 20" section="For IT sharing">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 460px', gap: 70, alignItems: 'center', height: '100%' }}>
      <div>
        <div style={eyebrow}>Practical case study</div>
        <h1 style={{ ...h1, marginTop: 32 }}>用 open-slide 與 GitHub 建立簡報生產線</h1>
        <p style={{ ...body, maxWidth: 1000, marginTop: 40 }}>
          從小白提問到可發布簡報：環境、建檔、版本管理、部署，以及這次實作踩到的坑。
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 42 }}>
          <Pill>open-slide</Pill>
          <Pill color={colors.rose}>Codex</Pill>
          <Pill color={colors.plum}>GitHub Pages</Pill>
        </div>
      </div>
      <Panel tone="teal" style={{ minHeight: 640, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 136, fontWeight: 900 }}>20</div>
          <div style={{ width: 250, height: 250, margin: '24px auto', borderRadius: '50%', border: `6px double ${colors.gold}` }} />
          <div style={{ fontSize: 32, fontWeight: 780 }}>slides for IT</div>
        </div>
      </Panel>
    </div>
  </Frame>
);

const Agenda: Page = () => (
  <Frame n="02 / 20">
    <div style={eyebrow}>What this deck covers</div>
    <h2 style={{ ...h2, marginTop: 28 }}>先把流程看成系統，不是單一工具。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 66 }}>
      {[
        ['01', '概念', 'open-slide、Codex、GitHub 各自負責什麼。'],
        ['02', '建檔', '專案結構、資料夾策略、母版用途。'],
        ['03', '管理', '版本、發布、Public / Private 決策。'],
        ['04', '案例', '這次問答中遇到的錯誤與修正方式。'],
      ].map(([num, head, copy]) => (
        <Panel key={num} style={{ minHeight: 360 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: colors.rose }}>{num}</div>
          <div style={{ fontSize: 38, fontWeight: 840, marginTop: 28 }}>{head}</div>
          <p style={{ ...body, fontSize: 25, marginTop: 18 }}>{copy}</p>
        </Panel>
      ))}
    </div>
  </Frame>
);

const WhyChange: Page = () => (
  <Frame n="03 / 20">
    <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 56, height: '100%', alignItems: 'center' }}>
      <div>
        <div style={eyebrow}>Why change the workflow</div>
        <h2 style={{ ...h2, marginTop: 30 }}>IT 團隊需要的不只是漂亮投影片。</h2>
        <p style={{ ...body, marginTop: 34 }}>
          簡報常常承載架構說明、教育訓練、決策提案。若能用 repo 管理，就能 review、追版本、重複部署。
        </p>
      </div>
      <div style={{ display: 'grid', gap: 22 }}>
        <Step num="1" head="可追蹤" copy="每次改動都有 commit，可回溯原因與責任。" />
        <Step num="2" head="可重建" copy="只要有 package.json 與原始碼，就能在新環境重新建置。" />
        <Step num="3" head="可自動化" copy="push 後由 Actions build，減少手動上傳與版本混亂。" />
      </div>
    </div>
  </Frame>
);

const Roles: Page = () => (
  <Frame n="04 / 20">
    <div style={eyebrow}>Tool roles</div>
    <h2 style={{ ...h2, marginTop: 28 }}>四個角色，各司其職。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginTop: 58 }}>
      {[
        ['Codex', '把自然語言需求轉成檔案修改，負責寫 slide code、修錯、執行驗證。'],
        ['open-slide', '用 React component 描述投影片，提供本機預覽與 build。'],
        ['Git', '在本機記錄版本，讓每次改動可以 commit、diff、rollback。'],
        ['GitHub', '雲端版本庫與部署觸發點，配合 Pages / Actions 發布。'],
      ].map(([head, copy], i) => (
        <Panel key={head} tone={i === 1 ? 'teal' : i === 3 ? 'rose' : 'light'} style={{ minHeight: 215 }}>
          <div style={{ fontSize: 38, fontWeight: 860 }}>{head}</div>
          <p style={{ ...body, color: i === 1 ? '#e8dfc8' : i === 3 ? '#f4ead5' : colors.muted, fontSize: 25, marginTop: 14 }}>{copy}</p>
        </Panel>
      ))}
    </div>
  </Frame>
);

const SystemMap: Page = () => (
  <Frame n="05 / 20" dark>
    <div style={eyebrow}>System map</div>
    <h2 style={{ ...h2, color: colors.paper, marginTop: 28 }}>一條簡報從本機流到網路。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr 80px 1fr', gap: 16, marginTop: 80, alignItems: 'center' }}>
      {[
        ['本機工作區', '編輯 slides、跑 localhost'],
        ['GitHub repo', '保存版本、觸發 workflow'],
        ['發布網站', 'GitHub Pages / Vercel / Netlify'],
      ].map(([head, copy], i) => (
        <>
          <Panel key={head} tone={i === 1 ? 'rose' : 'teal'} style={{ minHeight: 330 }}>
            <div style={{ fontSize: 40, fontWeight: 860 }}>{head}</div>
            <p style={{ ...body, color: i === 1 ? '#f4ead5' : '#e8dfc8', marginTop: 26 }}>{copy}</p>
          </Panel>
          {i < 2 ? <div key={`${head}-arrow`} style={{ fontSize: 56, color: colors.gold, textAlign: 'center' }}>→</div> : null}
        </>
      ))}
    </div>
  </Frame>
);

const LocalWorkspace: Page = () => (
  <Frame n="06 / 20">
    <div style={eyebrow}>Local file strategy</div>
    <h2 style={{ ...h2, marginTop: 28 }}>開發專案放本機，輸出整理放 Obsidian。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 70 }}>
      <Panel tone="teal" style={{ minHeight: 430 }}>
        <div style={{ fontSize: 40, fontWeight: 860 }}>C 槽 Codex 工作區</div>
        <p style={{ ...body, color: '#e8dfc8', marginTop: 24 }}>放 open-slide 專案、node_modules、Git repo，確保工具鏈能正常跑。</p>
        <div style={{ marginTop: 32, fontFamily: 'monospace', fontSize: 22 }}>C:\Users\scarc\Documents\Codex\open-slide-workspace</div>
      </Panel>
      <Panel style={{ minHeight: 430 }}>
        <div style={{ fontSize: 40, fontWeight: 860, color: colors.rose }}>T 槽 Obsidian</div>
        <p style={{ ...body, marginTop: 24 }}>放 PDF、網址、截圖、會議筆記、封存檔。不要放 node_modules 當開發根目錄。</p>
        <div style={{ marginTop: 32, fontFamily: 'monospace', fontSize: 22 }}>T:\●Obsidian\4.輸出工作區\簡報</div>
      </Panel>
    </div>
  </Frame>
);

const FolderStructure: Page = () => (
  <Frame n="07 / 20">
    <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 58, height: '100%', alignItems: 'center' }}>
      <div>
        <div style={eyebrow}>Folder structure</div>
        <h2 style={{ ...h2, marginTop: 30 }}>先規劃分類，才不會每份簡報長成一次性專案。</h2>
        <p style={{ ...body, marginTop: 34 }}>正式案、實驗案、母版、輸出封存，要從第一天就分開。</p>
      </div>
      <CodeBlock>{`open-slide-workspace
├── deck-template
├── decks
│   └── 2026-05-first-open-slide
├── experiments
├── assets
└── archive`}</CodeBlock>
    </div>
  </Frame>
);

const ProjectAnatomy: Page = () => (
  <Frame n="08 / 20">
    <div style={eyebrow}>open-slide project anatomy</div>
    <h2 style={{ ...h2, marginTop: 28 }}>每份簡報其實是一個小型前端專案。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 64 }}>
      {[
        ['slides/', '真正的投影片內容。每個 deck 是一個 index.tsx。'],
        ['themes/', '可重複使用的風格與版型素材。'],
        ['assets/', '圖片、logo、截圖、字體等素材。'],
        ['package.json', '記錄 npm scripts 與依賴。'],
        ['open-slide.config.ts', '語言、資料夾、port 等設定。'],
        ['.github/workflows', '自動 build 與部署設定。'],
      ].map(([head, copy], i) => (
        <Panel key={head} tone={i % 3 === 1 ? 'shell' : 'light'} style={{ minHeight: 210 }}>
          <div style={{ fontSize: 32, fontWeight: 860, color: i % 3 === 2 ? colors.rose : colors.teal }}>{head}</div>
          <p style={{ ...body, fontSize: 24, marginTop: 12 }}>{copy}</p>
        </Panel>
      ))}
    </div>
  </Frame>
);

const TemplateConcept: Page = () => (
  <Frame n="09 / 20">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 42, height: '100%', alignItems: 'center' }}>
      <div>
        <div style={eyebrow}>Template concept</div>
        <h2 style={{ ...h2, marginTop: 30 }}>母版不是設計稿，是可複製的工作起點。</h2>
        <p style={{ ...body, marginTop: 34 }}>它保留 scripts、workflow、常用頁型與 README。新簡報從母版複製，避免每次重新設定。</p>
      </div>
      <div style={{ display: 'grid', gap: 22 }}>
        <Step num="1" head="複製母版" copy="Copy-Item deck-template 到 decks/new-deck。" />
        <Step num="2" head="安裝依賴" copy="在新專案跑 npm.cmd install。" />
        <Step num="3" head="改內容" copy="讓 Codex 修改 slides/getting-started/index.tsx。" />
      </div>
    </div>
  </Frame>
);

const NewDeckFlow: Page = () => (
  <Frame n="10 / 20" dark>
    <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 58, height: '100%', alignItems: 'center' }}>
      <div>
        <div style={{ ...eyebrow, color: colors.gold }}>New deck flow</div>
        <h2 style={{ ...h2, color: colors.paper, marginTop: 30 }}>新簡報的固定開場指令。</h2>
        <p style={{ ...body, color: '#d8d2bd', marginTop: 34 }}>這些指令完成複製、安裝、啟動預覽。後面就交給 Codex 依需求改內容。</p>
      </div>
      <CodeBlock>{`Copy-Item -Recurse deck-template decks\\2026-06-topic
cd decks\\2026-06-topic
npm.cmd install
npm.cmd run dev`}</CodeBlock>
    </div>
  </Frame>
);

const Prompting: Page = () => (
  <Frame n="11 / 20">
    <div style={eyebrow}>Prompt as specification</div>
    <h2 style={{ ...h2, marginTop: 28 }}>給 Codex 的指令要像需求規格，而不是靈感句。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 68 }}>
      <Panel tone="rose" style={{ minHeight: 430 }}>
        <div style={{ fontSize: 38, fontWeight: 860 }}>不夠好</div>
        <p style={{ ...body, color: '#f4ead5', marginTop: 26 }}>幫我做一份簡報，漂亮一點，科技感，給資訊人員看。</p>
      </Panel>
      <Panel tone="teal" style={{ minHeight: 430 }}>
        <div style={{ fontSize: 38, fontWeight: 860 }}>比較好</div>
        <p style={{ ...body, color: '#e8dfc8', marginTop: 26 }}>20 頁、主題是 open-slide + GitHub 管理流程、受眾 IT、要包含建檔概念、未來管理、踩雷案例。</p>
      </Panel>
    </div>
  </Frame>
);

const EditLoop: Page = () => (
  <Frame n="12 / 20">
    <div style={eyebrow}>Edit loop</div>
    <h2 style={{ ...h2, marginTop: 28 }}>不是在網頁上直接改字，而是預覽後改原始碼。</h2>
    <div style={{ display: 'grid', gap: 22, marginTop: 58 }}>
      {[
        ['1. localhost 預覽', '看版面、頁數、文字層級與是否溢出。'],
        ['2. 用自然語言點名修改', '例如：第 7 頁縮短 GitHub 說明，改成三個步驟。'],
        ['3. Codex 修改 index.tsx', '把需求落到 React component 與樣式。'],
        ['4. build / push / deploy', '通過驗證後發布到 GitHub Pages。'],
      ].map(([head, copy]) => (
        <Panel key={head} style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 28, alignItems: 'center' }}>
          <div style={{ fontSize: 34, fontWeight: 860, color: colors.teal }}>{head}</div>
          <p style={{ ...body, fontSize: 25 }}>{copy}</p>
        </Panel>
      ))}
    </div>
  </Frame>
);

const GitHubRepo: Page = () => (
  <Frame n="13 / 20">
    <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 56, height: '100%', alignItems: 'center' }}>
      <div>
        <div style={eyebrow}>GitHub repo setup</div>
        <h2 style={{ ...h2, marginTop: 30 }}>GitHub repo 建立時要保持空白。</h2>
        <p style={{ ...body, marginTop: 34 }}>不要先勾 README、.gitignore、license。open-slide 專案已經有自己的檔案，避免第一次 push 發生衝突。</p>
      </div>
      <div style={{ display: 'grid', gap: 22 }}>
        <Step num="1" head="Create repository" copy="建立與資料夾同名的 repo。" />
        <Step num="2" head="No README" copy="不要讓 GitHub 先產生檔案。" />
        <Step num="3" head="Push existing repo" copy="remote add origin 後推 main 分支。" />
      </div>
    </div>
  </Frame>
);

const VersionFlow: Page = () => (
  <Frame n="14 / 20" dark>
    <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 58, alignItems: 'center', height: '100%' }}>
      <div>
        <div style={{ ...eyebrow, color: colors.gold }}>Version flow</div>
        <h2 style={{ ...h2, color: colors.paper, marginTop: 30 }}>Git 是簡報的版本時間軸。</h2>
        <p style={{ ...body, color: '#d8d2bd', marginTop: 34 }}>每次完成一輪內容或修正，就 commit。發布則透過 push 觸發。</p>
      </div>
      <CodeBlock>{`git status
git add .
git commit -m "Update deck content"
git push`}</CodeBlock>
    </div>
  </Frame>
);

const DeployChoices: Page = () => (
  <Frame n="15 / 20">
    <div style={eyebrow}>Deployment choices</div>
    <h2 style={{ ...h2, marginTop: 28 }}>發布平台要依資料敏感度選。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26, marginTop: 70 }}>
      {[
        ['GitHub Pages', 'Public repo 最簡單。適合教學、公開分享、demo。'],
        ['Vercel', '適合 private repo、快速 preview、專案型部署。'],
        ['Netlify', '適合靜態站、團隊部署、簡易域名管理。'],
      ].map(([head, copy], i) => (
        <Panel key={head} tone={i === 0 ? 'teal' : i === 1 ? 'rose' : 'light'} style={{ minHeight: 390 }}>
          <div style={{ fontSize: 40, fontWeight: 860 }}>{head}</div>
          <p style={{ ...body, color: i === 0 ? '#e8dfc8' : i === 1 ? '#f4ead5' : colors.muted, marginTop: 26 }}>{copy}</p>
        </Panel>
      ))}
    </div>
  </Frame>
);

const PitfallNode: Page = () => (
  <Frame n="16 / 20">
    <div style={{ display: 'grid', gridTemplateColumns: '0.94fr 1.06fr', gap: 56, height: '100%', alignItems: 'center' }}>
      <div>
        <div style={eyebrow}>Pitfall 1</div>
        <h2 style={{ ...h2, marginTop: 30 }}>Node 版本與 PowerShell npm 問題。</h2>
        <p style={{ ...body, marginTop: 34 }}>一開始 Node v18.15.0 會噴 EBADENGINE。升到 Node v24 後，PowerShell 擋 npm.ps1，所以改用 npm.cmd。</p>
      </div>
      <CodeBlock>{`node -v
v24.15.0

npm.cmd -v
11.12.1`}</CodeBlock>
    </div>
  </Frame>
);

const PitfallDrive: Page = () => (
  <Frame n="17 / 20">
    <div style={eyebrow}>Pitfall 2</div>
    <h2 style={{ ...h2, marginTop: 28 }}>T 槽 RaiDrive 不適合當 JS 開發根目錄。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 70 }}>
      <Panel tone="rose" style={{ minHeight: 430 }}>
        <div style={{ fontSize: 38, fontWeight: 860 }}>錯誤現象</div>
        <p style={{ ...body, color: '#f4ead5', marginTop: 26 }}>esbuild.exe EFTYPE、EPERM、Git dubious ownership。看起來像套件壞，其實是檔案系統特性不合。</p>
      </Panel>
      <Panel style={{ minHeight: 430 }}>
        <div style={{ fontSize: 38, fontWeight: 860, color: colors.teal }}>處理方式</div>
        <p style={{ ...body, marginTop: 26 }}>把開發專案移到 C 槽 Codex 工作區；T 槽只保留輸出、筆記、封存檔。</p>
      </Panel>
    </div>
  </Frame>
);

const PitfallAssets: Page = () => (
  <Frame n="18 / 20">
    <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 56, height: '100%', alignItems: 'center' }}>
      <div>
        <div style={eyebrow}>Pitfall 3</div>
        <h2 style={{ ...h2, marginTop: 30 }}>GitHub Pages 白畫面：asset path 少了 repo 名稱。</h2>
        <p style={{ ...body, marginTop: 34 }}>open-slide build 出來是 /assets/...，但 project site 應該是 /repo-name/assets/...。</p>
      </div>
      <CodeBlock>{`錯：
https://scarchi.github.io/assets/...

對：
https://scarchi.github.io/2026-05-first-open-slide/assets/...`}</CodeBlock>
    </div>
  </Frame>
);

const PitfallRoutes: Page = () => (
  <Frame n="19 / 20">
    <div style={eyebrow}>Pitfall 4</div>
    <h2 style={{ ...h2, marginTop: 28 }}>404 有兩種：伺服器 404 與前端路由 404。</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 70 }}>
      <Panel tone="rose" style={{ minHeight: 430 }}>
        <div style={{ fontSize: 38, fontWeight: 860 }}>伺服器 404</div>
        <p style={{ ...body, color: '#f4ead5', marginTop: 26 }}>GitHub Pages 找不到 /s/getting-started 的實體檔案。解法是產生 fallback index.html。</p>
      </Panel>
      <Panel tone="teal" style={{ minHeight: 430 }}>
        <div style={{ fontSize: 38, fontWeight: 860 }}>前端 404</div>
        <p style={{ ...body, color: '#e8dfc8', marginTop: 26 }}>React Router 以為 base 是 /，所以需要把 /s/... 重寫成 /repo-name/s/...。</p>
      </Panel>
    </div>
  </Frame>
);

const OperatingModel: Page = () => (
  <Frame n="20 / 20" dark>
    <div style={{ height: '100%', display: 'grid', alignItems: 'center' }}>
      <div>
        <div style={{ ...eyebrow, color: colors.gold }}>Recommended operating model</div>
        <h2 style={{ ...h1, color: colors.paper, marginTop: 34, maxWidth: 1330 }}>
          把簡報當作可部署、可版本管理、可重複生產的資訊交付物。
        </h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 56 }}>
          <Pill color={colors.gold}>本機開發</Pill>
          <Pill color={colors.gold}>母版開局</Pill>
          <Pill color={colors.gold}>Codex 迭代</Pill>
          <Pill color={colors.gold}>Git 版本</Pill>
          <Pill color={colors.gold}>自動部署</Pill>
          <Pill color={colors.gold}>Obsidian 整理</Pill>
        </div>
      </div>
    </div>
  </Frame>
);

export const meta: SlideMeta = {
  title: 'open-slide 結合 GitHub 的簡報生產線',
};

export default [
  Cover,
  Agenda,
  WhyChange,
  Roles,
  SystemMap,
  LocalWorkspace,
  FolderStructure,
  ProjectAnatomy,
  TemplateConcept,
  NewDeckFlow,
  Prompting,
  EditLoop,
  GitHubRepo,
  VersionFlow,
  DeployChoices,
  PitfallNode,
  PitfallDrive,
  PitfallAssets,
  PitfallRoutes,
  OperatingModel,
] satisfies Page[];
