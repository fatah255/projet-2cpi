import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Irish_Grover, Inter } from "next/font/google";
import { SignInButton } from "@clerk/nextjs";
import { SignUpButton } from "@clerk/nextjs";

// Import your CSS Module
import styles from "./MergedHeroNavbar.module.css";

// Same fade-up animation
export const FadeUp = (delay: number) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay,
        ease: "easeInOut",
      },
    },
  };
};

// Google fonts
const irishGrover = Irish_Grover({ weight: "400", subsets: ["latin"] });
const inter = Inter({ weight: ["400", "700"], subsets: ["latin"] });

const MergedHeroNavbar = () => {
  return (
    <div
      className={`${styles.mainWrapper} ${irishGrover.className} ${inter.className}`}
    >
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.navInner}
        >
          {/* Left side: Logo */}
          <div className={`${styles.navLogo} ${irishGrover.className}`}>
            {/* <h1 className={styles.navIcon}>W</h1> */}
            <Image src="/logo.svg" alt="Whiteboard" width={50} height={50} />
            <h1 className={styles.navTitle}>Whiteboard</h1>
          </div>

          {/* Right side: Buttons */}
          <div className={styles.navButtons}>
            <div className={styles.loginButton}>
              <SignInButton>Log in</SignInButton>
            </div>
            <div className={styles.signUpButton}>
              <SignUpButton>Sign up</SignUpButton>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* LEFT SIDE: Blob + Text */}
            <div className={styles.leftSide}>
              <div className={styles.blobWrapper}>
                <Image
                  src="/blob.svg"
                  alt="whiteboard"
                  width={900}
                  height={900}
                  className={styles.blobImage}
                />
                <div className={styles.textBlock}>
                  <motion.h1
                    variants={FadeUp(0.4)}
                    initial="initial"
                    animate="animate"
                    className={styles.heroTitle}
                  >
                    The leading online
                    <span className={irishGrover.className}>
                      {" "}
                      whiteboard
                    </span>{" "}
                    for teaching
                  </motion.h1>
                  <motion.p
                    variants={FadeUp(0.6)}
                    initial="initial"
                    animate="animate"
                    className={styles.heroSubtitle}
                  >
                    boost your presence and leverage teacher awesomeness with
                    whiteboard in your classroom! Give students more valuable
                    one-on-one teaching time than ever before. Provide targeted
                    feedback on an individual level to help students master
                    learning content
                  </motion.p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Board Image */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              className={styles.rightSide}
            >
              <Image
                src="/board.png"
                alt="Board"
                width={800}
                height={800}
                className={styles.boardImage}
              />
            </motion.div>
          </div>

          {/* BOTTOM CONTENT (Cards + About) */}
          <div className={styles.bottomContent}>
            {/* First Row: 2 Cards */}
            <div className={styles.cardsRow}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={styles.cardBox}
              >
                <h3 className={styles.cardTitle}>
                  Effortless Teaching, Limitless Learning
                </h3>
                <p className={styles.cardText}>
                  Create your virtual classroom in seconds—no complicated setup,
                  just a simple and intuitive space for seamless teaching. Focus
                  on delivering great lessons while The Wightboard keeps
                  everything organized for you and your students.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={styles.cardBox}
              >
                <h3 className={styles.cardTitle}>
                  Stay Focused, Never Miss a Word
                </h3>
                <p className={styles.cardText}>
                  Forget the stress of copying notes while the teacher explains.
                  The Wightboard automatically captures every whiteboard update,
                  allowing you to focus on learning. Review everything later at
                  your own pace—all in just one click.
                </p>
              </motion.div>
            </div>

            {/* Second Row: Teacher & Student Guides */}
            <div className={styles.cardsRow}>
              {/* Teacher Guide */}
              <div className={styles.cardBox}>
                <h4 className={styles.cardSubtitle}>
                  How to Use The Wightboard as a Teacher
                </h4>
                <ul className={styles.listBlock}>
                  <motion.div
                    variants={FadeUp(0.2)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <li className={styles.listItem}>
                      <h6 className={styles.listItemTitle}>
                        1. Create Your Classroom
                      </h6>
                      <p className={styles.listItemText}>
                        Set up your virtual room in seconds—no complex setup,
                        just an intuitive space designed for effortless
                        teaching.
                      </p>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={FadeUp(0.4)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <li className={styles.listItem}>
                      <h6 className={styles.listItemTitle}>
                        2. Invite Your Students
                      </h6>
                      <p className={styles.listItemText}>
                        Share a unique invite link, allowing students to join
                        instantly—no registrations, no hassle.
                      </p>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={FadeUp(0.6)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <li className={styles.listItem}>
                      <h6 className={styles.listItemTitle}>
                        3. Teach Without Distractions
                      </h6>
                      <p className={styles.listItemText}>
                        Focus on your lesson while The Wightboard automatically
                        captures every whiteboard update in real time.
                      </p>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={FadeUp(0.8)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <li className={styles.listItem}>
                      <h6 className={styles.listItemTitle}>
                        4. Keep Lessons Organized
                      </h6>
                      <p className={styles.listItemText}>
                        Every session is neatly stored, making it easy for
                        students to revisit past lessons and stay on track.
                      </p>
                    </li>
                  </motion.div>
                </ul>
              </div>

              {/* Student Guide */}
              <div className={styles.cardBox}>
                <h4 className={styles.cardSubtitle}>
                  How to Use The Wightboard as a Student
                </h4>
                <ul className={styles.listBlock}>
                  <motion.div
                    variants={FadeUp(0.2)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <li className={styles.listItem}>
                      <h6 className={styles.listItemTitle}>
                        1. Get Your Invite Link
                      </h6>
                      <p className={styles.listItemText}>
                        Your teacher will send you a unique link—just click to
                        join the classroom instantly, no complicated sign-up
                        needed.
                      </p>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={FadeUp(0.4)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <li className={styles.listItem}>
                      <h6 className={styles.listItemTitle}>
                        2. Access the Live Whiteboard
                      </h6>
                      <p className={styles.listItemText}>
                        See real-time whiteboard updates as the lesson happens,
                        while The Wightboard automatically captures everything
                        for you.
                      </p>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={FadeUp(0.6)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <li className={styles.listItem}>
                      <h6 className={styles.listItemTitle}>
                        3. Revisit Past Lessons Anytime
                      </h6>
                      <p className={styles.listItemText}>
                        All whiteboard snapshots are saved in the room, so you
                        can review previous lessons whenever you need.
                      </p>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={FadeUp(0.8)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <li className={styles.listItem}>
                      <h6 className={styles.listItemTitle}>
                        4. Stay Organized with Your Study Materials
                      </h6>
                      <p className={styles.listItemText}>
                        Easily switch between rooms for different subjects and
                        find all your past lessons in one place.
                      </p>
                    </li>
                  </motion.div>
                </ul>
              </div>
            </div>

            {/* ABOUT US SECTION */}
            <section className={styles.aboutSection}>
              <div className={styles.aboutContainer}>
                <h2 className={styles.aboutTitle}>About Us</h2>
                <p className={styles.aboutParagraph}>
                  Education should be limitless. At{" "}
                  <span className={styles.blueText}>Whiteboard</span>, we’re
                  redefining how knowledge is shared and preserved. No more
                  scrambling to take notes or losing valuable lessons—every
                  whiteboard update is captured effortlessly, so students stay
                  focused and teachers teach without distractions.
                </p>
                <p className={styles.aboutParagraph}>
                  Learning should flow, not feel like a race. With{" "}
                  <span className={styles.blueText}>Whiteboard</span>, every
                  lesson lives beyond the classroom, always accessible, always
                  organized. <span className={styles.blueText}>Whiteboard</span>
                </p>
                <p className={styles.aboutEmphasis}>
                  Simple. Seamless. Smart. Welcome to the future of learning.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MergedHeroNavbar;
