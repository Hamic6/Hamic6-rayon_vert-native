import { ExpoRoot } from 'expo-router';
import { ThemeProvider } from './app/contexts/ThemeContext';

export default function App(props: any) {
  return (
    <ThemeProvider>
      <ExpoRoot context={props.context} />
    </ThemeProvider>
  );
}