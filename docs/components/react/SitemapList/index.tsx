/**
 * 网址一栏表
 */
import React, { lazy, Suspense } from "react";

const SitemapList = lazy(() => import("./SitemapList"));

function SitemapListLazy() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <SitemapList />
    </Suspense>
  );
}
export default SitemapListLazy;
