import { Landmark, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6 glass-card rounded-2xl mb-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
          <Landmark className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-foreground">SecureBank</h1>
          <p className="text-xs text-muted-foreground">Banking System</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
        <Bell className="w-5 h-5" />
      </Button>
    </header>
  );
}
