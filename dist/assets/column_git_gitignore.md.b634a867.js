import{_ as o,a as c,b as r}from"./chunks/Contributors.vue_vue_type_script_setup_true_lang.052e419c.js";import{_ as i,C as t,o as d,c as b,H as s,w as a,Q as u}from"./chunks/framework.27021b64.js";const q=JSON.parse('{"title":".gitignore 用法详解","description":"","frontmatter":{},"headers":[],"relativePath":"column/git/gitignore.md","filePath":"column/git/gitignore.md","lastUpdated":1692355437000}'),g={name:"column/git/gitignore.md"},m=u(`<h1 id="gitignore-用法详解" tabindex="-1">.gitignore 用法详解 <a class="header-anchor" href="#gitignore-用法详解" aria-label="Permalink to &quot;.gitignore 用法详解&quot;">​</a></h1><p>.gitignore 文件是一个特殊的文件，用于告诉 Git 版本控制系统忽略某些文件或文件夹。也就是说，当你提交代码时，列在 .gitignore 文件中的文件或文件夹将不会被包括在提交中。</p><h2 id="gitignore-文件的基本语法" tabindex="-1"><code>.gitignore</code> 文件的基本语法 <a class="header-anchor" href="#gitignore-文件的基本语法" aria-label="Permalink to &quot;\`.gitignore\` 文件的基本语法&quot;">​</a></h2><ol><li><p><strong>注释</strong>：以 <code>#</code> 开头的行是注释，将被 Git 忽略。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 这是一个注释</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 这是一个注释</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><strong>空白行</strong>：空白行不匹配任何文件，所以可以用来分隔规则。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><strong>忽略特定文件</strong>：直接写文件名。例如 secret.txt，这会忽略所有名为 secret.txt 的文件，无论它们在仓库的哪个位置。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">secret.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">secret.txt</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><strong>忽略特定扩展名</strong>：使用通配符 <code>*</code>。例如 *.log，这会忽略所有扩展名为 .log 的文件，无论它们在仓库的哪个位置。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">*.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">*.log</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><strong>忽略特定文件夹</strong>：在文件夹名后加 <code>/</code>。例如 temp/，这会忽略所有名为 temp 的文件夹及其内容，无论它们在仓库的哪个位置。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">temp/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">temp/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><strong>忽略特定文件夹下的特定文件</strong>：可以组合使用。例如 temp/*.txt，这个规则稍微特殊一些。它会忽略所有名为 temp 的文件夹下的 .txt 文件。但请注意，这个规则只会匹配名为 temp 的文件夹，而不是所有文件夹。</p></li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">temp/*.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">temp/*.txt</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果你想忽略所有文件夹下的 .txt 文件，你可以使用 <em>.txt 规则。如果你想忽略所有名为 temp 的文件夹下的 .txt 文件，无论这些文件夹在仓库的哪个位置，你需要使用 **/temp/</em>.txt 规则。</p><ol start="7"><li><strong>不忽略特定文件</strong>：即使文件被前面的规则忽略，也可以使用 <code>!</code> 来重新包括文件。<div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">!important.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">!important.log</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ol><h2 id="特殊情况和技巧" tabindex="-1">特殊情况和技巧 <a class="header-anchor" href="#特殊情况和技巧" aria-label="Permalink to &quot;特殊情况和技巧&quot;">​</a></h2><ul><li><p><strong>全局 <code>.gitignore</code> 文件</strong>：你可以创建一个全局的 <code>.gitignore</code> 文件，适用于你的所有 Git 仓库。只需运行以下命令：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git config --global core.excludesfile ~/.gitignore_global</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git config --global core.excludesfile ~/.gitignore_global</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><strong>忽略已追踪的文件</strong>：如果文件已经被追踪，你需要先运行 <code>git rm --cached &lt;file&gt;</code> 来取消追踪，然后再添加到 <code>.gitignore</code> 文件。</p></li><li><p><strong>调试 <code>.gitignore</code> 文件</strong>：如果你不确定为什么某个文件被忽略，可以使用 <code>git check-ignore</code> 命令来调试。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git check-ignore -v somefile.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git check-ignore -v somefile.txt</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul><h2 id="模板" tabindex="-1">模板 <a class="header-anchor" href="#模板" aria-label="Permalink to &quot;模板&quot;">​</a></h2><h3 id="umijs" tabindex="-1">UmiJS <a class="header-anchor" href="#umijs" aria-label="Permalink to &quot;UmiJS&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 编译输出</span></span>
<span class="line"><span style="color:#e1e4e8;">/dist</span></span>
<span class="line"><span style="color:#e1e4e8;">/.umi</span></span>
<span class="line"><span style="color:#e1e4e8;">/src/.umi-production</span></span>
<span class="line"><span style="color:#e1e4e8;">/src/.umi-test</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 依赖文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;">/node_modules</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">/.env</span></span>
<span class="line"><span style="color:#e1e4e8;">/.env.local</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 编辑器和操作系统文件</span></span>
<span class="line"><span style="color:#e1e4e8;">/.vscode</span></span>
<span class="line"><span style="color:#e1e4e8;">.DS_Store</span></span>
<span class="line"><span style="color:#e1e4e8;">Thumbs.db</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 日志文件</span></span>
<span class="line"><span style="color:#e1e4e8;">npm-debug.log*</span></span>
<span class="line"><span style="color:#e1e4e8;">yarn-debug.log*</span></span>
<span class="line"><span style="color:#e1e4e8;">yarn-error.log*</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm-debug.log*</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 测试覆盖率</span></span>
<span class="line"><span style="color:#e1e4e8;">/coverage</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 临时文件</span></span>
<span class="line"><span style="color:#e1e4e8;">/tmp</span></span>
<span class="line"><span style="color:#e1e4e8;">/temp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 其他忽略文件</span></span>
<span class="line"><span style="color:#e1e4e8;">.secret</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 编译输出</span></span>
<span class="line"><span style="color:#24292e;">/dist</span></span>
<span class="line"><span style="color:#24292e;">/.umi</span></span>
<span class="line"><span style="color:#24292e;">/src/.umi-production</span></span>
<span class="line"><span style="color:#24292e;">/src/.umi-test</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 依赖文件夹</span></span>
<span class="line"><span style="color:#24292e;">/node_modules</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 环境配置</span></span>
<span class="line"><span style="color:#24292e;">/.env</span></span>
<span class="line"><span style="color:#24292e;">/.env.local</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 编辑器和操作系统文件</span></span>
<span class="line"><span style="color:#24292e;">/.vscode</span></span>
<span class="line"><span style="color:#24292e;">.DS_Store</span></span>
<span class="line"><span style="color:#24292e;">Thumbs.db</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 日志文件</span></span>
<span class="line"><span style="color:#24292e;">npm-debug.log*</span></span>
<span class="line"><span style="color:#24292e;">yarn-debug.log*</span></span>
<span class="line"><span style="color:#24292e;">yarn-error.log*</span></span>
<span class="line"><span style="color:#24292e;">pnpm-debug.log*</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 测试覆盖率</span></span>
<span class="line"><span style="color:#24292e;">/coverage</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 临时文件</span></span>
<span class="line"><span style="color:#24292e;">/tmp</span></span>
<span class="line"><span style="color:#24292e;">/temp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 其他忽略文件</span></span>
<span class="line"><span style="color:#24292e;">.secret</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h3 id="vite" tabindex="-1">Vite <a class="header-anchor" href="#vite" aria-label="Permalink to &quot;Vite&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 编译输出</span></span>
<span class="line"><span style="color:#e1e4e8;">/dist</span></span>
<span class="line"><span style="color:#e1e4e8;">/build</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 依赖文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;">/node_modules</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 环境配置</span></span>
<span class="line"><span style="color:#e1e4e8;">/.env</span></span>
<span class="line"><span style="color:#e1e4e8;">/.env.local</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 编辑器和操作系统文件</span></span>
<span class="line"><span style="color:#e1e4e8;">/.vscode</span></span>
<span class="line"><span style="color:#e1e4e8;">.DS_Store</span></span>
<span class="line"><span style="color:#e1e4e8;">Thumbs.db</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 日志文件</span></span>
<span class="line"><span style="color:#e1e4e8;">npm-debug.log*</span></span>
<span class="line"><span style="color:#e1e4e8;">yarn-debug.log*</span></span>
<span class="line"><span style="color:#e1e4e8;">yarn-error.log*</span></span>
<span class="line"><span style="color:#e1e4e8;">pnpm-debug.log*</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 测试覆盖率</span></span>
<span class="line"><span style="color:#e1e4e8;">/coverage</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 临时文件</span></span>
<span class="line"><span style="color:#e1e4e8;">/tmp</span></span>
<span class="line"><span style="color:#e1e4e8;">/temp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 其他忽略文件</span></span>
<span class="line"><span style="color:#e1e4e8;">.secret</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 编译输出</span></span>
<span class="line"><span style="color:#24292e;">/dist</span></span>
<span class="line"><span style="color:#24292e;">/build</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 依赖文件夹</span></span>
<span class="line"><span style="color:#24292e;">/node_modules</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 环境配置</span></span>
<span class="line"><span style="color:#24292e;">/.env</span></span>
<span class="line"><span style="color:#24292e;">/.env.local</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 编辑器和操作系统文件</span></span>
<span class="line"><span style="color:#24292e;">/.vscode</span></span>
<span class="line"><span style="color:#24292e;">.DS_Store</span></span>
<span class="line"><span style="color:#24292e;">Thumbs.db</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 日志文件</span></span>
<span class="line"><span style="color:#24292e;">npm-debug.log*</span></span>
<span class="line"><span style="color:#24292e;">yarn-debug.log*</span></span>
<span class="line"><span style="color:#24292e;">yarn-error.log*</span></span>
<span class="line"><span style="color:#24292e;">pnpm-debug.log*</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 测试覆盖率</span></span>
<span class="line"><span style="color:#24292e;">/coverage</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 临时文件</span></span>
<span class="line"><span style="color:#24292e;">/tmp</span></span>
<span class="line"><span style="color:#24292e;">/temp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 其他忽略文件</span></span>
<span class="line"><span style="color:#24292e;">.secret</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h2 id="贡献者" tabindex="-1">贡献者 <a class="header-anchor" href="#贡献者" aria-label="Permalink to &quot;贡献者&quot;">​</a></h2>`,15);function y(h,v,k,_,C,f){const e=o,n=t("ClientOnly"),l=c,p=r;return d(),b("div",null,[m,s(n,null,{default:a(()=>[s(e)]),_:1}),s(n,null,{default:a(()=>[s(l)]),_:1}),s(n,null,{default:a(()=>[s(p)]),_:1})])}const w=i(g,[["render",y]]);export{q as __pageData,w as default};
