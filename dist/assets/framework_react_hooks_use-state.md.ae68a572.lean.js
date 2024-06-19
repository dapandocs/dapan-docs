import{_ as D,a as g}from"./chunks/CopyRight.vue_vue_type_script_setup_true_lang.67549825.js";import{r as d,j as n,a as y}from"./chunks/jsx-runtime.489a0d3a.js";import{C as b}from"./chunks/index.ce9b523d.js";import{S as m}from"./chunks/index.86888617.js";import{B as o}from"./chunks/EllipsisOutlined.5d421715.js";import{h as i,C as u,o as F,c as v,k as C,b as k,w as c,a0 as S,H as e,Q as r,a as f}from"./chunks/framework.27021b64.js";import"./chunks/commonjsHelpers.725317a4.js";import"./chunks/CloseOutlined.9c3246b4.js";import"./chunks/Serializer.fad5b415.js";const q=()=>{const[a,s]=d.useState(0);function p(){s(a+1)}function t(){s(l=>l+1)}return n.jsx(b,{children:n.jsxs(m,{children:[n.jsxs("div",{children:["Count: ",a]}),n.jsx(o,{onClick:p,type:"primary",children:"count+1[方法一]"}),n.jsx(o,{onClick:t,type:"primary",children:"count+1[方法二]"}),n.jsx(o,{onClick:()=>s(0),type:"primary",children:"重置"})]})})},_=()=>{const[a,s]=d.useState(0);function p(){s(a+1),s(a+1),s(a+1)}function t(){s(l=>l+1),s(l=>l+1),s(l=>l+1)}return n.jsx(b,{children:n.jsxs(m,{children:[n.jsxs("div",{children:["Count: ",a]}),n.jsx(o,{onClick:p,type:"primary",children:"批量更新[方法一]"}),n.jsx(o,{onClick:t,type:"primary",children:"批量更新[方法二]"}),n.jsx(o,{onClick:()=>s(0),type:"primary",children:"重置"})]})})},x=r("",20),j=r("",11),M=r("",30),K=JSON.parse('{"title":"React Hooks 系列 之 useState","description":"","frontmatter":{},"headers":[],"relativePath":"framework/react/hooks/use-state.md","filePath":"framework/react/hooks/use-state.md","lastUpdated":1691561959000}'),R={name:"framework/react/hooks/use-state.md"},V=Object.assign(R,{setup(a){const s=i(null),p=i(null);return y(q,s),y(_,p),(t,l)=>{const B=u("Mermaid"),A=D,E=u("ClientOnly"),h=g;return F(),v("div",null,[x,C("div",{ref_key:"useState1",ref:s},null,512),j,C("div",{ref_key:"useState2",ref:p},null,512),M,(F(),k(S,null,{default:c(()=>[e(B,{id:"mermaid-198",class:"eita",graph:"graph%20TD%0AA%5B%E8%B0%83%E7%94%A8useState%5D%20--%3E%7CuseState%E8%BF%94%E5%9B%9E%E4%B8%80%E4%B8%AA%E7%8A%B6%E6%80%81%E5%8F%98%E9%87%8F%E5%92%8C%E4%B8%80%E4%B8%AA%E6%9B%B4%E6%96%B0%E5%87%BD%E6%95%B0%7C%20B%5BuseState%E8%BF%94%E5%9B%9E%5D%0AB%20--%3E%7C%E5%BD%93%E4%BD%A0%E8%B0%83%E7%94%A8%E6%9B%B4%E6%96%B0%E5%87%BD%E6%95%B0%E6%97%B6%2CReact%E4%BC%9A%E5%B0%86%E6%96%B0%E7%9A%84%E7%8A%B6%E6%80%81%E6%B7%BB%E5%8A%A0%E5%88%B0%E4%B8%80%E4%B8%AA%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97%E4%B8%AD%7C%20C%5B%E8%B0%83%E7%94%A8%E6%9B%B4%E6%96%B0%E5%87%BD%E6%95%B0%5D%0AC%20--%3E%7CReact%E7%9A%84%E8%B0%83%E5%BA%A6%E6%9C%BA%E5%88%B6%E4%BC%9A%E5%86%B3%E5%AE%9A%E4%BD%95%E6%97%B6%E8%BF%9B%E8%A1%8C%E6%9B%B4%E6%96%B0%7C%20D%5BscheduleUpdateOnFiber%5D%0AD%20--%3E%7C%E7%A1%AE%E4%BF%9D%E6%A0%B9%E8%8A%82%E7%82%B9%E8%A2%AB%E6%AD%A3%E7%A1%AE%E5%9C%B0%E8%B0%83%E5%BA%A6%7C%20E%5BensureRootIsScheduled%5D%0AE%20--%3E%7C%E5%A4%84%E7%90%86%E5%90%8C%E6%AD%A5%E5%B7%A5%E4%BD%9C%E5%BE%AA%E7%8E%AF%7C%20F%5BworkLoopSync%5D%0AF%20--%3E%7C%E5%BC%80%E5%A7%8B%E6%96%B0%E7%9A%84%E6%B8%B2%E6%9F%93%7C%20G%5BperformSyncWorkOnRoot%5D%0AG%20--%3E%7C%E5%BC%80%E5%A7%8B%E5%A4%84%E7%90%86%E5%BD%93%E5%89%8D%E7%9A%84fiber%7C%20H%5BbeginWork%5D%0AH%20--%3E%7C%E5%A4%84%E7%90%86hooks%E5%B9%B6%E8%BF%94%E5%9B%9E%E6%96%B0%E7%9A%84React%E5%85%83%E7%B4%A0%7C%20I%5BrenderWithHooks%5D%0AI%20--%3E%7C%E6%AF%94%E8%BE%83%E6%96%B0%E6%97%A7React%E5%85%83%E7%B4%A0%E5%B9%B6%E7%A1%AE%E5%AE%9A%E6%98%AF%E5%90%A6%E9%9C%80%E8%A6%81%E6%9B%B4%E6%96%B0DOM%7C%20J%5BreconcileChildren%5D%0AJ%20--%3E%7C%E5%A4%84%E7%90%86%E6%8F%90%E4%BA%A4%E5%89%8D%E7%9A%84%E5%89%AF%E4%BD%9C%E7%94%A8%7C%20K%5BcommitBeforeMutationEffects%5D%0AK%20--%3E%7C%E5%B0%86%E6%96%B0%E7%9A%84React%E5%85%83%E7%B4%A0%E6%8F%90%E4%BA%A4%E5%88%B0DOM%7C%20L%5BcommitRoot%5D%0AL%20--%3E%7C%E5%AE%8C%E6%88%90%E6%9B%B4%E6%96%B0%7C%20M%5B%E6%9B%B4%E6%96%B0DOM%5D%0A%0A"})]),fallback:c(()=>[f(" Loading... ")]),_:1})),e(E,null,{default:c(()=>[e(A)]),_:1}),e(E,null,{default:c(()=>[e(h)]),_:1})])}}});export{K as __pageData,V as default};