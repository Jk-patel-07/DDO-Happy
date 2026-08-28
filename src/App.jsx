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
    "Waise aap bahut achi, pooki aur pyari ho…",
    "Best Sister Ji ❤️"
  ];
  const [page4TypedLines, setPage4TypedLines] = useState(["", "", ""]);
  const [isPage4Done, setIsPage4Done] = useState(false);

  // --- PAGE 5 TYPEWRITER STATE ('initial' | 'lagta_hai' | 'nahi_lagta') ---
  const [page5Stage, setPage5Stage] = useState('initial');

  const page5InitialLines = [
    "Hmm… mujhe lagta hai aap aisi ho… 👀",
    "Cute si, pyaari si… 😌",
    "Hai na?"
  ];
  const [page5TypedInitial, setPage5TypedInitial] = useState(["", "", ""]);
  const [isPage5InitialDone, setIsPage5InitialDone] = useState(false);

  const page5LagtaLines = [
    "Haan, mujhe bhi pata tha 😌",
    "Wo toh main aapke saath hoon na,",
    "isliye mujhe achhe se pata hai ❤️"
  ];
  const [page5TypedLagta, setPage5TypedLagta] = useState(["", "", ""]);
  const [isPage5LagtaDone, setIsPage5LagtaDone] = useState(false);

  const page5NahiLagtaLines = [
    "Accha? 😭",
    "Mujhe bhi yahi lagta hai…",
    "Aap nahi ho 😏",
    "Lekin koi baat nahi, aap meri sister ho…",
    "toh aapko cute maanna hi padega 😂❤️"
  ];
  const [page5TypedNahiLagta, setPage5TypedNahiLagta] = useState(["", "", "", "", ""]);
  const [isPage5NahiLagtaDone, setIsPage5NahiLagtaDone] = useState(false);

  // --- PAGE 6 TYPEWRITER STATE ('initial' | 'haan' | 'pehle_batao') ---
  const [page6Stage, setPage6Stage] = useState('initial');

  const page6InitialLines = [
    "Aap itni achi ho… ❤️",
    "Toh bhai ki ek chhoti si help karogi na? 🥺",
    "Bas chhoti si help hai… pakka! 👀"
  ];
  const [page6TypedInitial, setPage6TypedInitial] = useState(["", "", ""]);
  const [isPage6InitialDone, setIsPage6InitialDone] = useState(false);

  const page6HaanLines = [
    "Mujhe pata tha meri best sister mana nahi karegi 😌❤️"
  ];
  const [page6TypedHaan, setPage6TypedHaan] = useState([""]);
  const [isPage6HaanDone, setIsPage6HaanDone] = useState(false);

  const page6PehleLines = [
    "Arey wah… pehle pooch-taach 😂",
    "Theek hai, bataunga…",
    "Lekin pehle ek chhoti si baat maan-ni padegi 😏"
  ];
  const [page6TypedPehle, setPage6TypedPehle] = useState(["", "", ""]);
  const [isPage6PehleDone, setIsPage6PehleDone] = useState(false);

  // --- PAGE 1 EFFECT ---
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

  // --- PAGE 2 EFFECT ---
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

  // --- PAGE 2 ERROR EFFECT ---
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

  // --- PAGE 3 INITIAL EFFECT ---
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

  // --- PAGE 3 NO EFFECT ---
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

  // --- PAGE 4 EFFECT ---
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

  // --- PAGE 5 INITIAL EFFECT ---
  useEffect(() => {
    if (currentPage === 5 && page5Stage === 'initial') {
      setPage5TypedInitial(["", "", ""]);
      setIsPage5InitialDone(false);

      let currentLineIdx = 0;
      let charIdx = 0;

      const timer = setInterval(() => {
        if (currentLineIdx < page5InitialLines.length) {
          const targetLine = page5InitialLines[currentLineIdx];
          if (charIdx < targetLine.length) {
            const nextChar = targetLine.slice(0, charIdx + 1);
            setPage5TypedInitial((prev) => {
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
          setIsPage5InitialDone(true);
        }
      }, 55);

      return () => clearInterval(timer);
    }
  }, [currentPage, page5Stage]);

  // --- PAGE 5 LAGTA EFFECT ---
  useEffect(() => {
    if (currentPage === 5 && page5Stage === 'lagta_hai') {
      setPage5TypedLagta(["", "", ""]);
      setIsPage5LagtaDone(false);

      let currentLineIdx = 0;
      let charIdx = 0;

      const timer = setInterval(() => {
        if (currentLineIdx < page5LagtaLines.length) {
          const targetLine = page5LagtaLines[currentLineIdx];
          if (charIdx < targetLine.length) {
            const nextChar = targetLine.slice(0, charIdx + 1);
            setPage5TypedLagta((prev) => {
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
          setIsPage5LagtaDone(true);
        }
      }, 55);

      return () => clearInterval(timer);
    }
  }, [currentPage, page5Stage]);

  // --- PAGE 5 NAHI LAGTA EFFECT ---
  useEffect(() => {
    if (currentPage === 5 && page5Stage === 'nahi_lagta') {
      setPage5TypedNahiLagta(["", "", "", "", ""]);
      setIsPage5NahiLagtaDone(false);

      let currentLineIdx = 0;
      let charIdx = 0;

      const timer = setInterval(() => {
        if (currentLineIdx < page5NahiLagtaLines.length) {
          const targetLine = page5NahiLagtaLines[currentLineIdx];
          if (charIdx < targetLine.length) {
            const nextChar = targetLine.slice(0, charIdx + 1);
            setPage5TypedNahiLagta((prev) => {
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
          setIsPage5NahiLagtaDone(true);
        }
      }, 55);

      return () => clearInterval(timer);
    }
  }, [currentPage, page5Stage]);

  // --- PAGE 6 INITIAL EFFECT ---
  useEffect(() => {
    if (currentPage === 6 && page6Stage === 'initial') {
      setPage6TypedInitial(["", "", ""]);
      setIsPage6InitialDone(false);

      let currentLineIdx = 0;
      let charIdx = 0;

      const timer = setInterval(() => {
        if (currentLineIdx < page6InitialLines.length) {
          const targetLine = page6InitialLines[currentLineIdx];
          if (charIdx < targetLine.length) {
            const nextChar = targetLine.slice(0, charIdx + 1);
            setPage6TypedInitial((prev) => {
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
          setIsPage6InitialDone(true);
        }
      }, 55);

      return () => clearInterval(timer);
    }
  }, [currentPage, page6Stage]);

  // --- PAGE 6 HAAN EFFECT ---
  useEffect(() => {
    if (currentPage === 6 && page6Stage === 'haan') {
      setPage6TypedHaan([""]);
      setIsPage6HaanDone(false);

      let charIdx = 0;
      const targetLine = page6HaanLines[0];

      const timer = setInterval(() => {
        if (charIdx < targetLine.length) {
          setPage6TypedHaan([targetLine.slice(0, charIdx + 1)]);
          charIdx++;
        } else {
          clearInterval(timer);
          setIsPage6HaanDone(true);
        }
      }, 55);

      return () => clearInterval(timer);
    }
  }, [currentPage, page6Stage]);

  // --- PAGE 6 PEHLE BATAO EFFECT ---
  useEffect(() => {
    if (currentPage === 6 && page6Stage === 'pehle_batao') {
      setPage6TypedPehle(["", "", ""]);
      setIsPage6PehleDone(false);

      let currentLineIdx = 0;
      let charIdx = 0;

      const timer = setInterval(() => {
        if (currentLineIdx < page6PehleLines.length) {
          const targetLine = page6PehleLines[currentLineIdx];
          if (charIdx < targetLine.length) {
            const nextChar = targetLine.slice(0, charIdx + 1);
            setPage6TypedPehle((prev) => {
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
          setIsPage6PehleDone(true);
        }
      }, 55);

      return () => clearInterval(timer);
    }
  }, [currentPage, page6Stage]);

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

  const handlePage4Continue = () => {
    setPage5Stage('initial');
    setCurrentPage(5);
  };

  const handlePage5Continue = () => {
    setPage6Stage('initial');
    setCurrentPage(6);
  };

  const handlePage6Continue = () => {
    setCurrentPage(7);
  };

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

      {/* PAGE 2: Name Introduction Page */}
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
                  onClick={handlePage4Continue}
                  className="group inline-flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white transition-colors"
                >
                  <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white">
                    Continue
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PAGE 5: Personality Question "Aap Aisi Ho...?" */}
      {currentPage === 5 && (
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
            {page5Stage === 'initial' && (
              <div className="space-y-4">
                <div className="font-robot text-xl sm:text-2xl md:text-3xl font-normal tracking-wide text-white leading-relaxed robot-glow space-y-2">
                  <p>{page5TypedInitial[0]}</p>
                  <p className="text-rose-300 font-medium">{page5TypedInitial[1]}</p>
                  <p className="pt-1">
                    {page5TypedInitial[2]}
                    {!isPage5InitialDone && (
                      <span className="inline-block w-2 sm:w-3 h-5 sm:h-7 bg-white/90 animate-cursor ml-1" />
                    )}
                  </p>
                </div>

                {isPage5InitialDone && (
                  <div className="pt-6 flex flex-wrap items-center gap-6 font-robot text-base sm:text-lg text-slate-400 animate-fade-in">
                    <div 
                      onClick={() => setPage5Stage('lagta_hai')}
                      className="group inline-flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white transition-colors py-1"
                    >
                      <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white">
                        Mujhe lagta hai 😌
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>

                    <div 
                      onClick={() => setPage5Stage('nahi_lagta')}
                      className="group inline-flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-rose-400 transition-colors py-1"
                    >
                      <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-rose-400">
                        Mujhe nahi lagta 🙈
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {page5Stage === 'lagta_hai' && (
              <div className="space-y-4">
                <div className="font-robot text-xl sm:text-2xl md:text-3xl font-normal tracking-wide text-white leading-relaxed robot-glow space-y-2">
                  <p>{page5TypedLagta[0]}</p>
                  <p className="text-slate-200">{page5TypedLagta[1]}</p>
                  <p className="text-rose-400 font-medium">
                    {page5TypedLagta[2]}
                    {!isPage5LagtaDone && (
                      <span className="inline-block w-2 sm:w-3 h-5 sm:h-7 bg-white/90 animate-cursor ml-1" />
                    )}
                  </p>
                </div>

                {isPage5LagtaDone && (
                  <div className="pt-6 font-robot text-base text-slate-400 animate-fade-in">
                    <div 
                      onClick={handlePage5Continue}
                      className="group inline-flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white transition-colors py-1"
                    >
                      <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white">
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

            {page5Stage === 'nahi_lagta' && (
              <div className="space-y-4">
                <div className="font-robot text-lg sm:text-2xl md:text-3xl font-normal tracking-wide text-white leading-relaxed robot-glow space-y-2">
                  <p className="text-rose-400">{page5TypedNahiLagta[0]}</p>
                  <p>{page5TypedNahiLagta[1]}</p>
                  <p className="text-slate-300">{page5TypedNahiLagta[2]}</p>
                  <p>{page5TypedNahiLagta[3]}</p>
                  <p className="text-rose-400 font-medium">
                    {page5TypedNahiLagta[4]}
                    {!isPage5NahiLagtaDone && (
                      <span className="inline-block w-2 sm:w-3 h-5 sm:h-7 bg-white/90 animate-cursor ml-1" />
                    )}
                  </p>
                </div>

                {isPage5NahiLagtaDone && (
                  <div className="pt-6 font-robot text-base text-slate-400 animate-fade-in">
                    <div 
                      onClick={handlePage5Continue}
                      className="group inline-flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white transition-colors py-1"
                    >
                      <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white">
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
          </div>
        </div>
      )}

      {/* PAGE 6: Chhoti Si Help ❤️ */}
      {currentPage === 6 && (
        <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 animate-fade-in">
          
          {/* Left Side (35%): Cute Cartoon Character */}
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

          {/* Right Side (65%): Dialogue & Text Options */}
          <div className="w-full md:w-[65%] text-left space-y-4 md:space-y-6">
            
            {page6Stage === 'initial' && (
              <div className="space-y-4">
                <div className="font-robot text-xl sm:text-2xl md:text-3xl font-normal tracking-wide text-white leading-relaxed robot-glow space-y-2">
                  <p>{page6TypedInitial[0]}</p>
                  <p className="text-rose-300 font-medium">{page6TypedInitial[1]}</p>
                  <p className="text-slate-300 text-lg sm:text-xl md:text-2xl pt-1">
                    {page6TypedInitial[2]}
                    {!isPage6InitialDone && (
                      <span className="inline-block w-2 sm:w-3 h-5 sm:h-7 bg-white/90 animate-cursor ml-1" />
                    )}
                  </p>
                </div>

                {isPage6InitialDone && (
                  <div className="pt-6 flex flex-wrap items-center gap-6 font-robot text-base sm:text-lg text-slate-400 animate-fade-in">
                    
                    {/* Option 1: Haan, karungi ❤️ */}
                    <div 
                      onClick={() => setPage6Stage('haan')}
                      className="group inline-flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white transition-colors py-1"
                    >
                      <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white">
                        Haan, karungi ❤️
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>

                    {/* Option 2: Pehle batao kya hai? 👀 */}
                    <div 
                      onClick={() => setPage6Stage('pehle_batao')}
                      className="group inline-flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-amber-300 transition-colors py-1"
                    >
                      <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-amber-300">
                        Pehle batao kya hai? 👀
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>

                  </div>
                )}
              </div>
            )}

            {page6Stage === 'haan' && (
              <div className="space-y-4">
                <div className="font-robot text-xl sm:text-2xl md:text-3xl font-normal tracking-wide text-rose-300 leading-relaxed robot-glow">
                  <p>
                    {page6TypedHaan[0]}
                    {!isPage6HaanDone && (
                      <span className="inline-block w-2 sm:w-3 h-5 sm:h-7 bg-white/90 animate-cursor ml-1" />
                    )}
                  </p>
                </div>

                {isPage6HaanDone && (
                  <div className="pt-6 font-robot text-base text-slate-400 animate-fade-in">
                    <div 
                      onClick={handlePage6Continue}
                      className="group inline-flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white transition-colors py-1"
                    >
                      <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white">
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

            {page6Stage === 'pehle_batao' && (
              <div className="space-y-4">
                <div className="font-robot text-lg sm:text-2xl md:text-3xl font-normal tracking-wide text-white leading-relaxed robot-glow space-y-2">
                  <p className="text-amber-300">{page6TypedPehle[0]}</p>
                  <p>{page6TypedPehle[1]}</p>
                  <p className="text-rose-300 font-medium">
                    {page6TypedPehle[2]}
                    {!isPage6PehleDone && (
                      <span className="inline-block w-2 sm:w-3 h-5 sm:h-7 bg-white/90 animate-cursor ml-1" />
                    )}
                  </p>
                </div>

                {isPage6PehleDone && (
                  <div className="pt-6 font-robot text-base text-slate-400 animate-fade-in">
                    <div 
                      onClick={handlePage6Continue}
                      className="group inline-flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white transition-colors py-1"
                    >
                      <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-white">
                        Okay, batao
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

        </div>
      )}

      {/* PAGE 7 Placeholder (Awaiting Next Prompt) */}
      {currentPage === 7 && (
        <div className="max-w-xl mx-auto text-center space-y-4 animate-fade-in font-robot">
          <h2 className="text-2xl sm:text-3xl text-white font-normal">
            Page 6 Completed! 🎉❤️
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            [ Next Page Container Ready for {sisterName || 'Sister Ji'} ]
          </p>
          <p className="text-xs text-slate-600">
            Awaiting your next prompt to build Page 7...
          </p>
          <button 
            onClick={() => {
              setPage6Stage('initial');
              setCurrentPage(6);
            }}
            className="text-xs text-slate-500 hover:text-slate-300 underline pt-4 block mx-auto cursor-pointer"
          >
            ← Back to Page 6
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
