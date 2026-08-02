import { AnimatePresence, motion } from "framer-motion";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useAppContext } from "../context/AppContext";

const DarkMode = () => {
  const { dark, setDark } = useAppContext();

  return (
    <>
      <motion.button
        className={`px-2 py-2 rounded cursor-pointer text-sm font-semibold bg-black ${dark ? "text-[#FAE369]" : "text-white"}`}
        onClick={() => setDark(!dark)}
      >
        <div className="flex items-center gap-2">
          <span>{dark ? "Light" : "Dark"}</span>

          <AnimatePresence mode="wait">
            {dark ? (
              <motion.div
                key="light"
                initial={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.5,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <MdLightMode size={20} color="#FAE369" />
              </motion.div>
            ) : (
              <motion.div
                key="dark"
                initial={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.5,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <MdDarkMode size={20} color="white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  );
};

export default DarkMode;
