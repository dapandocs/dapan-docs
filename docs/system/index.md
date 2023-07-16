---
layout: page
---

<div ref="sitemapList" />

<script setup>
import { ref } from 'vue'
import renderReact from '@components/react/renderReact'
import SitemapList from '@components/react/SitemapList'

const sitemapList = ref(null)
renderReact(SitemapList, sitemapList)
</script>
