import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sisterName, setSisterName] = useState("");

  // PAGE 1 Typewriter State
  const page1FullText = "Hello Meri Pyari Sister Ji";
  const [page1TypedText, setPage1TypedText] = useState("");
  const [isPage1Done, setIsPage1Done] = useState(false);

  // PAGE 2 Typewriter State
  const page2HeadingText = "Okay… now tell me your name 🤖";
  const [page2TypedHeading, setPage2TypedHeading] = useState("");
  const [isPage2HeadingDone, setIsPage2HeadingDone] = useState(false);

  // Page 2 Validation Warning State
  const [nameError, setNameError] = useState(false);
  const errorFullText = "⚠️ Pehle apna naam enter karo…";
  const [typedErrorText, setTypedErrorText] = useState("");

  // PAGE 3 Typewriter State & Interaction Stages ('initial' | 'no_clicked')
  const [page3Stage, setPage3Stage] = useState('initial');

  // Page 3 Initial Typing Lines (Dynamically addressing sisterName)
  const page3InitialLines = [
    "Ab ek baat bataye...",
    `Aapka pyaar bhai ${sisterName ? sisterName : 'aapke'} liye kuch laya hai ❤️`,
    "Dekhna chahogi?"
  ];
  const [page3TypedLines, setPage3TypedLines] = useState(["", "", ""]);
  const [isPage3InitialDone, setIsPage3InitialDone] = useState(false);

  // Page 3 Teasing "No" Response Lines
  const page3NoLines = [
    "Fir bhi dekhna padega 😌",
    `Ye aapke bhai ka hukum hai, ${sisterName}... samjhi? 😏`
  ];
  const [page3TypedNoLines, setPage3TypedNoLines] = useState(["", ""]);
  const [isPage3NoDone, setIsPage3NoDone] = useState(false);

  // --- PAGE 1 TYPEWRITER LOGIC ---
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

  // --- PAGE 2 TYPEWRITER LOGIC ---
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

  // --- PAGE 3 INITIAL TYPEWRITER LOGIC ---
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
  }, [currentPage, page3Stage, sisterName]);

  // --- PAGE 3 "NO CLICKED" TYPEWRITER LOGIC ---
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

      {/* PAGE 2: Name Introduction Page with In-page Validation */}
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

              {/* In-page Robotic Validation Warning */}
              {nameError && (
                <div className="min-h-[24px]">
                  <p className="font-robot text-xs sm:text-sm text-rose-400 font-normal tracking-wide animate-fade-in">
                    {typedErrorText}
                    <span className="inline-block w-1.5 h-4 bg-rose-400/90 animate-cursor ml-1 align-middle" />
                  </p>
                </div>
              )}

              {/* Plain Text-Only Continue Button */}
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

      {/* PAGE 4 Placeholder (Awaiting Next Prompt) */}
      {currentPage === 4 && (
        <div className="max-w-xl mx-auto text-center space-y-4 animate-fade-in font-robot">
          <h2 className="text-2xl sm:text-3xl text-white font-normal">
            Surprise Unlocked for <span className="text-rose-400">{sisterName}</span>! 🎉❤️
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            [ Page 3 Completed • Navigated to Page 4 ]
          </p>
          <p className="text-xs text-slate-600">
            Awaiting your next prompt to build Page 4...
          </p>
          <button 
            onClick={() => {
              setPage3Stage('initial');
              setCurrentPage(3);
            }}
            className="text-xs text-slate-500 hover:text-slate-300 underline pt-4 block mx-auto cursor-pointer"
          >
            ← Back to Page 3
          </button>
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
