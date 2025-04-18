
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full hover:bg-echo-cyber-neon/10"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-echo-cyber-neon hover:text-echo-cyber-neon/80 transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-echo-cyber-neon hover:text-echo-cyber-neon/80 transition-colors" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
