<template>
	<div class="avue-logo">
		<transition name="fade">
			<span v-if="getScreen(isCollapse)" class="avue-logo_subtitle" key="0">
				{{ website.logo }}
			</span>
		</transition>
		<transition-group name="fade">
			<template v-if="getScreen(!isCollapse)">
				<span class="avue-logo_title" key="1">{{ website.indexTitle }} </span>
			</template>
		</transition-group>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { commonStore } from 'store/common';
import { getScreen } from 'utils/util';

const cStore = commonStore();

const isCollapse = computed(() => {
	return cStore.isCollapse;
});
const website = computed(() => {
	return cStore.website;
});
</script>
