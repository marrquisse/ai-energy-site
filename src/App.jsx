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

  const WindowPane = () => (
    <div className={`w-full h-full border border-white/10 ${s.windowGlow} transition-all duration-700 flex flex-col gap-[1px] p-[1px]`}>
        <div className="w-full h-1/2 border-b border-white/10"></div>
        <div className="w-full h-1/2"></div>
    </div>
  );

  const wallClass = `absolute inset-0 bg-gradient-to-t from-[#020617] to-[#020617]/60 backdrop-blur-[3px] border ${s.wallBorder} transition-colors duration-700`;
  
  const roofSideClass = `absolute bottom-0 left-0 w-[160px] h-[114px] origin-bottom bg-gradient-to-t ${s.roofGradient} backdrop-blur-md border ${s.wallBorder} transition-colors duration-700`;
  const roofGableClass = `absolute bottom-0 left-0 w-[160px] h-[80px] origin-bottom [clip-path:polygon(50%_0,0_100%,100%_100%)] bg-gradient-to-t ${s.roofGable} backdrop-blur-[3px] transition-colors duration-700 border-b ${s.wallBorder}`;

  return (
    <div className="flex flex-col items-center justify-center py-6 perspective-[1500px] w-full max-w-5xl mx-auto">
      
      {/* АДАПТОВАНІ КНОПКИ КЕРУВАННЯ ДЛЯ МОБІЛКИ */}
      <div className="grid grid-cols-3 md:flex md:flex-row gap-2 md:gap-4 mb-20 md:mb-32 w-full justify-center px-2 md:px-4 z-10 relative">
        <button 
          onClick={() => setPowerMode('grid')}
          className={`flex flex-col md:flex-row items-center gap-1.5 md:gap-3 p-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-300 flex-1 md:flex-none justify-center
            ${powerMode === 'grid' ? 'bg-white/10 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-transparent border-white/5 hover:border-white/20'}`}
        >
          <Plug className={`w-5 h-5 md:w-5 md:h-5 ${powerMode === 'grid' ? 'text-white' : 'text-gray-500'}`} />
          <div className="text-center md:text-left block">
            <div className={`text-[10px] md:text-sm font-bold leading-tight ${powerMode === 'grid' ? 'text-white' : 'text-gray-400'}`}>Мережа</div>
            <div className="text-xs text-gray-500 hidden md:block">Стабільний стан</div>
          </div>
        </button>

        <button 
          onClick={() => setPowerMode('battery')}
          className={`flex flex-col md:flex-row items-center gap-1.5 md:gap-3 p-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-300 flex-1 md:flex-none justify-center
            ${powerMode === 'battery' ? 'bg-emerald-400/10 border-emerald-400/40 shadow-[0_0_20px_rgba(52,211,153,0.1)]' : 'bg-transparent border-white/5 hover:border-emerald-400/20'}`}
        >
          <ZapOff className={`w-5 h-5 md:w-5 md:h-5 ${powerMode === 'battery' ? 'text-emerald-400' : 'text-gray-500'}`} />
          <div className="text-center md:text-left block">
            <div className={`text-[10px] md:text-sm font-bold leading-tight ${powerMode === 'battery' ? 'text-emerald-400' : 'text-gray-400'}`}>Блекаут</div>
            <div className="text-xs text-gray-500 hidden md:block">Авто-перемикання</div>
          </div>
        </button>

        <button 
          onClick={() => setPowerMode('ai')}
          className={`flex flex-col md:flex-row items-center gap-1.5 md:gap-3 p-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-300 flex-1 md:flex-none justify-center
            ${powerMode === 'ai' ? 'bg-cyan-400/10 border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-transparent border-white/5 hover:border-cyan-400/20'}`}
        >
          <Sun className={`w-5 h-5 md:w-5 md:h-5 ${powerMode === 'ai' ? 'text-cyan-400' : 'text-gray-500'}`} />
          <div className="text-center md:text-left block">
            <div className={`text-[10px] md:text-sm font-bold leading-tight ${powerMode === 'ai' ? 'text-cyan-400' : 'text-gray-400'}`}>AI Економія</div>
            <div className="text-xs text-gray-500 hidden md:block">Пікове навантаження</div>
          </div>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-40 w-full justify-center relative">
        
        <div className="lg:w-1/3 text-center lg:text-left z-10 min-h-[100px] lg:min-h-0 order-2 lg:order-1 px-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 md:mb-4 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-500
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

        <div className="relative mt-24 lg:mt-24 w-[240px] h-[240px] lg:w-[350px] lg:h-[350px] flex items-center justify-center order-1 lg:order-2 shrink-0">
          <div className="relative w-[160px] h-[120px] [transform-style:preserve-3d] [transform:scale(1.4)_rotateX(-15deg)_rotateY(-45deg)] md:[transform:scale(1.6)_rotateX(-15deg)_rotateY(-45deg)] lg:[transform:scale(2.2)_rotateX(-15deg)_rotateY(-45deg)] transition-transform duration-1000 hover:[transform:scale(1.5)_rotateX(-10deg)_rotateY(-35deg)] lg:hover:[transform:scale(2.2)_rotateX(-10deg)_rotateY(-35deg)] cursor-crosshair">

            <div className="absolute top-[40px] left-0 w-[160px] h-[160px] [transform:rotateX(90deg)] flex items-center justify-center [transform-style:preserve-3d]">
                <div className={`absolute w-[240px] h-[240px] rounded-full ${s.baseGlow} blur-[40px] transition-colors duration-1000 opacity-80`}></div>
                <div className="absolute w-[300px] h-[300px] bg-[linear-gradient(to_right,rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(circle_at_center,white_30%,transparent_70%)]"></div>
                <div className={`absolute w-[160px] h-[160px] bg-[#020617] border ${s.wallBorder} transition-colors duration-700 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]`}></div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${s.color} ${s.coreGlow} transition-all duration-700 blur-[8px] opacity-60`}></div>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white transition-colors duration-700 shadow-[0_0_15px_white]`}></div>
            </div>

            <div className={`${wallClass} [transform:rotateY(180deg)_translateZ(80px)] flex items-center justify-center`}>
              <div className="w-24 h-16 bg-[#020617]/80 p-[1px] mb-12 border border-white/10">
                 <WindowPane />
              </div>
            </div>

            <div className={`${wallClass} [transform:rotateY(-90deg)_translateZ(80px)] flex items-center justify-center gap-4`}>
               <div className="w-12 h-16 bg-[#020617]/80 border border-white/10">
                  <WindowPane />
               </div>
               <div className="w-12 h-16 bg-[#020617]/80 border border-white/10">
                  <WindowPane />
               </div>
            </div>

            <div className={`${wallClass} [transform:rotateY(90deg)_translateZ(80px)] flex items-center justify-center gap-4`}>
               <div className="w-12 h-16 bg-[#020617]/80 border border-white/10">
                  <WindowPane />
               </div>
               <div className="w-12 h-16 bg-[#020617]/80 border border-white/10">
                  <WindowPane />
               </div>
            </div>

            <div className={`${wallClass} [transform:translateZ(80px)] flex items-end justify-between px-4 pb-0`}>
                <div className="w-14 h-20 bg-[#020617]/80 mb-6 border border-white/10">
                   <WindowPane />
                </div>
                <div className={`w-16 h-24 border-t border-l border-r border-white/10 bg-[#050b14] relative`}>
                    <div className={`w-1.5 h-6 rounded-full ${s.doorLight} transition-colors duration-700 absolute right-2 top-1/2 -translate-y-1/2`}></div>
                </div>
            </div>

            <div className="absolute top-[-80px] left-0 w-[160px] h-[80px] [transform-style:preserve-3d]">
                <div className={`${roofGableClass} [transform:translateZ(80px)]`}></div>
                <div className={`${roofGableClass} [transform:rotateY(180deg)_translateZ(80px)]`}></div>
                <div className={`${roofSideClass} [transform:rotateY(90deg)_translateZ(80px)_rotateX(45deg)]`}></div>
                <div className={`${roofSideClass} [transform:rotateY(-90deg)_translateZ(80px)_rotateX(45deg)]`}></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

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
      activeSources: ['battery'], 
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
    if (isManual) return;
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
      // АДАПТАЦІЯ ДЛЯ МОБІЛКИ: Гнучка ширина w-[30%] замість фіксованої, щоб 3 вузли влазили в ряд
      <div className={`flex flex-col items-center justify-center gap-1.5 md:gap-3 p-2 md:p-5 rounded-xl md:rounded-2xl border transition-all duration-500 w-[31%] sm:w-36 md:w-40 text-center relative
        ${isActive ? `border-white/30 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-105` : 'border-white/5 opacity-30 grayscale'}
      `}>
        <Icon className={`w-6 h-6 md:w-10 md:h-10 ${isActive ? colorClass : 'text-gray-500'} transition-colors duration-500`} />
        <span className={`text-[10px] md:text-sm font-bold leading-tight ${isActive ? 'text-white' : 'text-gray-500'}`}>
          {label}
        </span>
        {id === 'battery' && isActive && isSource && <span className="absolute -bottom-5 md:-bottom-6 text-[8px] md:text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 md:py-1 rounded-full whitespace-nowrap">Віддає заряд</span>}
        {id === 'battery' && isActive && isDest && <span className="absolute -bottom-5 md:-bottom-6 text-[8px] md:text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 md:py-1 rounded-full whitespace-nowrap">Накопичує</span>}
      </div>
    );
  };

  return (
    <section id="logic" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 md:mb-4">Як AI керує енергією</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg">Автоматичні сценарії роботи системи в реальному часі.</p>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10 relative z-10 px-2">
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => {
              setStep(idx);
              setIsManual(true);
            }}
            className={`px-2 py-2.5 md:px-6 md:py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-bold transition-all duration-300 border text-center ${
              step === idx 
                ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-cyan-500/50 hover:text-white'
            }`}
          >
            {sc.shortTitle}
          </button>
        ))}
      </div>

      {/* Зменшено padding на мобілках */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-12 relative overflow-hidden shadow-2xl">
        <style>{`
          @keyframes flow-down {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          .animate-flow-down { animation: flow-down 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        `}</style>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 gap-4 md:gap-6 relative z-10">
           <div>
              <p className="text-cyan-400 text-[10px] md:text-sm font-bold uppercase tracking-widest mb-1 md:mb-2">Поточний алгоритм</p>
              <h3 className="text-xl md:text-3xl font-bold text-white transition-all">{active.title}</h3>
           </div>
           
           <div className="w-full md:w-1/2 bg-[#050505] border border-white/10 rounded-2xl p-4 md:p-5 font-mono text-[10px] sm:text-xs md:text-sm text-emerald-400 h-28 sm:h-32 flex flex-col justify-center shadow-inner relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
             {active.log.split('\n').map((line, i) => (
                <div key={i} className="mb-1 md:mb-1.5 opacity-90 leading-tight">{line}</div>
             ))}
           </div>
        </div>

        <div className="flex flex-col items-center gap-3 md:gap-4 relative z-10">
            {/* АДАПТОВАНА ВЕРХНЯ ПАНЕЛЬ: 3 вузли завжди в ряд на телефоні */}
            <div className="flex justify-between sm:justify-center gap-1 sm:gap-4 md:gap-10 w-full z-20 px-1 sm:px-0">
               <Node id="grid" icon={Plug} label="Міська мережа" colorClass="text-white" />
               <Node id="sun" icon={Sun} label="Сонячні панелі" colorClass="text-yellow-400" />
               <Node id="gen" icon={Factory} label="Генератор" colorClass="text-red-400" />
            </div>

            <div className="h-10 md:h-16 w-full flex justify-center relative">
               {(active.activeSources.includes('grid') || active.activeSources.includes('sun') || active.activeSources.includes('gen')) && (
                 <div className="w-[2px] h-full bg-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-400 animate-flow-down shadow-[0_0_10px_#22d3ee]"></div>
                 </div>
               )}
            </div>

            {/* Зменшено розмір AI ядра на телефонах */}
            <div className="relative group z-20">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl md:blur-3xl rounded-full transition-all duration-500"></div>
              <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-black border-2 border-cyan-500/40 rounded-full flex flex-col items-center justify-center relative z-10 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                <div className="absolute inset-[-4px] rounded-full border border-cyan-500/20 animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-[-8px] md:inset-[-10px] rounded-full border-t border-cyan-400/50 animate-[spin_6s_linear_infinite_reverse]"></div>
                <BrainCircuit className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-cyan-400 mb-1 md:mb-2 animate-pulse" />
                <h3 className="font-bold text-white text-xs sm:text-base md:text-lg">AI Core</h3>
              </div>
            </div>

            <div className="h-10 md:h-16 w-full flex justify-center relative">
                 <div className="w-[2px] h-full bg-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-400 animate-flow-down shadow-[0_0_10px_#22d3ee]"></div>
                 </div>
            </div>

            <div className="flex justify-center gap-4 md:gap-10 w-full z-20 mt-2 md:mt-4">
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
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[1200px] right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[180px] rounded-full pointer-events-none"></div>

      <nav className="fixed w-full z-40 top-0 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
            <BrainCircuit className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
            <span className="text-lg md:text-xl font-bold tracking-wider text-white">
              AI ENERGY <span className="text-cyan-400 font-light hidden sm:inline">RECOVERY</span>
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
            className="bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300">
            Портал клієнта
          </button>
        </div>
      </nav>

      <section className="relative pt-32 md:pt-44 pb-16 md:pb-24 px-4 md:px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-6 md:mb-8">
          <Cpu className="w-3 h-3 md:w-3.5 md:h-3.5 animate-spin" style={{ animationDuration: '3s' }} /> Ядро v2.0 запущено в Україні
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight mb-6 md:mb-8 text-white leading-tight md:leading-none">
          Енергія повинна <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-purple-500">
            думати сама.
          </span>
        </h1>
        
        <p className="max-w-3xl text-base md:text-xl text-gray-400 mb-10 md:mb-12 leading-relaxed">
          Головна AI-операційна система для вашого бізнесу чи розумного будинку. Прогнозує відключення, автоматично перемикає джерела та оптимізує споживання в реальному часі.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 z-10 w-full sm:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-105 duration-200">
            Замовити демо <ChevronRight className="w-5 h-5" />
          </button>
          <a href="#logic" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full backdrop-blur-sm transition-all text-center">
            Дивитись систему
          </a>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">Більше ніж просто батареї. Ми — ваш інженерний партнер.</h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-lg">
              AI Energy Recovery створює системи, які повністю виключають людський фактор з процесу управління електрикою. Наша місія — дати українському бізнесу та родинам абсолютну стабільність навіть під час найжорсткіших блекаутів.
            </p>
            <div className="flex items-center gap-4 pt-2 md:pt-4">
              <div className="flex -space-x-3 md:-space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-900 border-2 border-black flex items-center justify-center text-[10px] md:text-xs font-bold">QA</div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-900 border-2 border-black flex items-center justify-center text-[10px] md:text-xs font-bold">Dev</div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-900 border-2 border-black flex items-center justify-center text-[10px] md:text-xs font-bold">PM</div>
              </div>
              <p className="text-xs md:text-sm text-gray-400 font-medium">Власна команда розробників в Україні</p>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl backdrop-blur-sm">
              <Shield className="w-7 h-7 md:w-8 md:h-8 text-cyan-400 mb-3 md:mb-4" />
              <h3 className="font-bold text-white text-lg md:text-xl mb-1">Безпека</h3>
              <p className="text-xs md:text-sm text-gray-400">Шифрування даних та захист обладнання від стрибків</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl backdrop-blur-sm">
              <Award className="w-7 h-7 md:w-8 md:h-8 text-purple-400 mb-3 md:mb-4" />
              <h3 className="font-bold text-white text-lg md:text-xl mb-1">Гарантія</h3>
              <p className="text-xs md:text-sm text-gray-400">5 років офіційної гарантії на інтелектуальне ядро</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl backdrop-blur-sm">
              <Clock className="w-7 h-7 md:w-8 md:h-8 text-emerald-400 mb-3 md:mb-4" />
              <h3 className="font-bold text-white text-lg md:text-xl mb-1">Uptime 99.9%</h3>
              <p className="text-xs md:text-sm text-gray-400">Перемикання на резерв займає менше 15 мілісекунд</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl backdrop-blur-sm">
              <Server className="w-7 h-7 md:w-8 md:h-8 text-blue-400 mb-3 md:mb-4" />
              <h3 className="font-bold text-white text-lg md:text-xl mb-1">Підтримка 24/7</h3>
              <p className="text-xs md:text-sm text-gray-400">Наші сервери моніторять вашу систему цілодобово</p>
            </div>
          </div>
        </div>
      </section>

      <AILogicSection />

      <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 md:mb-4">Еволюція енергонезалежності</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg">Чому стандартний підхід "просто купити генератор" більше не працює ефективно.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 opacity-80">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <XCircle className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
              <h3 className="text-xl md:text-2xl font-bold text-white">Звичайний підхід</h3>
            </div>
            <ul className="space-y-4 md:space-y-6">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5 md:mt-1">—</span>
                <p className="text-gray-400 text-sm md:text-base">Ручне перемикання рубильників та запуск генератора в дощ/сніг.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5 md:mt-1">—</span>
                <p className="text-gray-400 text-sm md:text-base">Техніка вимикається та перезавантажується при кожному знеструмленні.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5 md:mt-1">—</span>
                <p className="text-gray-400 text-sm md:text-base">Неконтрольоване споживання пального та швидке зношення батарей.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5 md:mt-1">—</span>
                <p className="text-gray-400 text-sm md:text-base">Стрес і втрачений час для вас чи ваших співробітників.</p>
              </li>
            </ul>
          </div>

          <div className="bg-cyan-950/20 border border-cyan-500/50 rounded-[2rem] p-6 md:p-8 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <div className="flex items-center gap-3 mb-6 md:mb-8 relative z-10">
              <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
              <h3 className="text-xl md:text-2xl font-bold text-white">AI Energy Recovery</h3>
            </div>
            <ul className="space-y-4 md:space-y-6 relative z-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm md:text-base">Повна автоматизація. Система сама вирішує, коли і що вмикати.</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm md:text-base">Безшовне перемикання за <span className="text-white font-bold">15 мс</span>. Телевізори та сервери навіть не клікають.</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm md:text-base">Смарт-економія. Заряджає батареї вночі за дешевим тарифом.</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm md:text-base">Ви просто насолоджуєтесь життям та керуєте всім зі смартфона.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 md:mb-4">Як це виглядає на практиці</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">Виберіть сценарій, щоб побачити, як наша система захищає ваш будинок та економить кошти.</p>
        </div>
        <SmartHome3D />
      </section>

      <section id="dashboard" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-3xl p-5 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-stretch">
            
            <div className="flex-1 flex flex-col justify-between space-y-6 md:space-y-8">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 md:mb-3">
                  <Activity className="w-4 h-4" /> Live Аналітика
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Усе як на долоні</h2>
                <p className="text-gray-400 mt-2 text-xs md:text-sm leading-relaxed">
                  Система балансує навантаження, обираючи найдешевше джерело, а ви бачите це в реальному часі.
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4">
                 <div className="p-2.5 md:p-3 bg-cyan-500/20 rounded-xl shrink-0">
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                 </div>
                 <div>
                    <div className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Поточне джерело</div>
                    <div className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                       Резервні батареї 
                       <span className="flex h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4 text-gray-400">
                    <Battery className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" /> 
                    <span className="text-[10px] md:text-xs uppercase font-semibold">Ємність</span>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">84%</div>
                    <div className="text-[10px] md:text-xs text-emerald-400">Оптимальний стан</div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl flex flex-col justify-between opacity-80">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4 text-gray-400">
                    <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" /> 
                    <span className="text-[10px] md:text-xs uppercase font-semibold">Генератор</span>
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold text-gray-400 mb-0.5 md:mb-1">Очікування</div>
                    <div className="text-[10px] md:text-xs text-gray-500">Блоковано AI</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1500] border border-amber-500/30 p-4 md:p-5 rounded-2xl flex items-start gap-3 md:gap-4">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs md:text-sm font-bold text-amber-500 mb-0.5 md:mb-1">AI Прогноз Мережі</div>
                  <div className="text-[10px] md:text-xs text-gray-400 leading-relaxed">
                    Висока ймовірність планового відключення через 45 хв. Заряджаємо батареї від сонця.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-[1.2] bg-black border border-white/10 p-4 sm:p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex flex-col min-h-[300px] md:min-h-[400px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div>
                  <div className="text-xs md:text-sm text-gray-400 mb-1">Поточне споживання</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl md:text-4xl font-extrabold text-white">3.2</span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium">кВт</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-medium bg-white/5 border border-white/5 px-3 py-2 md:px-4 md:py-2.5 rounded-xl w-full sm:w-auto justify-center">
                  <div className="flex items-center gap-1.5 md:gap-2 text-gray-300">
                    <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span> Факт
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-gray-300">
                    <span className="w-3 h-0.5 md:w-4 border-b-2 border-dashed border-cyan-400"></span> Прогноз
                  </div>
                </div>
              </div>

              <div className="w-full flex-1 h-[250px] sm:h-[300px] md:h-auto">
  <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                  <AreaChart data={energyData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      stroke="#4b5563" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#4b5563" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0d0d0d', borderColor: '#333', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="load" 
                      stroke="#a855f7" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#colorLoad)" 
                      name="Факт (кВт)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="prediction" 
                      stroke="#22d3ee" 
                      strokeDasharray="4 4" 
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

      <section id="industries" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 md:mb-4">Створено для будь-якої екосистеми</h2>
          <p className="text-gray-400 text-sm md:text-base">Від розумних квартир до індустріальних складів.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: Building, title: 'Офіси та IT', desc: 'Нульовий даунтайм серверів. Безшовний перехід між мережею та батареями.' },
            { icon: Factory, title: 'Склади', desc: 'Прогнозування охолодження. Автоматичне зниження потужності некритичних зон.' },
            { icon: Home, title: 'Приватні будинки', desc: 'Повна автоматизація. AI вирішує, коли використовувати сонце, а коли генератор.' }
          ].map((item, idx) => (
             <div key={idx} className="bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 transition-all duration-300 p-6 md:p-8 rounded-[2rem] group hover:-translate-y-1">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-5 border border-cyan-500/20 text-cyan-400">
                 <item.icon className="w-5 h-5 md:w-6 md:h-6" />
               </div>
               <h3 className="text-lg md:text-xl font-bold text-white mb-2">{item.title}</h3>
               <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
             </div>
          ))}
        </div>
      </section>

      {/* АДАПТОВАНИЙ КАЛЬКУЛЯТОР */}
      <section id="calculator" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-14 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          
          <div className="text-center mb-10 md:mb-16 relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-3 md:mb-6">Детальний розрахунок економії</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
              Дізнайтеся, скільки ви зможете заощадити завдяки оптимізації тарифів, накопиченню енергії вночі та відмові від пального для генератора.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 md:gap-16 relative z-10">
            <div className="flex-1 space-y-6 md:space-y-10">
              
              <div className="bg-black/20 p-5 md:p-6 rounded-[1.5rem] md:rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-300 font-medium text-sm md:text-base">Площа об'єкта</label>
                  <span className="font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-1 md:px-3 rounded-lg text-sm md:text-base">{space} м²</span>
                </div>
                <input type="range" min="30" max="1500" value={space} onChange={(e) => setSpace(Number(e.target.value))} className="w-full accent-cyan-400 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer" />
              </div>
              
              <div className="bg-black/20 p-5 md:p-6 rounded-[1.5rem] md:rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-300 font-medium text-sm md:text-base">Середнє споживання</label>
                  <span className="font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-1 md:px-3 rounded-lg text-sm md:text-base">{consumption} <span className="hidden sm:inline">кВт·год/міс</span></span>
                </div>
                <input type="range" min="100" max="5000" value={consumption} onChange={(e) => setConsumption(Number(e.target.value))} className="w-full accent-cyan-400 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer" />
              </div>

              <div className="flex items-center gap-3 md:gap-4 bg-white/[0.02] border border-white/10 p-4 md:p-5 rounded-[1.25rem] md:rounded-2xl cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setHasGenerator(!hasGenerator)}>
                <div className={`w-5 h-5 md:w-6 md:h-6 shrink-0 rounded border flex items-center justify-center transition-colors ${hasGenerator ? 'bg-cyan-500 border-cyan-500' : 'border-gray-500'}`}>
                  {hasGenerator && <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-black" />}
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm md:text-base">У мене є паливний генератор</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">Додає розрахунок економії на бензині/дизелі</p>
                </div>
              </div>

              <div className="bg-cyan-900/10 border border-cyan-500/20 p-5 md:p-6 rounded-[1.25rem] md:rounded-2xl flex gap-3 md:gap-4">
                <BrainCircuit className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 shrink-0" />
                <p className="text-[11px] md:text-sm text-gray-400 leading-relaxed">
                  <strong className="text-gray-200 block mb-1">Як розраховується прибуток:</strong> 
                  AI автоматично купує енергію в мережі під час дії найдешевшого "нічного тарифу" і зберігає її в батареях. Вдень, коли тарифи максимальні (або під час блекаутів), об'єкт живиться від накопиченого резерву, зводячи витрати до мінімуму.
                </p>
              </div>

            </div>

            <div className="flex-1 bg-black/60 border border-white/10 p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="space-y-8 md:space-y-10 relative z-10">
                <div>
                  <p className="text-[10px] md:text-sm text-gray-400 uppercase tracking-widest font-bold mb-1.5 md:mb-2">Прогнозована економія</p>
                  <div className="flex items-end gap-2 flex-wrap">
                    <p className="text-4xl sm:text-5xl md:text-6xl font-black text-cyan-400 break-words">~ {totalSavings.toLocaleString()}</p>
                    <span className="text-base md:text-xl text-cyan-400/50 font-bold mb-1">₴ / міс</span>
                  </div>
                  {/* ФІКС: Flex-wrap і нормальна ширина, щоб текст про літри не розривав екран */}
                  {hasGenerator && (
                    <div className="mt-3 flex items-center gap-1.5 md:gap-2 text-[11px] md:text-sm text-emerald-400 bg-emerald-400/10 px-2.5 py-1.5 md:px-3 md:py-1 rounded-lg w-fit max-w-full flex-wrap leading-tight">
                      <Fuel className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" /> 
                      <span>Враховано {generatorFuelSavedLiters} л збереженого пального</span>
                    </div>
                  )}
                </div>

                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>

                <div>
                  <p className="text-[10px] md:text-sm text-gray-400 uppercase tracking-widest font-bold mb-1.5 md:mb-2">Приблизна окупність (ROI)</p>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white">~ {roiMonths}</p>
                    <span className="text-sm md:text-lg text-gray-500 font-bold mb-0.5 md:mb-1">місяців</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-2 max-w-xs leading-relaxed">Час, за який система повністю поверне свою вартість за рахунок різниці тарифів.</p>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 md:py-5 bg-white hover:bg-gray-200 text-black text-base md:text-lg font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] flex items-center justify-center gap-2 mt-2 md:mt-4"
                >
                  Отримати точний кошторис <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <footer className="border-t border-white/5 bg-black/40 py-8 md:py-12 text-center text-gray-500 text-xs md:text-sm">
        <p>© 2026 AI Energy Recovery. Україна.</p>
      </footer>

      {/* АДАПТОВАНИЙ ЧАТ ДЛЯ МОБІЛКИ */}
      {isChatOpen && (
        <div className={`bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 transition-all duration-300 z-[100]
          ${isChatExpanded ? 'fixed inset-4 md:inset-10 rounded-3xl' : 'fixed bottom-4 md:bottom-6 right-4 md:right-6 left-4 md:left-auto w-auto md:w-96 h-[450px] md:h-[500px] rounded-2xl'}`}
        >
          <div className="bg-cyan-500/10 border-b border-white/10 p-3 md:p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              <span className="font-bold text-xs md:text-sm text-white">AI Консультант</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button onClick={() => setIsChatExpanded(!isChatExpanded)} className="text-gray-400 hover:text-white transition-colors" title="Розгорнути/Згорнути">
                {isChatExpanded ? <Minimize2 className="w-4 h-4 md:w-5 md:h-5" /> : <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 transition-all">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm
                  ${msg.sender === 'user' ? 'bg-cyan-500 text-black rounded-br-none' : 'bg-white/10 text-gray-200 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-2 md:p-3 border-t border-white/10 flex gap-2 shrink-0">
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Напишіть повідомлення..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button type="submit" className="bg-cyan-500 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-black hover:bg-cyan-400 transition-colors flex items-center justify-center">
              <Send className="w-4 h-4 md:w-5 md:h-5"/>
            </button>
          </form>
        </div>
      )}

      {!isChatOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-12 h-12 md:w-14 md:h-14 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-transform hover:scale-110"
          >
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-md rounded-[2rem] md:rounded-3xl p-6 md:p-8 relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 md:py-10 space-y-3 md:space-y-4">
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl md:text-2xl font-bold text-white">Заявка прийнята!</h3>
                <p className="text-gray-400 text-xs md:text-sm">Ми зв'яжемося з вами найближчим часом для обговорення деталей.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Залишити заявку</h3>
                <p className="text-gray-400 text-xs md:text-sm mb-5 md:mb-6">Отримайте доступ до демо-версії системи та індивідуальний розрахунок.</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-[10px] md:text-xs font-medium text-gray-400 mb-1">Ім'я</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Олександр" />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-medium text-gray-400 mb-1">Номер телефону</label>
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="+38 (000) 000-00-00" />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-medium text-gray-400 mb-1">Компанія / Об'єкт</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="ТОВ Спектр або Приватний будинок" />
                  </div>
                  
                  <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 md:py-3.5 rounded-xl transition-colors mt-2 md:mt-4 text-sm md:text-base">
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