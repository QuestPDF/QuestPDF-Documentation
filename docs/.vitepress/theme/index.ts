import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';

import Layout from './Layout.vue';
import NavDocumentationMenu from './NavDocumentationMenu.vue';

import './VitepressAdjustments.css'
import './CustomPages.css'

export default {
    ...DefaultTheme,
    Layout: Layout,
    enhanceApp(context) {
        DefaultTheme.enhanceApp?.(context);
        context.app.component('NavDocumentationMenu', NavDocumentationMenu);
    }
} satisfies Theme;
