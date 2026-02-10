import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noSize, setNoSize] = useState(1);
  const [yesSize, setYesSize] = useState(1);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 20 + Math.random() * 30,
    }));
    setHearts(newHearts);
  }, []);

  const message = "Veena, will you be my Valentine? 💖";
  const [copied, setCopied] = useState(false);

  const reset = () => {
    setYesClicked(false);
    setNoSize(1);
    setYesSize(1);
    setNoPos({ x: 0, y: 0 });
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message + " — Say Yes! 💖");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const moveNoButton = () => {
    const x = Math.floor(Math.random() * 200 - 100);
    const y = Math.floor(Math.random() * 200 - 100);
    setNoPos({ x, y });
    setNoSize((prev) => Math.max(0.4, prev - 0.1));
    setYesSize((prev) => Math.min(2, prev + 0.15));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-200 via-purple-300 to-indigo-300">
      {/* Background Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-100vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-pink-400 pointer-events-none"
          style={{ left: `${heart.left}%`, fontSize: `${heart.size}px` }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="min-h-screen flex items-center justify-center relative z-10 p-6">
        <AnimatePresence mode="wait">
          {!yesClicked ? (
            <motion.div
              key="question"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl text-center max-w-lg border border-purple-200"
            >
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
                {message}
              </h1>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <motion.button
                  animate={{ scale: yesSize }}
                  whileHover={{ scale: yesSize + 0.1 }}
                  onClick={() => setYesClicked(true)}
                  className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg text-xl"
                >
                  Yes ❤️
                </motion.button>

                <motion.button
                  animate={{ x: noPos.x, y: noPos.y, scale: noSize }}
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className="px-10 py-4 bg-gray-400 text-white rounded-full font-bold shadow-lg text-xl"
                >
                  No ❌
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-white/95 p-8 sm:p-12 rounded-3xl shadow-2xl border-4 border-purple-400 max-w-2xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                {/* Cute Puppy */}
                <motion.img
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  src="/cute-puppy.png"
                  alt="Happy Puppy"
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-pink-300 shadow-lg object-cover"
                />
                {/* Cute Raven (Teen Titans) */}
                <motion.img
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  src="/reven-and-robin.png"
                  alt="Raven Heart"
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-purple-500 shadow-lg object-cover"
                />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-4">
                Yaayyy! 🎉
              </h2>

              <p className="text-xl sm:text-2xl text-gray-800 font-bold mb-2">
                Thank you cutie for accepting my proposal. 💖
              </p>

              <p className="text-lg text-purple-500 italic font-medium">
                "Azarath Metrion... You made me the happiest!" 💜
              </p>

              <div className="mt-8 flex gap-4 justify-center">
                <button
                  onClick={copyMessage}
                  className="px-6 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition shadow-md"
                >
                  {copied ? "Copied! 💌" : "Share 💌"}
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition"
                >
                  Restart ↺
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
