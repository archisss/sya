import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  CheckCircle2, 
  MessageCircle, 
  CreditCard, 
  Users, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" 
            alt="Wedding Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs uppercase tracking-[0.3em] mb-8">
              Invitaciones Digitales Premium
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-6xl md:text-8xl font-serif mb-8 leading-tight"
          >
            Tu Boda Comienza <br /> con una <span className="italic text-gold">Invi</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xl md:text-2xl font-serif italic mb-12 text-stone-300"
          >
            Crea una experiencia inolvidable para tus invitados desde el primer clic.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <a 
              href="#info"
              className="px-12 py-4 bg-gold text-stone-900 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-white transition-all shadow-xl"
            >
              Saber Más
            </a>
            <a 
              href="#pricing"
              className="px-12 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-white/20 transition-all"
            >
              Ver Precios
            </a>
          </motion.div>
        </div>
      </header>

      {/* Info Section for Couples */}
      <section id="info" className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Diseñado para Novios Modernos</h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">
              Olvídate de las invitaciones de papel que se pierden. TuInvi te ofrece una plataforma elegante, interactiva y fácil de compartir.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Diseño Exclusivo</h3>
              <p className="text-stone-500 leading-relaxed">
                Invitaciones elegantes con animaciones fluidas, galerías de fotos y música personalizada que reflejan su estilo único.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Confirmación Real</h3>
              <p className="text-stone-500 leading-relaxed">
                Recibe confirmaciones de asistencia directamente en tu WhatsApp. Gestiona tu lista de invitados sin complicaciones.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Toda la Información</h3>
              <p className="text-stone-500 leading-relaxed">
                Ubicación con Google Maps, itinerario detallado, mesa de regalos y código de vestimenta en un solo lugar.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Un Solo Precio, Todo Incluido</h2>
            <p className="text-stone-400 text-lg">Sin letras chiquitas ni cargos ocultos.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white text-stone-900 rounded-[3rem] p-8 md:p-16 shadow-2xl relative"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gold text-stone-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              Oferta Especial
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-6xl font-serif">$799</span>
                  <span className="text-stone-400 uppercase tracking-widest text-sm">MXN</span>
                </div>
                <ul className="space-y-4">
                  {[
                    'Invitación digital personalizada',
                    'Confirmación vía WhatsApp',
                    'Mapa interactivo (Google Maps)',
                    'Galería de fotos ilimitada',
                    'Mesa de regalos y datos bancarios',
                    'Música de fondo personalizada',
                    'Acceso de por vida'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold" />
                      <span className="text-stone-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full md:w-px h-px md:h-64 bg-stone-100" />

              <div className="flex-1 text-center md:text-left">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <ShieldCheck className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Asesoría Personalizada</h3>
                <p className="text-stone-500 mb-8 leading-relaxed">
                  Tendrás acceso directo a un asesor para cualquier duda o pregunta que tengas durante el proceso de creación.
                </p>
                <a 
                  href="https://wa.me/523122102848?text=Hola,%20me%20gustaría%20más%20información%20sobre%20las%20invitaciones%20de%20TuInvi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-full text-sm uppercase tracking-widest font-bold hover:bg-gold transition-all w-full justify-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contactar Asesor
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-stone-50 border-t border-stone-200 text-center">
        <div className="flex justify-center gap-4 mb-6">
          <Heart className="text-gold w-6 h-6" />
        </div>
        <p className="font-serif text-3xl mb-2">TuInvi</p>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">© 2026 TuInvi.com.mx • Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default LandingPage;
