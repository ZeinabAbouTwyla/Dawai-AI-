import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientBottomNav } from '../../components/navigation/PatientBottomNav';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  Send,
  Sparkles,
  BookOpen,
  Info,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  X,
  PhoneCall,
  Headphones,
  Check,
} from 'lucide-react';
import { HealthChatMessage } from '../../types';
import { askHealthEducationalAssistant } from '../../services/geminiService';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

export const Screen22HealthEducationChat: React.FC = () => {
  const { screenParams, language, activePatient, patientMedications } = useApp();
  const isAr = language === 'ar';

  const [messages, setMessages] = useState<HealthChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        isAr
          ? `أهلاً بك يا ${activePatient.nameAr} 🌿. أنا مساعدك التثقيفي الصوتي في دوائي.\n\nيمكنك الآن التحدث معي بالصوت عبر الضغط على علامة الميكروفون 🎙️ أو الكتابة في أي وقت. يمكنك أيضاً الضغط على أيقونة السماعة 🔊 للاستماع إلى إجابتي بصوت واضح.`
          : `Hello ${activePatient.name} 🌿. I am your DOAWY Voice & Health Educator.\n\nYou can now speak to me directly using the microphone button 🎙️ or by typing. You can also tap the speaker icon 🔊 on any message to listen out loud.`,
      timestamp: '09:00 AM',
      sources: [
        { name: 'Mayo Clinic Clinical Monograph', institution: 'Mayo Clinic' },
        { name: 'Patient Medication Safety', institution: 'WHO & SFDA' },
      ],
      disclaimer:
        isAr
          ? 'معلومات تثقيفية موثوقة فقط، ولا تغني عن استشارة الطبيب.'
          : 'Educational information only; does not replace your physician.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLiveVoiceModal, setShowLiveVoiceModal] = useState(false);
  const [liveVoiceStatus, setLiveVoiceStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastProcessedQueryRef = useRef<string | null>(null);

  // Hook for STT and TTS
  const {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    isSpeaking,
    speakingMessageId,
    speakText,
    stopSpeaking,
    permissionError,
    setPermissionError,
  } = useVoiceAssistant({
    lang: language,
    onTranscript: (liveText) => {
      setInput(liveText);
    },
    onFinalTranscript: (finalText) => {
      if (finalText.trim()) {
        handleSend(finalText.trim());
      }
    },
  });

  const suggestedQuestions = [
    isAr ? 'لماذا يجب أخذ الميتفورمين مع الأكل؟' : 'Why take Metformin with meals?',
    isAr ? 'هل يجوز شرب عصير الجريب فروت مع دوائي؟' : 'Can I drink grapefruit juice with Lipitor?',
    isAr ? 'ماذا أفعل إذا نسيت جرعة الأسبرين؟' : 'What if I miss an Aspirin dose?',
    isAr ? 'كيف أحفظ أدوية الضغط في الصيف؟' : 'How should I store blood pressure pills?',
  ];

  const handleSend = async (textToSend?: string, autoSpeakResponse = false) => {
    const query = (textToSend || input || transcript).trim();
    if (!query || loading) return;

    if (isListening) {
      stopListening();
    }

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: HealthChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: timeNow,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTranscript('');
    setLoading(true);
    if (showLiveVoiceModal) setLiveVoiceStatus('thinking');

    try {
      const patientContext = `${activePatient.name}, age ${activePatient.age}, conditions: ${activePatient.conditions.join(', ')}. Taking: ${patientMedications.map((m) => m.brandName + ' ' + m.strength).join(', ')}`;
      const aiResponse = await askHealthEducationalAssistant(
        query,
        language,
        patientContext
      );
      setMessages((prev) => [...prev, aiResponse]);

      // If voice mode or auto-speak requested, read answer aloud
      if (autoSpeakResponse || showLiveVoiceModal) {
        setLiveVoiceStatus('speaking');
        speakText(aiResponse.text, aiResponse.id);
      }
    } catch (e) {
      console.warn('Error receiving assistant response:', e);
    } finally {
      setLoading(false);
      if (showLiveVoiceModal && !isSpeaking) {
        setLiveVoiceStatus('idle');
      }
    }
  };

  // Toggle voice recognition
  const toggleListening = () => {
    if (isListening) {
      stopListening();
      if (input.trim()) {
        handleSend(input.trim());
      }
    } else {
      stopSpeaking();
      startListening();
    }
  };

  // Simulated Voice Test for quick fallback/demo if mic hardware blocked
  const handleSimulatedVoiceQuery = (presetText: string) => {
    setInput(presetText);
    setTimeout(() => {
      handleSend(presetText, true);
    }, 400);
  };

  // Auto-send query if passed in navigation params
  useEffect(() => {
    if (screenParams?.query && screenParams.query !== lastProcessedQueryRef.current) {
      lastProcessedQueryRef.current = screenParams.query;
      handleSend(screenParams.query);
    }
    if (screenParams?.startVoice) {
      setTimeout(() => {
        startListening();
      }, 350);
    }
  }, [screenParams?.query, screenParams?.startVoice]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Health Education Chat"
        titleAr="محادثة التثقيف الصحي الصوتي"
        subtitle={isAr ? 'تحدث واكتب مع المساعد الطبي' : 'Voice & Text AI Assistant'}
        showBack
        rightAction={
          <button
            onClick={() => setShowLiveVoiceModal(true)}
            className="px-2.5 py-1 rounded-full bg-[#52766B]/15 text-[#52766B] hover:bg-[#52766B] hover:text-white border border-[#52766B]/30 text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
            title={isAr ? 'مكالمة صوتية مباشرة' : 'Live Voice Call Mode'}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#52766B]" />
            <span className="text-[11px]">{isAr ? 'محادثة صوتية' : 'Voice Mode'}</span>
          </button>
        }
      />

      {/* Safety & Voice Guidance Banner */}
      <div className="bg-[#E8E3D8]/70 border-b border-[#E8E3D8] px-4 py-2 flex items-center justify-between text-[11px] text-[#454D46]">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#52766B] shrink-0" />
          <span className="leading-tight">
            {isAr
              ? 'يمكنك التحدث بالصوت 🎙️ أو الضغط على السماعة 🔊 للاستماع للردود.'
              : 'Tap 🎙️ to talk by voice or 🔊 to listen to answers out loud.'}
          </span>
        </div>
      </div>

      {/* Permission or Browser Warning if any */}
      {permissionError && (
        <div className="bg-[#D5A18E]/25 border-b border-[#D5A18E]/50 px-4 py-2 flex items-center justify-between text-xs text-[#9B4832]">
          <div className="flex items-center gap-2">
            <MicOff className="w-4 h-4 shrink-0" />
            <span className="text-[11px] leading-tight">{permissionError}</span>
          </div>
          <button
            onClick={() => setPermissionError(null)}
            className="p-1 text-[#9B4832] hover:bg-[#D5A18E]/30 rounded-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isCurrentlySpeakingThis = isSpeaking && speakingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end gap-2 max-w-[88%]">
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#52766B] text-white flex items-center justify-center shrink-0 mb-1 shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#B7C6B0]" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-3xl text-xs leading-relaxed space-y-2.5 shadow-soft transition-all ${
                    isUser
                      ? 'bg-[#52766B] text-white rounded-br-xs'
                      : 'bg-white text-[#454D46] border border-[#E8E3D8] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium text-[13px] leading-relaxed">
                    {msg.text}
                  </p>

                  {/* Audio Listen Button on Assistant Message */}
                  {!isUser && (
                    <div className="pt-2 border-t border-[#E8E3D8]/80 flex items-center justify-between">
                      <button
                        onClick={() => speakText(msg.text, msg.id)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                          isCurrentlySpeakingThis
                            ? 'bg-[#52766B] text-white shadow-xs'
                            : 'bg-[#F7F5EF] text-[#52766B] hover:bg-[#E8E3D8] border border-[#E8E3D8]'
                        }`}
                      >
                        {isCurrentlySpeakingThis ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>{isAr ? 'إيقاف الصوت' : 'Stop Audio'}</span>
                            <span className="flex gap-0.5 ml-1">
                              <span className="w-1 h-2.5 bg-white rounded-full animate-bounce" />
                              <span className="w-1 h-3.5 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
                              <span className="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
                            </span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isAr ? 'استمع للإجابة بالصوت' : 'Listen Aloud'}</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] text-[#737B74]">
                        {isAr ? 'صوت طبيعي' : 'Audio voice'}
                      </span>
                    </div>
                  )}

                  {/* Medical Sources Citation if Assistant */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div
                      className={`pt-1 border-t text-[10px] ${
                        isUser
                          ? 'border-white/20 text-[#E8E3D8]'
                          : 'border-[#E8E3D8]/80 text-[#737B74]'
                      }`}
                    >
                      <div className="font-bold text-[#52766B] flex items-center gap-1 mb-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{isAr ? 'المراجع والمصادر المعتمدة:' : 'Verified Sources:'}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5">
                        {msg.sources.map((s, idx) => (
                          <li key={idx}>
                            <span className="font-medium text-[#454D46]">{s.institution}</span> ({s.name})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {msg.disclaimer && (
                    <div className="text-[10px] text-[#737B74] italic">
                      ⚠️ {msg.disclaimer}
                    </div>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-[#737B74] font-mono mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2.5 text-xs text-[#52766B] font-bold bg-white p-3 rounded-2xl border border-[#B7C6B0] shadow-soft w-fit animate-pulse">
            <Sparkles className="w-4 h-4 text-[#52766B] animate-spin" />
            <span>
              {isAr
                ? 'جاري مراجعة الإرشادات الطبية وإعداد الرد...'
                : 'Consulting verified medical guidelines...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Active Voice Recording Wave Overlay Bar */}
      {isListening && (
        <div className="mx-4 mb-2 p-3 bg-gradient-to-r from-[#52766B] to-[#3F5C53] text-white rounded-2xl shadow-lg border border-[#B7C6B0] animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <span className="text-xs font-bold">
                {isAr ? 'جاري الاستماع لصوتك... تكلّم الآن' : 'Listening... Speak now'}
              </span>
            </div>

            {/* Sound Wave Animation Bars */}
            <div className="flex items-center gap-1">
              <div className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:0.1s]" />
              <div className="w-1 h-5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1 h-4 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
              <div className="w-1 h-6 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
              <div className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:0.25s]" />
            </div>
          </div>

          <div className="bg-black/20 p-2 rounded-xl text-xs font-medium min-h-[32px] text-white/90">
            {transcript || (isAr ? 'أنا أصغي إليك...' : 'Listening to your voice...')}
          </div>

          <div className="flex items-center justify-end gap-2 mt-2 pt-1 border-t border-white/20">
            <button
              onClick={stopListening}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-xl text-[11px] font-bold text-white transition-colors"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={() => {
                stopListening();
                if (transcript.trim()) {
                  handleSend(transcript.trim(), true);
                }
              }}
              disabled={!transcript.trim()}
              className="px-3 py-1 bg-white text-[#52766B] disabled:opacity-50 rounded-xl text-[11px] font-bold shadow-xs hover:bg-[#F7F5EF] transition-colors"
            >
              {isAr ? 'إرسال السؤال الصوتي' : 'Send Voice Question'}
            </button>
          </div>
        </div>
      )}

      {/* Suggested Quick Question Chips */}
      <div className="p-2 border-t border-[#E8E3D8] bg-white/80 backdrop-blur-xs">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          {/* Quick Voice Demo Trigger */}
          <button
            onClick={() =>
              handleSimulatedVoiceQuery(
                isAr ? 'ماذا أفعل إذا نسيت أخذ حبة الضغط اليوم؟' : 'What should I do if I forgot my blood pressure dose?'
              )
            }
            className="py-1.5 px-3 rounded-full bg-[#52766B]/15 text-[#52766B] hover:bg-[#52766B] hover:text-white font-bold border border-[#52766B]/30 whitespace-nowrap transition-colors shadow-xs flex items-center gap-1"
          >
            <Mic className="w-3 h-3 text-[#52766B]" />
            <span>{isAr ? '🎙️ تجربة سؤال صوتي سريع' : '🎙️ Try Voice Prompt'}</span>
          </button>

          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="py-1.5 px-3 rounded-full bg-white hover:bg-[#F7F5EF] text-[#52766B] font-semibold border border-[#E8E3D8] whitespace-nowrap transition-colors shadow-xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice Microphone and Send */}
        <div className="flex items-center gap-2 pt-2">
          {/* MICROPHONE VOICE BUTTON */}
          <button
            onClick={toggleListening}
            className={`w-12 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-all active:scale-95 border ${
              isListening
                ? 'bg-red-500 text-white border-red-600 animate-pulse ring-4 ring-red-200'
                : 'bg-white hover:bg-[#F7F5EF] text-[#52766B] border-[#52766B]/40 hover:border-[#52766B]'
            }`}
            title={isAr ? 'تحدث بالصوت بدلاً من الكتابة' : 'Talk with Voice'}
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5 text-[#52766B]" />
            )}
          </button>

          {/* Text input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              isListening
                ? isAr
                  ? 'جاري الاستماع... تحدث الآن'
                  : 'Listening to your voice...'
                : isAr
                ? 'اكتب سؤالك أو انقر على الميكروفون للتحدث...'
                : 'Type question or tap mic to speak...'
            }
            className={`flex-1 px-4 py-3 bg-[#F7F5EF] border rounded-2xl text-xs text-[#454D46] focus:outline-none transition-colors ${
              isListening
                ? 'border-[#52766B] bg-[#52766B]/5 ring-2 ring-[#52766B]/20'
                : 'border-[#E8E3D8] focus:border-[#52766B]'
            }`}
          />

          {/* Send button */}
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="w-12 h-11 rounded-2xl bg-[#52766B] hover:bg-[#3F5C53] disabled:opacity-50 text-white flex items-center justify-center shrink-0 shadow-xs transition-transform active:scale-95"
            title={isAr ? 'إرسال' : 'Send'}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FULLSCREEN HANDS-FREE VOICE CALL MODAL FOR SENIORS */}
      {showLiveVoiceModal && (
        <div className="fixed inset-0 z-50 bg-[#363E38]/85 backdrop-blur-md flex flex-col items-center justify-between p-6 text-white animate-in fade-in duration-200">
          {/* Top header */}
          <div className="w-full flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-bold text-[#E8E3D8]">
                {isAr ? 'مكالمة صوتية صحية مباشرة' : 'Live Health Voice Call'}
              </span>
            </div>
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                setShowLiveVoiceModal(false);
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Center Voice Avatar / Pulsing Sound Wave */}
          <div className="flex flex-col items-center text-center my-auto space-y-6">
            <div className="relative">
              {/* Outer pulsing rings */}
              <div
                className={`absolute -inset-4 rounded-full bg-[#52766B]/30 blur-md transition-all duration-700 ${
                  isListening || isSpeaking ? 'scale-125 opacity-100 animate-ping' : 'scale-100 opacity-40'
                }`}
              />
              <div
                className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-2xl relative z-10 ${
                  isListening
                    ? 'bg-red-500 border-red-300 ring-8 ring-red-400/30'
                    : isSpeaking
                    ? 'bg-[#52766B] border-[#B7C6B0] ring-8 ring-[#B7C6B0]/30'
                    : 'bg-[#52766B] border-white/20'
                }`}
              >
                {isSpeaking ? (
                  <Volume2 className="w-14 h-14 text-white animate-pulse" />
                ) : isListening ? (
                  <Mic className="w-14 h-14 text-white animate-bounce" />
                ) : (
                  <Headphones className="w-14 h-14 text-[#E8E3D8]" />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">
                {isSpeaking
                  ? isAr
                    ? 'المساعد يتحدث الآن...'
                    : 'Assistant is speaking...'
                  : isListening
                  ? isAr
                    ? 'أنا أستمع إليك... تكلّم'
                    : 'Listening to you... Speak now'
                  : isAr
                  ? 'المساعد جاهز للاستماع'
                  : 'Ready to listen'}
              </h3>
              <p className="text-xs text-[#E8E3D8] mt-1 max-w-xs mx-auto">
                {isAr
                  ? 'اضغط على زر الميكروفون بالأسفل وتحدث بأي سؤال تريده، وسيجيبك المساعد صوتياً.'
                  : 'Tap the microphone below and ask any medication question out loud.'}
              </p>
            </div>

            {/* Transcript preview during voice call */}
            {transcript && (
              <div className="p-3 bg-white/10 rounded-2xl max-w-sm text-xs font-medium text-white border border-white/10">
                "{transcript}"
              </div>
            )}
          </div>

          {/* Bottom Call Controls */}
          <div className="w-full flex items-center justify-around pb-6 max-w-xs">
            {/* Toggle Mic in Call */}
            <button
              onClick={() => {
                if (isListening) {
                  stopListening();
                  if (transcript.trim()) {
                    handleSend(transcript.trim(), true);
                  }
                } else {
                  stopSpeaking();
                  startListening();
                }
              }}
              className={`w-18 h-18 rounded-full flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95 border-2 ${
                isListening
                  ? 'bg-red-500 border-white text-white animate-pulse'
                  : 'bg-[#52766B] border-white text-white hover:bg-[#3F5C53]'
              }`}
            >
              <Mic className="w-8 h-8" />
              <span className="text-[10px] font-bold mt-0.5">
                {isListening ? (isAr ? 'إيقاف' : 'Stop') : isAr ? 'تحدث' : 'Speak'}
              </span>
            </button>

            {/* End Call Button */}
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                setShowLiveVoiceModal(false);
              }}
              className="w-14 h-14 rounded-full bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
              title={isAr ? 'إنهاء المكالمة الصوتية' : 'End Call'}
            >
              <PhoneCall className="w-6 h-6 rotate-[135deg]" />
            </button>
          </div>
        </div>
      )}

      <PatientBottomNav />
    </div>
  );
};
