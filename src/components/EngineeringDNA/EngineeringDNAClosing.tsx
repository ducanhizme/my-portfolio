import React from 'react';
import { ArrowDown } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

export const EngineeringDNAClosing: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="pt-24 sm:pt-36 border-t border-white/[0.08] space-y-16">
      {/* Manifesto Headline */}
      <div className="max-w-4xl space-y-6">
        <div className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
          {language === 'vi' ? 'TỔNG KẾT GÓC NHÌN' : 'KEY TAKEAWAY'}
        </div>

        <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.05] uppercase">
          {language === 'vi' ? (
            <>
              KỸ THUẬT TỐT LÀ <br />
              LÀM SỰ PHỨC TẠP <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
                TRỞ NÊN ĐƠN GIẢN.
              </span>
            </>
          ) : (
            <>
              GOOD ENGINEERING <br />
              MAKES COMPLEXITY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
                DISAPPEAR.
              </span>
            </>
          )}
        </h3>

        <p className="text-base sm:text-xl text-slate-300 font-light max-w-xl leading-relaxed">
          {language === 'vi'
            ? 'Xây dựng những hệ thống dễ hiểu, dễ mở rộng và người dùng hoàn toàn tin cậy.'
            : 'Build software that is easier to understand, maintain, and trust.'}
        </p>
      </div>

      {/* Editorial bridge to the next section */}
      <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/[0.06] text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="tracking-widest uppercase">
            {language === 'vi'
              ? 'KỶ LUẬT VÀ TẬN TÂM TRONG TỪNG SẢN PHẨM.'
              : 'CRAFTED WITH DISCIPLINE & CARE.'}
          </span>
        </div>

        <a
          href="#stack"
          onClick={() => soundManager.playClick()}
          className="group inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <span className="tracking-wider uppercase">
            {language === 'vi' ? 'XEM CÁC CÔNG NGHỆ TÔI DÙNG' : 'EXPLORE MY TECH STACK'}
          </span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};
