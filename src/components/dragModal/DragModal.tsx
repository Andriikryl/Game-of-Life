import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import useMeasure from "react-use-measure";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import styles from "./style.module.css";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}

export const DragModal = ({ open, setOpen, children }: Props) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <FocusLock returnFocus={true}>
          <RemoveScroll>
            <motion.div
              ref={scope}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleClose}
              className={styles.wrapper}
            >
              <motion.div
                id="drawer"
                ref={drawerRef}
                onClick={(e) => e.stopPropagation()}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  ease: "easeInOut",
                }}
                className={styles.drawer}
                style={{ y }}
                drag="y"
                dragControls={controls}
                onDragEnd={() => {
                  if (y.get() >= 100) {
                    handleClose();
                  }
                }}
                dragListener={false}
                dragConstraints={{
                  top: 0,
                  bottom: 0,
                }}
                dragElastic={{
                  top: 0,
                  bottom: 0.5,
                }}
              >
                <div className={styles.button__box}>
                  <button
                    onPointerDown={(e) => {
                      controls.start(e);
                    }}
                    className={styles.button}
                  ></button>
                </div>
                <div className={styles.content__wrapper}>{children}</div>
              </motion.div>
            </motion.div>
          </RemoveScroll>
        </FocusLock>
      )}
    </>
  );
};
