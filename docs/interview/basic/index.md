### React 组件1

<div ref="button1" />

### React 组件2
<div ref="button2" />


### Vue 组件
<vue-click-button />

<script setup>
import { ref } from 'vue'
import renderReact from '@components/react/renderReact'
import ClickButton from '@components/react/ClickButton'
import VueClickButton from '@components/vue/ClickButton/index.vue'

const button1 = ref(null)
const button2 = ref(null)
renderReact(ClickButton, button1)
renderReact(ClickButton, button2)
</script>
