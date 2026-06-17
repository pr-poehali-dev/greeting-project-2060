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

const PAYMENT_URL = 'https://functions.poehali.dev/a2a0b87c-c1bc-4fd8-a3a3-03cc73e5edf1';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'server', label: 'Сервер' },
  { id: 'donate', label: 'Донаты' },
];

const DONATES = [
  {
    name: 'HERO',
    price: '20 ₽',
    icon: 'Shield',
    gradient: 'from-sky-500/20 to-cyan-500/5',
    ring: 'ring-sky-400/40',
    btn: 'bg-sky-500 text-white hover:bg-sky-400',
    perks: ['Цветной ник', 'Кит HERO', '1 дом', 'Префикс [HERO]'],
  },
  {
    name: 'TITAN',
    price: '30 ₽',
    icon: 'Swords',
    gradient: 'from-emerald-500/20 to-teal-500/5',
    ring: 'ring-emerald-400/40',
    btn: 'bg-emerald-500 text-white hover:bg-emerald-400',
    perks: ['Всё из HERO', 'Кит TITAN', '2 дома', 'Доступ к /hat'],
  },
  {
    name: 'AVENGER',
    price: '70 ₽',
    icon: 'Star',
    gradient: 'from-lime-500/20 to-green-500/5',
    ring: 'ring-lime-400/40',
    btn: 'bg-lime-500 text-black hover:bg-lime-400',
    perks: ['Всё из TITAN', 'Кит AVENGER', '3 дома', 'Команда /feed'],
  },
  {
    name: 'OVERLORD',
    price: '120 ₽',
    icon: 'Flame',
    gradient: 'from-amber-500/25 to-yellow-500/5',
    ring: 'ring-amber-400/50',
    btn: 'bg-amber-500 text-black hover:bg-amber-400',
    perks: ['Всё из AVENGER', 'Кит OVERLORD', '5 домов', 'Полёт /fly'],
  },
  {
    name: 'IMPERATOR',
    price: '220 ₽',
    icon: 'Crown',
    gradient: 'from-orange-500/25 to-red-500/5',
    ring: 'ring-orange-400/50',
    btn: 'bg-orange-500 text-white hover:bg-orange-400',
    perks: ['Всё из OVERLORD', 'Кит IMPERATOR', '7 домов', 'Приватные ивенты'],
    popular: true,
  },
  {
    name: 'DRAGON',
    price: '330 ₽',
    icon: 'Sparkles',
    gradient: 'from-rose-500/25 to-pink-500/5',
    ring: 'ring-rose-400/50',
    btn: 'bg-rose-500 text-white hover:bg-rose-400',
    perks: ['Всё из IMPERATOR', 'Кит DRAGON', '10 домов', 'Свой варп'],
  },
  {
    name: 'D.HELPER',
    price: '500 ₽',
    icon: 'ShieldCheck',
    gradient: 'from-violet-500/25 to-purple-500/5',
    ring: 'ring-violet-400/50',
    btn: 'bg-violet-500 text-white hover:bg-violet-400',
    perks: ['Всё из DRAGON', 'Права хелпера', 'Кик/мут игроков', 'Спец-чат'],
  },
  {
    name: 'GOD',
    price: '1000 ₽',
    icon: 'Gem',
    gradient: 'from-fuchsia-500/30 to-indigo-500/10',
    ring: 'ring-fuchsia-400/60',
    btn: 'bg-fuchsia-500 text-white hover:bg-fuchsia-400',
    perks: ['Всё из D.HELPER', 'Креатив режим', 'Безлимит домов', 'Статус [GOD]'],
  },
];

const SERVER_STATS = [
  { label: 'Версия', value: '1.16.5', icon: 'Boxes' },
  { label: 'Аптайм', value: '99.9%', icon: 'Activity' },
  { label: 'Миры', value: '5', icon: 'Globe' },
];

const FEATURES = [
  { icon: 'ShieldCheck', title: 'Защита от гриферов', desc: 'Приваты и анти-чит работают 24/7' },
  { icon: 'CalendarHeart', title: 'Еженедельные ивенты', desc: 'Турниры, конкурсы и крупные награды' },
  { icon: 'Headset', title: 'Активная админка', desc: 'Поддержка ответит за пару минут' },
];

