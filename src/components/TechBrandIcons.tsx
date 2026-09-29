import React from 'react';
import type { SimpleIcon } from 'simple-icons';
import {
  siTypescript,
  siReact,
  siNextdotjs,
  siPython,
  siFastapi,
  siDocker,
  siPostgresql,
  siRedis,
  siClaude,
  siGooglegemini,
  siLangchain,
  siTailwindcss,
  siNestjs,
  siNodedotjs,
  siQdrant,
  siNeo4j,
  siMinio,
  siLinux,
  siGooglecloud,
  siGithub,
  siOpentelemetry,
  siPrometheus,
  siGrafana,
  siFramer,
  siHuggingface,
  siOllama,
  siSocketdotio,
} from 'simple-icons';

interface SimpleIconData {
  title: string;
  hex: string;
  path: string;
}

// Official OpenAI SVG from Simple Icons archive
const siOpenai: SimpleIconData = {
  title: 'OpenAI',
  hex: '10A37F',
  path: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9897 5.9897 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.66-4.1254a4.47 4.47 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.08.08 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1402-1.6464zM2.3408 8.71a4.47 4.47 0 0 1 2.366-1.9732V12.41a.78.78 0 0 0 .3927.6813l5.8203 3.3623-2.02 1.1683a.076.076 0 0 1-.071 0l-4.8303-2.7858A4.5045 4.5045 0 0 1 2.3408 8.71zm16.598 3.855-5.8335-3.3695L15.124 8.027a.076.076 0 0 1 .071 0l4.8303 2.7915a4.4944 4.4944 0 0 1-.76 8.1012v-5.6787a.79.79 0 0 0-.39-.681zm2.0107-4.302-4.787-2.763a.77.77 0 0 0-.7807 0L9.54 8.8703V6.5379a.08.08 0 0 1 .0332-.0615l4.8402-2.7938a4.5 4.5 0 0 1 6.6775 4.73zm-10.82 5.074-2.02-1.1683a.071.071 0 0 1-.038-.052V3.4883a4.5045 4.5045 0 0 1 7.3703-3.453l-.142.0805-4.7783 2.758a.7948.7948 0 0 0-.3927.6813zm1.097-2.3654 2.602-1.4998 2.602 1.4998v2.9996l-2.602 1.4997-2.602-1.4997z',
};

interface SimpleSvgIconProps {
  icon: SimpleIcon | SimpleIconData;
  size?: number;
  className?: string;
  overrideColor?: string;
}

export const SimpleSvgIcon: React.FC<SimpleSvgIconProps> = ({
  icon,
  size = 24,
  className = '',
  overrideColor,
}) => {
  const hex = icon.hex.toLowerCase();
  // If brand color is pure black or very dark, render white on dark theme
  const fill =
    overrideColor ||
    (['000000', '181717', '191919', '010101'].includes(hex) ? '#FFFFFF' : `#${icon.hex}`);

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
};

