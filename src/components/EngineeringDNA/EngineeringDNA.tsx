import React from 'react';
import { DNA_PRINCIPLES } from './data';
import { EngineeringPrinciple } from './EngineeringPrinciple';
import { EngineeringDNAClosing } from './EngineeringDNAClosing';
import { useLanguage } from '../../context/LanguageContext';

interface EngineeringDNAProps {
  reducedMotion?: boolean;
}

export const EngineeringDNA: React.FC<EngineeringDNAProps> = ({
  reducedMotion = false,
}) => {
  const { t, language } = useLanguage();

  const localizedPrinciples = DNA_PRINCIPLES.map((p, idx) => {
    if (language === 'en') return p;
    const viList = [
      {
        title: "TÔI KHÔNG CHỈ VIẾT CODE.\nTÔI GIẢI QUYẾT BÀI TOÁN THỰC TẾ.",
        supporting: 'Code là công cụ. Thấu hiểu bài toán nghiệp vụ mới quyết định sản phẩm có tồn tại lâu dài hay không.',
        microSummary: 'ƯU TIÊN THẤU HIỂU BÀI TOÁN VÀ ĐỘ BỀN VỮNG',
      },
      {
        title: 'TÔI HIỂU RÕ BẢN CHẤT DƯỚI CÁC THƯ VIỆN.',
        supporting: 'Thư viện mang lại sự tiện lợi, nhưng hiểu rõ cơ sở dữ liệu và chi phí mạng mới giúp tối ưu đúng cách.',
        microSummary: 'NẮM VỮNG NGUYÊN LÝ HOẠT ĐỘNG TẦNG CƠ BẢN',
      },
      {
        title: 'TÔI TỰ ĐỘNG HÓA NHỮNG VIỆC LẶP LẠI.',
        supporting: 'Nếu một quy trình phải làm thủ công nhiều lần, tôi sẽ chuyển nó thành script hoặc pipeline tự động.',
        microSummary: 'TIẾT KIỆM THỜI GIAN ĐỂ GIẢI QUYẾT BÀI TOÁN LỚN',
      },
      {
        title: 'TÔI ĐO LƯỜNG BẰNG DỮ LIỆU THẬT.',
        supporting: 'Cảm tính đưa ra giả thuyết. Số liệu đo lường và benchmark mới là cơ sở vững chắc để quyết định.',
        microSummary: 'TỐI ƯU DỰA TRÊN DỮ LIỆU THỰC TẾ',
      },
      {
        title: 'TÔI XÂY DỰNG CHO NGƯỜI DÙNG THỰC TẾ.',
        supporting: 'Một hệ thống phức tạp không có ý nghĩa nếu người dùng không thể tin cậy vào nó hằng ngày.',
        microSummary: 'TẠO RA SỰ TIN CẬY VÀ TRẢI NGHIỆM TỐT',
      },
    ];
    return {
      ...p,
      title: viList[idx]?.title || p.title,
      supporting: viList[idx]?.supporting || p.supporting,
      microSummary: viList[idx]?.microSummary || p.microSummary,
    };
  });

  return (
    <section
      id="dna"
      className="relative w-full bg-[#030407] text-white py-32 sm:py-44 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* ================================================== */}
        {/* SECTION HEADER: QUIET, CONFIDENT, EDITORIAL         */}
        {/* ================================================== */}
        <header className="mb-24 sm:mb-36 space-y-6 max-w-3xl">
          {/* Kicker */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400">
            <span className="w-6 h-[1px] bg-cyan-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t.dna.kicker}</span>
          </div>

          {/* Primary Editorial Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight uppercase leading-[1.1]">
            {t.dna.title1} <br />
            {t.dna.title2}
          </h2>

          {/* Short Supporting Statement */}
          <p className="text-lg sm:text-2xl text-slate-300 font-light leading-relaxed">
            {t.dna.subtitle}
          </p>
        </header>

        {/* ================================================== */}
        {/* FIVE EDITORIAL CHAPTERS (PRINCIPLES)               */}
        {/* ================================================== */}
        <div className="space-y-4">
          {localizedPrinciples.map((principle) => (
            <EngineeringPrinciple
              key={principle.id}
              principle={principle}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* ================================================== */}
        {/* CLOSING MANIFESTO & TRANSITION                     */}
        {/* ================================================== */}
        <EngineeringDNAClosing />
      </div>
    </section>
  );
};
