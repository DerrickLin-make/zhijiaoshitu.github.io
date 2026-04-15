'use client';

import type { ReactNode } from 'react';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import { useMemo, useState } from 'react';

type MaterialCategory = 'all' | 'poetry' | 'modern' | 'prose';

type Material = {
  id: number;
  title: string;
  author: string;
  category: Exclude<MaterialCategory, 'all'>;
  excerpt: string;
  guidance: string;
  level: string;
};

const palette = {
  paper: '#FDFBF7',
  paperSoft: '#FAF7F1',
  card: '#FFFDF9',
  line: '#E8DED2',
  text: '#4A4036',
  textSoft: '#7B6F62',
  tea: '#B79D7D',
  teaDeep: '#8E7356',
  celadon: '#A9B8A5',
  celadonDeep: '#6F8671',
  porcelain: '#AFC0C8',
  shadow: '0 18px 50px rgba(110, 88, 62, 0.08)',
};

const serif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const sans = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const materials: Material[] = [
  {
    id: 1,
    title: '静夜思',
    author: '李白',
    category: 'poetry',
    excerpt: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
    guidance: '适合训练轻声起句与尾音收束，重点感受“举头”与“低头”的动作对照。',
    level: '入门',
  },
  {
    id: 2,
    title: '早发白帝城',
    author: '李白',
    category: 'poetry',
    excerpt: '朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。',
    guidance: '适合练习明快节奏与开阔气息，尤其适合教师示范“速度感”的表达。',
    level: '进阶',
  },
  {
    id: 3,
    title: '雨巷',
    author: '戴望舒',
    category: 'modern',
    excerpt: '撑着油纸伞，独自彷徨在悠长、悠长又寂寥的雨巷。',
    guidance: '适合训练现代诗的呼吸层次与情绪绵延感，建议以偏慢语速进入。',
    level: '进阶',
  },
  {
    id: 4,
    title: '匆匆',
    author: '朱自清',
    category: 'prose',
    excerpt: '燕子去了，有再来的时候；杨柳枯了，有再青的时候。',
    guidance: '适合课堂朗读示范，训练散文中的节奏组织与情感递进。',
    level: '课堂适用',
  },
];

const categories: { key: MaterialCategory; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'poetry', label: '古诗词' },
  { key: 'modern', label: '现代诗' },
  { key: 'prose', label: '散文' },
];

const analysisScores = [
  { label: '吐字清晰', value: 91, note: '字头清楚，收音温润' },
  { label: '节奏层次', value: 86, note: '停连自然，段落感稳定' },
  { label: '语调变化', value: 82, note: '抒情句仍可更有起伏' },
  { label: '情感投入', value: 89, note: '整体表达克制而有分寸' },
];

const mapPoints = [
  { city: '宣城', poem: '独坐敬亭山', x: '62%', y: '38%' },
  { city: '九江', poem: '望庐山瀑布', x: '67%', y: '48%' },
  { city: '武汉', poem: '黄鹤楼送孟浩然之广陵', x: '60%', y: '53%' },
  { city: '奉节', poem: '早发白帝城', x: '47%', y: '55%' },
];

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function SectionTitle(props: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs tracking-[0.32em] text-[#8E7356]">{props.eyebrow}</p>
      <h2 className={`${serif.className} text-3xl leading-tight text-[#4A4036] md:text-5xl`}>
        {props.title}
      </h2>
      <p className="mt-5 text-sm leading-8 text-[#7B6F62] md:text-base">{props.description}</p>
    </div>
  );
}

function NavLink(props: { children: ReactNode }) {
  return (
    <a
      href="#"
      className="text-sm text-[#6F6256] transition hover:text-[#8E7356]"
    >
      {props.children}
    </a>
  );
}