type Tariff = { name: string; price: string };

export default function Index() {
  const [active, setActive] = useState('home');
  const [loggedIn, setLoggedIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [buyTariff, setBuyTariff] = useState<Tariff | null>(null);

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyIp = () => {
    navigator.clipboard?.writeText('play.musoworld.ru');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen grid-bg">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-600 glow-ring">
              <Icon name="Gamepad2" className="text-primary-foreground" size={24} />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Muso<span className="text-primary">World</span>
            </span>
          </div>

          <nav className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  active === n.id
                    ? 'bg-white/10 text-primary'
                    : 'text-foreground/60 hover:text-foreground'
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
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-accent/30 blur-[120px]" />

        <div className="container relative py-28 text-center md:py-44">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm font-semibold text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Новый сезон уже открыт
          </span>
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
            Построй свою <span className="text-gradient">легенду</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg text-white/70 md:text-xl">
            Лучший Minecraft-сервер с привилегиями, китами и эпичными ивентами. Присоединяйся к приключению.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollTo('donate')}
              className="h-14 rounded-2xl px-8 text-base font-bold animate-glow"
            >
              <Icon name="Crown" className="mr-2" size={20} />
              Купить привилегию
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('server')}
              className="h-14 rounded-2xl border-white/20 bg-white/5 px-8 text-base font-bold backdrop-blur hover:bg-white/10"
            >
              <Icon name="Server" className="mr-2" size={20} />
              О сервере
            </Button>
          </div>

          <button
            onClick={copyIp}
            className="group mx-auto mt-12 flex max-w-md items-center gap-3 rounded-2xl glass px-5 py-4 transition-all hover:border-primary/40"
          >
            <Icon name="Globe" className="text-primary" size={20} />
            <code className="flex-1 truncate text-left font-mono text-base font-semibold text-white">
              play.musoworld.ru
            </code>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <Icon name={copied ? 'Check' : 'Copy'} size={18} />
              {copied ? 'Скопировано' : 'Копировать'}
            </span>
          </button>
        </div>
      </section>

      {/* SERVER */}
      <section id="server" className="container py-24">
        <SectionTitle eyebrow="О проекте" title="Наш сервер" sub="Стабильность и атмосфера в каждой детали" />

        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {SERVER_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl glass card-hover p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
                <Icon name={s.icon} className="text-primary" size={28} />
              </div>
              <div className="font-display text-4xl font-black text-white">{s.value}</div>
              <div className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-3xl glass card-hover p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20">
                <Icon name={f.icon} className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="relative overflow-hidden py-24">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />
        <div className="container relative">
          <SectionTitle eyebrow="Магазин" title="Привилегии" sub="Выбери свой статус на сервере" />

          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DONATES.map((d) => (
              <div
                key={d.name}
                className={`relative flex flex-col rounded-3xl bg-gradient-to-b ${d.gradient} glass p-6 ring-1 ${d.ring} transition-all hover:-translate-y-2`}
              >
                {d.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-secondary-foreground">
                    Хит продаж
                  </span>
                )}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Icon name={d.icon} className="text-white" size={24} />
                </div>
                <h3 className="font-display text-xl font-extrabold text-white">{d.name}</h3>
                <div className="mt-1 font-display text-3xl font-black text-white">{d.price}</div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {d.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm font-medium text-white/90">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Icon name="Check" className="text-primary" size={13} />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setBuyTariff({ name: d.name, price: d.price })}
                  className={`mt-6 h-11 w-full rounded-xl text-base font-bold ${d.btn}`}
                >
                  Выбрать
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-background/60">
        <div className="container flex flex-col items-center justify-between gap-5 py-10 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-600">
              <Icon name="Gamepad2" className="text-primary-foreground" size={18} />
            </div>
            <span className="font-display text-lg font-extrabold">
              Muso<span className="text-primary">World</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 MusoWorld. Не аффилировано с Mojang.</p>
          <div className="flex gap-3">
            {['MessageCircle', 'Youtube', 'Send'].map((ic) => (
              <button
                key={ic}
                className="flex h-11 w-11 items-center justify-center rounded-xl glass transition-all hover:border-primary/40 hover:text-primary"
              >
                <Icon name={ic} size={18} />
              </button>
            ))}
          </div>
        </div>
      </footer>

      <BuyDialog tariff={buyTariff} onClose={() => setBuyTariff(null)} />
    </div>
  );
}

function BuyDialog({ tariff, onClose }: { tariff: Tariff | null; onClose: () => void }) {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pay = async () => {
    if (nickname.trim().length < 3) {
      setError('Введите игровой ник (минимум 3 символа)');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(PAYMENT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tariff: tariff?.name,
          nickname: nickname.trim(),
          returnUrl: window.location.origin,
        }),
      });
      const data = await res.json();
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      } else {
        setError(data.error || 'Не удалось создать платёж');
        setLoading(false);
      }
    } catch {
      setError('Ошибка соединения. Попробуйте позже');
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!tariff} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-3xl glass">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-black text-white">
            Покупка {tariff?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
            <span className="font-semibold text-white">Привилегия {tariff?.name}</span>
            <span className="font-display text-2xl font-black text-primary">{tariff?.price}</span>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-white">Игровой ник</label>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
              placeholder="Ник, на который выдать привилегию"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Убедись, что ник написан правильно — привилегия выдаётся автоматически
            </p>
          </div>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          <Button
            onClick={pay}
            disabled={loading}
            className="h-12 w-full rounded-xl text-base font-bold"
          >
            {loading ? (
              <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
            ) : (
              <Icon name="CreditCard" className="mr-2" size={18} />
            )}
            {loading ? 'Создаём платёж...' : 'Перейти к оплате'}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Оплата картой, СБП или кошельком через ЮKassa
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mb-14 text-center">
      <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
      <h2 className="mt-3 font-display text-4xl font-black text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-lg text-muted-foreground">{sub}</p>
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
        <Button className="rounded-xl font-bold">
          <Icon name="User" className="mr-2" size={18} />
          {loggedIn ? 'Кабинет' : 'Войти'}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl glass">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-black text-white">
            {loggedIn ? 'Личный кабинет' : 'Вход игрока'}
          </DialogTitle>
        </DialogHeader>

        {loggedIn ? (
          <div className="space-y-5">
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-600">
                <Icon name="User" className="text-primary-foreground" size={32} />
              </div>
              <div>
                <div className="text-lg font-bold text-white">{nick}</div>
                <div className="text-sm font-semibold text-secondary">Статус: VIP</div>
                <div className="text-sm text-muted-foreground">Баланс: 1 250 ₽</div>
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Мои покупки
              </div>
              <div className="space-y-2.5">
                {[
                  { n: 'VIP привилегия', d: '01.06.2026', s: 'Активна' },
                  { n: 'Кит ресурсов', d: '12.06.2026', s: 'Активна' },
                ].map((o) => (
                  <div
                    key={o.n}
                    className="flex items-center justify-between rounded-xl bg-white/5 p-4 text-sm"
                  >
                    <div>
                      <div className="font-semibold text-white">{o.n}</div>
                      <div className="text-xs text-muted-foreground">{o.d}</div>
                    </div>
                    <span className="flex items-center gap-1.5 font-semibold text-primary">
                      <Icon name="CircleCheck" size={16} /> {o.s}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-xl border-white/20 bg-white/5"
              onClick={() => setLoggedIn(false)}
            >
              <Icon name="LogOut" className="mr-2" size={16} /> Выйти
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white">Игровой ник</label>
              <input
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
                placeholder="Введите ник"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white">Пароль</label>
              <input
                type="password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
              />
            </div>
            <Button
              className="w-full rounded-xl text-base font-bold"
              onClick={() => setLoggedIn(true)}
            >
              Войти в игру
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Нет аккаунта? Зарегистрируйся прямо на сервере
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}