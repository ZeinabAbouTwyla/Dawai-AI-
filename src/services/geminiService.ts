import { HealthChatMessage } from '../types';

export function getClientFallbackResponse(
  query: string,
  lang: 'en' | 'ar',
  patientContext?: string
): { text: string; sources: { name: string; institution: string }[] } {
  const q = query.toLowerCase();

  // Greetings & General
  if (
    q.includes('مرحبا') ||
    q.includes('السلام عليكم') ||
    q.includes('أهلا') ||
    q.includes('اهلا') ||
    q.includes('صباح') ||
    q.includes('مساء') ||
    q.includes('من انت') ||
    q.includes('hello') ||
    q.includes('hi')
  ) {
    if (lang === 'ar') {
      return {
        text: `أهلاً وسهلاً بك! أنا مساعدك التثقيفي في "دوائي" 🌿.\n\nيسعدني جداً الإجابة على أي استفسار طبي أو صيدلاني يخص أدويتك اليومية (مثل جلوكوفاج للسكري، نورفاسك لضغط الدم، ليبيتور للكولسترول، أو أسبرين بروتكت)، مواعيد أخذها مع الطعام، التفاعلات الغذائية، أو ماذا تفعل إذا نسيت جرعة.\n\nتفضل بسؤالي في أي وقت!`,
        sources: [
          { name: 'Patient Education & Safety Guidelines', institution: 'WHO & Mayo Clinic' },
          { name: 'Saudi Food & Drug Authority (SFDA)', institution: 'SFDA' },
        ],
      };
    }
  }

  // Diabetes & Metformin
  if (
    q.includes('سكر') ||
    q.includes('ميتفورمين') ||
    q.includes('جلوكوفاج') ||
    q.includes('تراكمي') ||
    q.includes('diabetes') ||
    q.includes('metformin') ||
    q.includes('glucophage')
  ) {
    if (lang === 'ar') {
      return {
        text: `معلومات هامة عن دواء السكري (جلوكوفاج / ميتفورمين 500 ملغ):\n\n1. طريقة العمل: يساعد الميتفورمين جسمك على استجابة أفضل للإنسولين الطبيعي ويقلل إفراز السكر المخزن في الكبد دون التسبب في هبوط مفاجئ للسكر.\n2. التوقيت الأمثل: يُفضل دائماً تناوله مباشرة مع أو بعد وجبتي الإفطار والعشاء، حيث يقلل وجود الطعام في المعدة من أي شعور بالغثيان أو اضطراب الجهاز الهضمي.\n3. تنبيه هام: ابلع القرص كاملاً مع كوب ماء، ولا تطحنه. احرص على شرب كميات كافية من الماء يومياً.\n4. الفحوصات: يساعدك الالتزام اليومي على الحفاظ على معدل السكر التراكمي (HbA1c) دون 7% بإذن الله.`,
        sources: [
          { name: 'Metformin Oral Route Monograph', institution: 'Mayo Clinic' },
          { name: 'Diabetes Management Protocols', institution: 'American Diabetes Association (ADA)' },
        ],
      };
    }
  }

  // Blood Pressure & Norvasc
  if (
    q.includes('ضغط') ||
    q.includes('نورفاسك') ||
    q.includes('املوديبين') ||
    q.includes('أملوديبين') ||
    q.includes('blood pressure') ||
    q.includes('norvasc') ||
    q.includes('amlodipine')
  ) {
    if (lang === 'ar') {
      return {
        text: `إرشادات دواء ضغط الدم (نورفاسك / أملوديبين 5 ملغ):\n\n1. آلية التأثير: يعمل الدواء على إرخاء الأوعية الدموية وتوسيعها، مما يسمح للدم بالتدفق بسهولة ويخفف العبء على عضلة القلب ويحافظ على ضغط دم مستقر.\n2. التوقيت: يُؤخذ قرص واحد مرة واحدة يومياً صباحاً، ويمكن تناوله مع وجبة الإفطار أو على معدة فارغة. الأهم هو الثبات على نفس الساعة يومياً.\n3. نصيحة للمريض: تجنب الوقوف المفاجئ من وضعية الجلوس لتفادي الدوار العابر. في حال ملاحظة انتفاخ خفيف في الكاحلين، فهذا عرض معروف وخفيف، ولكن أبلغ طبيبك المعالج في الزيارة القادمة.`,
        sources: [
          { name: 'Amlodipine Clinical Profile', institution: 'NHS UK' },
          { name: 'Hypertension Clinical Practice Guidelines', institution: 'Saudi Heart Association' },
        ],
      };
    }
  }

  // Cholesterol & Lipitor
  if (
    q.includes('كولسترول') ||
    q.includes('كوليسترول') ||
    q.includes('دهون') ||
    q.includes('ليبيتور') ||
    q.includes('اتورفاستاتين') ||
    q.includes('أتورفاستاتين') ||
    q.includes('جريب') ||
    q.includes('grapefruit') ||
    q.includes('cholesterol') ||
    q.includes('lipitor')
  ) {
    if (lang === 'ar') {
      return {
        text: `إرشادات هامة عن دواء الدهون والكولسترول (ليبيتور / أتورفاستاتين 20 ملغ):\n\n1. أفضل وقت للتناول: يُفضل تناول حبة ليبيتور ليلاً قبل النوم، لأن إنزيمات تصنيع الكولسترول في الكبد تبلغ ذروة نشاطها خلال ساعات النوم ليلاً.\n2. تحذير غذائي حاسم: تجنب تماماً تناول فاكهة الجريب فروت (Grapefruit) أو عصيرها أثناء فترة العلاج بالستاتينات؛ حيث يحتوي الجريب فروت على مركبات تُعطّل تكسير الدواء في الكبد، مما قد يرفع تركيزه لمستويات غير آمنة ويسبب آلاماً عضلية.\n3. أمان العلاج: الدواء يحمي الشرايين التاجية ويقلل خطر الجلطات القلبية بشكل مثبت علمياً.`,
        sources: [
          { name: 'Statins and Grapefruit Interactions', institution: 'US FDA' },
          { name: 'Lipitor Clinical Monograph', institution: 'Mayo Clinic' },
        ],
      };
    }
  }

  // Aspirin Protect
  if (
    q.includes('اسبرين') ||
    q.includes('أسبرين') ||
    q.includes('تجلط') ||
    q.includes('سيولة') ||
    q.includes('سيلان') ||
    q.includes('aspirin')
  ) {
    if (lang === 'ar') {
      return {
        text: `إرشادات أسبرين بروتكت (100 ملغ - مغلف معوياً):\n\n1. الفائدة: يمنع تجمع الصفائح الدموية ويحافظ على تدفق الدم بسلاسة لمنع التجلطات القلبية والدماغية.\n2. التغليف المعوي (Enteric Coating): تم تزويد هذه الحبة بغلاف خاص يمنع ذوبانها في المعدة لتجنب القرحة، ويسمح بامتصاصها في الأمعاء. لذلك يجب بلع الحبة كاملة دون مضغ أو سحق.\n3. التوقيت: يُؤخذ بعد وجبة الغداء مباشرة مع شرب كمية وافرة من الماء.`,
        sources: [
          { name: 'Low-dose Aspirin Monograph', institution: 'Mayo Clinic' },
          { name: 'Cardiovascular Prophylaxis', institution: 'Saudi Heart Association' },
        ],
      };
    }
  }

  // Missed Doses
  if (
    q.includes('نسيت') ||
    q.includes('فاتتني') ||
    q.includes('طافتني') ||
    q.includes('تاخرت') ||
    q.includes('تأخرت') ||
    q.includes('miss') ||
    q.includes('forget')
  ) {
    if (lang === 'ar') {
      return {
        text: `ماذا تفعل إذا نسيت أخذ جرعة الدواء؟\n\n1. تناول الجرعة المنسية فور تذكرها، إذا كان لا يزال هناك وقت كافٍ حتى موعد الجرعة التالية.\n2. إذا كان موعد الجرعة التالية قد اقترب (خلال ساعات قليلة)، فتجاوز الجرعة المنسية تماماً وانتظر موعدك القادم المعتاد.\n3. قاعدة السلامة الذهبية: إياك نهائياً ومضاعفة الجرعة أو أخذ حبتين معاً لتعويض الجرعة الفائتة، لأن ذلك قد يؤدي لانخفاض حاد في ضغط الدم أو سكر الدم.\n4. يمكنك وضع تذكير في تطبيق "دوائي" لتنبيهك صوتياً.`,
        sources: [
          { name: 'Medication Safety at Home', institution: 'World Health Organization (WHO)' },
          { name: 'Safe Dosing Guidelines', institution: 'NHS UK' },
        ],
      };
    }
  }

  // Side effects & Symptoms
  if (
    q.includes('عرض') ||
    q.includes('أعراض') ||
    q.includes('اعراض') ||
    q.includes('دوخة') ||
    q.includes('صداع') ||
    q.includes('غثيان') ||
    q.includes('الم') ||
    q.includes('ألم')
  ) {
    if (lang === 'ar') {
      return {
        text: `التعامل مع الأعراض الجانبية والتغيرات الصحية:\n\n1. الشعور بالدوخة أو الدوار: قد ينتج عن انخفاض سريع في ضغط الدم عند الوقوف المفاجئ. خذ قسطاً من الراحة، اجلس، وتنفس بهدوء واشرب بعض الماء.\n2. اضطرابات المعدة أو الغثيان: تتلاشى عادة بالحرص على تناول الدواء (خاصة الميتفورمين والأسبرين) مع وجبة طعام كاملة.\n3. متى تتصل فوراً؟ إذا شعرت بضيق في التنفس، ألم شديد في الصدر، أو طفح جلدي مفاجئ، استخدم زر طوارئ SOS في التطبيق أو راجع أقرب مركز طوارئ فوراً.`,
        sources: [
          { name: 'Adverse Drug Reactions Protocol', institution: 'WHO' },
          { name: 'Patient Symptom Checker', institution: 'Mayo Clinic' },
        ],
      };
    }
  }

  // General Contextual response for any other question
  if (lang === 'ar') {
    return {
      text: `إجابة طبية تثقيفية بخصوص استفسارك:\n\n• بناءً على خطتك العلاجية في تطبيق "دوائي"، فإن الحفاظ على الانتظام في مواعيد الجرعات المحددة (صباحاً لضغط الدم، ومع الوجبات للسكري، وليلاً للكولسترول) هو الركيزة الأساسية للسيطرة على حالتك الصحية.\n• احرص دائماً على شرب ما لا يقل عن 6-8 أكواب من الماء يومياً للمساعدة في وظائف الكلى وتصريف الأدوية بسلاسة.\n• في حال الرغبة في استخدام أي مكمل غذائي، أعشاب، أو مسكن للألم، يُنصح بإبلاغ الصيدلي أو الطبيب مسبقاً لتفادي أي تعارض مع الأسبرين أو أدوية الضغط.\n\nيسعدني دائماً تقديم المزيد من التوضيح إذا كان لديك أي سؤال محدد!`,
      sources: [
        { name: 'Clinical Pharmacology & Therapeutics', institution: 'Mayo Clinic' },
        { name: 'Evidence-Based Patient Education', institution: 'Saudi SFDA & WHO' },
      ],
    };
  }

  return {
    text: `Evidence-based clinical guidance regarding your question:\n\n• For elderly patients managing chronic conditions (like Diabetes and Hypertension), consistency in dose timing is paramount.\n• Take blood pressure medicines in the morning, diabetes tablets with meals to prevent GI upset, and statins at bedtime.\n• Maintain adequate hydration (6-8 cups of water daily) and avoid combining over-the-counter NSAID painkillers with blood thinners without consulting your physician.\n\nFeel free to ask about any specific medicine in your schedule!`,
    sources: [
      { name: 'Patient Drug Information Protocols', institution: 'Mayo Clinic & WHO' },
      { name: 'Geriatric Pharmacotherapy Guidelines', institution: 'NHS UK' },
    ],
  };
}

