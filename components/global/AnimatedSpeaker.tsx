import { motion } from "framer-motion";

export function AnimatedSpeaker({ isSpeaking }: { isSpeaking: boolean }) {
  return (
    <div className="flex items-center justify-center w-5 h-5">
      <motion.div
        className="w-1 h-3 bg-blue-500 mx-0.5 rounded"
        animate={{ scaleY: isSpeaking ? [1, 2, 1] : 1 }}
        transition={{ repeat: Infinity, duration: 0.6 }}
      />
      <motion.div
        className="w-1 h-4 bg-blue-500 mx-0.5 rounded"
        animate={{ scaleY: isSpeaking ? [1, 1.5, 1] : 1 }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      />
      <motion.div
        className="w-1 h-2 bg-blue-500 mx-0.5 rounded"
        animate={{ scaleY: isSpeaking ? [1, 2.2, 1] : 1 }}
        transition={{ repeat: Infinity, duration: 0.7 }}
      />
    </div>
  );
}
