'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useMemo } from 'react'

// Smooth spring config for buttery animations
const smoothSpring = { stiffness: 100, damping: 30, restDelta: 0.001 }

// Text reveal animation component
function TextReveal({ children, className = '', delay = 0 }: { children: string, className?: string, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

// Magnetic button component
function MagneticButton({ children, href, className = '' }: { children: React.ReactNode, href: string, className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0, 0)'
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const naanSectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Naan dipping animation scroll progress
  const { scrollYProgress: naanScrollProgress } = useScroll({
    target: naanSectionRef,
    offset: ['start end', 'end start']
  })

  // Smooth spring-based scroll values
  const smoothProgress = useSpring(scrollYProgress, smoothSpring)
  const smoothNaanProgress = useSpring(naanScrollProgress, smoothSpring)

  // Hero section transforms
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -150])
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9])
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0])

  // Naan animation transforms - dipping into curry
  const naanRotate = useTransform(smoothNaanProgress, [0.2, 0.5, 0.8], [15, -25, 15])
  const naanY = useTransform(smoothNaanProgress, [0.2, 0.5, 0.8], [-50, 80, -50])
  const naanX = useTransform(smoothNaanProgress, [0.2, 0.5, 0.8], [0, 30, 0])
  const naanScale = useTransform(smoothNaanProgress, [0.2, 0.5, 0.8], [1, 1.1, 1])
  const curryRipple = useTransform(smoothNaanProgress, [0.3, 0.5, 0.7], [1, 1.05, 1])

  // Parallax layers
  const layer1Y = useTransform(smoothProgress, [0, 1], [0, -200])
  const layer2Y = useTransform(smoothProgress, [0, 1], [0, -100])
  const layer3Y = useTransform(smoothProgress, [0, 1], [0, -50])

  // Pre-generate values for particles and drips
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${5 + (i * 5) % 90}%`,
      top: `${5 + (i * 7) % 90}%`,
      size: 2 + (i % 3),
      duration: 3 + (i % 3),
      delay: i * 0.15,
    })), []
  )

  const drips = useMemo(() =>
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      width: 6 + (i * 2) % 10,
      height: 15 + (i * 5) % 35,
    })), []
  )

  const spiceParticles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${10 + (i * 8) % 80}%`,
      size: 3 + (i % 4),
      delay: i * 0.2,
      color: i % 3 === 0 ? '#FF6B35' : i % 3 === 1 ? '#FFD700' : '#FF4D00',
    })), []
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 50% 50%, rgba(255, 77, 0, 0.15) 0%, #1C1C1C 60%)',
              'radial-gradient(ellipse at 30% 70%, rgba(255, 107, 53, 0.2) 0%, #1C1C1C 60%)',
              'radial-gradient(ellipse at 70% 30%, rgba(255, 215, 0, 0.15) 0%, #1C1C1C 60%)',
              'radial-gradient(ellipse at 50% 50%, rgba(255, 77, 0, 0.15) 0%, #1C1C1C 60%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating spice particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, rgba(255,77,0,0.8) 0%, rgba(255,77,0,0) 70%)`,
              }}
              animate={{
                y: [-30, 30, -30],
                x: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Parallax floating elements */}
        <motion.div style={{ y: layer1Y }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-[15%] w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 text-center px-4"
        >
          {/* Animated badge with glow */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-smoke/60 backdrop-blur-xl rounded-full border border-primary/30 mb-10 shadow-lg shadow-primary/10"
          >
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: ['0 0 0 0 rgba(255,77,0,0.4)', '0 0 0 10px rgba(255,77,0,0)', '0 0 0 0 rgba(255,77,0,0)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <span className="text-cream/90 text-sm font-medium tracking-widest">TANDOORI KITCHEN</span>
          </motion.div>

          {/* Dripping Graffiti Logo with enhanced effects */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="logo-container relative inline-block">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-b from-yellow-500/20 via-orange-500/20 to-transparent scale-150" />

              {/* Main Logo Text */}
              <div className="relative flex flex-col items-center leading-none" style={{ fontFamily: "'Lilita One', cursive" }}>
                <motion.span
                  className="logo-text text-5xl md:text-7xl lg:text-8xl"
                  initial={{ y: -50, opacity: 0, rotateX: 45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                >
                  BUTTER
                </motion.span>
                <motion.span
                  className="logo-text text-4xl md:text-5xl lg:text-6xl -mt-1 md:-mt-2"
                  initial={{ y: -50, opacity: 0, rotateX: 45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                >
                  MY
                </motion.span>
                <motion.span
                  className="logo-text text-6xl md:text-8xl lg:text-9xl -mt-1 md:-mt-3"
                  initial={{ y: -50, opacity: 0, rotateX: 45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                >
                  CHICKEN
                </motion.span>
              </div>

              {/* Enhanced Drips */}
              <div className="absolute -bottom-6 md:-bottom-8 left-0 right-0 flex justify-around px-2 md:px-6">
                {drips.map((d) => (
                  <motion.div
                    key={d.id}
                    style={{
                      width: `${d.width}px`,
                      background: 'linear-gradient(to bottom, #FF8C00, #FF6B00, #FF4500)',
                      borderRadius: '40% 40% 50% 50%',
                      boxShadow: '-2px 0 0 #000, 2px 0 0 #000, 0 3px 0 #000, 0 0 10px rgba(255,140,0,0.3)',
                    }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${d.height}px`, opacity: 1 }}
                    transition={{ delay: 1.2 + d.id * 0.08, duration: 0.6, ease: 'easeOut' }}
                  />
                ))}
              </div>

              {/* Animated shine effects */}
              {[
                { top: '5%', left: '20%', size: 'w-3 h-3', delay: 0 },
                { top: '15%', left: '35%', size: 'w-2 h-2', delay: 0.3 },
                { top: '10%', right: '25%', size: 'w-3 h-3', delay: 0.5 },
                { top: '25%', right: '35%', size: 'w-2 h-2', delay: 0.2 },
                { top: '8%', left: '55%', size: 'w-2 h-2', delay: 0.7 },
              ].map((shine, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${shine.size} bg-white rounded-full`}
                  style={{ top: shine.top, left: shine.left, right: shine.right }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: shine.delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Tagline with character animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-cream/70 text-xl md:text-2xl mb-10 font-light tracking-wide"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Creamy
            </motion.span>
            {' . '}
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              Rich
            </motion.span>
            {' . '}
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              Unforgettable
            </motion.span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <MagneticButton
              href="https://tandoorikitchenco.com/order-online/butter-chicken/"
              className="px-10 py-4 bg-fire-gradient text-white font-bold text-lg rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-shadow"
            >
              Order Now
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-cream/40 text-xs tracking-[0.3em]">SCROLL</span>
              <motion.div
                className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2"
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                  animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Naan Dipping Section */}
      <section ref={naanSectionRef} className="min-h-[150vh] relative py-32">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Curry bowl with naan */}
              <div className="relative flex items-center justify-center">
                {/* Bowl/Curry image */}
                <motion.div
                  style={{ scale: curryRipple }}
                  className="relative w-80 h-80 md:w-96 md:h-96"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-primary/30">
                    <Image
                      src="/butter-chicken-1.png"
                      alt="Butter Chicken"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Ripple effect overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-primary/20"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  </div>

                  {/* Steam effect */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-16 bg-gradient-to-t from-white/20 to-transparent rounded-full"
                        animate={{
                          y: [-10, -40],
                          opacity: [0.6, 0],
                          scaleY: [1, 1.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Naan bread dipping animation */}
                <motion.div
                  className="absolute w-40 h-28 md:w-52 md:h-36"
                  style={{
                    rotate: naanRotate,
                    y: naanY,
                    x: naanX,
                    scale: naanScale,
                    originX: 0.3,
                    originY: 1,
                  }}
                >
                  <Image
                    src="/naan.svg"
                    alt="Naan bread"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                  {/* Curry drip on naan */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-b-full"
                    style={{
                      opacity: useTransform(smoothNaanProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
                    }}
                  />
                </motion.div>
              </div>

              {/* Text content */}
              <div className="text-center lg:text-left">
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-primary font-semibold tracking-[0.2em] text-sm mb-4 block"
                >
                  THE PERFECT DIP
                </motion.span>

                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mb-6 overflow-hidden">
                  <TextReveal delay={0.1}>Tear. Dip.</TextReveal>
                  <br />
                  <span className="text-transparent bg-clip-text bg-fire-gradient">
                    <TextReveal delay={0.3}>Devour.</TextReveal>
                  </span>
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-cream/60 text-lg leading-relaxed mb-8 max-w-lg"
                >
                  Fresh naan, straight from the tandoor, meets our signature butter chicken.
                  Every scoop is a perfect harmony of crispy bread and creamy, spiced curry.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  {['Fresh Baked', 'Hand-Stretched', 'Tandoor-Fired'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 77, 0, 0.2)' }}
                      className="px-5 py-2.5 bg-smoke/60 rounded-full text-cream/80 text-sm border border-white/10 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Floating spice particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {spiceParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: p.left,
                  bottom: '20%',
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                }}
                animate={{
                  y: [0, -200, 0],
                  x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
                  opacity: [0, 0.8, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4 + p.id % 2,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full-width image section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <Image
            src="/butter-chicken-2.png"
            alt="Butter Chicken with Naan"
            fill
            className="object-cover"
          />
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(to bottom, rgba(28,28,28,0.3) 0%, rgba(28,28,28,0.8) 100%)',
            }}
          />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-cream mb-8"
          >
            Taste the<br />
            <span className="text-transparent bg-clip-text bg-fire-gradient">Tradition</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-cream/80 text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto"
          >
            Every bite tells a story of generations of culinary mastery,
            passed down through 30 years of perfecting the art of Indian cuisine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <MagneticButton
              href="https://tandoorikitchenco.com/order-online/butter-chicken/"
              className="px-10 py-4 bg-fire-gradient text-white font-bold text-lg rounded-full shadow-xl shadow-primary/40"
            >
              Order Now
            </MagneticButton>

            <MagneticButton
              href="https://tandoorikitchenco.com"
              className="px-10 py-4 border-2 border-cream/40 text-cream font-semibold text-lg rounded-full backdrop-blur-sm hover:border-primary/60 transition-colors"
            >
              View Full Menu
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with counter animation */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-charcoal to-smoke/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-16 text-center"
          >
            {[
              { number: '30+', label: 'Years of Heritage', icon: '🏆' },
              { number: '100%', label: 'Authentic Spices', icon: '🌶️' },
              { number: '#1', label: 'Customer Favorite', icon: '❤️' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.span
                  className="font-heading text-6xl md:text-7xl text-transparent bg-clip-text bg-fire-gradient block mb-3"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {stat.number}
                </motion.span>
                <span className="text-cream/60 text-lg tracking-wide">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 50% 100%, rgba(255,77,0,0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 30% 100%, rgba(255,107,53,0.2) 0%, transparent 50%)',
              'radial-gradient(ellipse at 70% 100%, rgba(255,77,0,0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-6xl text-cream mb-6"
          >
            Ready to Experience<br />
            <span className="text-transparent bg-clip-text bg-fire-gradient">Butter Chicken?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-cream/60 text-xl mb-12 max-w-xl mx-auto"
          >
            Visit Tandoori Kitchen and discover why our butter chicken
            keeps customers coming back for more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MagneticButton
              href="https://tandoorikitchenco.com/order-online/butter-chicken/"
              className="px-14 py-5 bg-fire-gradient text-white font-bold text-xl rounded-full shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-shadow"
            >
              Order Butter Chicken
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-smoke/20">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-cream/40 text-sm"
          >
            A Butter Chicken Experience by{' '}
            <a
              href="https://tandoorikitchenco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light transition-colors"
            >
              Tandoori Kitchen
            </a>
            {' '}| Lafayette, CO
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
