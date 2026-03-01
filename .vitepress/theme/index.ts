import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { App } from "vue";
import {
  AppWindow,
  Blocks,
  BriefcaseBusiness,
  Earth,
  FileCode,
  GraduationCap,
  Palette,
  Server,
  SquareCode,
  Trophy,
} from "lucide-vue-next";
import "./style.css";

const ADDITIONAL_COMPONENTS = [
  { name: "BriefcaseBusiness", component: BriefcaseBusiness },
  { name: "GraduationCap", component: GraduationCap },
  { name: "Palette", component: Palette },
  { name: "Trophy", component: Trophy },
  { name: "SquareCode", component: SquareCode },
  { name: "Server", component: Server },
  { name: "FileCode", component: FileCode },
  { name: "Blocks", component: Blocks },
  { name: "AppWindow", component: AppWindow },
  { name: "Earth", component: Earth },
];

function registerComponents(app: App<any>) {
  // Auto-register all components in the components directory
  const components = import.meta.glob("./components/**/*.vue", {
    eager: true,
  });

  for (const path in components) {
    const component = components[path] as any;
    const componentName = path
      .split("/")
      .pop()
      ?.replace(/\.\w+$/, ""); // Remove file extension

    if (componentName) {
      app.component(componentName, component.default);
    }
  }

  for (const { name, component } of ADDITIONAL_COMPONENTS) {
    if (!app.component(name)) {
      // Only register if not already registered
      app.component(name, component);
    }
  }
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    registerComponents(app);
  },
} satisfies Theme;
