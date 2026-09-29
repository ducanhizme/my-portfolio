import React from 'react';
import { ExactIntelligenceField } from './ExactIntelligenceField';

interface IntelligenceFieldProps {
  reducedMotion?: boolean;
  className?: string;
  onSelectTag?: (tag: string) => void;
}

export const IntelligenceField: React.FC<IntelligenceFieldProps> = ({
  reducedMotion = false,
  className = '',
  onSelectTag,
}) => {
  return (
    <ExactIntelligenceField
      reducedMotion={reducedMotion}
      className={className}
      onSelectTag={onSelectTag}
    />
  );
};
