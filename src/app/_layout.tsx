import { useThemeProvider } from "@/hooks";
import { initI18n } from "@/i18n";
import { customFontsToLoad } from "@/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts(customFontsToLoad);
  const [i18nLoaded, setI18nLoaded] = useState(false);

  const loaded = fontsLoaded && i18nLoaded;

  useEffect(() => {
    initI18n().then(() => setI18nLoaded(true));
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { ThemeProvider, setThemeContextOverride, themeScheme } =
    useThemeProvider();

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <Stack />
    </ThemeProvider>
  );
}
