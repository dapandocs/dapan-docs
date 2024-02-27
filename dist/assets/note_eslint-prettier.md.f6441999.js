import{_ as r,a as c}from"./chunks/CopyRight.vue_vue_type_script_setup_true_lang.67549825.js";import{_ as t,C as i,o as E,c as y,H as s,w as a,Q as l}from"./chunks/framework.27021b64.js";import{_ as u}from"./chunks/index.e5e15ed4.js";import"./chunks/CloseOutlined.9c3246b4.js";import"./chunks/isObjectLike.46b91259.js";import"./chunks/Serializer.fad5b415.js";import"./chunks/LeftOutlined.9040821c.js";import"./chunks/EyeOutlined.53cc40ff.js";const w=JSON.parse('{"title":"eslint 与 prettier 解决了哪些问题?","description":"","frontmatter":{},"headers":[],"relativePath":"note/eslint-prettier.md","filePath":"note/eslint-prettier.md","lastUpdated":1692355437000}'),b={name:"note/eslint-prettier.md"},d=l(`<h1 id="eslint-与-prettier-解决了哪些问题" tabindex="-1">eslint 与 prettier 解决了哪些问题? <a class="header-anchor" href="#eslint-与-prettier-解决了哪些问题" aria-label="Permalink to &quot;eslint 与 prettier 解决了哪些问题?&quot;">​</a></h1><h2 id="分析作用" tabindex="-1">分析作用 <a class="header-anchor" href="#分析作用" aria-label="Permalink to &quot;分析作用&quot;">​</a></h2><h3 id="eslint" tabindex="-1">eslint <a class="header-anchor" href="#eslint" aria-label="Permalink to &quot;eslint&quot;">​</a></h3><p>主要功能是检查代码是否符合规范，如果不符合规范，会给出提示，但是不会自动修复。</p><h3 id="prettier" tabindex="-1">prettier <a class="header-anchor" href="#prettier" aria-label="Permalink to &quot;prettier&quot;">​</a></h3><p>主要功能是格式化代码，如果代码不符合规范，可以自动修复。</p><h2 id="npm-包-vs-vscode-插件" tabindex="-1">npm 包 vs vscode 插件 <a class="header-anchor" href="#npm-包-vs-vscode-插件" aria-label="Permalink to &quot;npm 包 vs vscode 插件&quot;">​</a></h2><h3 id="npm-包" tabindex="-1">npm 包 <a class="header-anchor" href="#npm-包" aria-label="Permalink to &quot;npm 包&quot;">​</a></h3><ul><li><p>优点：可以在命令行中使用</p></li><li><p>缺点：不直观，不能在实时编辑器中看到效果</p></li></ul><h3 id="vscode-插件" tabindex="-1">vscode 插件 <a class="header-anchor" href="#vscode-插件" aria-label="Permalink to &quot;vscode 插件&quot;">​</a></h3><ul><li><p>优点：直观，可以在实时编辑器中看到效果</p></li><li><p>缺点：不能在命令行中使用</p></li></ul><h2 id="无框架项目" tabindex="-1">无框架项目 <a class="header-anchor" href="#无框架项目" aria-label="Permalink to &quot;无框架项目&quot;">​</a></h2><h3 id="_1、初始化项目" tabindex="-1">1、初始化项目 <a class="header-anchor" href="#_1、初始化项目" aria-label="Permalink to &quot;1、初始化项目&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 初始化项目,使用默认配置</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 初始化项目,使用默认配置</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2、安装依赖" tabindex="-1">2、安装依赖 <a class="header-anchor" href="#_2、安装依赖" aria-label="Permalink to &quot;2、安装依赖&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 安装 eslint 依赖</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">eslint</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 安装 prettier 依赖</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prettier</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 安装 eslint 依赖</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">eslint</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 安装 prettier 依赖</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prettier</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_3、根目录下创建-index-js" tabindex="-1">3、根目录下创建 index.js <a class="header-anchor" href="#_3、根目录下创建-index-js" aria-label="Permalink to &quot;3、根目录下创建 index.js&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">b</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;2&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(a, b)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">b</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;2&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(a, b)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_4、根目录下创建-eslintrc-js" tabindex="-1">4、根目录下创建 .eslintrc.js <a class="header-anchor" href="#_4、根目录下创建-eslintrc-js" aria-label="Permalink to &quot;4、根目录下创建 .eslintrc.js&quot;">​</a></h3><ul><li>可以手动创建，也可以使用命令行创建</li></ul><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 使用命令行创建</span></span>
<span class="line"><span style="color:#B392F0;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">eslint</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--init</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 选择配置</span></span>
<span class="line"><span style="color:#6A737D;"># You can also run this command directly using &#39;npm init @eslint/config&#39;.</span></span>
<span class="line"><span style="color:#6A737D;"># ? How would you like to use ESLint? ...</span></span>
<span class="line"><span style="color:#6A737D;">#  To check syntax only -- 这个选项只关注代码的语法是否正确</span></span>
<span class="line"><span style="color:#6A737D;"># &gt; To check syntax and find problems -- 这个选项不仅检查语法，还会寻找可能的代码问题，例如未使用的变量、未定义的函数等。</span></span>
<span class="line"><span style="color:#6A737D;">#  To check syntax, find problems, and enforce code style -- 这个选项包括了前两个选项的所有功能，并添加了代码风格的强制执行。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ? What type of modules does your project use? ...</span></span>
<span class="line"><span style="color:#6A737D;"># &gt; JavaScript modules (import/export)</span></span>
<span class="line"><span style="color:#6A737D;">#  CommonJS (require/exports)</span></span>
<span class="line"><span style="color:#6A737D;">#  None of these</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ? Which framework does your project use? ...</span></span>
<span class="line"><span style="color:#6A737D;">#   React</span></span>
<span class="line"><span style="color:#6A737D;">#   Vue.js</span></span>
<span class="line"><span style="color:#6A737D;"># &gt; None of these</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Does your project use TypeScript? » No / Yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ? Where does your code run? ...  (Press &lt;space&gt; to select, &lt;a&gt; to toggle all, &lt;i&gt; to invert selection)</span></span>
<span class="line"><span style="color:#6A737D;"># √ Browser</span></span>
<span class="line"><span style="color:#6A737D;"># √ Node</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ? What format do you want your config file to be in? ...</span></span>
<span class="line"><span style="color:#6A737D;"># &gt; JavaScript</span></span>
<span class="line"><span style="color:#6A737D;">#   YAML</span></span>
<span class="line"><span style="color:#6A737D;">#   JSON</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 使用命令行创建</span></span>
<span class="line"><span style="color:#6F42C1;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">eslint</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--init</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 选择配置</span></span>
<span class="line"><span style="color:#6A737D;"># You can also run this command directly using &#39;npm init @eslint/config&#39;.</span></span>
<span class="line"><span style="color:#6A737D;"># ? How would you like to use ESLint? ...</span></span>
<span class="line"><span style="color:#6A737D;">#  To check syntax only -- 这个选项只关注代码的语法是否正确</span></span>
<span class="line"><span style="color:#6A737D;"># &gt; To check syntax and find problems -- 这个选项不仅检查语法，还会寻找可能的代码问题，例如未使用的变量、未定义的函数等。</span></span>
<span class="line"><span style="color:#6A737D;">#  To check syntax, find problems, and enforce code style -- 这个选项包括了前两个选项的所有功能，并添加了代码风格的强制执行。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ? What type of modules does your project use? ...</span></span>
<span class="line"><span style="color:#6A737D;"># &gt; JavaScript modules (import/export)</span></span>
<span class="line"><span style="color:#6A737D;">#  CommonJS (require/exports)</span></span>
<span class="line"><span style="color:#6A737D;">#  None of these</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ? Which framework does your project use? ...</span></span>
<span class="line"><span style="color:#6A737D;">#   React</span></span>
<span class="line"><span style="color:#6A737D;">#   Vue.js</span></span>
<span class="line"><span style="color:#6A737D;"># &gt; None of these</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Does your project use TypeScript? » No / Yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ? Where does your code run? ...  (Press &lt;space&gt; to select, &lt;a&gt; to toggle all, &lt;i&gt; to invert selection)</span></span>
<span class="line"><span style="color:#6A737D;"># √ Browser</span></span>
<span class="line"><span style="color:#6A737D;"># √ Node</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ? What format do you want your config file to be in? ...</span></span>
<span class="line"><span style="color:#6A737D;"># &gt; JavaScript</span></span>
<span class="line"><span style="color:#6A737D;">#   YAML</span></span>
<span class="line"><span style="color:#6A737D;">#   JSON</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>上述步骤完成后，会在根目录下生成 .eslintrc.js 文件，内容如下：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// \`env\` 定义了你的代码运行的环境，告诉 ESLint 全局变量是否应该可用</span></span>
<span class="line"><span style="color:#E1E4E8;">  env: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    browser: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 这表示代码将在浏览器环境中运行</span></span>
<span class="line"><span style="color:#E1E4E8;">    es2021: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 这允许使用 ES2021 版本的 ECMAScript 功能</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// \`extends\` 用于继承一组预定义的规则集</span></span>
<span class="line"><span style="color:#E1E4E8;">  extends: </span><span style="color:#9ECBFF;">&quot;eslint:recommended&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 这表示使用 ESLint 推荐的规则集</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// \`overrides\` 允许你为特定文件或文件模式定义特殊的配置</span></span>
<span class="line"><span style="color:#E1E4E8;">  overrides: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      env: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        node: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 这表示这些文件将在 Node.js 环境中运行</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      files: [</span><span style="color:#9ECBFF;">&quot;.eslintrc.{js,cjs}&quot;</span><span style="color:#E1E4E8;">], </span><span style="color:#6A737D;">// 这定义了这个特殊配置适用的文件模式</span></span>
<span class="line"><span style="color:#E1E4E8;">      parserOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        sourceType: </span><span style="color:#9ECBFF;">&quot;script&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 这表示这些文件应被视为脚本而不是 ES6 模块</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// \`parserOptions\` 用于设置解析器选项，告诉 ESLint 如何解析代码</span></span>
<span class="line"><span style="color:#E1E4E8;">  parserOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ecmaVersion: </span><span style="color:#9ECBFF;">&quot;latest&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 这允许使用最新的 ECMAScript 版本</span></span>
<span class="line"><span style="color:#E1E4E8;">    sourceType: </span><span style="color:#9ECBFF;">&quot;module&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 这表示你的代码使用了 ES6 模块</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// \`rules\` 定义了项目特定的规则，你可以在这里启用、禁用或配置 ESLint 规则</span></span>
<span class="line"><span style="color:#E1E4E8;">  rules: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 这里为空，表示没有自定义规则</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// \`env\` 定义了你的代码运行的环境，告诉 ESLint 全局变量是否应该可用</span></span>
<span class="line"><span style="color:#24292E;">  env: {</span></span>
<span class="line"><span style="color:#24292E;">    browser: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 这表示代码将在浏览器环境中运行</span></span>
<span class="line"><span style="color:#24292E;">    es2021: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 这允许使用 ES2021 版本的 ECMAScript 功能</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// \`extends\` 用于继承一组预定义的规则集</span></span>
<span class="line"><span style="color:#24292E;">  extends: </span><span style="color:#032F62;">&quot;eslint:recommended&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 这表示使用 ESLint 推荐的规则集</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// \`overrides\` 允许你为特定文件或文件模式定义特殊的配置</span></span>
<span class="line"><span style="color:#24292E;">  overrides: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      env: {</span></span>
<span class="line"><span style="color:#24292E;">        node: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 这表示这些文件将在 Node.js 环境中运行</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      files: [</span><span style="color:#032F62;">&quot;.eslintrc.{js,cjs}&quot;</span><span style="color:#24292E;">], </span><span style="color:#6A737D;">// 这定义了这个特殊配置适用的文件模式</span></span>
<span class="line"><span style="color:#24292E;">      parserOptions: {</span></span>
<span class="line"><span style="color:#24292E;">        sourceType: </span><span style="color:#032F62;">&quot;script&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 这表示这些文件应被视为脚本而不是 ES6 模块</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// \`parserOptions\` 用于设置解析器选项，告诉 ESLint 如何解析代码</span></span>
<span class="line"><span style="color:#24292E;">  parserOptions: {</span></span>
<span class="line"><span style="color:#24292E;">    ecmaVersion: </span><span style="color:#032F62;">&quot;latest&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 这允许使用最新的 ECMAScript 版本</span></span>
<span class="line"><span style="color:#24292E;">    sourceType: </span><span style="color:#032F62;">&quot;module&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 这表示你的代码使用了 ES6 模块</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// \`rules\` 定义了项目特定的规则，你可以在这里启用、禁用或配置 ESLint 规则</span></span>
<span class="line"><span style="color:#24292E;">  rules: {},</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 这里为空，表示没有自定义规则</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>执行 <code>npx eslint index.js</code> 命令，如果发现有报错，增加 root: true，如下：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark has-focused-lines has-highlighted-lines vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line has-focus highlighted"><span style="color:#E1E4E8;">  root: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  env: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    browser: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    es2021: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  extends: </span><span style="color:#9ECBFF;">&quot;eslint:recommended&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  overrides: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      env: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        node: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      files: [</span><span style="color:#9ECBFF;">&quot;.eslintrc.{js,cjs}&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">      parserOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        sourceType: </span><span style="color:#9ECBFF;">&quot;script&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  parserOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ecmaVersion: </span><span style="color:#9ECBFF;">&quot;latest&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    sourceType: </span><span style="color:#9ECBFF;">&quot;module&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  rules: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light has-focused-lines has-highlighted-lines vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line has-focus highlighted"><span style="color:#24292E;">  root: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">  env: {</span></span>
<span class="line"><span style="color:#24292E;">    browser: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    es2021: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  extends: </span><span style="color:#032F62;">&quot;eslint:recommended&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  overrides: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      env: {</span></span>
<span class="line"><span style="color:#24292E;">        node: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      files: [</span><span style="color:#032F62;">&quot;.eslintrc.{js,cjs}&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">      parserOptions: {</span></span>
<span class="line"><span style="color:#24292E;">        sourceType: </span><span style="color:#032F62;">&quot;script&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  parserOptions: {</span></span>
<span class="line"><span style="color:#24292E;">    ecmaVersion: </span><span style="color:#032F62;">&quot;latest&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    sourceType: </span><span style="color:#032F62;">&quot;module&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  rules: {},</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><ul><li><p>root: true 表示什么？</p><p>标志项目的根目录: root: true 告诉 ESLint 这个配置文件是你项目的根配置文件。</p></li><li><p>有什么作用？</p><p><strong>停止向上查找</strong>: 当 ESLint 在解析代码时，它会从代码文件的目录开始，向上查找所有的 .eslintrc.* 配置文件，直到找到一个包含 root: true 的文件为止。</p><p><strong>避免冲突</strong>: 如果你的项目嵌套在另一个使用 ESLint 的项目中，或者你的系统中有全局的 ESLint 配置，root: true 可以确保 ESLint 只使用你项目的配置，不会与外部配置混合。</p></li></ul><h3 id="_5、-eslintrc-js-配置-rules" tabindex="-1">5、.eslintrc.js 配置 rules <a class="header-anchor" href="#_5、-eslintrc-js-配置-rules" aria-label="Permalink to &quot;5、.eslintrc.js 配置 rules&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//.eslintrc.js</span></span>
<span class="line"><span style="color:#B392F0;">rules</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 控制代码中字符串的引号类型。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2 代表：强制使用双引号，如果使用其他类型的引号，ESLint 会报错。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">quotes</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 控制代码中是否需要在语句末尾使用分号。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1 代表：建议使用分号，但如果缺少分号，ESLint 只会发出警告。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">semi</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 控制代码中是否可以使用 \`console\` 方法（例如 \`console.log\`）。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1 代表：建议不要使用 \`console\` 方法，但如果使用了，ESLint 只会发出警告。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;no-console&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 控制函数名和括号之间是否需要空格。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 0 代表：关闭这个规则，不关心函数名和括号之间是否有空格。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;space-before-function-paren&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//.eslintrc.js</span></span>
<span class="line"><span style="color:#6F42C1;">rules</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 控制代码中字符串的引号类型。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2 代表：强制使用双引号，如果使用其他类型的引号，ESLint 会报错。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">quotes</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 控制代码中是否需要在语句末尾使用分号。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1 代表：建议使用分号，但如果缺少分号，ESLint 只会发出警告。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">semi</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 控制代码中是否可以使用 \`console\` 方法（例如 \`console.log\`）。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1 代表：建议不要使用 \`console\` 方法，但如果使用了，ESLint 只会发出警告。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;no-console&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 控制函数名和括号之间是否需要空格。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 0 代表：关闭这个规则，不关心函数名和括号之间是否有空格。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;space-before-function-paren&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>在 ESLint 的规则中，数字值通常有以下含义：</p><p>0: 关闭规则，不进行检查。</p><p>1: 打开规则，但只是发出警告。</p><p>2: 打开规则，并且如果违反了规则，ESLint 会报错。</p><h3 id="_6、执行命令" tabindex="-1">6、执行命令 <a class="header-anchor" href="#_6、执行命令" aria-label="Permalink to &quot;6、执行命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 执行命令</span></span>
<span class="line"><span style="color:#B392F0;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">eslint</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 结果</span></span>
<span class="line"><span style="color:#6A737D;">#   1:12  warning  Missing semicolon             semi</span></span>
<span class="line"><span style="color:#6A737D;">#   2:15  error    Strings must use doublequote  quotes</span></span>
<span class="line"><span style="color:#6A737D;">#   2:18  warning  Missing semicolon             semi</span></span>
<span class="line"><span style="color:#6A737D;">#   3:1   warning  Unexpected console statement  no-console</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ✖ 4 problems (1 error, 3 warnings)</span></span>
<span class="line"><span style="color:#6A737D;">#   1 error and 2 warnings potentially fixable with the \`--fix\` option.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 执行命令</span></span>
<span class="line"><span style="color:#6F42C1;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">eslint</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 结果</span></span>
<span class="line"><span style="color:#6A737D;">#   1:12  warning  Missing semicolon             semi</span></span>
<span class="line"><span style="color:#6A737D;">#   2:15  error    Strings must use doublequote  quotes</span></span>
<span class="line"><span style="color:#6A737D;">#   2:18  warning  Missing semicolon             semi</span></span>
<span class="line"><span style="color:#6A737D;">#   3:1   warning  Unexpected console statement  no-console</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ✖ 4 problems (1 error, 3 warnings)</span></span>
<span class="line"><span style="color:#6A737D;">#   1 error and 2 warnings potentially fixable with the \`--fix\` option.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>看到这个结果，就说明 eslint 已经生效了。</p><h3 id="_7、安装-vscode-eslint-插件" tabindex="-1">7、安装 vscode eslint 插件 <a class="header-anchor" href="#_7、安装-vscode-eslint-插件" aria-label="Permalink to &quot;7、安装 vscode eslint 插件&quot;">​</a></h3><p>如果只是在命令行中执行 <code>npx eslint index.js</code> 命令，那么每次都要手动执行，这样太麻烦了，我们可以安装 vscode eslint 插件，这样就可以在 vscode 中实时检查代码了。</p><p>如果你在 index.js 文件中有红色波浪线，那么就说明 eslint 插件已经安装成功了。</p><p>可以通过：eslint index.js --fix 命令，自动修复一些错误。但是有些错误是无法自动修复的，需要手动修改。</p><h3 id="_8、prettier-配置" tabindex="-1">8、prettier 配置 <a class="header-anchor" href="#_8、prettier-配置" aria-label="Permalink to &quot;8、prettier 配置&quot;">​</a></h3><p>eslint 并不能完全解决代码格式化的问题，所以我们还需要安装 prettier 插件。</p><p>在根目录下创建 .prettierrc.js 文件，内容如下：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// .prettierrc.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 控制是否在语句末尾添加分号。</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// false 代表：不在语句末尾添加分号。</span></span>
<span class="line"><span style="color:#E1E4E8;">  semi: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 控制字符串是否使用单引号。</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// true 代表：使用单引号而不是双引号。</span></span>
<span class="line"><span style="color:#E1E4E8;">  singleQuote: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// .prettierrc.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 控制是否在语句末尾添加分号。</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// false 代表：不在语句末尾添加分号。</span></span>
<span class="line"><span style="color:#24292E;">  semi: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 控制字符串是否使用单引号。</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// true 代表：使用单引号而不是双引号。</span></span>
<span class="line"><span style="color:#24292E;">  singleQuote: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>执行 <code>npx prettier --write index.js</code> 命令，可以看到代码已经格式化了。</p><h3 id="_9、安装-vscode-prettier-插件" tabindex="-1">9、安装 vscode prettier 插件 <a class="header-anchor" href="#_9、安装-vscode-prettier-插件" aria-label="Permalink to &quot;9、安装 vscode prettier 插件&quot;">​</a></h3><p>通常情况下，我们不会手动执行 <code>npx prettier --write index.js</code> 命令，而是通过 vscode prettier 插件自动格式化代码。</p><p>通过 <code>shift + alt + f</code> 快捷键，可以格式化代码。</p><p>如果有多个代码格式化插件，那么可能会出现冲突，导致代码格式化失败，这时候可以通过 <code>鼠标右键</code> 选择 prettier 插件进行格式化。如下图：</p>`,48),m=l(`<h2 id="vite-ts-项目配置" tabindex="-1">Vite TS 项目配置 <a class="header-anchor" href="#vite-ts-项目配置" aria-label="Permalink to &quot;Vite TS 项目配置&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 指定配置文件的根目录，这样 ESLint 只会在这个目录下查找 .eslintignore 文件</span></span>
<span class="line"><span style="color:#E1E4E8;">  root: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 指定代码的运行环境，这里指定了浏览器和 ES2020</span></span>
<span class="line"><span style="color:#E1E4E8;">  env: { browser: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, es2020: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 扩展其他的配置文件或预定义的配置集合</span></span>
<span class="line"><span style="color:#E1E4E8;">  extends: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 使用 ESLint 推荐的规则集</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// npm 包: eslint</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;eslint:recommended&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 使用 @typescript-eslint 插件推荐的规则集，适用于 TypeScript 代码</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// npm 包: @typescript-eslint/eslint-plugin</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;plugin:@typescript-eslint/recommended&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 使用 react-hooks 插件推荐的规则集，适用于 React Hooks</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// npm 包: eslint-plugin-react-hooks</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;plugin:react-hooks/recommended&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 指定 ESLint 忽略的文件或目录模式</span></span>
<span class="line"><span style="color:#E1E4E8;">  ignorePatterns: [</span><span style="color:#9ECBFF;">&quot;dist&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;.eslintrc.cjs&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 指定解析器，这里使用 @typescript-eslint/parser 来解析 TypeScript 代码</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// npm 包: @typescript-eslint/parser</span></span>
<span class="line"><span style="color:#E1E4E8;">  parser: </span><span style="color:#9ECBFF;">&quot;@typescript-eslint/parser&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 列出项目中要使用的 ESLint 插件</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 使用 react-refresh 插件提供的规则</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// npm 包: eslint-plugin-react-refresh</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-refresh&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 定义或覆盖规则的行为</span></span>
<span class="line"><span style="color:#E1E4E8;">  rules: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 使用 react-refresh 插件的 only-export-components 规则，并设置为警告级别</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-refresh/only-export-components&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;warn&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      { allowConstantExport: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 指定配置文件的根目录，这样 ESLint 只会在这个目录下查找 .eslintignore 文件</span></span>
<span class="line"><span style="color:#24292E;">  root: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 指定代码的运行环境，这里指定了浏览器和 ES2020</span></span>
<span class="line"><span style="color:#24292E;">  env: { browser: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, es2020: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 扩展其他的配置文件或预定义的配置集合</span></span>
<span class="line"><span style="color:#24292E;">  extends: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 使用 ESLint 推荐的规则集</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// npm 包: eslint</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;eslint:recommended&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 使用 @typescript-eslint 插件推荐的规则集，适用于 TypeScript 代码</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// npm 包: @typescript-eslint/eslint-plugin</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;plugin:@typescript-eslint/recommended&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 使用 react-hooks 插件推荐的规则集，适用于 React Hooks</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// npm 包: eslint-plugin-react-hooks</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;plugin:react-hooks/recommended&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 指定 ESLint 忽略的文件或目录模式</span></span>
<span class="line"><span style="color:#24292E;">  ignorePatterns: [</span><span style="color:#032F62;">&quot;dist&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;.eslintrc.cjs&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 指定解析器，这里使用 @typescript-eslint/parser 来解析 TypeScript 代码</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// npm 包: @typescript-eslint/parser</span></span>
<span class="line"><span style="color:#24292E;">  parser: </span><span style="color:#032F62;">&quot;@typescript-eslint/parser&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 列出项目中要使用的 ESLint 插件</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 使用 react-refresh 插件提供的规则</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// npm 包: eslint-plugin-react-refresh</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-refresh&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 定义或覆盖规则的行为</span></span>
<span class="line"><span style="color:#24292E;">  rules: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 使用 react-refresh 插件的 only-export-components 规则，并设置为警告级别</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-refresh/only-export-components&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;warn&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      { allowConstantExport: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><p>两个关键字段：<code>plugins</code> 和 <code>extends</code>。它们的区别和用途：</p><ol><li><p><strong>plugins</strong>:</p><ul><li><code>plugins</code> 字段用于列出你想在项目中使用的 ESLint 插件。</li><li>插件通常提供了一些额外的 linting 规则，这些规则不在 ESLint 的核心规则集中。</li><li>例如，在你的配置中，你列出了 <code>react-refresh</code> 插件，这意味着你想使用这个插件提供的规则。</li><li>但仅仅列出插件名并不会自动启用它的所有规则。要启用插件的规则，你需要在 <code>rules</code> 字段中明确指定。</li></ul></li><li><p><strong>extends</strong>:</p><ul><li><code>extends</code> 字段允许你基于其他配置文件或预定义的配置集合来扩展你的配置。</li><li>这是一种快速应用一组已经定义好的规则的方法，而不是手动列出每一条规则。</li><li>例如，<code>eslint:recommended</code> 是 ESLint 提供的一组推荐的规则，而 <code>plugin:@typescript-eslint/recommended</code> 是 <code>@typescript-eslint</code> 插件提供的一组推荐的规则。</li><li>当你在 <code>extends</code> 字段中列出这些配置时，它们的所有推荐规则都会被应用到你的项目中。</li></ul></li></ol><p>总结：</p><ul><li>当你想使用某个插件提供的规则，但不想使用该插件的预定义配置时，你应该将该插件列在 <code>plugins</code> 字段中，并在 <code>rules</code> 字段中明确启用你想使用的规则。</li><li>当你想基于其他配置或预定义的规则集合来扩展你的配置时，你应该使用 <code>extends</code> 字段。</li></ul>`,6);function h(F,A,D,g,C,v){const p=u,n=i("ClientOnly"),e=r,o=c;return E(),y("div",null,[d,s(n,null,{default:a(()=>[s(p,{src:"/images/note/1.png",alt:"prettier"})]),_:1}),m,s(n,null,{default:a(()=>[s(e)]),_:1}),s(n,null,{default:a(()=>[s(o)]),_:1})])}const L=t(b,[["render",h]]);export{w as __pageData,L as default};
