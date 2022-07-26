import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

import menuModule from '../mock/menu';
import userModule from '../mock/user';
import areaModule from '../mock/area';
export const setupProdMockServer = () => {
	createProdMockServer([...menuModule, ...userModule, ...areaModule]);
};
