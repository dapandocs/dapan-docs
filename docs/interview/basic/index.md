### 面试基础待补充...

<div ref="button1" />

### 面试基础待补充...
<div ref="button2" />


<script setup>
import { ref } from 'vue'
import renderReact from '@components/react/renderReact'
import ClickButton from '@components/react/ClickButton'
const button1 = ref(null)
const button2 = ref(null)
renderReact(ClickButton, button1)
renderReact(ClickButton, button2)
</script>
