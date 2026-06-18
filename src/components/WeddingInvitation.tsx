import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  Music, 
  Gift, 
  Info, 
  CheckCircle2,
  ChevronDown,
  Users,
  MessageCircle,
  Volume2,
  VolumeX,
  CreditCard,
  Mail
} from 'lucide-react';
import { CONFIGS_BY_SLUG, WEDDING_CONFIG, getWhatsAppMessage, getWhatsAppNoMessage, WeddingConfigType } from '../config';

// --- Custom Icons ---
const LatinCross = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 2h2v5h5v2h-5v13h-2v-13h-5v-2h5v-5z" />
  </svg>
);

// --- Types ---
interface ItineraryItem {
  time: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  side: 'left' | 'right';
  link?: string;
}

// --- Dynamic Styled Sub-Components ---

const TimelineItem = ({ item, isLast, styles }: { item: ItineraryItem; isLast: boolean; styles: any }) => (
  <div className="relative flex items-center justify-center w-full mb-12">
    {/* Central Line */}
    <div className={`absolute h-full w-px ${styles.accentLine} left-1/2 -translate-x-1/2 top-0 ${isLast ? 'h-1/2' : ''}`} />
    
    {/* Dot */}
    <div className={`absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-4 z-10 ${styles.accentDot}`} />

    <div className="grid grid-cols-2 w-full gap-8 md:gap-16">
      {/* Left Content */}
      <div className={`flex items-center justify-end text-right ${item.side === 'left' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-4">
          <div className="order-2">
            <p className={`${styles.textAccent} font-serif italic text-lg`}>{item.time}</p>
            <h4 className="text-xl font-serif text-stone-800">{item.title}</h4>
            {item.subtitle && (
              item.link ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-sm text-stone-500 mt-1 transition-colors block underline underline-offset-4 hover:${styles.textAccent}`}
                >
                  {item.subtitle}
                </a>
              ) : (
                <p className="text-sm text-stone-500 mt-1">{item.subtitle}</p>
              )
            )}
          </div>
          <div className="order-1 text-stone-400">
            {item.icon}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className={`flex items-center justify-start text-left ${item.side === 'right' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-4">
          <div className="text-stone-400">
            {item.icon}
          </div>
          <div>
            <p className={`${styles.textAccent} font-serif italic text-lg`}>{item.time}</p>
            <h4 className="text-xl font-serif text-stone-800">{item.title}</h4>
            {item.subtitle && (
              item.link ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-sm text-stone-500 mt-1 transition-colors block underline underline-offset-4 hover:${styles.textAccent}`}
                >
                  {item.subtitle}
                </a>
              ) : (
                <p className="text-sm text-stone-500 mt-1">{item.subtitle}</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Countdown = ({ targetDate, styles }: { targetDate: Date; styles: any }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center py-8">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className={`text-3xl md:text-5xl font-serif transition-colors ${styles.textAccent}`}>{value}</span>
          <span className="text-[10px] uppercase tracking-widest opacity-60">
            {label === 'days' ? 'Días' : label === 'hours' ? 'Horas' : label === 'minutes' ? 'Minutos' : 'Segundos'}
          </span>
        </div>
      ))}
    </div>
  );
};

