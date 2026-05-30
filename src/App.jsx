import React, { useState, useEffect, useRef } from 'react';
import { 
  BrainCircuit, Battery, Activity, Factory, Building, 
  Home, ChevronRight, AlertTriangle, MessageSquare, 
  Cpu, RefreshCw, X, Send, CheckCircle, Zap,
  Plug, ZapOff, Sun, ArrowRight, Shield, Clock, 
  Server, CheckCircle2, XCircle, Award, Fuel,
  Maximize2, Minimize2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const energyData = [
  { time: '00:00', load: 30, prediction: 32 },
  { time: '04:00', load: 20, prediction: 25 },
  { time: '08:00', load: 65, prediction: 60 },
  { time: '12:00', load: 85, prediction: 90 }, 
  { time: '16:00', load: 70, prediction: 65 },
  { time: '20:00', load: 95, prediction: 98 }, 
  { time: '23:59', load: 45, prediction: 45 },
];

// --- ВДОСКОНАЛЕНИЙ КОМПОНЕНТ: 3D БУДИНОК (ІДЕАЛЬНИЙ ДВОСКАТНИЙ ДАХ) ---
const SmartHome3D = () => {
  const [powerMode, setPowerMode] = useState('grid'); 

  const getStyles = () => {
    if (powerMode === 'grid') return { 
      color: 'bg-white', coreGlow: 'shadow-[0_0_50px_rgba(255,255,255,0.8)]', 
      text: 'Міська мережа', desc: 'Живлення від загальної мережі. Батареї заряджаються за найнижчим тарифом.', textCol: 'text-white',
      wallBorder: 'border-white/20', windowGlow: 'bg-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]', baseGlow: 'bg-white/10',
      doorLight: 'bg-white shadow-[0_0_8px_white]',
      roofGradient: 'from-[#020617] to-[#1e293b]/80', roofGable: 'from-[#020617]/80 to-white/5'
    };
    if (powerMode === 'battery') return { 
      color: 'bg-emerald-400', coreGlow: 'shadow-[0_0_70px_rgba(52,211,153,0.9)]', 
      text: 'Резервні батареї', desc: 'Блекаут. Система миттєво перемкнула обʼєкт на резервне живлення. Світло не зникало.', textCol: 'text-emerald-400',
      wallBorder: 'border-emerald-500/40', windowGlow: 'bg-emerald-400/20 shadow-[inset_0_0_20px_rgba(52,211,153,0.3)]', baseGlow: 'bg-emerald-500/10',
      doorLight: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
      roofGradient: 'from-[#020617] to-emerald-950/80', roofGable: 'from-[#020617]/80 to-emerald-900/20'
    };
    return { 
      color: 'bg-cyan-400', coreGlow: 'shadow-[0_0_90px_rgba(34,211,238,0.9)] animate-pulse', 
      text: 'AI Оптимізація', desc: 'Пікові години. AI продає надлишок енергії або використовує батареї для максимальної економії.', textCol: 'text-cyan-400',
      wallBorder: 'border-cyan-500/50', windowGlow: 'bg-cyan-400/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.3)]', baseGlow: 'bg-cyan-500/20',
      doorLight: 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]',
      roofGradient: 'from-[#020617] to-cyan-950/80', roofGable: 'from-[#020617]/80 to-cyan-900/20'
    };
  };

  const s = getStyles();

  // Вікна з рамками
  const WindowPane = () => (
    <div className={`w-full h-full border border-white/10 ${s.windowGlow} transition-all duration-700 flex flex-col gap-[1px] p-[1px]`}>
        <div className="w-full h-1/2 border-b border-white/10"></div>
        <div className="w-full h-1/2"></div>
    </div>
  );

  const wallClass = `absolute inset-0 bg-gradient-to-t from-[#020617] to-[#020617]/60 backdrop-blur-[3px] border ${s.wallBorder} transition-colors duration-700`;
  
  // Геометрія двоскатного даху
  const roofSideClass = `absolute bottom-0 left-0 w-[160px] h-[114px] origin-bottom bg-gradient-to-t ${s.roofGradient} backdrop-blur-md border ${s.wallBorder} transition-colors duration-700`;
  const roofGableClass = `absolute bottom-0 left-0 w-[160px] h-[80px] origin-bottom [clip-path:polygon(50%_0,0_100%,100%_100%)] bg-gradient-to-t ${s.roofGable} backdrop-blur-[3px] transition-colors duration-700 border-b ${s.wallBorder}`;

  return (
    <div className="flex flex-col items-center justify-center py-6 perspective-[1500px] w-full max-w-5xl mx-auto">
      
      {/* КНОПКИ КЕРУВАННЯ */}
      <div className="flex flex-col md:flex-row gap-4 mb-32 w-full justify-center px-4 z-10 relative">
        <button 
          onClick={() => setPowerMode('grid')}
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 flex-1 md:flex-none justify-center
            ${powerMode === 'grid' ? 'bg-white/10 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-transparent border-white/5 hover:border-white/20'}`}
        >
          <Plug className={`w-5 h-5 ${powerMode === 'grid' ? 'text-white' : 'text-gray-500'}`} />
          <div className="text-left hidden sm:block">
            <div className={`text-sm font-bold ${powerMode === 'grid' ? 'text-white' : 'text-gray-400'}`}>Стабільний стан</div>
            <div className="text-xs text-gray-500">Міська мережа</div>
          </div>
        </button>

        <button 
          onClick={() => setPowerMode('battery')}
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 flex-1 md:flex-none justify-center
            ${powerMode === 'battery' ? 'bg-emerald-400/10 border-emerald-400/40 shadow-[0_0_20px_rgba(52,211,153,0.1)]' : 'bg-transparent border-white/5 hover:border-emerald-400/20'}`}
        >
          <ZapOff className={`w-5 h-5 ${powerMode === 'battery' ? 'text-emerald-400' : 'text-gray-500'}`} />
          <div className="text-left hidden sm:block">
            <div className={`text-sm font-bold ${powerMode === 'battery' ? 'text-emerald-400' : 'text-gray-400'}`}>Блекаут</div>
            <div className="text-xs text-gray-500">Авто-перемикання</div>
          </div>
        </button>

        <button 
          onClick={() => setPowerMode('ai')}
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 flex-1 md:flex-none justify-center
            ${powerMode === 'ai' ? 'bg-cyan-400/10 border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-transparent border-white/5 hover:border-cyan-400/20'}`}
        >
          <Sun className={`w-5 h-5 ${powerMode === 'ai' ? 'text-cyan-400' : 'text-gray-500'}`} />
          <div className="text-left hidden sm:block">
            <div className={`text-sm font-bold ${powerMode === 'ai' ? 'text-cyan-400' : 'text-gray-400'}`}>Пікове навантаження</div>
            <div className="text-xs text-gray-500">AI економія</div>
          </div>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-40 w-full justify-center relative">
        
        {/* ІНФОРМАЦІЙНИЙ БЛОК */}
        <div className="lg:w-1/3 text-center lg:text-left z-10 min-h-[120px] lg:min-h-0 order-2 lg:order-1 px-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 text-xs font-bold uppercase tracking-wider transition-colors duration-500
            ${powerMode === 'battery' ? 'border-emerald-400/30 text-emerald-400 bg-emerald-400/5' : 
              powerMode === 'ai' ? 'border-cyan-400/30 text-cyan-400 bg-cyan-400/5' : 
              'border-white/20 text-white bg-white/5'}`}
          >
            <span className={`w-2 h-2 rounded-full ${powerMode === 'battery' ? 'bg-emerald-400' : powerMode === 'ai' ? 'bg-cyan-400 animate-pulse' : 'bg-white'}`}></span>
            {s.text}
          </div>
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed transition-all duration-500">
            {s.desc}
          </p>
        </div>

        {/* 3D БУДИНОК */}
        {/* Доданий відступ зверху mt-32, щоб дах не ліз на кнопки */}
        <div className="relative mt-32 lg:mt-24 w-[260px] h-[260px] lg:w-[350px] lg:h-[350px] flex items-center justify-center order-1 lg:order-2 shrink-0">
          <div className="relative w-[160px] h-[120px] [transform-style:preserve-3d] [transform:scale(1.6)_rotateX(-15deg)_rotateY(-45deg)] lg:[transform:scale(2.2)_rotateX(-15deg)_rotateY(-45deg)] transition-transform duration-1000 hover:[transform:scale(1.6)_rotateX(-10deg)_rotateY(-35deg)] lg:hover:[transform:scale(2.2)_rotateX(-10deg)_rotateY(-35deg)] cursor-crosshair">

            {/* ПІДЛОГА / СІТКА */}
            <div className="absolute top-[40px] left-0 w-[160px] h-[160px] [transform:rotateX(90deg)] flex items-center justify-center [transform-style:preserve-3d]">
                <div className={`absolute w-[240px] h-[240px] rounded-full ${s.baseGlow} blur-[40px] transition-colors duration-1000 opacity-80`}></div>
                <div className="absolute w-[300px] h-[300px] bg-[linear-gradient(to_right,rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(circle_at_center,white_30%,transparent_70%)]"></div>
                <div className={`absolute w-[160px] h-[160px] bg-[#020617] border ${s.wallBorder} transition-colors duration-700 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]`}></div>
            </div>

            {/* AI ЯДРО (Центр) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${s.color} ${s.coreGlow} transition-all duration-700 blur-[8px] opacity-60`}></div>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white transition-colors duration-700 shadow-[0_0_15px_white]`}></div>
            </div>

            {/* ЗАДНЯ СТІНА */}
            <div className={`${wallClass} [transform:rotateY(180deg)_translateZ(80px)] flex items-center justify-center`}>
              <div className="w-24 h-16 bg-[#020617]/80 p-[1px] mb-12 border border-white/10">
                 <WindowPane />
              </div>
            </div>

            {/* ЛІВА СТІНА */}
            <div className={`${wallClass} [transform:rotateY(-90deg)_translateZ(80px)] flex items-center justify-center gap-4`}>
               <div className="w-12 h-16 bg-[#020617]/80 border border-white/10">
                  <WindowPane />
               </div>
               <div className="w-12 h-16 bg-[#020617]/80 border border-white/10">
                  <WindowPane />
               </div>
            </div>

            {/* ПРАВА СТІНА */}
            <div className={`${wallClass} [transform:rotateY(90deg)_translateZ(80px)] flex items-center justify-center gap-4`}>
               <div className="w-12 h-16 bg-[#020617]/80 border border-white/10">
                  <WindowPane />
               </div>
               <div className="w-12 h-16 bg-[#020617]/80 border border-white/10">
                  <WindowPane />
               </div>
            </div>

            {/* ПЕРЕДНЯ СТІНА */}
            <div className={`${wallClass} [transform:translateZ(80px)] flex items-end justify-between px-4 pb-0`}>
                <div className="w-14 h-20 bg-[#020617]/80 mb-6 border border-white/10">
                   <WindowPane />
                </div>
                {/* Сучасні двері */}
                <div className={`w-16 h-24 border-t border-l border-r border-white/10 bg-[#050b14] relative`}>
                    <div className={`w-1.5 h-6 rounded-full ${s.doorLight} transition-colors duration-700 absolute right-2 top-1/2 -translate-y-1/2`}></div>
                </div>
            </div>

            {/* ДВОСКАТНИЙ ДАХ (Gable Roof) */}
            {/* Контейнер даху чітко стоїть на стінах (top: -80px) */}
            <div className="absolute top-[-80px] left-0 w-[160px] h-[80px] [transform-style:preserve-3d]">
                
                {/* Передній фронтон (вертикальний трикутник) */}
                <div className={`${roofGableClass} [transform:translateZ(80px)]`}></div>
                
                {/* Задній фронтон (вертикальний трикутник) */}
                <div className={`${roofGableClass} [transform:rotateY(180deg)_translateZ(80px)]`}></div>
                
                {/* Правий схил даху */}
                <div className={`${roofSideClass} [transform:rotateY(90deg)_translateZ(80px)_rotateX(45deg)]`}></div>
                
                {/* Лівий схил даху */}
                <div className={`${roofSideClass} [transform:rotateY(-90deg)_translateZ(80px)_rotateX(45deg)]`}></div>
                
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- КОМПОНЕНТ: АНІМОВАНА ЛОГІКА AI З КНОПКАМИ ---
const AILogicSection = () => {
  const [step, setStep] = useState(0);
  const [isManual, setIsManual] = useState(false);

  const scenarios = [
    {
      id: 'charge',
      shortTitle: 'Нічний тариф',
      title: "Нічний тариф (23:00 - 07:00)",
      activeSources: ['grid'],
      activeDests: ['battery'],
      log: "> Моніторинг тарифів...\n> Знайдено найнижчий тариф: 1.32 ₴/кВт\n> Дія: Купівля енергії з мережі\n> Маршрутизація: Заряджання резервних батарей на 100%"
    },
    {
      id: 'solar',
      shortTitle: 'Сонячний день',
      title: "Сонячний день (13:00)",
      activeSources: ['sun'],
      activeDests: ['home', 'battery'],
      log: "> Моніторинг генерації...\n> Погода: 100% сонячна активність\n> Дія: Відключення від платної мережі\n> Маршрутизація: Безкоштовне живлення будинку + зарядка резерву"
    },
    {
      id: 'peak',
      shortTitle: 'Піковий тариф',
      title: "Піковий тариф (18:00 - 23:00)",
      activeSources: ['battery'], // Батарея віддає енергію
      activeDests: ['home'],
      log: "> Моніторинг тарифів...\n> Увага! Найдорожчий час: 4.32 ₴/кВт\n> Дія: Блокування споживання з мережі\n> Маршрутизація: Будинок живиться від накопиченої вночі енергії"
    },
    {
      id: 'blackout',
      shortTitle: 'Блекаут',
      title: "Раптовий блекаут",
      activeSources: ['gen'],
      activeDests: ['home', 'battery'],
      log: "> Аналіз системи...\n> Мережа: 0V (Відключення). Батарея: низький заряд.\n> Дія: Автоматичний старт генератора\n> Маршрутизація: Безперебійне живлення будинку + підзарядка батареї"
    }
  ];

  useEffect(() => {
    if (isManual) return; // Зупиняє автоперемикання після ручного кліку
    const interval = setInterval(() => {
      setStep(s => (s + 1) % scenarios.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isManual]);

  const active = scenarios[step];

  const Node = ({ icon: Icon, label, id, colorClass }) => {
    const isSource = active.activeSources.includes(id);
    const isDest = active.activeDests.includes(id);
    const isActive = isSource || isDest;
    
    return (
      <div className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-500 w-36 md:w-40 text-center relative
        ${isActive ? `border-white/30 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-105` : 'border-white/5 opacity-30 grayscale'}
      `}>
        <Icon className={`w-8 h-8 md:w-10 md:h-10 ${isActive ? colorClass : 'text-gray-500'} transition-colors duration-500`} />
        <span className={`text-xs md:text-sm font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
          {label}
        </span>
        {/* Підказки стану для батареї */}
        {id === 'battery' && isActive && isSource && <span className="absolute -bottom-6 text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded-full">Віддає заряд</span>}
        {id === 'battery' && isActive && isDest && <span className="absolute -bottom-6 text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded-full">Накопичує</span>}
      </div>
    );
  };

  return (
    <section id="logic" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Як AI керує енергією</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Автоматичні сценарії роботи системи в реальному часі.</p>
      </div>

      {/* КНОПКИ РУЧНОГО ПЕРЕМИКАННЯ */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-10">
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => {
              setStep(idx);
              setIsManual(true);
            }}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
              step === idx 
                ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-cyan-500/50 hover:text-white'
            }`}
          >
            {sc.shortTitle}
          </button>
        ))}
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden shadow-2xl">
        {/* Анімація для ліній потоку даних */}
        <style>{`
          @keyframes flow-down {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          .animate-flow-down { animation: flow-down 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        `}</style>

        {/* Заголовок та термінал */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 relative z-10">
           <div>
              <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-2">Поточний алгоритм</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white transition-all">{active.title}</h3>
           </div>
           
           <div className="w-full md:w-1/2 bg-[#050505] border border-white/10 rounded-2xl p-5 font-mono text-xs md:text-sm text-emerald-400 h-32 flex flex-col justify-center shadow-inner relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
             {active.log.split('\n').map((line, i) => (
                <div key={i} className="mb-1.5 opacity-90">{line}</div>
             ))}
           </div>
        </div>

        {/* Схема маршрутизації */}
        <div className="flex flex-col items-center gap-4 relative z-10">
            {/* Верхній ряд: Джерела */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-10 w-full z-20">
               <Node id="grid" icon={Plug} label="Міська мережа" colorClass="text-white" />
               <Node id="sun" icon={Sun} label="Сонячні панелі" colorClass="text-yellow-400" />
               <Node id="gen" icon={Factory} label="Генератор" colorClass="text-red-400" />
            </div>

            {/* Лінії потоку ВНИЗ (в ядро) */}
            <div className="h-16 w-full flex justify-center relative">
               {(active.activeSources.includes('grid') || active.activeSources.includes('sun') || active.activeSources.includes('gen')) && (
                 <div className="w-[2px] h-full bg-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-400 animate-flow-down shadow-[0_0_10px_#22d3ee]"></div>
                 </div>
               )}
            </div>

            {/* Центр: AI Мозок */}
            <div className="relative group z-20">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full transition-all duration-500"></div>
              <div className="w-40 h-40 md:w-48 md:h-48 bg-black border-2 border-cyan-500/40 rounded-full flex flex-col items-center justify-center relative z-10 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                <div className="absolute inset-[-4px] rounded-full border border-cyan-500/20 animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-[-10px] rounded-full border-t border-cyan-400/50 animate-[spin_6s_linear_infinite_reverse]"></div>
                <BrainCircuit className="w-12 h-12 md:w-16 md:h-16 text-cyan-400 mb-2 animate-pulse" />
                <h3 className="font-bold text-white text-base md:text-lg">AI Core</h3>
              </div>
            </div>

            {/* Лінії потоку ВНИЗ (з ядра) */}
            <div className="h-16 w-full flex justify-center relative">
                 <div className="w-[2px] h-full bg-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-400 animate-flow-down shadow-[0_0_10px_#22d3ee]"></div>
                 </div>
            </div>

            {/* Нижній ряд: Споживачі/Накопичувачі */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-10 w-full z-20 mt-4">
               <Node id="home" icon={Home} label="Ваш Будинок" colorClass="text-cyan-400" />
               <Node id="battery" icon={Battery} label="Батарейний блок" colorClass="text-emerald-400" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [space, setSpace] = useState(150);
  const [consumption, setConsumption] = useState(800);
  const [hasGenerator, setHasGenerator] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Стейт для чат-бота
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Вітаю! Я цифровий AI-консультант. Допоможу розібратись із вартістю, обладнанням або технічними деталями. Що вас цікавить?' }
  ]);
  const chatEndRef = useRef(null);

  const monthlySavingsUAH = Math.round((consumption * 0.35) * 7.8);
  const generatorFuelSavedLiters = hasGenerator ? Math.round(consumption * 0.12) : 0;
  const totalSavings = monthlySavingsUAH + (generatorFuelSavedLiters * 60);
  const roiMonths = Math.round(45000 / totalSavings); 

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isChatOpen, isChatExpanded]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
    }, 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    const userMsg = chatMessage.trim();
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatMessage("");

    const lowerMsg = userMsg.toLowerCase();

    setTimeout(() => {
      let aiResponse = "";
      
      const isConflict = /(не працює|помилка|скарга|погано|зламалося|проблема|менеджер|оператор|людина|шахрай)/.test(lowerMsg);
      const isPrice = /(ціна|вартість|коштує|гроші|дорого|прайс)/.test(lowerMsg);
      const isTech = /(генератор|екофлоу|ecoflow|батаре|акумулятор|сонячн)/.test(lowerMsg);

      if (isConflict) {
        aiResponse = "Розумію вашу ситуацію. Для оперативного вирішення цього питання або детальної технічної підтримки, будь ласка, зателефонуйте нашому черговому інженеру за номером: +38 (0800) 123-456. Ми завжди на зв'язку і готові допомогти.";
      } else if (isPrice) {
        aiResponse = "Вартість системи AI Energy Recovery розраховується індивідуально і залежить від вашого поточного споживання та обладнання. Базові рішення стартують від 45,000 грн. Ви можете скористатися калькулятором на сайті або залишити заявку для точного розрахунку під ключ.";
      } else if (isTech) {
        aiResponse = "Наша система є універсальною. Вона безшовно об'єднує ваші існуючі генератори, зарядні станції (EcoFlow, Bluetti) та сонячні панелі в єдину смарт-мережу. AI контролер сам вирішує, коли вигідно заряджати батареї, а коли — безпечно запускати генератор.";
      } else {
        aiResponse = "Дякую за запитання! Щоб надати вам найбільш точну і фахову відповідь, мені потрібно трохи більше деталей про ваш об'єкт. Ви можете залишити заявку через кнопку «Портал клієнта» або зателефонувати нам безпосередньо: +38 (0800) 123-456.";
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* ФОНОВІ ЕФЕКТИ */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[1200px] right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[180px] rounded-full pointer-events-none"></div>

      {/* НАВІГАЦІЯ */}
      <nav className="fixed w-full z-40 top-0 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <BrainCircuit className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold tracking-wider text-white">
              AI ENERGY <span className="text-cyan-400 font-light">RECOVERY</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">Про нас</a>
            <a href="#logic" className="hover:text-cyan-400 transition-colors">Як це працює</a>
            <a href="#dashboard" className="hover:text-cyan-400 transition-colors">Платформа</a>
            <a href="#calculator" className="hover:text-cyan-400 transition-colors">Калькулятор ROI</a>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300">
            Портал клієнта
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-44 pb-24 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-8">
          <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} /> Ядро v2.0 запущено в Україні
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 text-white leading-none">
          Енергія повинна <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-purple-500">
            думати сама.
          </span>
        </h1>
        
        <p className="max-w-3xl text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
          Головна AI-операційна система для вашого бізнесу чи розумного будинку. Прогнозує відключення, автоматично перемикає джерела та оптимізує споживання в реальному часі.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 z-10">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-105 duration-200">
            Замовити демо <ChevronRight className="w-5 h-5" />
          </button>
          <a href="#logic" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full backdrop-blur-sm transition-all text-center">
            Дивитись систему
          </a>
        </div>
      </section>

      {/* ПРО КОМПАНІЮ ТА ДОВІРА */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Більше ніж просто батареї. Ми — ваш інженерний партнер.</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              AI Energy Recovery створює системи, які повністю виключають людський фактор з процесу управління електрикою. Наша місія — дати українському бізнесу та родинам абсолютну стабільність навіть під час найжорсткіших блекаутів.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full bg-cyan-900 border-2 border-black flex items-center justify-center text-xs font-bold">QA</div>
                <div className="w-12 h-12 rounded-full bg-purple-900 border-2 border-black flex items-center justify-center text-xs font-bold">Dev</div>
                <div className="w-12 h-12 rounded-full bg-blue-900 border-2 border-black flex items-center justify-center text-xs font-bold">PM</div>
              </div>
              <p className="text-sm text-gray-400 font-medium">Власна команда розробників в Україні</p>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
              <Shield className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-bold text-white text-xl mb-1">Безпека</h3>
              <p className="text-sm text-gray-400">Шифрування даних та захист обладнання від стрибків</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
              <Award className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-bold text-white text-xl mb-1">Гарантія</h3>
              <p className="text-sm text-gray-400">5 років офіційної гарантії на інтелектуальне ядро</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
              <Clock className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-bold text-white text-xl mb-1">Uptime 99.9%</h3>
              <p className="text-sm text-gray-400">Перемикання на резерв займає менше 15 мілісекунд</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
              <Server className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold text-white text-xl mb-1">Підтримка 24/7</h3>
              <p className="text-sm text-gray-400">Наші сервери моніторять вашу систему цілодобово</p>
            </div>
          </div>
        </div>
      </section>

      {/* НОВА ДИНАМІЧНА СЕКЦІЯ ЛОГІКИ */}
      <AILogicSection />

      {/* ПОРІВНЯННЯ */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Еволюція енергонезалежності</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Чому стандартний підхід "просто купити генератор" більше не працює ефективно.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 opacity-80">
            <div className="flex items-center gap-3 mb-8">
              <XCircle className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold text-white">Звичайний підхід</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-1">—</span>
                <p className="text-gray-400">Ручне перемикання рубильників та запуск генератора в дощ/сніг.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-1">—</span>
                <p className="text-gray-400">Техніка вимикається та перезавантажується при кожному знеструмленні.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-1">—</span>
                <p className="text-gray-400">Неконтрольоване споживання пального та швидке зношення батарей.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-1">—</span>
                <p className="text-gray-400">Стрес і втрачений час для вас чи ваших співробітників.</p>
              </li>
            </ul>
          </div>

          <div className="bg-cyan-950/20 border border-cyan-500/50 rounded-3xl p-8 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
              <h3 className="text-2xl font-bold text-white">AI Energy Recovery</h3>
            </div>
            <ul className="space-y-6 relative z-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-gray-300">Повна автоматизація. Система сама вирішує, коли і що вмикати.</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-gray-300">Безшовне перемикання за <span className="text-white font-bold">15 мс</span>. Телевізори та сервери навіть не клікають.</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-gray-300">Смарт-економія. Заряджає батареї вночі за дешевим тарифом.</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-gray-300">Ви просто насолоджуєтесь життям та керуєте всім зі смартфона.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3D АРХІТЕКТУРА БУДИНКУ */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Як це виглядає на практиці</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">Виберіть сценарій, щоб побачити, як наша система захищає ваш будинок та економить кошти в різних ситуаціях.</p>
        </div>
        <SmartHome3D />
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            
            {/* Ліва колонка: Статуси та управління */}
            <div className="flex-1 flex flex-col justify-between space-y-8">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider mb-3">
                  <Activity className="w-4 h-4" /> Live Аналітика
                </div>
                <h2 className="text-3xl font-extrabold text-white">Усе як на долоні</h2>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  Система балансує навантаження, обираючи найдешевше джерело, а ви бачите це в реальному часі.
                </p>
              </div>

              {/* Головний статус системи */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5 flex items-center gap-4">
                 <div className="p-3 bg-cyan-500/20 rounded-xl shrink-0">
                    <Zap className="w-6 h-6 text-cyan-400" />
                 </div>
                 <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Поточне джерело</div>
                    <div className="text-lg font-bold text-white flex items-center gap-2">
                       Резервні батареї 
                       <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Картка Батареї */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <Battery className="w-4 h-4 text-emerald-400" /> 
                    <span className="text-xs uppercase font-semibold">Ємність</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">84%</div>
                    <div className="text-xs text-emerald-400">Оптимальне розрядження</div>
                  </div>
                </div>

                {/* Картка Генератора */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between opacity-80">
                  <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <RefreshCw className="w-4 h-4 text-gray-500" /> 
                    <span className="text-xs uppercase font-semibold">Генератор</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-400 mb-1">Очікування</div>
                    <div className="text-xs text-gray-500">Пуск заблоковано AI</div>
                  </div>
                </div>
              </div>

              {/* Сповіщення */}
              <div className="bg-[#1a1500] border border-amber-500/30 p-5 rounded-2xl flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-amber-500 mb-1">AI Прогноз Мережі</div>
                  <div className="text-xs text-gray-400 leading-relaxed">
                    Висока ймовірність планового відключення через 45 хв. Заряджаємо батареї від сонця.
                  </div>
                </div>
              </div>
            </div>

            {/* Права колонка: Графік */}
            <div className="flex-[1.2] bg-black border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col min-h-[400px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Поточне споживання</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-white">3.2</span>
                    <span className="text-gray-500 font-medium">кВт</span>
                  </div>
                </div>
                
                {/* Легенда графіка */}
                <div className="flex items-center gap-4 text-xs font-medium bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span> Факт
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-4 h-0.5 border-b-2 border-dashed border-cyan-400"></span> AI Прогноз
                  </div>
                </div>
              </div>

<div className="w-full flex-1 h-[250px] sm:h-[300px] md:h-auto">
  <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                  <AreaChart data={energyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      stroke="#4b5563" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#4b5563" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0d0d0d', borderColor: '#333', borderRadius: '12px', color: '#fff' }} 
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="load" 
                      stroke="#a855f7" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorLoad)" 
                      name="Факт (кВт)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="prediction" 
                      stroke="#22d3ee" 
                      strokeDasharray="5 5" 
                      strokeWidth={2} 
                      dot={false} 
                      name="Прогноз (кВт)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">Створено для будь-якої екосистеми</h2>
          <p className="text-gray-400">Від розумних квартир до індустріальних складів.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Building, title: 'Офіси та IT', desc: 'Нульовий даунтайм серверів. Безшовний перехід між мережею та батареями.' },
            { icon: Factory, title: 'Склади', desc: 'Прогнозування охолодження. Автоматичне зниження потужності некритичних зон.' },
            { icon: Home, title: 'Приватні будинки', desc: 'Повна автоматизація. AI вирішує, коли використовувати сонце, а коли генератор.' }
          ].map((item, idx) => (
             <div key={idx} className="bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 transition-all duration-300 p-8 rounded-3xl group hover:-translate-y-1">
               <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20 text-cyan-400">
                 <item.icon className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
               <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
             </div>
          ))}
        </div>
      </section>

      {/* РОЗШИРЕНИЙ CALCULATOR */}
      <section id="calculator" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Детальний розрахунок економії</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Дізнайтеся, скільки ви зможете заощадити завдяки оптимізації тарифів, накопиченню енергії вночі та відмові від пального для генератора.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 relative z-10">
            <div className="flex-1 space-y-10">
              
              <div className="bg-black/20 p-6 rounded-3xl border border-white/5">
                <div className="flex justify-between mb-4">
                  <label className="text-gray-300 font-medium">Площа об'єкта</label>
                  <span className="font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-lg">{space} м²</span>
                </div>
                <input type="range" min="30" max="1500" value={space} onChange={(e) => setSpace(Number(e.target.value))} className="w-full accent-cyan-400 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer" />
              </div>
              
              <div className="bg-black/20 p-6 rounded-3xl border border-white/5">
                <div className="flex justify-between mb-4">
                  <label className="text-gray-300 font-medium">Середнє споживання</label>
                  <span className="font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-lg">{consumption} кВт·год/міс</span>
                </div>
                <input type="range" min="100" max="5000" value={consumption} onChange={(e) => setConsumption(Number(e.target.value))} className="w-full accent-cyan-400 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer" />
              </div>

              <div className="flex items-center gap-4 bg-white/[0.02] border border-white/10 p-5 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setHasGenerator(!hasGenerator)}>
                <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${hasGenerator ? 'bg-cyan-500 border-cyan-500' : 'border-gray-500'}`}>
                  {hasGenerator && <CheckCircle2 className="w-4 h-4 text-black" />}
                </div>
                <div>
                  <h4 className="text-white font-medium">У мене є паливний генератор</h4>
                  <p className="text-xs text-gray-500 mt-1">Додає розрахунок економії на бензині/дизелі</p>
                </div>
              </div>

              <div className="bg-cyan-900/10 border border-cyan-500/20 p-6 rounded-2xl flex gap-4">
                <BrainCircuit className="w-6 h-6 text-cyan-400 shrink-0" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  <strong className="text-gray-200 block mb-1">Як розраховується прибуток:</strong> 
                  AI автоматично купує енергію в мережі під час дії найдешевшого "нічного тарифу" і зберігає її в батареях. Вдень, коли тарифи максимальні (або під час блекаутів), об'єкт живиться від накопиченого резерву, зводячи витрати до мінімуму.
                </p>
              </div>

            </div>

            <div className="flex-1 bg-black/60 border border-white/10 p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="space-y-10 relative z-10">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">Прогнозована економія</p>
                  <div className="flex items-end gap-2">
                    <p className="text-5xl md:text-6xl font-black text-cyan-400">~ {totalSavings.toLocaleString()}</p>
                    <span className="text-xl text-cyan-400/50 font-bold mb-1">₴ / міс</span>
                  </div>
                  {hasGenerator && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-lg w-max">
                      <Fuel className="w-4 h-4" /> Враховано {generatorFuelSavedLiters} л збереженого пального
                    </div>
                  )}
                </div>

                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>

                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">Приблизна окупність (ROI)</p>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl md:text-5xl font-black text-white">~ {roiMonths}</p>
                    <span className="text-lg text-gray-500 font-bold mb-1">місяців</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 max-w-xs">Час, за який система повністю поверне свою вартість за рахунок різниці тарифів.</p>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-5 bg-white hover:bg-gray-200 text-black text-lg font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
                >
                  Отримати точний кошторис <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black/40 py-12 text-center text-gray-500 text-sm">
        <p>© 2026 AI Energy Recovery. Україна.</p>
      </footer>

      {/* Віджет Чату */}
      {isChatOpen && (
        <div className={`bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 transition-all duration-300 z-[100]
          ${isChatExpanded ? 'fixed inset-4 md:inset-10 rounded-3xl' : 'fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] rounded-2xl'}`}
        >
          <div className="bg-cyan-500/10 border-b border-white/10 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-sm text-white">AI Консультант</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsChatExpanded(!isChatExpanded)} className="text-gray-400 hover:text-white transition-colors" title="Розгорнути/Згорнути">
                {isChatExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Скролбар для темної теми */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 transition-all">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${msg.sender === 'user' ? 'bg-cyan-500 text-black rounded-br-none' : 'bg-white/10 text-gray-200 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2 shrink-0">
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Напишіть повідомлення..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button type="submit" className="bg-cyan-500 px-4 py-3 rounded-xl text-black hover:bg-cyan-400 transition-colors">
              <Send className="w-5 h-5"/>
            </button>
          </form>
        </div>
      )}

      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-transform hover:scale-110"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-md rounded-3xl p-8 relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white">Заявка прийнята!</h3>
                <p className="text-gray-400 text-sm">Ми зв'яжемося з вами найближчим часом для обговорення деталей.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Залишити заявку</h3>
                <p className="text-gray-400 text-sm mb-6">Отримайте доступ до демо-версії системи та індивідуальний розрахунок.</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Ім'я</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Олександр" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Номер телефону</label>
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="+38 (000) 000-00-00" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Компанія / Об'єкт</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="ТОВ Спектр або Приватний будинок" />
                  </div>
                  
                  <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3.5 rounded-xl transition-colors mt-4">
                    Надіслати запит
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}