export default function PoetryPlatformRedesign() {
  const [category, setCategory] = useState<MaterialCategory>('all');

  const filteredMaterials = useMemo(() => {
    if (category === 'all') return materials;
    return materials.filter((item) => item.category === category);
  }, [category]);

  return (
    <main
      className={`${sans.className} min-h-screen bg-[#FDFBF7] text-[#4A4036]`}
      style={{
        backgroundImage:
          'radial-gradient(circle at top left, rgba(183,157,125,0.12), transparent 28%), radial-gradient(circle at 85% 10%, rgba(169,184,165,0.16), transparent 22%), linear-gradient(180deg, #FDFBF7 0%, #FAF7F1 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="sticky top-0 z-30 border-b border-[#E8DED2]/80 bg-[#FDFBF7]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
            <div>
              <p className={`${serif.className} text-2xl tracking-[0.18em] text-[#4A4036]`}>智教诗途</p>
              <p className="mt-1 text-[11px] tracking-[0.28em] text-[#A28D77]">POETRY STUDIO</p>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <NavLink>资料库</NavLink>
              <NavLink>智能助手</NavLink>
              <NavLink>朗读分析</NavLink>
              <NavLink>文化地图</NavLink>
            </nav>
            <button className="rounded-full border border-[#D7C7B7] bg-white/70 px-5 py-2 text-sm text-[#6F6256] shadow-[0_8px_24px_rgba(110,88,62,0.06)] transition hover:border-[#B79D7D] hover:text-[#8E7356]">
              进入书房
            </button>
          </div>
        </header>

        <section className="grid gap-10 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xs tracking-[0.36em] text-[#8E7356]">HIGH AESTHETICS · AI ASSISTED</p>
            <h1 className={`${serif.className} text-5xl leading-[1.15] text-[#4A4036] md:text-7xl`}>
              在温润书卷气里，
              <br />
              重新学习朗读。
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-9 text-[#6F6256] md:text-lg">
              为教师与审美型学习者打造的诗词朗读平台。这里不强调冰冷的技术界面，而是将 AI
              辅导、文本解析与声音评测，安放进一个像午后书房般松弛、安静、可沉浸的阅读空间。
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-[#8E7356] px-7 py-3 text-sm tracking-[0.18em] text-[#FFFDF9] shadow-[0_14px_32px_rgba(142,115,86,0.18)] transition hover:bg-[#7E654B]">
                浏览朗读材料
              </button>
              <button className="rounded-full border border-[#D9CCBE] bg-white/70 px-7 py-3 text-sm tracking-[0.18em] text-[#6F6256] transition hover:border-[#A9B8A5] hover:bg-[#F9F5EE]">
                体验 AI 辅导
              </button>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ['课堂适配', '面向教师备课与示范朗读'],
                ['审美导向', '强调留白、节奏与文本气质'],
                ['温和智能', 'AI 反馈克制呈现，不喧宾夺主'],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#EEE4D8] bg-white/72 p-4 shadow-[0_12px_32px_rgba(110,88,62,0.05)]"
                >
                  <p className={`${serif.className} text-xl text-[#4A4036]`}>{title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#7B6F62]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute inset-8 rounded-[32px] opacity-70 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(183,157,125,0.22) 0%, rgba(169,184,165,0.10) 48%, transparent 75%)',
              }}
            />
            <div
              className="relative overflow-hidden rounded-[32px] border border-[#EADFD2] bg-[#FFFDF9]/90 p-6 md:p-8"
              style={{ boxShadow: palette.shadow }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs tracking-[0.28em] text-[#A28D77]">朗读概览</p>
                  <h3 className={`${serif.className} mt-3 text-3xl text-[#4A4036]`}>一页之内，看见文本、声音与情绪。</h3>
                </div>
                <span className="rounded-full bg-[#EEF3EC] px-3 py-1 text-xs text-[#6F8671]">柔和 AI 提示</span>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-[#FAF7F1] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#8E7356]">本周课堂建议</p>
                      <p className={`${serif.className} mt-2 text-2xl text-[#4A4036]`}>《黄鹤楼送孟浩然之广陵》</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-[0_8px_18px_rgba(110,88,62,0.06)]">
                      <p className="text-xs text-[#A28D77]">适配学段</p>
                      <p className="mt-1 text-sm text-[#4A4036]">初中 / 高中</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-8 text-[#6F6256]">
                    故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-2xl border border-[#ECE2D7] bg-white p-5">
                    <p className="text-xs tracking-[0.22em] text-[#A28D77]">AI 朗读提示</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6F6256]">
                      <li>起句宜明净，不宜过重。</li>
                      <li>“孤帆远影”需留出目送感。</li>
                      <li>尾句放松延长，收在江水余韵里。</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#E7DFD5] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(250,247,241,0.9))] p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs tracking-[0.22em] text-[#A28D77]">本次练习反馈</p>
                      <span className="rounded-full bg-[#F1F5F1] px-3 py-1 text-xs text-[#6F8671] shadow-[0_0_18px_rgba(169,184,165,0.18)]">
                        AI 已生成
                      </span>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className={`${serif.className} text-5xl text-[#8E7356]`}>89</p>
                        <p className="mt-1 text-sm text-[#7B6F62]">整体完成度平稳、清朗</p>
                      </div>
                      <div className="h-16 w-28 rounded-[20px] bg-[radial-gradient(circle_at_50%_50%,rgba(175,192,200,0.24),rgba(255,255,255,0.1),transparent_72%)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E8DED2] py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <SectionTitle
                eyebrow="PLATFORM ARCHITECTURE"
                title="让教师与学习者自然地走完一条朗读路径"
                description="界面不再强调工具感，而是像一间布置得体的书房，陪伴用户从选材、理解、练习到反馈，循序渐进地进入文本。"
              />
            </div>
            <div className="grid gap-5 md:col-span-2 md:grid-cols-3">
              {[
                {
                  title: '选材书架',
                  desc: '以主题、体裁、课堂适配度组织文本，帮助教师快速备课，也帮助学习者找到适合自己的作品。',
                  tone: 'bg-[#FFFDF9]',
                },
                {
                  title: '太白辅导',
                  desc: 'AI 不作为抢眼的主角，而像一位温和的助教，在恰当时刻给出解释、朗读建议与课堂启发。',
                  tone: 'bg-[#F7FAF6]',
                },
                {
                  title: '练习评测',
                  desc: '评分与纠错以温和层级呈现，强调启发式反馈，而非压迫感强的“机器判定”。',
                  tone: 'bg-[#FAF7F1]',
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className={cx(
                    'rounded-[28px] border border-[#EADFD2] p-6 shadow-[0_10px_30px_rgba(110,88,62,0.05)]',
                    item.tone,
                  )}
                >
                  <p className="text-xs tracking-[0.28em] text-[#A28D77]">0{item.title.length % 3 || 3}</p>
                  <h3 className={`${serif.className} mt-4 text-2xl text-[#4A4036]`}>{item.title}</h3>
                  <p className="mt-4 text-sm leading-8 text-[#6F6256]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#E8DED2] py-16 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              eyebrow="CURATED MATERIALS"
              title="臻选序列库"
              description="保留古典诗词的静气，也补足现代诗和散文的教学场景。让选材本身就成为审美训练的一部分。"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setCategory(item.key)}
                  className={cx(
                    'rounded-full px-4 py-2 text-sm transition',
                    category === item.key
                      ? 'bg-[#8E7356] text-[#FFFDF9] shadow-[0_12px_24px_rgba(142,115,86,0.14)]'
                      : 'border border-[#DED2C5] bg-white/75 text-[#6F6256] hover:border-[#B79D7D] hover:text-[#8E7356]',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredMaterials.map((item) => (
              <article
                key={item.id}
                className="rounded-[26px] border border-[#E9DED3] bg-white/80 p-6 shadow-[0_12px_32px_rgba(110,88,62,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(110,88,62,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#F5EFE6] px-3 py-1 text-xs text-[#8E7356]">{item.level}</span>
                  <span className="text-xs tracking-[0.22em] text-[#A89A8A]">{item.author}</span>
                </div>
              <h3 className={`${serif.className} mt-5 text-3xl text-[#4A4036]`}>{item.title}</h3>
                <p className="mt-4 text-sm leading-8 text-[#6F6256]">{item.excerpt}</p>
                <div className="mt-6 rounded-2xl bg-[#FAF7F1] p-4">
                  <p className="text-xs tracking-[0.24em] text-[#A28D77]">朗读要点</p>
                  <p className="mt-3 text-sm leading-7 text-[#7B6F62]">{item.guidance}</p>
                </div>
                <button className="mt-6 text-sm text-[#8E7356] transition hover:text-[#6F8671]">
                  进入练习页 →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-[#E8DED2] py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[30px] border border-[#E9DED3] bg-[#FFFDF9]/86 p-7 shadow-[0_14px_40px_rgba(110,88,62,0.06)] md:p-9">
              <p className="text-xs tracking-[0.32em] text-[#8E7356]">TAIBAI ASSISTANT</p>
              <h3 className={`${serif.className} mt-4 text-4xl leading-tight text-[#4A4036]`}>
                像一位懂文学、懂课堂、也懂表达的安静助教。
              </h3>
              <p className="mt-5 text-sm leading-8 text-[#6F6256] md:text-base">
                它能帮助教师组织课堂启发问题，也能帮助学习者理解文本、感受语气与节奏。AI
                的存在被淡化成一种温和陪伴，而非主导性的“技术展示”。
              </p>

              <div className="mt-8 space-y-4">
                {[
                  '推荐适合当前学段与课堂气氛的作品',
                  '给出朗读停连、语调与情感推进建议',
                  '生成可用于课堂导入的赏析问题',
                  '将评测结果转化成可执行的练习计划',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-[#F8F3EC] px-4 py-4 text-sm text-[#6F6256]"
                  >
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#A9B8A5] shadow-[0_0_14px_rgba(169,184,165,0.35)]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#E8DED2] bg-white/84 p-5 shadow-[0_14px_40px_rgba(110,88,62,0.06)] md:p-7">
              <div className="flex items-center justify-between border-b border-[#EFE4D8] pb-4">
                <div>
                  <p className={`${serif.className} text-2xl text-[#4A4036]`}>太白智能体</p>
                  <p className="mt-1 text-sm text-[#8E7356]">课堂问答 · 朗读指导 · 文本赏析</p>
                </div>
                <span className="rounded-full bg-[#EEF3EC] px-3 py-1 text-xs text-[#6F8671]">在线</span>
              </div>

              <div className="space-y-4 py-6">
                <div className="max-w-[82%] rounded-[22px] rounded-bl-md bg-[#F7F1E9] px-5 py-4 text-sm leading-8 text-[#5F5245]">
                  我下周要给八年级上一节送别诗朗读课，想从《黄鹤楼送孟浩然之广陵》切入，怎样让学生先进入情境？
                </div>
                <div className="ml-auto max-w-[88%] rounded-[22px] rounded-br-md border border-[#E7DDD2] bg-[#FFFEFC] px-5 py-4 text-sm leading-8 text-[#6A5C4E] shadow-[0_10px_24px_rgba(110,88,62,0.04)]">
                  可以先不急着解释诗句，而从“看着朋友渐渐远去”这个经验出发。让学生先闭眼听江水、风声与船影，再进入“孤帆远影碧空尽”的视觉想象。若你愿意，我还可以继续为你生成一个 5 分钟课堂导入流程。
                </div>
              </div>

              <div className="rounded-[24px] border border-[#E8DED2] bg-[#FCFAF6] p-4">
                <div className="flex items-center gap-3">
                  <input
                    readOnly
                    value="输入你的教学问题或朗读困惑..."
                    className="w-full bg-transparent text-sm text-[#A09181] outline-none"
                  />
                  <button className="rounded-full bg-[#A9B8A5] px-5 py-2 text-sm text-white shadow-[0_0_18px_rgba(169,184,165,0.25)]">
                    发送
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E8DED2] py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionTitle
                eyebrow="GENTLE ANALYTICS"
                title="朗读评测，以温和的方式呈现专业反馈"
                description="评价不再像冰冷打分，而是像一份整理有序的课堂观察记录。AI 的存在通过柔和光晕、淡雅色阶与结构化信息被悄然暗示。"
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {analysisScores.map((score) => (
                  <div
                    key={score.label}
                    className="rounded-[24px] border border-[#E8DDD1] bg-white/82 p-5 shadow-[0_12px_28px_rgba(110,88,62,0.05)]"
                  >
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-[#8E7356]">{score.label}</p>
                        <p className={`${serif.className} mt-2 text-4xl text-[#4A4036]`}>{score.value}</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-[radial-gradient(circle,rgba(169,184,165,0.32),rgba(169,184,165,0.1),transparent_72%)]" />
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-[#F1E8DE]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#A9B8A5] to-[#BFD0C6] shadow-[0_0_12px_rgba(169,184,165,0.22)]"
                        style={{ width: `${score.value}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-[#7B6F62]">{score.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#E9DED3] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,241,233,0.85))] p-7 shadow-[0_16px_42px_rgba(110,88,62,0.06)]">
              <p className="text-xs tracking-[0.32em] text-[#8E7356]">FEEDBACK SHEET</p>
              <h3 className={`${serif.className} mt-4 text-3xl text-[#4A4036]`}>《再别康桥》练习记录</h3>
              <div className="mt-6 rounded-[24px] bg-white/78 p-5">
                <p className="text-sm leading-8 text-[#6F6256]">
                  你的整体声音状态稳定，轻柔句表现自然，适合抒情性文本。后半段个别长句略显平，建议在“悄悄是别离的笙箫”处加强语调起伏。
                </p>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  ['建议一', '在关键词“轻轻”“悄悄”处保留更明显的气息差异。'],
                  ['建议二', '长句之间略作停顿，让画面感和呼吸感被听见。'],
                  ['建议三', '收尾时不要急于下落，可延长尾音，保留余韵。'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-4 rounded-2xl bg-[#FCF8F2] p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF3EC] text-xs text-[#6F8671]">
                      {title.slice(-1)}
                    </div>
                    <div>
                      <p className="text-sm text-[#8E7356]">{title}</p>
                      <p className="mt-1 text-sm leading-7 text-[#6F6256]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E8DED2] py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <SectionTitle
                eyebrow="CULTURAL ATLAS"
                title="文化地图册"
                description="将诗词学习从书页延展到地理脉络之中。不是浓烈炫技的地图可视化，而是像一张雅致的案头文脉图。"
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['34', '覆盖省份'],
                  ['2800+', '诗词源流'],
                  ['14', '重点朝代'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[24px] border border-[#E9DED3] bg-white/80 p-5 text-center shadow-[0_10px_24px_rgba(110,88,62,0.04)]"
                  >
                    <p className={`${serif.className} text-4xl text-[#8E7356]`}>{value}</p>
                    <p className="mt-2 text-sm text-[#7B6F62]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#E8DED2] bg-[#FFFDF9]/86 p-5 shadow-[0_14px_38px_rgba(110,88,62,0.06)] md:p-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[#EEE4D9] bg-[linear-gradient(180deg,#FAF7F1_0%,#F6F0E7_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(175,192,200,0.12),transparent_28%),radial-gradient(circle_at_70%_30%,rgba(169,184,165,0.18),transparent_24%),linear-gradient(180deg,transparent,rgba(183,157,125,0.06))]" />
                <div className="absolute inset-[10%] rounded-[40%_48%_45%_42%] border border-[#D9CEC0] opacity-70" />
                <div className="absolute inset-x-[18%] inset-y-[18%] rounded-[44%_38%_42%_36%] border border-[#E2D7CA] opacity-80" />

                {mapPoints.map((point) => (
                  <div
                    key={point.city}
                    className="absolute"
                    style={{ left: point.x, top: point.y }}
                  >
                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                      <div className="absolute inset-0 rounded-full bg-[#A9B8A5]/30 blur-md" />
                      <div className="relative h-3.5 w-3.5 rounded-full border border-white bg-[#8E7356]" />
                      <div className="mt-2 min-w-28 rounded-2xl bg-white/90 px-3 py-2 text-xs leading-5 text-[#6F6256] shadow-[0_10px_20px_rgba(110,88,62,0.05)]">
                        <p className="text-[#8E7356]">{point.city}</p>
                        <p>{point.poem}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="rounded-[36px] border border-[#E8DDD1] bg-[linear-gradient(180deg,rgba(255,253,249,0.94),rgba(248,242,233,0.9))] px-6 py-10 text-center shadow-[0_18px_46px_rgba(110,88,62,0.06)] md:px-10">
            <p className="text-xs tracking-[0.34em] text-[#8E7356]">A QUIET PLACE FOR READING</p>
            <h2 className={`${serif.className} mt-5 text-4xl leading-tight text-[#4A4036] md:text-6xl`}>
              让技术藏在温度之后，
              <br />
              让朗读回到人的感受之中。
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-[#6F6256] md:text-base">
              整体界面以暖白纸感、低饱和自然色与舒展留白建立氛围，既适合教师长期使用，也能让学习者在反复练习中始终保持放松、沉浸与审美愉悦。
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-full bg-[#8E7356] px-7 py-3 text-sm tracking-[0.18em] text-[#FFFDF9] shadow-[0_14px_32px_rgba(142,115,86,0.18)] transition hover:bg-[#7E654B]">
                作为首页方案使用
              </button>
              <button className="rounded-full border border-[#D7C7B7] bg-white/80 px-7 py-3 text-sm tracking-[0.18em] text-[#6F6256] transition hover:border-[#A9B8A5] hover:text-[#6F8671]">
                继续拆分子页面
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