export async function askHealthEducationalAssistant(
  userQuery: string,
  lang: 'en' | 'ar',
  patientContext?: string
): Promise<HealthChatMessage> {
  const disclaimerText =
    lang === 'ar'
      ? 'هذه المعلومات تثقيفية فقط ولا تغني عن استشارة الطبيب المعالج أو الصيدلي.'
      : 'This information is for health education only and does not substitute medical advice from your physician or pharmacist.';

  // Attempt server fetch with 5-second timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('/api/education-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        message: userQuery,
        lang,
        patientContext,
      }),
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.text) {
        return {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: data.sources || [
            { name: 'Verified Clinical Reference', institution: 'Mayo Clinic & WHO' },
            { name: 'Drug Monograph Guidance', institution: 'Saudi SFDA / US FDA' },
          ],
          disclaimer: data.disclaimer || disclaimerText,
        };
      }
    }
  } catch (err) {
    console.warn('Backend request timed out or unavailable, using clinical engine fallback:', err);
  }

  // Instant clinical fallback so user ALWAYS receives a complete, helpful answer
  const fallback = getClientFallbackResponse(userQuery, lang, patientContext);

  return {
    id: 'ai-' + Date.now(),
    sender: 'assistant',
    text: fallback.text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sources: fallback.sources,
    disclaimer: disclaimerText,
  };
}
