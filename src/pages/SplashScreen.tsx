import React from "react";
import logoFoot from "../assets/logo-footer.png";
import { motion } from "framer-motion";

const SplashScreen: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-primary text-white">
      <div className="text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <motion.img
              src={logoFoot}
              alt="Logo"
              className="w-20 h-20 mx-auto mb-4"
              animate={{
                rotate: [-8, 8, -8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
            <h1 className="text-4xl font-bold">
              <span className="typing-animation">
                <i className="text-secondary">Berita</i>Kita
              </span>
              <style>
                {`
                  .typing-animation {
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    border-right: 3px solid #fff;
                    animation:
                      typing 1.5s steps(11, end) forwards,
                      blink-caret 0.7s step-end infinite;
                  }
                  @keyframes typing {
                    from { width: 0 }
                    to { width: 9.5ch }
                  }
                  @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: #fff }
                  }
                `}
              </style>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
