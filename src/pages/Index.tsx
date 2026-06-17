import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/d13e5853-db14-4e7f-b910-3b964529a9ed/files/e55d948d-2f50-4f09-8e39-fb436263cd0c.jpg';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'server', label: 'Сервер' },
  { id: 'donate', label: 'Донаты' },
];

const DONATES = [
  { name: 'VIP', price: '299 ₽', color: 'border-primary', glow: 'shadow-primary/30', perks: ['Цветной ник', 'Кит VIP', '2 дома', 'Префикс [VIP]'] },
  { name: 'PREMIUM', price: '599 ₽', color: 'border-secondary', glow: 'shadow-secondary/40', perks: ['Всё из VIP', 'Полёт /fly', '5 домов', 'Приватные ивенты'], popular: true },
  { name: 'LEGEND', price: '999 ₽', color: 'border-purple-500', glow: 'shadow-purple-500/30', perks: ['Всё из PREMIUM', 'Креатив режим', '10 домов', 'Свой варп'] },
];

const SERVER_STATS = [
  { label: 'Версия', value: '1.16.5', icon: 'Boxes' },
  { label: 'Аптайм', value: '99.9%', icon: 'Activity' },
  { label: 'Миры', value: '5', icon: 'Globe' },
];

export default function Index() {
  const [active, setActive] = useState('home');
  const [loggedIn, setLoggedIn] = useState(false);

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pixel-grid">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b-4 border-black/40 bg-card/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-primary block-border block-shadow">
              <Icon name="Pickaxe" className="text-primary-foreground" size={22} />
            </div>
            <span className="font-pixel text-sm text-primary">MusoWorld</span>
          </div>

          <nav className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active === n.id ? 'text-secondary' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <ProfileDialog loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="container relative py-28 text-center md:py-40">

          <h1 className="mx-auto max-w-3xl font-pixel text-2xl leading-relaxed text-white drop-shadow-[3px_3px_0_rgba(0,0,0,0.6)] md:text-4xl">
            Построй свою
            <span className="text-primary"> легенду</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg text-white/80">
            Магазин лучшего Minecraft-сервера. Привилегии, киты и ресурсы — всё для эпичной игры.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollTo('donate')}
              className="h-14 px-8 font-pixel text-xs block-shadow block-border"
            >
              <Icon name="Crown" className="mr-2" size={18} />
              ДОНАТ
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => scrollTo('server')}
              className="h-14 px-8 font-pixel text-xs block-shadow block-border"
            >
              <Icon name="Server" className="mr-2" size={18} />
              О СЕРВЕРЕ
            </Button>
          </div>

          <div className="mx-auto mt-14 flex max-w-md items-center gap-2 bg-card/80 p-3 block-border">
            <code className="flex-1 truncate text-left font-mono text-sm text-primary">play.blockcraft.ru</code>
            <Button size="sm" variant="outline" className="font-semibold">
              <Icon name="Copy" size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* SERVER */}
      <section id="server" className="border-y-4 border-black/40 bg-card/40">
        <div className="container py-20">
          <SectionTitle icon="Server" title="СЕРВЕР" sub="Технические характеристики" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVER_STATS.map((s) => (
              <div key={s.label} className="bg-card p-8 text-center block-border block-shadow">
                <Icon name={s.icon} className="mx-auto mb-3 text-primary" size={36} />
                <div className="font-pixel text-xl text-secondary">{s.value}</div>
                <div className="mt-2 text-sm uppercase tracking-wide text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {['Защита от гриферов', 'Еженедельные ивенты', 'Активная админка 24/7'].map((f) => (
              <div key={f} className="flex items-center gap-3 bg-muted/50 p-4 block-border">
                <Icon name="ShieldCheck" className="text-primary" size={22} />
                <span className="font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="container py-20">
        <SectionTitle icon="Crown" title="ДОНАТЫ" sub="Стань частью элиты сервера" />
        <div className="grid gap-8 lg:grid-cols-3">
          {DONATES.map((d) => (
            <div
              key={d.name}
              className={`relative bg-card p-8 block-shadow border-4 ${d.color} ${
                d.popular ? `scale-105 shadow-2xl ${d.glow}` : ''
              }`}
            >
              {d.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary px-4 py-1 font-pixel text-[9px] text-secondary-foreground block-shadow">
                  ХИТ
                </span>
              )}
              <h3 className="text-center font-pixel text-lg text-secondary">{d.name}</h3>
              <div className="mt-4 text-center font-pixel text-2xl">{d.price}</div>
              <ul className="mt-6 space-y-3">
                {d.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" className="text-primary" size={18} />
                    {perk}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full font-pixel text-xs block-shadow block-border" size="lg">
                ВЫБРАТЬ
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-black/40 bg-card">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Icon name="Pickaxe" className="text-primary" size={20} />
            <span className="font-pixel text-xs text-primary">MusoWorld</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 MusoWorld. Не аффилировано с Mojang.</p>
          <div className="flex gap-3">
            {['MessageCircle', 'Youtube', 'Send'].map((ic) => (
              <button key={ic} className="flex h-10 w-10 items-center justify-center bg-muted block-border hover:bg-primary hover:text-primary-foreground">
                <Icon name={ic} size={18} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className="mb-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-primary block-border block-shadow">
        <Icon name={icon} className="text-primary-foreground" size={26} />
      </div>
      <h2 className="font-pixel text-2xl text-white">{title}</h2>
      <p className="mt-3 text-muted-foreground">{sub}</p>
    </div>
  );
}

function ProfileDialog({
  loggedIn,
  setLoggedIn,
}: {
  loggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
}) {
  const [nick, setNick] = useState('Steve_2026');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="font-pixel text-[10px] block-shadow block-border">
          <Icon name="User" className="mr-2" size={16} />
          {loggedIn ? 'КАБИНЕТ' : 'ВОЙТИ'}
        </Button>
      </DialogTrigger>
      <DialogContent className="block-border">
        <DialogHeader>
          <DialogTitle className="font-pixel text-sm text-primary">
            {loggedIn ? 'ЛИЧНЫЙ КАБИНЕТ' : 'ВХОД ИГРОКА'}
          </DialogTitle>
        </DialogHeader>

        {loggedIn ? (
          <div className="space-y-5">
            <div className="flex items-center gap-4 bg-muted/50 p-4 block-border">
              <div className="flex h-16 w-16 items-center justify-center bg-primary block-border">
                <Icon name="User" className="text-primary-foreground" size={32} />
              </div>
              <div>
                <div className="font-bold">{nick}</div>
                <div className="text-sm text-secondary">Статус: VIP</div>
                <div className="text-sm text-muted-foreground">Баланс: 1 250 ₽</div>
              </div>
            </div>

            <div>
              <div className="mb-2 font-pixel text-[10px] text-muted-foreground">МОИ ПОКУПКИ</div>
              <div className="space-y-2">
                {[
                  { n: 'Алмазный набор', d: '12.06.2026', s: 'Активен' },
                  { n: 'VIP привилегия', d: '01.06.2026', s: 'Активен' },
                ].map((o) => (
                  <div key={o.n} className="flex items-center justify-between bg-muted/40 p-3 block-border text-sm">
                    <div>
                      <div className="font-semibold">{o.n}</div>
                      <div className="text-xs text-muted-foreground">{o.d}</div>
                    </div>
                    <span className="flex items-center gap-1 text-primary">
                      <Icon name="CircleCheck" size={16} /> {o.s}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => setLoggedIn(false)}>
              <Icon name="LogOut" className="mr-2" size={16} /> Выйти
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold">Игровой ник</label>
              <input
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                className="w-full bg-muted px-4 py-3 block-border outline-none focus:ring-2 focus:ring-primary"
                placeholder="Введите ник"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Пароль</label>
              <input
                type="password"
                className="w-full bg-muted px-4 py-3 block-border outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>
            <Button className="w-full font-pixel text-xs block-shadow" onClick={() => setLoggedIn(true)}>
              ВОЙТИ В ИГРУ
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Нет аккаунта? Зарегистрируйся на сервере
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}