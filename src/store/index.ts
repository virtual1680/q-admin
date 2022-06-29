import { createPinia } from 'pinia';
import { useCommonStore } from './common';
import { useLogsStore } from './logs';
import { useTagsStore } from './tags';
import { useUserStore } from './user';

const pinia = createPinia();
import piniaPersisted from 'pinia-plugin-persistedstate';
pinia.use(piniaPersisted);

export { useCommonStore, useLogsStore, useTagsStore, useUserStore };
export default pinia;
