import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientBottomNav } from '../../components/navigation/PatientBottomNav';
import { MobileHeader } from '../../components/common/MobileHeader';
import {
  Sparkles,
  MessageCircle,
  HelpCircle,
  AlertCircle,
  Heart,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  ShieldCheck,
  Send,
  Mic,
  Radio,
} from 'lucide-react';
import { FREQUENT_EDUCATION_TOPICS } from '../../data/mockData';

export const Screen21HealthEducation: React.FC = () => {
  const { navigateTo, language, activePatient } = useApp();
  const [directQuestion, setDirectQuestion] = useState('');
  const isAr = language === 'ar';
  const NextChevron = isAr ? ChevronLeft : ChevronRight;

  const handleDirectAsk = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = directQuestion.trim();
    if (!q) {
      navigateTo('health_education_chat');
      return;
    }
    navigateTo('health_education_chat', { query: q });
  };

  const handleStartVoice = () => {
    navigateTo('health_education_chat', { startVoice: true });
  };

  const categories = [
    {
      id: 'chat',
      title: 'Ask About My Medicine (Voice & Text)',
      titleAr: 'اسأل عن دوائك (صوت وكتابة)',
      desc: 'Talk with voice or type your questions',
      descAr: 'تحدث بالصوت مباشرة أو اكتب استفساراتك',
      icon: MessageCircle,
      color: '#52766B',
      action: () => navigateTo('health_education_chat'),
    },
    {
      id: 'condition',
      title: 'Learn About My Condition',
      titleAr: 'اعرف المزيد عن حالتك الصحية',
      desc: 'Understand diabetes & blood pressure care',
      descAr: 'معلومات عن السكري وضغط الدم وسلامة المفاصل',
      icon: Heart,
      color: '#D5A18E',
      action: () =>
        navigateTo('health_education_chat', {
          query: isAr ? 'كيف أعتني بصحتي مع السكري وضغط الدم؟' : 'How can I best manage diabetes and blood pressure?',
        }),
    },
    {
      id: 'side_effects',
      title: 'Common Side Effects',
      titleAr: 'الآثار الجانبية الشائعة وكيفية التعامل معها',
      desc: 'What is normal and when to consult a doctor',
      descAr: 'ما هو الطبيعي ومتى يجب مراجعة الطبيب',
      icon: AlertCircle,
      color: '#454D46',
      action: () =>
        navigateTo('health_education_chat', {
          query: isAr ? 'ما هي الآثار الجانبية الشائعة لأدويتي وكيف أتعامل معها؟' : 'What are common mild side effects of my medications?',
        }),
    },
    {
      id: 'tips',
      title: 'General Health & Lifestyle Tips',
      titleAr: 'نصائح عامة لنمط حياة صحي',
      desc: 'Dietary guidance, hydration, and safe storage',
      descAr: 'إرشادات التغذية، شرب الماء، وحفظ الأدوية بأمان',
      icon: BookOpen,
      color: '#52766B',
      action: () =>
        navigateTo('health_education_chat', {
          query: isAr ? 'نصائح لحفظ الأدوية ونمط حياة صحي لكبار السن' : 'Tips for safe medication storage and healthy hydration',
        }),
    },
  ];

  return (
    <div className="min-h-full flex flex-col bg-[#F7F5EF]">
      <MobileHeader
        title="Health Education"
        titleAr="التثقيف الصحي الصوتي"
        subtitle={isAr ? 'تحدث واكتب مع المساعد الطبي' : 'Voice & Text AI Assistant'}
        showBack={false}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Direct Ask Question Box with Voice Button */}
        <div className="bg-white rounded-3xl p-4 border-2 border-[#52766B] shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#52766B] text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#B7C6B0]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#454D46]">
                  {isAr ? 'اسأل المساعد الطبي (بالصوت أو الكتابة)' : 'Ask Health Assistant (Voice & Text)'}
                </h3>
                <p className="text-[11px] text-[#737B74]">
                  {isAr ? 'اضغط على الميكروفون للتحدث أو اكتب سؤالك' : 'Tap the microphone to speak or type your question'}
                </p>
              </div>
            </div>

            <button
              onClick={handleStartVoice}
              className="p-2 rounded-xl bg-[#52766B]/10 hover:bg-[#52766B] hover:text-white text-[#52766B] transition-colors flex items-center gap-1 text-xs font-bold"
              title={isAr ? 'بدء محادثة صوتية' : 'Start Voice Chat'}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleDirectAsk} className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleStartVoice}
              className="w-10 h-10 rounded-2xl bg-[#52766B]/15 hover:bg-[#52766B] hover:text-white text-[#52766B] flex items-center justify-center shrink-0 border border-[#52766B]/30 transition-all active:scale-95"
              title={isAr ? 'تحدث بالصوت' : 'Speak'}
            >
              <Mic className="w-4 h-4" />
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={directQuestion}
                onChange={(e) => setDirectQuestion(e.target.value)}
                placeholder={
                  isAr
                    ? 'اكتب سؤالك أو اضغط على الميكروفون للتحدث...'
                    : 'Type question or tap mic to speak...'
                }
                className="w-full px-3.5 py-2.5 bg-[#F7F5EF] border border-[#E8E3D8] rounded-2xl text-xs text-[#454D46] focus:outline-none focus:border-[#52766B]"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-3.5 bg-[#52766B] hover:bg-[#3F5C53] text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs transition-transform active:scale-95"
            >
              <span>{isAr ? 'اسأل' : 'Ask'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 4 Main Categories */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-[#737B74] uppercase tracking-wider">
            {isAr ? 'أقسام التثقيف الصحي' : 'Education Topics'}
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.id}
                  onClick={c.action}
                  className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft cursor-pointer hover:border-[#52766B]/60 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: c.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#454D46]">
                        {isAr ? c.titleAr : c.title}
                      </h4>
                      <p className="text-xs text-[#737B74] mt-0.5">
                        {isAr ? c.descAr : c.desc}
                      </p>
                    </div>
                  </div>
                  <NextChevron className="w-4 h-4 text-[#737B74]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequent Questions Cards */}
        <div className="bg-white rounded-3xl p-4 border border-[#E8E3D8] shadow-soft space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#737B74] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-[#52766B]" />
            <span>{isAr ? 'أسئلة شائعة تهمك' : 'Frequently Asked Questions'}</span>
          </div>

          <div className="space-y-2.5">
            {FREQUENT_EDUCATION_TOPICS.map((topic) => (
              <div
                key={topic.id}
                onClick={() =>
                  navigateTo('health_education_chat', {
                    query: isAr ? topic.titleAr : topic.titleEn,
                  })
                }
                className="p-3.5 rounded-2xl bg-[#F7F5EF] hover:bg-[#E8E3D8]/40 border border-[#E8E3D8] cursor-pointer transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#454D46]">
                    {isAr ? topic.titleAr : topic.titleEn}
                  </span>
                  <NextChevron className="w-3.5 h-3.5 text-[#52766B]" />
                </div>
                <div className="text-[11px] text-[#737B74]">
                  {isAr ? topic.summaryAr : topic.summaryEn}
                </div>
                <div className="text-[10px] text-[#52766B] font-semibold pt-0.5">
                  📚 {isAr ? 'المصدر:' : 'Source:'} {topic.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Safety Disclaimer */}
        <div className="bg-[#E8E3D8]/40 border border-[#E8E3D8] rounded-2xl p-3 flex items-start gap-2 text-xs text-[#737B74]">
          <ShieldCheck className="w-4 h-4 text-[#52766B] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {isAr
              ? 'مساعد دوائي يقدم معلومات تثقيفية موثقة فقط، ولا يُغني عن استشارة الطبيب المعالج أو تغيير الجرعات الموصوفة.'
              : 'Our health assistant provides educational guidance only. It must not diagnose or alter physician-prescribed treatments.'}
          </p>
        </div>
      </div>

      <PatientBottomNav />
    </div>
  );
};
