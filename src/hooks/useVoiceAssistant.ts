import { useState, useEffect, useRef, useCallback } from 'react';

interface UseVoiceAssistantOptions {
  lang: 'en' | 'ar';
  onTranscript?: (transcript: string) => void;
  onFinalTranscript?: (transcript: string) => void;
}

export function useVoiceAssistant({
  lang,
  onTranscript,
  onFinalTranscript,
}: UseVoiceAssistantOptions) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize SpeechSynthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Initialize Speech Recognition
  const startListening = useCallback(() => {
    setPermissionError(null);
    setTranscript('');

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
      setPermissionError(
        lang === 'ar'
          ? 'المتصفح الحالي لا يدعم ميزة التعرف على الصوت مباشرة. يمكنك تجربة أسئلة الصوت السريعة أو الكتابة.'
          : 'Voice speech recognition is not supported in this browser environment.'
      );
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang === 'ar' ? 'ar-SA' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        onTranscript?.(currentTranscript);

        if (event.results[event.results.length - 1].isFinal) {
          onFinalTranscript?.(currentTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setPermissionError(
            lang === 'ar'
              ? 'يرجى السماح بصلاحية الميكروفون لاستخدام الصوت.'
              : 'Please allow microphone access to talk to the assistant.'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.warn('Failed to start speech recognition:', err);
      setIsListening(false);
      setPermissionError(
        lang === 'ar'
          ? 'تعذر الوصول للميكروفون في بيئة العرض الحالية.'
          : 'Could not access microphone.'
      );
    }
  }, [lang, onTranscript, onFinalTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Text-to-Speech (Speak message out loud)
  const speakText = useCallback(
    (text: string, messageId?: string) => {
      if (!synthRef.current) return;

      // If already speaking this message, toggle stop
      if (isSpeaking && speakingMessageId === messageId) {
        stopSpeaking();
        return;
      }

      synthRef.current.cancel(); // cancel previous speech

      // Clean text from markdown or URLs for clean vocalization
      const cleanText = text
        .replace(/[*_#`~]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/📚.*$/m, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = lang === 'ar' ? 0.95 : 1.0; // slightly calm pace for seniors
      utterance.pitch = 1.0;

      // Select matching Arabic or English voice if available
      const voices = synthRef.current.getVoices();
      const preferredVoice = voices.find((v) =>
        lang === 'ar' ? v.lang.startsWith('ar') : v.lang.startsWith('en')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        if (messageId) setSpeakingMessageId(messageId);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      };

      synthRef.current.speak(utterance);
    },
    [lang, isSpeaking, speakingMessageId]
  );

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    setSpeakingMessageId(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    isSpeaking,
    speakingMessageId,
    speakText,
    stopSpeaking,
    hasSpeechSupport,
    permissionError,
    setPermissionError,
  };
}