// Master Resolver for all technologies using Simple Icons
export function resolveTechBrandIcon(techName: string, size = 26): React.ReactNode {
  const n = techName.toLowerCase();

  // 1. AI, LLM & Agents
  if (n.includes('langgraph') || n.includes('langchain')) {
    return <SimpleSvgIcon icon={siLangchain} size={size} overrideColor="#22C55E" />;
  }
  if (n.includes('llamaindex') || n.includes('rag')) {
    return <SimpleSvgIcon icon={siOllama} size={size} overrideColor="#A855F7" />;
  }
  if (n.includes('mcp') || n.includes('model context protocol')) {
    return <SimpleSvgIcon icon={siClaude} size={size} overrideColor="#D97757" />;
  }
  if (n.includes('openai') || n.includes('gpt')) {
    return <SimpleSvgIcon icon={siOpenai} size={size} overrideColor="#10A37F" />;
  }
  if (n.includes('gemini')) {
    return <SimpleSvgIcon icon={siGooglegemini} size={size} overrideColor="#8E75B2" />;
  }
  if (n.includes('claude') || n.includes('anthropic')) {
    return <SimpleSvgIcon icon={siClaude} size={size} overrideColor="#D97757" />;
  }
  if (n.includes('reranker') || n.includes('cross-encoder')) {
    return <SimpleSvgIcon icon={siHuggingface} size={size} overrideColor="#FFD21E" />;
  }
  if (n.includes('langsmith') || n.includes('phoenix')) {
    return <SimpleSvgIcon icon={siLangchain} size={size} overrideColor="#38BDF8" />;
  }

  // 2. Frontend & Modern Web
  if (n.includes('next.js') || n.includes('nextjs')) {
    return <SimpleSvgIcon icon={siNextdotjs} size={size} overrideColor="#FFFFFF" />;
  }
  if (n.includes('react')) {
    return <SimpleSvgIcon icon={siReact} size={size} overrideColor="#61DAFB" />;
  }
  if (n.includes('typescript')) {
    return <SimpleSvgIcon icon={siTypescript} size={size} overrideColor="#3178C6" />;
  }
  if (n.includes('tailwind')) {
    return <SimpleSvgIcon icon={siTailwindcss} size={size} overrideColor="#06B6D4" />;
  }
  if (n.includes('framer') || n.includes('motion') || n.includes('webgl')) {
    return <SimpleSvgIcon icon={siFramer} size={size} overrideColor="#0055FF" />;
  }

  // 3. Backend & Core Engines
  if (n.includes('fastapi')) {
    return <SimpleSvgIcon icon={siFastapi} size={size} overrideColor="#009688" />;
  }
  if (n.includes('python')) {
    return <SimpleSvgIcon icon={siPython} size={size} overrideColor="#3776AB" />;
  }
  if (n.includes('nest')) {
    return <SimpleSvgIcon icon={siNestjs} size={size} overrideColor="#E0234E" />;
  }
  if (n.includes('node')) {
    return <SimpleSvgIcon icon={siNodedotjs} size={size} overrideColor="#5FA04E" />;
  }
  if (n.includes('redis') || n.includes('bullmq')) {
    return <SimpleSvgIcon icon={siRedis} size={size} overrideColor="#FF4438" />;
  }
  if (n.includes('websocket') || n.includes('server-sent') || n.includes('sse')) {
    return <SimpleSvgIcon icon={siSocketdotio} size={size} overrideColor="#00E5FF" />;
  }

  // 4. Databases
  if (n.includes('postgres') || n.includes('pgvector') || n.includes('sql')) {
    return <SimpleSvgIcon icon={siPostgresql} size={size} overrideColor="#4169E1" />;
  }
  if (n.includes('qdrant') || n.includes('chroma')) {
    return <SimpleSvgIcon icon={siQdrant} size={size} overrideColor="#DC244C" />;
  }
  if (n.includes('neo4j') || n.includes('graph')) {
    return <SimpleSvgIcon icon={siNeo4j} size={size} overrideColor="#4581C3" />;
  }
  if (n.includes('minio') || n.includes('s3') || n.includes('storage')) {
    return <SimpleSvgIcon icon={siMinio} size={size} overrideColor="#C72E49" />;
  }

  // 5. Cloud & Deployment
  if (n.includes('docker')) {
    return <SimpleSvgIcon icon={siDocker} size={size} overrideColor="#2496ED" />;
  }
  if (n.includes('linux') || n.includes('debian') || n.includes('shell')) {
    return <SimpleSvgIcon icon={siLinux} size={size} overrideColor="#FCC624" />;
  }
  if (n.includes('azure') || n.includes('gcp') || n.includes('cloud')) {
    return <SimpleSvgIcon icon={siGooglecloud} size={size} overrideColor="#4285F4" />;
  }
  if (n.includes('github') || n.includes('ci/cd') || n.includes('actions')) {
    return <SimpleSvgIcon icon={siGithub} size={size} overrideColor="#FFFFFF" />;
  }

  // 6. Observability
  if (n.includes('opentelemetry') || n.includes('jaeger')) {
    return <SimpleSvgIcon icon={siOpentelemetry} size={size} overrideColor="#4585F5" />;
  }
  if (n.includes('prometheus')) {
    return <SimpleSvgIcon icon={siPrometheus} size={size} overrideColor="#E6522C" />;
  }
  if (n.includes('grafana')) {
    return <SimpleSvgIcon icon={siGrafana} size={size} overrideColor="#F46800" />;
  }

  return <SimpleSvgIcon icon={siReact} size={size} overrideColor="#61DAFB" />;
}
