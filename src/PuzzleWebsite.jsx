import React, { useState, useEffect } from "react";
import { Sparkles, Lock, CheckCircle, Terminal } from "lucide-react";

// Console easter eggs
console.log(
  "%cOh shit, you weren't supposed to find this...",
  "color: #00ff00; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cIf you're reading this, you might be on the right track though...",
  "color: #00ffff; font-size: 14px;"
);
console.log("%cTry typing: erirnyFrperg() ... Or whatever that would decode to...", "color: #ffff00; font-size: 12px;");

const PuzzleWebsite = () => {
  const [currentLayer, setCurrentLayer] = useState(0);
  const [password, setPassword] = useState("");
  const [logicAnswer, setLogicAnswer] = useState("");
  const [showFinalReveal, setShowFinalReveal] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedLayer = localStorage.getItem("puzzleLayer");
    if (savedLayer) {
      setCurrentLayer(parseInt(savedLayer));
    }
  }, []);

  // Save progress to localStorage
  const advanceLayer = (layer) => {
    setCurrentLayer(layer);
    localStorage.setItem("puzzleLayer", layer.toString());
  };

  // Make revealSecret available globally for console commands
  useEffect(() => {
    window.revealSecret = () => {
      console.log(
        "%c Nice work! You found the secret command!",
        "color: #ff00ff; font-size: 18px; font-weight: bold;"
      );
      console.log(
        "%cBut wait... there's still something hidden in the page itself.",
        "color: #00ffff; font-size: 14px;"
      );
      console.log(
        "%cHint: Not everything that's invisible is gone... 👀",
        "color: #ffff00; font-size: 12px;"
      );
    };
  }, []);

  // Layer 1: Caesar Cipher (ROT13)
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // ROT13 of "SECRETS" is "FRPERGF"
    const trimmedPassword = password.trim().toUpperCase();
    if (trimmedPassword === "SECRETS") {
      advanceLayer(1);
      setPassword("");
    } else {
      alert("Not quite... try again! 🤔");
    }
  };

  // Layer 2: Logic Puzzle
  const handleLogicSubmit = (e) => {
    e.preventDefault();
    // Answer to the riddle is "echo"
    if (logicAnswer.toLowerCase() === "echo") {
      advanceLayer(2);
      setLogicAnswer("");
    } else {
      alert("Hmm, that doesn't seem right... 🤔");
    }
  };

  // Layer 3: Hidden button reveal
  const handleSecretButtonClick = () => {
    console.log(
      "%c🚀 YOU FOUND IT! Initiating final sequence...",
      "color: #ff0000; font-size: 20px; font-weight: bold;"
    );
    setConfetti(true);
    setTimeout(() => {
      setShowFinalReveal(true);
    }, 2000);
  };

  // Confetti effect
  useEffect(() => {
    if (confetti) {
      const colors = [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
      ];
      const confettiElements = [];

      for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement("div");
        confettiPiece.style.position = "fixed";
        confettiPiece.style.width = "10px";
        confettiPiece.style.height = "10px";
        confettiPiece.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.left = Math.random() * 100 + "%";
        confettiPiece.style.top = "-10px";
        confettiPiece.style.opacity = "1";
        confettiPiece.style.transition = "all 3s ease-in";
        confettiPiece.style.zIndex = "9999";
        document.body.appendChild(confettiPiece);
        confettiElements.push(confettiPiece);

        setTimeout(() => {
          confettiPiece.style.top = "100%";
          confettiPiece.style.opacity = "0";
        }, 100);
      }

      setTimeout(() => {
        confettiElements.forEach((el) => el.remove());
      }, 3000);
    }
  }, [confetti]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      {/* Layer 0: Caesar Cipher Entry */}
      {currentLayer === 0 && (
        <div className="max-w-6xl mx-auto mt-20">
          <div className="text-center mb-12">
            <Lock className="w-24 h-24 mx-auto mb-6 text-purple-400" />
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome, Reid
            </h1>
            <p className="text-2xl text-gray-300">Can you crack the code?</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-12 shadow-2xl border border-purple-500">
            <div className="mb-8 p-8 bg-gray-700 rounded font-mono text-center text-4xl tracking-wider">
              FRPERGF
            </div>
            <p className="text-center text-purple-300 mb-8 italic text-xl">
              💡 Hint: The answer lies 13 steps forward...
            </p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the decoded password..."
                className="w-full px-6 py-4 bg-gray-700 rounded border border-purple-500 focus:outline-none focus:border-purple-400 text-white text-center text-2xl"
              />
              <button
                type="submit"
                className="w-full mt-6 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded font-semibold text-xl transition-colors"
              >
                Unlock
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Layer 1: Logic Puzzle */}
      {currentLayer === 1 && (
        <div className="max-w-6xl mx-auto mt-20">
          <div className="text-center mb-12">
            <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-400" />
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Congratulations!
            </h1>
            <p className="text-2xl text-gray-300">You've made it to Level 2</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-12 shadow-2xl border border-green-500">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-400">
              Solve the Riddle
            </h2>
            <div className="mb-10 p-8 bg-gray-700 rounded text-center">
              <p className="text-2xl leading-relaxed">
                I speak without a mouth and hear without ears.
                <br />
                I have no body, but come alive with the wind.
                <br />
                What am I?
              </p>
            </div>
            <form onSubmit={handleLogicSubmit}>
              <input
                type="text"
                value={logicAnswer}
                onChange={(e) => setLogicAnswer(e.target.value)}
                placeholder="Your answer..."
                className="w-full px-6 py-4 bg-gray-700 rounded border border-green-500 focus:outline-none focus:border-green-400 text-white text-center text-2xl"
              />
              <button
                type="submit"
                className="w-full mt-6 px-8 py-4 bg-green-600 hover:bg-green-700 rounded font-semibold text-xl transition-colors"
              >
                Submit Answer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Layer 2: "That's it" message with hidden elements */}
      {currentLayer === 2 && !showFinalReveal && (
        <div className="max-w-6xl mx-auto mt-20">
          <div className="text-center mb-12">
            <Sparkles className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Well Done!
            </h1>
            <p className="text-2xl text-gray-300">
              You've completed the puzzles!
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-12 shadow-2xl border border-yellow-500">
            <p className="text-center text-3xl mb-6">That's all that's here </p>
            <p className="text-center text-gray-400 mb-10 text-xl">...Right?</p>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-center text-gray-500 italic text-xl">
                Well, that's everything... There couldn't possibly be anything else
                here...
              </p>
            </div>
          </div>

          {/* Hidden button - invisible but clickable */}
          <button
            onClick={handleSecretButtonClick}
            className="fixed bottom-10 right-10 w-20 h-20 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-red-600 rounded-full cursor-pointer"
            data-secret="final-unlock"
            aria-label="Secret button"
            title="You found me! 🎯"
          >
            <Terminal className="w-10 h-10 mx-auto" />
          </button>

          {/* HTML comment hint */}
          {/* 
            Hey Reid,
            You're getting warmer...
            Look for something with data-secret="final-unlock"
            Or maybe check the bottom right corner? 
            Or not... What would I know?
          */}
        </div>
      )}

      {/* Final Reveal */}
      {showFinalReveal && (
        <div className="max-w-6xl mx-auto mt-20 text-center">
          <div className="bg-gray-800 rounded-lg p-16 shadow-2xl border-4 border-red-500 animate-pulse">
            <h1 className="text-8xl font-bold mb-10 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
              🎊 CONGRATULATIONS! 🎊
            </h1>
            <div className="text-5xl font-bold mb-10">YOU DID IT!</div>
            <div className="text-3xl mb-10 animate-bounce">
              🏆 Goated Performance 🏆
            </div>
            <div className="border-t-4 border-gray-700 pt-10 mt-10">
              <p className="text-2xl text-gray-400 italic">
                "I didn't think you'd get this far, so I didn't add anything..."
              </p>
              <p className="text-lg text-gray-500 mt-6">- Ty</p>
            </div>
          </div>
        </div>
      )}

      {/* Reset button (for testing) */}
      {currentLayer > 0 && (
        <button
          onClick={() => {
            localStorage.removeItem("puzzleLayer");
            setCurrentLayer(0);
            setShowFinalReveal(false);
            setConfetti(false);
          }}
          className="fixed top-4 right-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm opacity-50 hover:opacity-100 transition-opacity"
        >
          Reset Progress
        </button>
      )}
    </div>
  );
};

export default PuzzleWebsite;
