import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'pink'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'pink' || 'dark';
    setTheme(initialTheme);
    
    root.classList.remove('dark', 'pink');
    if (initialTheme === 'dark') {
      root.classList.add('dark');
    } else if (initialTheme === 'pink') {
      root.classList.add('pink');
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    let newTheme: 'light' | 'dark' | 'pink';
    
    if (theme === 'light') {
      newTheme = 'dark';
    } else if (theme === 'dark') {
      newTheme = 'pink';
    } else {
      newTheme = 'light';
    }
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    root.classList.remove('dark', 'pink');
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'pink') {
      root.classList.add('pink');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'pink':
        return <Palette className="h-5 w-5" />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-foreground hover:bg-accent"
    >
      {getIcon()}
    </Button>
  );
};

export default ThemeToggle;