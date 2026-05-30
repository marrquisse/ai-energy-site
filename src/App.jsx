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
      color: 'bg-white', glow: 'shadow-[0_0_80px_rgba(255,255,255,0.8)]', 
      text: 'Міська мережа', desc: 'Живлення від загальної мережі. Батареї заряджаються за найнижчим тарифом.', textCol: 'text-white' 
    };
    if (powerMode === 'battery') return { 
      color: 'bg-emerald-400', glow: 'shadow-[0_0_100px_rgba(52,211,153,0.8)]', 
      text: 'Резервні батареї', desc: 'Блекаут. Система миттєво перемкнула обʼєкт на резервне живлення. Світло не зникало.', textCol: 'text-emerald-400' 
    };
    return { 
      color: 'bg-cyan-400', glow: 'shadow-[0_0_120px_rgba(34,211,238,0.9)] animate-pulse', 
      text: 'AI Оптимізація', desc: 'Пікові години. AI продає надлишок енергії або використовує батареї для максимальної економії.', textCol: 'text-cyan-400' 
    };
  };

  const s = getStyles();

  return (
    <div className="flex flex-col items-center justify-center py-6 perspective-[1500px] w-full max-w-5xl mx-auto">
      
      {/* КНОПКИ КЕРУВАННЯ */}
      <div className="flex flex-col md:flex-row gap-4 mb-24 w-full justify-center px-4 z-10 relative">
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
        <div className="relative w-[240px] h-[180px] [transform-style:preserve-3d] [transform:rotateX(-15deg)_rotateY(-45deg)] transition-transform duration-1000 hover:[transform:rotateX(-10deg)_rotateY(-35deg)] cursor-crosshair order-1 lg:order-2 shrink-0">

          <div className="absolute top-[30px] left-0 w-[240px] h-[240px] bg-black/80 border border-cyan-500/50 [transform:rotateX(-90deg)_translateZ(90px)] shadow-[0_0_80px_rgba(8,51,68,0.8)]">
            <div className="w-full h-full bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:24px_24px] opacity-50"></div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
            <div className={`w-12 h-12 rounded-full ${s.color} ${s.glow} transition-all duration-700 blur-[4px]`}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white transition-colors duration-700"></div>
          </div>

          <div className="absolute inset-0 bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-[2px] [transform:translateZ(-120px)_rotateY(180deg)]"></div>
          <div className="absolute inset-0 bg-cyan-900/40 border border-cyan-500/30 backdrop-blur-[2px] [transform:rotateY(-90deg)_translateZ(120px)]"></div>

          <div className="absolute inset-0 bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-[2px] [transform:rotateY(90deg)_translateZ(120px)] flex items-center justify-center gap-6">
             <div className="w-14 h-24 border border-cyan-400/50 bg-black/40 flex flex-col gap-[2px]">
                 <div className={`w-full h-1/2 ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
                 <div className={`w-full h-1/2 ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
             </div>
             <div className="w-14 h-24 border border-cyan-400/50 bg-black/40 flex flex-col gap-[2px]">
                 <div className={`w-full h-1/2 ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
                 <div className={`w-full h-1/2 ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
             </div>
          </div>

          <div className="absolute inset-0 bg-cyan-900/40 border border-cyan-500/30 backdrop-blur-[2px] [transform:translateZ(120px)] flex flex-col justify-end">
             <div className="absolute top-6 left-6 w-16 h-16 border border-cyan-400/50 grid grid-cols-2 grid-rows-2 gap-[2px] bg-black/60">
                <div className={`w-full h-full ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
                <div className={`w-full h-full ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
                <div className={`w-full h-full ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
                <div className={`w-full h-full ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
             </div>
             <div className="absolute top-6 right-6 w-16 h-16 border border-cyan-400/50 grid grid-cols-2 grid-rows-2 gap-[2px] bg-black/60">
                <div className={`w-full h-full ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
                <div className={`w-full h-full ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
                <div className={`w-full h-full ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
                <div className={`w-full h-full ${powerMode !== 'grid' ? s.color : 'bg-white'} opacity-40 transition-colors duration-700`}></div>
             </div>
             <div className="mx-auto w-16 h-24 border-t border-l border-r border-cyan-400/50 bg-[#050505] relative">
                <div className="absolute top-1/2 right-3 w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#22d3ee]"></div>
             </div>
          </div>

          <div className="absolute top-[-171px] left-0 w-[240px] h-[171px] [transform-style:preserve-3d]">
             <div className="absolute inset-0 [clip-path:polygon(50%_0,0_100%,100%_100%)] bg-cyan-800/90 border-b-2 border-cyan-400/50 [transform-origin:bottom] [transform:translateZ(120px)_rotateX(45deg)] backdrop-blur-sm"></div>
             <div className="absolute inset-0 [clip-path:polygon(50%_0,0_100%,100%_100%)] bg-cyan-800/90 border-b-2 border-cyan-400/50 [transform-origin:bottom] [transform:rotateY(180deg)_translateZ(120px)_rotateX(45deg)] backdrop-blur-sm"></div>
             <div className="absolute inset-0 [clip-path:polygon(50%_0,0_100%,100%_100%)] bg-cyan-900/90 border-b-2 border-cyan-400/50 [transform-origin:bottom] [transform:rotateY(90deg)_translateZ(120px)_rotateX(45deg)] backdrop-blur-sm"></div>
             <div className="absolute inset-0 [clip-path:polygon(50%_0,0_100%,100%_100%)] bg-cyan-900/90 border-b-2 border-cyan-400/50 [transform-origin:bottom] [transform:rotateY(-90deg)_translateZ(120px)_rotateX(45deg)] backdrop-blur-sm"></div>
          </div>

        </div>
      </div>
    </div>
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

      {/* ЛОГІКА РОБОТИ (АРХІТЕКТУРА) */}
      <section id="logic" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Архітектура безперервності</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Як наша система збирає енергію, аналізує дані та живить ваш об'єкт.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative">
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-gray-700 via-cyan-500 to-gray-700 -z-10 opacity-50"></div>
          
          <div className="flex flex-col gap-4 w-full lg:w-1/4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
              <Plug className="w-8 h-8 text-gray-400" />
              <div>
                <h4 className="font-bold text-white">Міська мережа</h4>
                <p className="text-xs text-gray-500">Основа (ДТЕК/Ясно)</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
              <Sun className="w-8 h-8 text-yellow-400" />
              <div>
                <h4 className="font-bold text-white">Сонце</h4>
                <p className="text-xs text-gray-500">Безкоштовна енергія</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
              <Factory className="w-8 h-8 text-red-400" />
              <div>
                <h4 className="font-bold text-white">Генератор</h4>
                <p className="text-xs text-gray-500">Екстрений резерв</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-cyan-500/40 transition-all duration-500"></div>
            <div className="w-48 h-48 bg-black border border-cyan-500/50 rounded-full flex flex-col items-center justify-center relative z-10 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
              <BrainCircuit className="w-16 h-16 text-cyan-400 mb-2 animate-pulse" />
              <h3 className="font-bold text-white text-lg">AI Core</h3>
              <p className="text-xs text-cyan-400">Аналіз 100+ разів/сек</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-1/4">
            <div className="bg-cyan-900/20 border border-cyan-500/30 p-5 rounded-2xl flex items-center gap-4">
              <Home className="w-8 h-8 text-cyan-400" />
              <div>
                <h4 className="font-bold text-white">Ваш об'єкт</h4>
                <p className="text-xs text-gray-400">Безперебійне живлення</p>
              </div>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-2xl flex items-center gap-4">
              <Battery className="w-8 h-8 text-emerald-400" />
              <div>
                <h4 className="font-bold text-white">Батарейний блок</h4>
                <p className="text-xs text-gray-400">Накопичення надлишку</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            <div className="flex-1 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider mb-3">
                  <Activity className="w-4 h-4" /> Live Аналітика
                </div>
                <h2 className="text-3xl font-extrabold text-white">Усе як на долоні</h2>
                <p className="text-gray-400 mt-2 text-sm">Система балансує навантаження, обираючи найдешевше джерело, а ви бачите це в реальному часі.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 uppercase font-semibold">Ємність батарей</span>
                    <Battery className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">84%</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">Оптимальне розрядження</div>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 uppercase font-semibold">Генератор</span>
                    <RefreshCw className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-400">ОЧІКУВАННЯ</div>
                  <div className="text-xs text-gray-500 mt-1">Пуск заблоковано AI</div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-amber-400">AI Прогноз Мережі</div>
                  <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Висока ймовірність планового відключення через 45 хв. Заряджаємо батареї від сонця...
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-black/40 border border-white/5 p-6 rounded-2xl min-h-[350px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-bold text-white">Споживання кВт</div>
              </div>
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={energyData}>
                    <defs>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#4b5563" fontSize={11} tickLine={false} />
                    <YAxis stroke="#4b5563" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', borderColor: '#333', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="load" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" name="Факт" />
                    <Line type="monotone" dataKey="prediction" stroke="#22d3ee" strokeDasharray="5 5" strokeWidth={2} dot={false} name="AI Прогноз" />
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