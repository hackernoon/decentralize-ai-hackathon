import { useState, useEffect, useRef } from 'react';

interface UseVoiceDictationProps {
  onTranscriptChange: (text: string) => void;
}

export function useVoiceDictation({ onTranscriptChange }: UseVoiceDictationProps) {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const baseTextRef = useRef<string>('');
  const manualStopRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) setSpeechSupported(true);
  }, []);

  const stopListening = () => {
    manualStopRef.current = true;
    try {
      recognitionRef.current?.stop();
    } catch {}
    setIsListening(false);
  };

  const startListening = async (initialValue: string) => {
    if (typeof window === 'undefined') return;

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setSpeechError('Speech recognition not supported in this browser.');
      return;
    }

    setSpeechError(null);
    setIsListening(true); // optimistic UI

    try {
      // Step 1: Explicitly request microphone permission
      console.log("Requesting microphone permission...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true 
      });
      
      // Cleanup the stream immediately (we only needed permission)
      stream.getTracks().forEach(track => track.stop());
      
      console.log("Microphone permission granted. Starting speech recognition...");

      // Step 2: Now start SpeechRecognition
      const recognition = new SR();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      baseTextRef.current = initialValue || '';
      manualStopRef.current = false;

      recognition.onstart = () => {
        setSpeechError(null);
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript;
          else interimTranscript += transcript;
        }

        if (finalTranscript) {
          const sep = baseTextRef.current && !baseTextRef.current.endsWith(' ') ? ' ' : '';
          baseTextRef.current = baseTextRef.current + sep + finalTranscript.trim();
        }

        const combined = (baseTextRef.current + (interimTranscript ? ' ' + interimTranscript : '')).trimStart();
        onTranscriptChange(combined);
      };

      recognition.onerror = (event: any) => {
        console.error('SpeechRecognition error:', event.error);
        const code = event?.error;

        if (code === 'not-allowed' || code === 'service-not-allowed') {
          manualStopRef.current = true;
          setIsListening(false);
          setSpeechError(
            'Microphone access denied. Please allow microphone in site settings and reload.'
          );
        } else if (code === 'audio-capture') {
          manualStopRef.current = true;
          setIsListening(false);
          setSpeechError('No microphone found. Please connect a mic.');
        } else if (code === 'no-speech') {
          setSpeechError('No speech detected — keep speaking.');
        } else if (code === 'network') {
          setSpeechError('Network error with speech service.');
        } else {
          setSpeechError(`Speech error: ${code || 'unknown'}`);
        }
      };

      recognition.onend = () => {
        if (!manualStopRef.current && recognitionRef.current === recognition) {
          try {
            recognition.start();
            return;
          } catch {}
        }
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();

    } catch (err: any) {
      console.error('getUserMedia error:', err);
      setIsListening(false);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setSpeechError('Microphone permission denied. Please click the lock icon → Allow microphone → Reload page.');
      } else if (err.name === 'NotFoundError') {
        setSpeechError('No microphone found. Please connect one.');
      } else {
        setSpeechError('Could not access microphone. Please check permissions.');
      }
    }
  };

  const toggleListening = (initialValue: string) => {
    if (isListening) {
      stopListening();
    } else {
      startListening(initialValue);
    }
  };

  const updateBaseText = (text: string) => {
    baseTextRef.current = text;
  };

  return {
    isListening,
    speechSupported,
    speechError,
    stopListening,
    startListening,
    toggleListening,
    updateBaseText,
  };
}
