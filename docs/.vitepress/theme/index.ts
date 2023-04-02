import DefaultTheme from 'vitepress/theme';

import Layout from './Layout.vue';

import './VitepressAdjustments.css'
import './CustomPages.css'

export default {
    ...DefaultTheme,
    Layout: Layout,
};