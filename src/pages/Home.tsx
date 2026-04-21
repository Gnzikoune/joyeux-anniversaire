import { useState } from 'react';
import { BirthdayData, Theme } from '../types';
import { encodeBirthdayData } from '../utils/encode';
import { QRCodeSVG } from 'qrcode.react';
import { ThemeWrapper } from '../components/ThemeWrapper';
import { motion } from 'motion/react';
import { Gift, Wand2, Sparkles, Download, Link as LinkIcon, ExternalLink } from 'lucide-react';

export const Home = () => {
  const [formData, setFormData] = useState<BirthdayData>({
    name: '',
    message: '',
    date: '',
    theme: 'festive',
  });
  
  const [url, setUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = encodeBirthdayData(formData);
    const generatedUrl = `${window.location.origin}/birthday/${id}`;
    setUrl(generatedUrl);
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
      }
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR-Anniversaire-${formData.name || 'Cadeau'}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <ThemeWrapper theme="festive" className="flex items-center justify-center p-3 sm:p-4 relative w-full h-[100dvh]">
      
      {/* Decorative background blur */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 -right-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl max-h-[96dvh] flex flex-col bg-white/10 backdrop-blur-2xl border border-white/30 p-3 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="text-center mb-2 sm:mb-4 shrink-0">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/20 mb-2 shadow-inner backdrop-blur-md border border-white/20"
          >
            <Gift className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </motion.div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-1 text-white tracking-tight drop-shadow-sm font-festive leading-tight">Joyeux Anniversaire QR</h1>
          <p className="text-white/90 font-minimalist text-xs sm:text-base font-medium">
            Créez une surprise numérique cachée.
          </p>
        </div>

        {!url ? (
          <form onSubmit={handleSubmit} className="font-minimalist text-gray-900 flex-1 overflow-y-auto scrollbar-hide px-1">
            <div className="bg-white/95 rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col gap-3 sm:gap-4 border border-white transition-all text-left">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Prénom du destinataire</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-gray-100 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-sm sm:text-base"
                  placeholder="Ex: Sophie"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Message personnalisé</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-gray-100 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none text-sm sm:text-base"
                  placeholder="Message chaleureux..."
                />
              </div>

              <div className="flex gap-3 sm:gap-5">
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-2 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-gray-100 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Thème</label>
                  <select 
                    value={formData.theme}
                    onChange={(e) => setFormData({...formData, theme: e.target.value as Theme})}
                    className="w-full px-2 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-gray-100 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all bg-white text-sm font-medium"
                  >
                    <option value="festive">🎉 Festif</option>
                    <option value="elegant">✨ Élégant</option>
                    <option value="kids">🧸 Enfant</option>
                    <option value="minimalist">🤍 Pur</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full py-2.5 sm:py-3.5 text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base shadow-[0_5px_15px_rgba(100,50,255,0.3)] hover:shadow-[0_8px_20px_rgba(100,50,255,0.4)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2 duration-300 shrink-0"
              >
                <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Générer la surprise
              </button>
            </div>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-2xl text-center text-gray-900 font-minimalist border border-white flex-1 flex flex-col items-center justify-center min-h-[50vh]"
          >
            <div className="inline-block p-2 sm:p-4 border-4 border-purple-100/50 rounded-xl sm:rounded-2xl mb-3 sm:mb-6 bg-white relative shadow-inner max-w-[140px] sm:max-w-[200px] w-full aspect-square flex items-center justify-center overflow-hidden shrink-0">
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 drop-shadow-md animate-pulse z-20" />
              <QRCodeSVG 
                id="qr-code-svg"
                value={url} 
                style={{ width: "100%", height: "100%" }}
                level="M"
                includeMargin={true}
              />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">C'est prêt ! 🎈</h2>
            <p className="text-gray-500 mb-3 sm:mb-6 text-xs sm:text-sm">Votre expérience est générée.</p>
            
            <div className="flex gap-2 sm:gap-4 justify-center mb-3 sm:mb-6 w-full px-2">
              <button 
                onClick={handleDownloadQR}
                className="flex-1 py-2 sm:py-3 px-2 bg-gray-900 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Télécharger</span>
                <span className="sm:hidden">Enregistrer</span>
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(url);
                }}
                className="flex-1 py-2 sm:py-3 px-2 bg-purple-50 text-purple-700 hover:bg-purple-100 outline outline-1 outline-purple-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <LinkIcon className="w-4 h-4" />
                Copier
              </button>
            </div>
            
            <div className="pt-3 sm:pt-4 border-t border-gray-100 flex flex-col items-center gap-1.5 sm:gap-3 w-full shrink-0">
              <a 
                href={url} 
                target="_blank" 
                rel="noreferrer"
                className="text-purple-600 text-sm font-bold hover:text-purple-800 flex items-center justify-center gap-1.5 p-1.5 hover:bg-purple-50 rounded-lg transition-colors inline-flex"
              >
                Prévisualiser
                <ExternalLink className="w-3 h-3" />
              </a>
              <button 
                onClick={() => setUrl(null)}
                className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors py-1.5"
              >
                ← Nouveau code
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </ThemeWrapper>
  );
};