const SectionHeading = ({ title, subtitle, styles }: { title: string; subtitle?: string; styles: any }) => (
  <div className="text-center mb-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-center mb-4"
    >
      <Heart className={`${styles.textAccent} w-6 h-6 ${styles.goldFill}`} />
    </motion.div>
    <h2 className="text-4xl md:text-5xl font-serif mb-2 text-stone-800">{title}</h2>
    {subtitle && <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-mono font-bold">{subtitle}</p>}
  </div>
);

const WeddingInvitation = () => {
  const { slug } = useParams();
  
  // Dynamic Configuration Lookup
  const activeSlug = (slug || '').toLowerCase();
  const config: WeddingConfigType = CONFIGS_BY_SLUG[activeSlug] || WEDDING_CONFIG;
  
  const weddingDate = new Date(config.weddingDate);
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(config.showWelcomeScreen);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Style Themes Map
  const themeStyles = {
    classic: {
      textAccent: 'text-gold',
      bgAccent: 'bg-gold hover:bg-[#b08b47]',
      bgSection: 'bg-cream',
      bgWhiteSection: 'bg-white',
      borderColor: 'border-stone-100/80',
      accentLine: 'bg-stone-200',
      goldFill: 'fill-gold',
      loaderAccent: 'bg-gold border-cream',
      buttonEnter: 'bg-gold text-stone-900 border-gold hover:bg-white hover:text-stone-900 hover:border-white',
      accentDot: 'bg-gold border-cream text-gold',
      primaryBtn: 'bg-stone-900 text-white hover:bg-gold',
      secondaryBtn: 'bg-white text-stone-900 hover:bg-gold hover:text-white',
      cardClass: 'bg-cream border border-stone-100 shadow-xl',
      formInputClass: 'focus:border-gold',
      footerHeart: 'text-gold fill-gold',
      floatingBtn: 'bg-white text-gold hover:bg-gold hover:text-stone-900',
      floatingBtnActive: 'bg-gold text-stone-900'
    },
    boho: {
      textAccent: 'text-amber-700',
      bgAccent: 'bg-amber-700 hover:bg-[#a04e22]',
      bgSection: 'bg-[#faf6f0]', // Earthy terracotta linen 
      bgWhiteSection: 'bg-white',
      borderColor: 'border-amber-700/10',
      accentLine: 'bg-amber-700/20',
      goldFill: 'fill-amber-700',
      loaderAccent: 'bg-amber-700 border-[#faf6f0]',
      buttonEnter: 'bg-amber-700 text-white border-amber-700 hover:bg-amber-800 hover:border-amber-800',
      accentDot: 'bg-amber-700 border-[#faf6f0] text-amber-700',
      primaryBtn: 'bg-amber-700 text-white hover:bg-[#863e18]',
      secondaryBtn: 'bg-[#faf6f0]/80 text-amber-900 hover:bg-amber-700 hover:text-white border border-amber-700/20',
      cardClass: 'bg-[#faf6f0] border border-amber-700/10 shadow-2xl shadow-amber-900/5',
      formInputClass: 'focus:border-amber-700',
      footerHeart: 'text-amber-700 fill-amber-700',
      floatingBtn: 'bg-[#faf6f0] text-amber-700 hover:bg-amber-700 hover:text-white',
      floatingBtnActive: 'bg-amber-700 text-white'
    },
    minimal: {
      textAccent: 'text-emerald-900',
      bgAccent: 'bg-emerald-900 hover:bg-emerald-950',
      bgSection: 'bg-neutral-50 border-y border-stone-200/40',
      bgWhiteSection: 'bg-white',
      borderColor: 'border-neutral-200',
      accentLine: 'bg-neutral-300',
      goldFill: 'fill-emerald-900',
      loaderAccent: 'bg-emerald-900 border-white',
      buttonEnter: 'bg-emerald-950 text-white border-emerald-950 hover:bg-emerald-900 hover:border-emerald-900',
      accentDot: 'bg-emerald-900 border-white text-emerald-900',
      primaryBtn: 'bg-emerald-950 text-white hover:bg-neutral-900',
      secondaryBtn: 'bg-white text-neutral-800 hover:bg-emerald-950 hover:text-white border border-neutral-200',
      cardClass: 'bg-neutral-50/50 border border-neutral-200 shadow-xl',
      formInputClass: 'focus:border-emerald-900',
      footerHeart: 'text-emerald-900 fill-emerald-900',
      floatingBtn: 'bg-white text-emerald-900 hover:bg-emerald-900 hover:text-white',
      floatingBtnActive: 'bg-emerald-900 text-white shadow-emerald-950/25'
    }
  };

  const styles = themeStyles[config.theme] || themeStyles.classic;

  useEffect(() => {
    document.title = `TuInvi - ${config.coupleInitials}`;
  }, [config]);

  useEffect(() => {
    const musicEnabled = localStorage.getItem('music-enabled');
    const shouldPlay = musicEnabled === 'true' || musicEnabled === null;

    const attemptPlay = () => {
      if (audioRef.current && shouldPlay) {
        audioRef.current.play()
          .then(() => {
            audioRef.current!.muted = false;
            setIsMusicPlaying(true);
            localStorage.setItem('music-enabled', 'true');
            cleanupListeners();
          })
          .catch(() => {
            if (audioRef.current) {
              audioRef.current.muted = true;
              audioRef.current.play()
                .then(() => {
                  setIsMusicPlaying(true);
                })
                .catch(e => console.log("Even muted autoplay failed:", e));
            }
          });
      }
    };

    const cleanupListeners = () => {
      const events = ['click', 'touchstart', 'touchend', 'mousedown', 'keydown', 'scroll'];
      events.forEach(e => window.removeEventListener(e, handleInteraction));
    };

    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        attemptPlay();
      }
    };

    if (!config.showWelcomeScreen || !showWelcome) {
      const events = ['click', 'touchstart', 'touchend', 'mousedown', 'keydown', 'scroll'];
      events.forEach(e => window.addEventListener(e, handleInteraction));
      attemptPlay();
    }

    return () => {
      cleanupListeners();
    };
  }, [showWelcome, config]);

  const handleEnter = () => {
    setShowWelcome(false);
    setIsMusicPlaying(true);
    localStorage.setItem('music-enabled', 'true');
    setTimeout(() => {
      audioRef.current?.play().catch(err => console.log("Autoplay blocked:", err));
    }, 100);
  };

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStatus('submitting');
    setTimeout(() => setRsvpStatus('success'), 1500);
  };

  const itinerary: ItineraryItem[] = config.itinerary.map(item => ({
    ...item,
    icon: item.type === 'ceremony' ? <Users className="w-6 h-6" /> :
          item.type === 'reception' ? <Calendar className="w-6 h-6" /> :
          item.type === 'toast' ? <Music className="w-6 h-6" /> :
          item.type === 'dance' ? <Heart className="w-6 h-6" /> :
          item.type === 'party' ? <Music className="w-6 h-6" /> :
          <Clock className="w-6 h-6" />,
    link: item.type === 'ceremony' ? config.churchMapsLink : undefined
  }));

  return (
    <div className="min-h-screen selection:bg-stone-500/15">
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-900 flex items-center justify-center text-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-md"
            >
              <div className="relative w-16 h-16 mx-auto mb-8">
                <Mail className={`w-16 h-16 ${styles.textAccent}`} />
                <Heart className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse ${styles.textAccent} ${styles.goldFill}`} />
              </div>
              <h1 className="text-5xl md:text-7xl font-script text-white mb-4 leading-tight">
                {config.brideName} <br /> 
                <span className="text-2xl md:text-4xl font-serif opacity-50">&</span> <br /> 
                {config.groomName}
              </h1>
              <p className="text-stone-400 font-serif italic text-lg mb-12">Nuestra Boda • {config.weddingDateDisplay}</p>
              <button 
                onClick={handleEnter}
                className={`px-12 py-4 rounded-full uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 shadow-2xl border ${styles.buttonEnter}`}
              >
                Entrar a la Invitación
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Element */}
      <audio 
        key={config.musicUrl} // Key forces reload if song changes per slug
        ref={audioRef}
        src={config.musicUrl}
        loop
        preload="auto"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
        onError={(e) => console.log("Audio skipped or blocked loading.")}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: config.theme === 'minimal' ? 0.5 : 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={config.heroImage} 
            alt="Wedding Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`text-xs md:text-sm uppercase tracking-[0.4em] mb-6 font-mono font-bold ${styles.textAccent}`}
          >
            ¡Nos Casamos!
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-6xl md:text-9xl font-serif mb-8 leading-tight"
          >
            {config.brideName} <br className="md:hidden" /> & <br className="md:hidden" /> {config.groomName}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center"
          >
            <div className={`w-px h-16 mb-4 opacity-50 ${styles.bgAccent}`} />
            <p className="text-xl md:text-2xl font-serif italic mb-6">{config.weddingDateDisplay}</p>
            <div className="flex gap-4">
              <a 
                href="#rsvp"
                className={`px-12 py-4 text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-xl ${styles.buttonEnter}`}
              >
                Confirmar Asistencia
              </a>
            </div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-12"
            >
              <ChevronDown className={`w-6 h-6 opacity-60 ${styles.textAccent}`} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`py-24 ${styles.bgSection}`}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading title="Momentos Juntos" subtitle="Nuestra Galería" styles={styles} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.galleryImages.map((imgSrc, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`aspect-[3/4] overflow-hidden rounded-2xl ${i % 2 === 0 ? 'mt-8' : ''} shadow-lg`}
              >
                <img 
                  src={imgSrc} 
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-750"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className={`py-24 ${styles.bgWhiteSection} border-b border-stone-100`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading title="Faltan muy pocos días" subtitle="Cuenta Regresiva" styles={styles} />
          <Countdown targetDate={weddingDate} styles={styles} />
          <p className="mt-8 text-stone-500 max-w-lg mx-auto leading-relaxed">
            Estamos muy emocionados de compartir este día tan especial con ustedes. 
            Cada segundo cuenta para el momento en que digamos <br/> "Sí, acepto".
          </p>
        </div>
      </section>

      {/* Parents Section */}
      {config.parents?.show && (
        <section className={`py-24 border-b border-stone-100 ${styles.bgSection}`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <SectionHeading title={config.parents.title} styles={styles} />
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              {/* Bride's Parents */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className={`text-2xl font-serif italic ${styles.textAccent}`}>Ella</h3>
                <div className="space-y-2">
                  {config.parents.brideParents.map((parent, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2">
                      <p className="text-xl font-serif text-stone-800">{parent.name}</p>
                      {parent.isDeceased && (
                        <span className="text-stone-400" title="Fallecido">
                          <LatinCross className="w-3 h-4" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Groom's Parents */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className={`text-2xl font-serif italic ${styles.textAccent}`}>Él</h3>
                <div className="space-y-2">
                  {config.parents.groomParents.map((parent, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2">
                      <p className="text-xl font-serif text-stone-800">{parent.name}</p>
                      {parent.isDeceased && (
                        <span className="text-stone-400" title="Fallecido">
                          <LatinCross className="w-3 h-4" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Story / Welcome */}
      <section className={`py-24 ${styles.bgSection}`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionHeading title="Nuestra Historia" subtitle="El comienzo de algo eterno" styles={styles} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white max-w-2xl mx-auto"
          >
            <img 
               src={config.storyImage} 
               alt="Nuestra Historia" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
            />
          </motion.div>

          {config.theme === 'boho' ? (
            <div className="prose prose-stone mx-auto font-serif text-lg md:text-xl leading-relaxed italic text-amber-900">
              "El amor es encontrar en la felicidad del otro, tu propia felicidad."
            </div>
          ) : config.theme === 'minimal' ? (
            <div className="prose prose-stone mx-auto font-serif text-lg md:text-xl leading-relaxed italic text-emerald-900">
              "Dos vidas, dos corazones, un solo camino por recorrer."
            </div>
          ) : (
            <div className="prose prose-stone mx-auto font-serif text-lg md:text-xl leading-relaxed italic text-stone-600">
              "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección."
            </div>
          )}

          <p className="mt-8 text-stone-500 leading-relaxed max-w-lg mx-auto">
            {config.theme === 'boho' 
              ? "Paso a paso, risa tras risa, hemos tejido una historia sobre raíces fuertes y sueños compartidos. Nos emociona infinitamente comenzar este viaje eterno contigo."
              : config.theme === 'minimal'
              ? "Diseñamos un destino juntos construyendo complicidades sinceras. Nos encantaría que nos acompañes a celebrar el punto de encuentro de nuestras vidas."
              : "Después de 10 años de risas, viajes y aprendizajes, hemos decidido dar el paso más importante de nuestras vidas. Queremos que seas parte de este nuevo capítulo."
            }
          </p>
        </div>
      </section>

      {/* Itinerario Section */}
      <section className={`py-24 ${styles.bgSection}`}>
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="Itinerario" subtitle="Nuestra Celebración" styles={styles} />
          <div className="mt-16">
            {itinerary.map((item, idx) => (
              <div key={idx}>
                <TimelineItem item={item} isLast={idx === itinerary.length - 1} styles={styles} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lugar del Evento Section */}
      <section className={`py-24 ${styles.bgWhiteSection}`}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading title="Lugar del Evento" subtitle="Ubicación" styles={styles} />
          <div className={`${styles.cardClass} rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row`}>
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md border border-neutral-100">
                <MapPin className={`w-8 h-8 ${styles.textAccent}`} />
              </div>
              <h3 className="text-4xl font-serif mb-4 text-stone-800">{config.locationName}</h3>
              <p className="text-stone-500 mb-8 leading-relaxed whitespace-pre-line">
                {config.locationAddress}
              </p>
              <a 
                href={config.locationMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block text-center w-fit px-8 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all ${styles.primaryBtn}`}
              >
                Abrir en Google Maps
              </a>
            </div>
            <div className="md:w-1/2 h-80 md:h-auto relative">
              <img 
                src={config.venueImage} 
                alt={config.locationName}
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-200/10 flex items-center justify-center pointer-events-none">
                <div className="bg-white p-3 rounded-lg shadow-2xl border border-stone-100 flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mb-2 shadow-sm">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[10px] font-bold text-stone-800">{config.locationName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code & Info */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <SectionHeading title="Información Importante" subtitle="Protocolo" styles={styles} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
            <div className="flex flex-col items-center">
              <Info className={`w-8 h-8 ${styles.textAccent} mb-4`} />
              <h4 className="text-xl font-serif mb-2">Código de Vestimenta</h4>
              <p className="text-sm opacity-70">{config.dressCodeText}</p>
              {config.dressCodeSub && <p className="text-xs mt-2 opacity-50 italic">{config.dressCodeSub}</p>}
            </div>
            <div className="flex flex-col items-center">
              <Users className={`w-8 h-8 ${styles.textAccent} mb-4`} />
              <h4 className="text-xl font-serif mb-2">Solo Adultos</h4>
              <p className="text-sm opacity-70">Agradecemos su comprensión</p>
            </div>
            <div className="flex flex-col items-center">
              <Gift className={`w-8 h-8 ${styles.textAccent} mb-4`} />
              <h4 className="text-xl font-serif mb-2">Mesa de Regalos</h4>
              <p className="text-sm opacity-70 mb-6">Su presencia es nuestro mejor regalo</p>
              
              <div className="space-y-4 w-full max-w-xs mx-auto text-white">
                {config.giftRegistries.filter(r => r.show).map((registry, idx) => (
                  <a 
                    key={idx} 
                    href={registry.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    {registry.company === 'Liverpool' ? (
                      <span className="text-sm tracking-tight font-extrabold text-pink-400 italic">Liverpool</span>
                    ) : (
                      <div className="text-sm font-bold tracking-tighter italic uppercase text-stone-200">{registry.company}</div>
                    )}
                    <span className="text-xs font-mono tracking-wider">{registry.eventId}</span>
                  </a>
                ))}
              </div>
            </div>
            {config.bankTransfer.show && (
              <div className="flex flex-col items-center">
                <CreditCard className={`w-8 h-8 ${styles.textAccent} mb-4`} />
                <h4 className="text-xl font-serif mb-2">Cuenta Bancaria</h4>
                <p className="text-sm opacity-70 mb-4">Si desean tener un detalle con nosotros</p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 w-full max-w-xs text-center">
                  <p className="text-[10px] uppercase tracking-widest opacity-45 mb-1">Banco</p>
                  <p className="text-sm mb-3 text-stone-200">{config.bankTransfer.bank}</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-45 mb-1">Titular</p>
                  <p className="text-sm mb-3 text-stone-200">{config.bankTransfer.accountHolder}</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-45 mb-1">CLABE</p>
                  <p className="text-xs font-mono tracking-wider text-amber-200/90">{config.bankTransfer.clabe}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className={`py-24 ${styles.bgWhiteSection}`} id="rsvp">
        <div className="max-w-xl mx-auto px-4">
          <div className={`${styles.cardClass} p-8 md:p-12 rounded-[2rem] shadow-2xl`}>
            <SectionHeading title="Confirmar Asistencia" subtitle="RSVP" styles={styles} />
            
            <div className="mb-10">
              <p className="text-center text-stone-500 text-sm mb-6">
                Puedes confirmar rápidamente vía WhatsApp{config.showRsvpForm ? ' o llenando el formulario abajo' : ''}:
              </p>
              <a 
                href={`https://wa.me/${config.rsvpWhatsAppNumber.replace('+', '')}?text=${encodeURIComponent(getWhatsAppMessage(config))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-[#20ba5a] transition-all shadow-lg shadow-green-100 mb-4"
              >
                <MessageCircle className="w-5 h-5" />
                Confirmar Asistencia (Sí voy)
              </a>

              <a 
                href={`https://wa.me/${config.rsvpWhatsAppNumber.replace('+', '')}?text=${encodeURIComponent(getWhatsAppNoMessage(config))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-red-700 transition-all shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                No podré asistir
              </a>
            </div>

            {config.showRsvpForm && (
              <AnimatePresence mode="wait">
                {rsvpStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif mb-2">¡Gracias por confirmar!</h3>
                    <p className="text-stone-500">Estamos ansiosos por verte en nuestro gran día.</p>
                    <button 
                      onClick={() => setRsvpStatus('idle')}
                      className={`mt-8 text-sm underline hover:${styles.textAccent}`}
                    >
                      Editar respuesta
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleRSVP}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest opacity-60">Nombre Completo</label>
                      <input 
                        required
                        type="text" 
                        className={`w-full bg-white border-b border-stone-200 py-3 px-4 outline-none transition-colors ${styles.formInputClass}`}
                        placeholder="Ej. Juan Pérez"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest opacity-60">¿Asistirás?</label>
                      <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                          <input type="radio" name="attendance" className="hidden peer" defaultChecked />
                          <div className={`text-center py-3 border border-stone-200 rounded-xl transition-all peer-checked:bg-stone-50 ${styles.formInputClass}`}>
                            Sí, asistiré
                          </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                          <input type="radio" name="attendance" className="hidden peer" />
                          <div className={`text-center py-3 border border-stone-200 rounded-xl transition-all peer-checked:bg-stone-50 ${styles.formInputClass}`}>
                            No podré ir
                          </div>
                        </label>
                      </div>
                    </div>
                    <button 
                      disabled={rsvpStatus === 'submitting'}
                      type="submit"
                      className={`w-full py-4 rounded-xl uppercase tracking-widest text-xs font-bold transition-colors disabled:opacity-50 ${styles.primaryBtn}`}
                    >
                      {rsvpStatus === 'submitting' ? 'Enviando...' : 'Confirmar Asistencia'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 text-center ${styles.bgSection} border-t border-stone-200/50`}>
        <div className="flex justify-center gap-4 mb-6">
          <div className={`w-8 h-px self-center opacity-40 ${styles.bgAccent}`} />
          <Heart className={`w-5 h-5 ${styles.footerHeart}`} />
          <div className={`w-8 h-px self-center opacity-40 ${styles.bgAccent}`} />
        </div>
        <p className="font-serif text-3xl mb-2 text-stone-800">{config.brideName} & {config.groomName}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-mono font-bold">Hecho con amor • TuInvi 2026</p>
      </footer>

      {/* Floating Music Button */}
      <motion.button 
        onClick={() => {
          if (audioRef.current) {
            if (isMusicPlaying) {
              if (audioRef.current.muted) {
                audioRef.current.muted = false;
                const temp = isMusicPlaying;
                setIsMusicPlaying(!temp);
                setTimeout(() => setIsMusicPlaying(temp), 10);
              } else {
                audioRef.current.pause();
                localStorage.setItem('music-enabled', 'false');
              }
            } else {
              audioRef.current.muted = false;
              audioRef.current.play();
              localStorage.setItem('music-enabled', 'true');
            }
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isMusicPlaying || audioRef.current?.muted ? {
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 0 0px rgba(120, 120, 120, 0)",
            "0 0 0 10px rgba(120, 120, 120, 0.15)",
            "0 0 0 0px rgba(120, 120, 120, 0)"
          ]
        } : {}}
        transition={(!isMusicPlaying || audioRef.current?.muted) ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center z-50 border shadow-lg transition-all duration-500 ${
          isMusicPlaying && !audioRef.current?.muted ? styles.floatingBtnActive : styles.floatingBtn
        }`}
      >
        {isMusicPlaying ? (
          audioRef.current?.muted ? <VolumeX className="w-5 h-5 animate-pulse" /> : <Music className="w-5 h-5 animate-spin-slow" />
        ) : (
          <Volume2 className="w-5 h-5 opacity-40" />
        )}
      </motion.button>
    </div>
  );
}

export default WeddingInvitation;
