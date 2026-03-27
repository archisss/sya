import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  MessageCircle
} from 'lucide-react';
import { WEDDING_CONFIG, getWhatsAppMessage } from './config';

// --- Types ---
interface ItineraryItem {
  time: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  side: 'left' | 'right';
}

// --- Constants ---
const SPOTIFY_TRACK_ID = '0tgVpDi06FyKpA1z0VMD4v'; 
// Puedes cambiar este ID por el de tu canción favorita

// --- Components ---

const TimelineItem = ({ item, isLast }: { item: ItineraryItem; isLast: boolean }) => (
  <div className="relative flex items-center justify-center w-full mb-12">
    {/* Central Line */}
    <div className={`absolute h-full w-px bg-stone-200 left-1/2 -translate-x-1/2 top-0 ${isLast ? 'h-1/2' : ''}`} />
    
    {/* Dot */}
    <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-4 border-cream z-10" />

    <div className="grid grid-cols-2 w-full gap-8 md:gap-16">
      {/* Left Content */}
      <div className={`flex items-center justify-end text-right ${item.side === 'left' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-4">
          <div className="order-2">
            <p className="text-gold font-serif italic text-lg">{item.time}</p>
            <h4 className="text-xl font-serif text-stone-800">{item.title}</h4>
            {item.subtitle && <p className="text-sm text-stone-500 mt-1">{item.subtitle}</p>}
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
            <p className="text-gold font-serif italic text-lg">{item.time}</p>
            <h4 className="text-xl font-serif text-stone-800">{item.title}</h4>
            {item.subtitle && <p className="text-sm text-stone-500 mt-1">{item.subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Countdown = ({ targetDate }: { targetDate: Date }) => {
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
          <span className="text-3xl md:text-5xl font-serif text-gold">{value}</span>
          <span className="text-[10px] uppercase tracking-widest opacity-60">{label === 'days' ? 'Días' : label === 'hours' ? 'Horas' : label === 'minutes' ? 'Minutos' : 'Segundos'}</span>
        </div>
      ))}
    </div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-center mb-4"
    >
      <Heart className="text-gold w-6 h-6" />
    </motion.div>
    <h2 className="text-4xl md:text-5xl font-serif mb-2">{title}</h2>
    {subtitle && <p className="text-sm uppercase tracking-[0.2em] opacity-60">{subtitle}</p>}
  </div>
);

export default function App() {
  const weddingDate = new Date(WEDDING_CONFIG.weddingDate);
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(WEDDING_CONFIG.showWelcomeScreen);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.title = `TuInvi - ${WEDDING_CONFIG.coupleInitials}`;
  }, []);

  useEffect(() => {
    const musicEnabled = localStorage.getItem('music-enabled');
    // Si ya estaba habilitado, intentamos reproducir (aunque el navegador puede bloquearlo hasta el primer click)
    if (musicEnabled === 'true' && !showWelcome) {
      audioRef.current?.play().catch(() => {
        setIsMusicPlaying(false);
      });
    }
  }, [showWelcome]);

  const handleEnter = () => {
    setShowWelcome(false);
    setIsMusicPlaying(true);
    localStorage.setItem('music-enabled', 'true');
    // El click en "Entrar" es una interacción válida para iniciar el audio
    setTimeout(() => {
      audioRef.current?.play().catch(err => console.log("Autoplay blocked:", err));
    }, 100);
  };

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStatus('submitting');
    setTimeout(() => setRsvpStatus('success'), 1500);
  };

  const itinerary: ItineraryItem[] = WEDDING_CONFIG.itinerary.map(item => ({
    ...item,
    icon: item.type === 'ceremony' ? <Users className="w-6 h-6" /> :
          item.type === 'reception' ? <Calendar className="w-6 h-6" /> :
          item.type === 'toast' ? <Music className="w-6 h-6" /> :
          item.type === 'dance' ? <Heart className="w-6 h-6" /> :
          item.type === 'party' ? <Music className="w-6 h-6" /> :
          <Clock className="w-6 h-6" />
  }));

  return (
    <div className="min-h-screen selection:bg-gold/20">
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
              <Heart className="w-12 h-12 text-gold mx-auto mb-8 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-script text-white mb-4 leading-tight">
                {WEDDING_CONFIG.brideName} <br /> 
                <span className="text-2xl md:text-4xl font-serif opacity-50">&</span> <br /> 
                {WEDDING_CONFIG.groomName}
              </h1>
              <p className="text-stone-400 font-serif italic text-lg mb-12">Nuestra Boda • {WEDDING_CONFIG.weddingDateDisplay}</p>
              <button 
                onClick={handleEnter}
                className="px-12 py-4 bg-gold text-stone-900 rounded-full uppercase tracking-[0.3em] text-xs font-bold hover:bg-white transition-all duration-500 shadow-2xl"
              >
                Entrar a la Invitación
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Element */}
      <audio 
        ref={audioRef}
        src="/audio/wedding-music.mp3"
        loop
        preload="auto"
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
            alt="Wedding Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm md:text-base uppercase tracking-[0.4em] mb-6"
          >
            ¡Nos Casamos!
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-6xl md:text-9xl font-serif mb-8 leading-tight"
          >
            {WEDDING_CONFIG.brideName} <br className="md:hidden" /> & <br className="md:hidden" /> {WEDDING_CONFIG.groomName}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-px h-16 bg-white/30 mb-4" />
            <p className="text-xl md:text-2xl font-serif italic mb-6">{WEDDING_CONFIG.weddingDateDisplay}</p>
            <div className="flex gap-4">
              <a 
                href="#rsvp"
                className="px-12 py-4 bg-white text-stone-900 rounded-full text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-xl"
              >
                Confirmar Asistencia
              </a>
            </div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-12"
            >
              <ChevronDown className="w-6 h-6 opacity-50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading title="Momentos Juntos" subtitle="Nuestra Galería" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`aspect-[3/4] overflow-hidden rounded-2xl ${i % 2 === 0 ? 'mt-8' : ''}`}
              >
                <img 
                  src={`/images/gallery/foto${i}.jpg`} 
                  alt={`Gallery ${i}`}
                  onError={(e) => {
                    // Fallback a imagen de ejemplo si no existe la foto local
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/wedding-${i}/600/800`;
                  }}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-24 bg-white border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading title="Faltan muy pocos días" subtitle="Cuenta Regresiva" />
          <Countdown targetDate={weddingDate} />
          <p className="mt-8 text-stone-500 max-w-lg mx-auto leading-relaxed">
            Estamos muy emocionados de compartir este día tan especial con ustedes. 
            Cada segundo cuenta para el momento en que digamos <br/> "Sí, acepto".
          </p>
        </div>
      </section>

      {/* Story / Welcome */}
      <section className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionHeading title="Nuestra Historia" subtitle="El comienzo de algo eterno" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-8 border-white max-w-2xl mx-auto"
          >
            <img 
              src="/images/proposal/historia.jpg" 
              alt="Nuestra Historia" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200";
              }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="prose prose-stone mx-auto font-serif text-lg md:text-xl leading-relaxed italic text-stone-600">
            "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección."
          </div>
          <p className="mt-8 text-stone-500 leading-relaxed">
            Después de 10 años de risas, viajes y aprendizajes, hemos decidido dar el paso más importante de nuestras vidas. 
            Queremos que seas parte de este nuevo capítulo.
          </p>
        </div>
      </section>

      {/* Itinerario Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="Itinerario" subtitle="Nuestra Celebración" />
          <div className="mt-16">
            {itinerary.map((item, idx) => (
              <div key={idx}>
                <TimelineItem item={item} isLast={idx === itinerary.length - 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lugar del Evento Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading title="Lugar del Evento" subtitle="Ubicación" />
          <div className="bg-cream rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-xl flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <MapPin className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-4xl font-serif mb-4">{WEDDING_CONFIG.locationName}</h3>
              <p className="text-stone-500 mb-8 leading-relaxed whitespace-pre-line">
                {WEDDING_CONFIG.locationAddress}
              </p>
              <a 
                href="https://www.google.com/maps/place/Las+Cavas+de+Don+Jos%C3%A9/@19.2416912,-103.7304707,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICE7KOHuQE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHVAwep_5q592BxyIhcs84ZX5nrg2eFrwXP-dFvBVAaDMgNozl1bmgyRulnzPF4cLtJtDtCCruzdDshJI0B1YvD7d4L0jKHYvuaBVWVWGyOwFovzKlelidy3DQIJyiefs2UnTXoAJlDP%3Dw152-h86-k-no!7i3920!8i2204!4m7!3m6!1s0x842545549746dffb:0xbf9b1768d294bd98!4b1!8m2!3d19.2416734!4d-103.7305672!16s%2Fg%2F1jmcl_vlk?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit px-8 py-3 bg-stone-900 text-white rounded-full text-xs uppercase tracking-widest hover:bg-gold transition-all"
              >
                Abrir en Google Maps
              </a>
            </div>
            <div className="md:w-1/2 h-80 md:h-auto relative">
              <img 
                src="/images/venue/lugar.jpg" 
                alt="Las Cavas de Don José"
                onError={(e) => {
                  // Fallback a la imagen que te gustó si no has subido la tuya
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000";
                }}
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Overlay to simulate the map point */}
              <div className="absolute inset-0 bg-stone-200/10 flex items-center justify-center pointer-events-none">
                <div className="bg-white p-3 rounded-lg shadow-2xl border border-stone-100 flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mb-2">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[10px] font-bold text-stone-800">Las Cavas de Don José</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code & Info */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading title="Información Importante" subtitle="Protocolo" />
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <Info className="w-8 h-8 text-gold mb-4" />
              <h4 className="text-xl font-serif mb-2">Código de Vestimenta</h4>
              <p className="text-sm opacity-60">Formal / Etiqueta</p>
              <p className="text-xs mt-2 opacity-40 italic">Se reserva el color blanco para la novia</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-gold mb-4" />
              <h4 className="text-xl font-serif mb-2">Solo Adultos</h4>
              <p className="text-sm opacity-60">Agradecemos su comprensión</p>
            </div>
            <div className="flex flex-col items-center">
              <Gift className="w-8 h-8 text-gold mb-4" />
              <h4 className="text-xl font-serif mb-2">Mesa de Regalos</h4>
              <p className="text-sm opacity-60 mb-6">Su presencia es nuestro mejor regalo</p>
              
              <div className="space-y-4 w-full max-w-xs mx-auto">
                {WEDDING_CONFIG.giftRegistries.map((registry, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10">
                    {registry.company === 'Liverpool' ? (
                      <img 
                        src="https://gcp-na-images.contentstack.com/v3/assets/blt339516d00dd80f86/blt8225505fe88f431b/673c926b0345b062aa3856c4/liverpool-logo-header.svg?branch=prod&format=avif&quality=80" 
                        alt="Liverpool" 
                        className="h-6 opacity-80"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-sm font-bold tracking-tighter italic uppercase">{registry.company}</div>
                    )}
                    <span className="text-xs font-mono tracking-wider">{registry.eventId}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-24 bg-white" id="rsvp">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-cream p-8 md:p-12 rounded-[2rem] border border-stone-100 shadow-2xl shadow-stone-200/50">
            <SectionHeading title="Confirmar Asistencia" subtitle="RSVP" />
            
            <div className="mb-10">
              <p className="text-center text-stone-500 text-sm mb-6">
                Puedes confirmar rápidamente vía WhatsApp{WEDDING_CONFIG.showRsvpForm ? ' o llenando el formulario abajo' : ''}:
              </p>
              <a 
                href={`https://wa.me/${WEDDING_CONFIG.rsvpWhatsAppNumber.replace('+', '')}?text=${encodeURIComponent(getWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-xl uppercase tracking-widest text-sm font-bold hover:bg-[#20ba5a] transition-all shadow-lg shadow-green-100"
              >
                <MessageCircle className="w-5 h-5" />
                Confirmar Asistencia
              </a>
              
              {WEDDING_CONFIG.showRsvpForm && (
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-stone-200" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">o usa el formulario</span>
                  <div className="flex-1 h-px bg-stone-200" />
                </div>
              )}
            </div>

            {WEDDING_CONFIG.showRsvpForm && (
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
                      className="mt-8 text-sm text-gold underline"
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
                        className="w-full bg-white border-b border-stone-200 py-3 px-4 focus:border-gold outline-none transition-colors"
                        placeholder="Ej. Juan Pérez"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest opacity-60">¿Asistirás?</label>
                      <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                          <input type="radio" name="attendance" className="hidden peer" defaultChecked />
                          <div className="text-center py-3 border border-stone-200 peer-checked:border-gold peer-checked:bg-gold/5 rounded-xl transition-all">
                            Sí, asistiré
                          </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                          <input type="radio" name="attendance" className="hidden peer" />
                          <div className="text-center py-3 border border-stone-200 peer-checked:border-gold peer-checked:bg-gold/5 rounded-xl transition-all">
                            No podré ir
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest opacity-60">Número de Invitados</label>
                      <select className="w-full bg-white border-b border-stone-200 py-3 px-4 focus:border-gold outline-none transition-colors">
                        <option>1 Persona</option>
                        <option>2 Personas</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest opacity-60">Mensaje para los novios</label>
                      <textarea 
                        className="w-full bg-white border-b border-stone-200 py-3 px-4 focus:border-gold outline-none transition-colors h-24 resize-none"
                        placeholder="Opcional..."
                      ></textarea>
                    </div>
                    <button 
                      disabled={rsvpStatus === 'submitting'}
                      type="submit"
                      className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors disabled:opacity-50"
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
      <footer className="py-12 bg-cream border-t border-stone-100 text-center">
        <div className="flex justify-center gap-4 mb-6">
          <div className="w-8 h-px bg-gold/30 self-center" />
          <Heart className="text-gold w-5 h-5" />
          <div className="w-8 h-px bg-gold/30 self-center" />
        </div>
        <p className="font-serif text-2xl mb-2">{WEDDING_CONFIG.brideName} & {WEDDING_CONFIG.groomName}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">Hecho con amor • 2026</p>
      </footer>

      {/* Floating Music Button */}
      <motion.button 
        onClick={() => {
          const newState = !isMusicPlaying;
          setIsMusicPlaying(newState);
          localStorage.setItem('music-enabled', newState ? 'true' : 'false');
          
          if (newState) {
            audioRef.current?.play();
          } else {
            audioRef.current?.pause();
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isMusicPlaying ? {
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 0 0px rgba(212, 175, 55, 0)",
            "0 0 0 10px rgba(212, 175, 55, 0.2)",
            "0 0 0 0px rgba(212, 175, 55, 0)"
          ]
        } : {}}
        transition={!isMusicPlaying ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center z-50 border border-stone-100 shadow-lg transition-all duration-500 ${
          isMusicPlaying ? 'bg-gold text-stone-900' : 'bg-white text-gold'
        }`}
      >
        <Music className={`w-5 h-5 ${isMusicPlaying ? 'animate-spin-slow' : 'opacity-40'}`} />
      </motion.button>
    </div>
  );
}
