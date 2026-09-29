import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, translations, projectTranslationsVi } from '../i18n/translations';
import { Project } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof translations)['en'];
  localizeProject: (project: Project) => Project;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check saved choice in localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved === 'en' || saved === 'vi') {
        return saved;
      }
      // 2. Default to Vietnamese if browser is Vietnamese, otherwise English
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('vi')) {
        return 'vi';
      }
    }
    return 'vi'; // Default to Vietnamese per user preference
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  // Helper to dynamically localize a project
  const localizeProject = useMemo(() => {
    return (project: Project): Project => {
      if (language === 'en') return project;

      const override = projectTranslationsVi[project.id];
      if (!override) return project;

      return {
        ...project,
        subtitle: override.subtitle || project.subtitle,
        category: override.category || project.category,
        headline: override.headline || project.headline,
        description: override.description || project.description,
        problem: override.problem || project.problem,
        problemDetails: override.problemDetails || project.problemDetails,
        solution: override.solution || project.solution,
        approachDetails: override.approachDetails || project.approachDetails,
        architecture: {
          ...project.architecture,
          overview: override.architectureOverview || project.architecture.overview,
          flowSteps: project.architecture.flowSteps.map((step, idx) => {
            const stepOverride = override.flowSteps?.[idx];
            return {
              ...step,
              title: stepOverride?.title || step.title,
              desc: stepOverride?.desc || step.desc,
            };
          }),
        },
      };
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      localizeProject,
    }),
    [language, t, localizeProject]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
