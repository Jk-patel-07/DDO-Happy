import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sisterName, setSisterName] = useState("");

  // --- PAGE 1 TYPEWRITER STATE ---
  const page1FullText = "Hello Meri Pyari Sister Ji";
  const [page1TypedText, setPage1TypedText] = useState("");
  const [isPage1Done, setIsPage1Done] = useState(false);

  // --- PAGE 2 TYPEWRITER STATE ---
  const page2HeadingText = "Okay… now tell me your name 🤖";
  const [page2TypedHeading, setPage2TypedHeading] = useState("");
  const [isPage2HeadingDone, setIsPage2HeadingDone] = useState(false);

  // Page 2 Validation Warning State
  const [nameError, setNameError] = useState(false);
  const errorFullText = "⚠️ Pehle apna naam enter karo…";
  const [typedErrorText, setTypedErrorText] = useState("");

  // --- PAGE 3 TYPEWRITER STATE ('initial' | 'no_clicked') ---
  const [page3Stage, setPage3Stage] = useState('initial');

  // Page 3 Initial Typing Lines (Clean & natural Hinglish line)
  const page3InitialLines = [
    "Ab ek baat bataye...",
    "Aapka pyara bhai aapke liye kuch laya hai ❤️",
    "Dekhna chahogi?"
  ];
  const [page3TypedLines, setPage3TypedLines] = useState(["", "", ""]);
  const [isPage3InitialDone, setIsPage3InitialDone] = useState(false);

  const page3NoLines = [
    "Fir bhi dekhna padega 😌",
    `Ye aapke bhai ka hukum hai, ${sisterName || 'Sister Ji'}... samjhi? 😏`
  ];
  const [page3TypedNoLines, setPage3TypedNoLines] = useState(["", ""]);
  const [isPage3NoDone, setIsPage3NoDone] = useState(false);

  // --- PAGE 4 TYPEWRITER STATE ---
  const page4Lines = [
    `Hi, ${sisterName || 'Sister Ji'}!! 👋`,
    "Waise aap bahut achi, pookie aur pyari ho…",
    "Best Sister Ji ❤️"
  ];
  const [page4TypedLines, setPage4TypedLines] = useState(["", "", ""]);
  const [isPage4Done, setIsPage4Done] = useState(false);

  // --- PAGE 1 TYPEWRITER EFFECT ---
  useEffect(() => {
    if (currentPage === 1) {
      let index = 0;
      setPage1TypedText("");
      setIsPage1Done(false);
      const timer = setInterval(() => {
        if (index < page1FullText.length) {
          setPage1TypedText(page1FullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsPage1Done(true);
        }
      }, 65);
      return () => clearInterval(timer);
    }
  }, [currentPage]);

  // --- PAGE 2 TYPEWRITER EFFECT ---
  useEffect(() => {
    if (currentPage === 2) {
      let index = 0;
      setPage2TypedHeading("");
      setIsPage2HeadingDone(false);
      setNameError(false);
      setTypedErrorText("");
      const timer = setInterval(() => {
        if (index < page2HeadingText.length) {
          setPage2TypedHeading(page2HeadingText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsPage2HeadingDone(true);
        }
      }, 60);
      return () => clearInterval(timer);
    }
  }, [currentPage]);

  // --- PAGE 2 ERROR TYPEWRITER EFFECT ---
  useEffect(() => {
    if (nameError) {
      let index = 0;
      setTypedErrorText("");
      const timer = setInterval(() => {
        if (index < errorFullText.length) {
          setTypedErrorText(errorFullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 45);
      return () => clearInterval(timer);
    }
  }, [nameError]);

  // --- PAGE 3 INITIAL TYPEWRITER EFFECT ---
  useEffect(() => {
    if (currentPage === 3 && page3Stage === 'initial') {
      setPage3TypedLines(["", "", ""]);
      setIsPage3InitialDone(false);

      let currentLineIdx = 0;
      let charIdx = 0;

      const timer = setInterval(() => {
        if (currentLineIdx < page3InitialLines.length) {
          const targetLine = page3InitialLines[currentLineIdx];
          if (charIdx < targetLine.length) {
            const nextChar = targetLine.slice(0, charIdx + 1);
            setPage3TypedLines((prev) => {
              const updated = [...prev];
              updated[currentLineIdx] = nextChar;
              return updated;
            });
            charIdx++;
          } else {
            currentLineIdx++;
            charIdx = 0;
          }
        } else {
          clearInterval(timer);
          setIsPage3InitialDone(true);
        }
      }, 55);

      return () => clearInterval(timer);
    }
  }, [currentPage, page3Stage]);

  // --- PAGE 3 "NO CLICKED" TYPEWRITER EFFECT ---
  useEffect(() => {
    if (currentPage === 3 && page3Stage === 'no_clicked') {
      setPage3TypedNoLines(["", ""]);
      setIsPage3NoDone(false);

      let currentLineIdx = 0;
      let charIdx = 0;

      const timer = setInterval(() => {
        if (currentLineIdx < page3NoLines.length) {
          const targetLine = page3NoLines[currentLineIdx];
          if (charIdx < targetLine.length) {
            const nextChar = targetLine.slice(0, charIdx + 1);
            setPage3TypedNoLines((prev) => {
              const updated = [...prev];
              updated[currentLineIdx] = nextChar;
              return updated;
            });
            charIdx++;
          } else {
            currentLineIdx++;
            charIdx = 0;
          }
        } else {
          clearInterval(timer);
          setIsPage3NoDone(true);
        }
      }, 55);

      return () => clearInterval(timer);
    }
  }, [currentPage, page3Stage, sisterName]);

  // --- PAGE 4 CUTE MESSAGE TYPEWRITER EFFECT ---
  useEffect(() => {
    if (currentPage === 4) {
      setPage4TypedLines(["", "", ""]);
      setIsPage4Done(false);

      let currentLineIdx = 0;
      let charIdx = 0;

      const timer = setInterval(() => {
        if (currentLineIdx < page4Lines.length) {
          const targetLine = page4Lines[currentLineIdx];
          if (charIdx < targetLine.length) {
            const nextChar = targetLine.slice(0, charIdx + 1);
            setPage4TypedLines((prev) => {
              const updated = [...prev];
              updated[currentLineIdx] = nextChar;
              return updated;
            });
            charIdx++;
          } else {
            currentLineIdx++;
            charIdx = 0;
          }
        } else {
          clearInterval(timer);
          setIsPage4Done(true);
        }
      }, 55);

      return () => clearInterval(timer);
    }
  }, [currentPage, sisterName]);

  // Navigation Handlers
  const handlePage1Continue = () => setCurrentPage(2);

  const handlePage2Continue = () => {
    if (!sisterName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setPage3Stage('initial');
    setCurrentPage(3);
  };

  const handlePage3Yes = () => setCurrentPage(4);
  const handlePage3No = () => setPage3Stage('no_clicked');

  return (
    <main className="min-h-screen w-full bg-black text-slate-100 flex flex-col items-center justify-center text-center px-6 py-12 relative overflow-hidden select-none">
      
      {/* PAGE 1: First Landing Page */}
      {currentPage === 1 && (
        <div className="max-w-3xl w-full mx-auto flex flex-col items-center justify-center space-y-6 md:space-y-8 animate-fade-in">
          
          <h1 className="font-robot text-2xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white leading-relaxed robot-glow flex items-center justify-center gap-2 flex-wrap">
            <span>{page1TypedText}</span>
            {!isPage1Done && (
              <span className="inline-block w-2 sm:w-3 h-6 sm:h-8 bg-white/90 animate-cursor ml-1" />
            )}
            {isPage1Done && (
              <span className="inline-block text-rose-500 heart-glow animate-fade-in text-xl sm:text-3xl ml-1">
                ❤️
              </span>
            )}
          </h1>

          {isPage1Done && (
            <div className="animate-fade-in space-y-6 flex flex-col items-center">
              <p className="font-handwritten text-base sm:text-xl md:text-2xl text-slate-400 font-normal tracking-wide leading-relaxed max-w-lg">
                Warning: Your bro has prepared something interesting for you{' '}
                <span className="inline-block">👀</span>
              </p>

              <div 
                onClick={handlePage1Continue}
                className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-robot text-slate-400 hover:text-white cursor-pointer transition-colors duration-200 py-1"
              >
                <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white transition-colors">
                  Continue
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* PAGE 2: Name Introduction Page with Validation */}
      {currentPage === 2 && (
        <div className="max-w-2xl w-full mx-auto flex flex-col items-center justify-center space-y-6 md:space-y-8 animate-fade-in">
          
          <h1 className="font-robot text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide text-white leading-relaxed robot-glow flex items-center justify-center gap-2 flex-wrap">
            <span>{page2TypedHeading}</span>
            {!isPage2HeadingDone && (
              <span className="inline-block w-2 sm:w-3 h-6 sm:h-7 bg-white/90 animate-cursor ml-1" />
            )}
          </h1>

          {isPage2HeadingDone && (
            <div className="w-full flex flex-col items-center space-y-5 animate-fade-in">
              
              <p className="font-robot text-sm sm:text-base md:text-lg text-slate-400 font-normal tracking-wide">
                Aap hame apna naam batayengi?
              </p>

              <div className="w-full max-w-xs sm:max-w-sm pt-1">
                <input
                  type="text"
                  value={sisterName}
                  onChange={(e) => {
                    setSisterName(e.target.value);
                    if (nameError && e.target.value.trim()) {
                      setNameError(false);
                    }
                  }}
                  placeholder="Type your name here…"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePage2Continue();
                  }}
                  className={`w-full bg-transparent border-b-2 text-center font-robot text-base sm:text-xl text-white placeholder-slate-600 py-2.5 px-3 outline-none transition-colors duration-300 ${
                    nameError ? 'border-rose-500' : 'border-slate-700 focus:border-white'
                  }`}
                  autoFocus
                />
              </div>

              {nameError && (
                <div className="min-h-[24px]">
                  <p className="font-robot text-xs sm:text-sm text-rose-400 font-normal tracking-wide animate-fade-in">
                    {typedErrorText}
                    <span className="inline-block w-1.5 h-4 bg-rose-400/90 animate-cursor ml-1 align-middle" />
                  </p>
                </div>
              )}

              <div 
                onClick={handlePage2Continue}
                className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-robot text-slate-400 hover:text-white cursor-pointer transition-colors duration-200 pt-2"
              >
                <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white transition-colors">
                  Continue
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </div>

            </div>
          )}

        </div>
      )}

      {/* PAGE 3: Brother's Surprise Teasing Page */}
      {currentPage === 3 && (
        <div className="max-w-2xl w-full mx-auto flex flex-col items-center justify-center space-y-6 md:space-y-8 animate-fade-in">
          
          {page3Stage === 'initial' ? (
            <div className="space-y-4">
              <div className="font-robot text-xl sm:text-3xl md:text-4xl font-normal tracking-wide text-white leading-relaxed robot-glow space-y-2">
                <p>{page3TypedLines[0]}</p>
                <p className="text-lg sm:text-2xl md:text-3xl">{page3TypedLines[1]}</p>
                <p className="text-lg sm:text-2xl md:text-3xl pt-2">
                  {page3TypedLines[2]}
                  {!isPage3InitialDone && (
                    <span className="inline-block w-2 sm:w-3 h-5 sm:h-7 bg-white/90 animate-cursor ml-1" />
                  )}
                </p>
              </div>

              {isPage3InitialDone && (
                <div className="pt-6 flex items-center justify-center gap-8 font-robot text-base sm:text-xl text-slate-400 animate-fade-in">
                  <div 
                    onClick={handlePage3Yes}
                    className="group inline-flex items-center gap-1 cursor-pointer hover:text-white transition-colors py-1"
                  >
                    <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white">
                      Yes
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>

                  <div 
                    onClick={handlePage3No}
                    className="group inline-flex items-center gap-1 cursor-pointer hover:text-rose-400 transition-colors py-1"
                  >
                    <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-rose-400">
                      No
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="font-robot text-xl sm:text-3xl md:text-4xl font-normal tracking-wide text-white leading-relaxed robot-glow space-y-3">
                <p>{page3TypedNoLines[0]}</p>
                <p className="text-lg sm:text-2xl md:text-3xl text-rose-300">
                  {page3TypedNoLines[1]}
                  {!isPage3NoDone && (
                    <span className="inline-block w-2 sm:w-3 h-5 sm:h-7 bg-white/90 animate-cursor ml-1" />
                  )}
                </p>
              </div>

              {isPage3NoDone && (
                <div className="pt-6 font-robot text-base sm:text-xl text-slate-300 animate-fade-in flex justify-center">
                  <div 
                    onClick={handlePage3Yes}
                    className="group inline-flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors py-1"
                  >
                    <span className="underline underline-offset-4 decoration-slate-500 group-hover:decoration-white">
                      Ab Yes karo
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* PAGE 4: Cute Character & Pooki Sister Message */}
      {currentPage === 4 && (
        <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 animate-fade-in">
          
          <div className="w-full md:w-[35%] flex justify-center items-center animate-slide-in-left">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 animate-character-float">
              <img
                src="/cute-character.png"
                alt="Cute Sister Companion Character"
                className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(244,63,94,0.3)]"
              />
              <div className="absolute inset-0 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>

          <div className="w-full md:w-[65%] text-left space-y-4 md:space-y-6">
            
            <div className="font-robot text-xl sm:text-3xl md:text-4xl font-normal tracking-wide text-white leading-relaxed robot-glow space-y-3">
              <p className="text-white font-semibold">
                {page4TypedLines[0]}
              </p>

              <p className="text-slate-200 text-lg sm:text-2xl md:text-3xl">
                {page4TypedLines[1]}
              </p>

              <p className="text-rose-400 text-lg sm:text-2xl md:text-3xl font-medium pt-1">
                {page4TypedLines[2]}
                {!isPage4Done && (
                  <span className="inline-block w-2 sm:w-3 h-5 sm:h-7 bg-white/90 animate-cursor ml-1" />
                )}
              </p>
            </div>

            {isPage4Done && (
              <div className="pt-6 font-robot text-sm sm:text-base text-slate-400 animate-fade-in flex items-center gap-6">
                <div 
                  onClick={() => {
                    setPage3Stage('initial');
                    setCurrentPage(3);
                  }}
                  className="group inline-flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
                >
                  <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white">
                    ← Replay Tease
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* DDO COMPANY Small Bottom-Right Branding */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10">
        <span className="text-[10px] sm:text-[11px] font-robot tracking-widest text-slate-600 uppercase opacity-70">
          DDO COMPANY
        </span>
      </div>

    </main>
  );
}
