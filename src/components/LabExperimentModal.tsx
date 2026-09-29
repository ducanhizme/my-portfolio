import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, Terminal, ArrowLeft } from 'lucide-react';
import { LabExperiment } from '../types';
import { soundManager } from '../utils/audio';

interface LabExperimentModalProps {
  experiment: LabExperiment | null;
  onClose: () => void;
}

export const LabExperimentModal: React.FC<LabExperimentModalProps> = ({
  experiment,
  onClose,
}) => {
  if (!experiment) return null;

  const [inputVal, setInputVal] = useState<string>(
    experiment.defaultInput || (experiment.inputs ? experiment.inputs[0] : '')
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(
    experiment.simulatedResult ? experiment.simulatedResult.steps.length : 0
  );

  const handleRunSimulation = () => {
    soundManager.playBoot();
    setIsRunning(true);
    setActiveStep(0);

    const totalSteps = experiment.simulatedResult ? experiment.simulatedResult.steps.length : 0;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      setActiveStep(current);
      soundManager.playKeypress();
      if (current >= totalSteps) {
        clearInterval(interval);
        setIsRunning(false);
        soundManager.playInspect();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#07090e] border border-cyan-500/30 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 font-mono text-xs">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>CLOSE EXPERIMENT</span>
          </button>

          <span className="text-slate-400">
            THE LAB // <span className="text-white font-bold">{experiment.category}</span>
          </span>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer font-sans"
          >
            ✕ ESC
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-block px-2.5 py-1 bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono rounded">
              {experiment.badge}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white">
              {experiment.title}
            </h2>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              {experiment.description}
            </p>
          </div>

          {/* Interactive Input Stage */}
          <div className="p-5 bg-black/60 border border-white/10 rounded-sm space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-2 text-cyan-400">
                <Terminal size={14} />
                <span>INPUT PROMPT / TEST PARAMETERS:</span>
              </span>
              <span className="text-[10px]">SELECT OR CUSTOMIZE</span>
            </div>

            {/* Presets */}
            {experiment.inputs && experiment.inputs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {experiment.inputs.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundManager.playClick();
                      setInputVal(preset);
                    }}
                    className={`px-2.5 py-1 text-[11px] rounded border transition-colors cursor-pointer text-left truncate max-w-xs ${
                      inputVal === preset
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                        : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                    }`}
                  >
                    Preset #{idx + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Input field + Execute button */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter query, payload or parameter..."
                className="flex-1 bg-white/[0.04] border border-white/15 px-3 py-2 text-xs text-white rounded focus:border-cyan-400 outline-none"
              />
              <button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-2 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                {isRunning ? (
                  <>
                    <Sparkles size={12} className="animate-spin" />
                    <span>RUNNING...</span>
                  </>
                ) : (
                  <>
                    <Play size={12} />
                    <span>EXECUTE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Trace Results & Simulated Steps */}
          {experiment.simulatedResult && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center justify-between">
                <span>EXECUTION TRACE STEPS</span>
                <span className="text-emerald-400">
                  {isRunning ? 'PIPELINE ACTIVE' : 'EXECUTION COMPLETE'}
                </span>
              </div>

              {/* Step Sequence */}
              <div className="space-y-3 font-mono text-xs">
                {experiment.simulatedResult.steps.map((step, idx) => {
                  const isVisible = idx < activeStep;
                  if (!isVisible && isRunning) return null;
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-white/[0.02] border border-white/10 rounded space-y-2 transition-all"
                    >
                      <div className="flex items-center justify-between text-white font-medium">
                        <span className="flex items-center gap-2 text-cyan-300">
                          <CheckCircle2 size={14} className="text-emerald-400" />
                          <span>{step.label}</span>
                        </span>
                        <span className="text-slate-500 text-[10px]">STEP 0{idx + 1}</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed font-light">
                        {step.detail}
                      </p>

                      {step.data && (
                        <pre className="p-2.5 bg-black/60 border border-white/[0.06] rounded text-[11px] text-cyan-200/90 overflow-x-auto">
                          <code>{JSON.stringify(step.data, null, 2)}</code>
                        </pre>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Real-time telemetry metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white/[0.02] border border-white/10 rounded font-mono text-xs">
                {Object.entries(experiment.simulatedResult.metrics).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-slate-500 text-[10px] block uppercase">{key}</span>
                    <span className="text-white font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
