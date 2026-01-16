'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef, useMemo } from 'react'

export default function Home() {
  // Pre-generate random values to avoid hydration mismatch
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${10 + (i * 6) % 80}%`,
      top: `${5 + (i * 7) % 90}%`,
      duration: 3 + (i % 3),
      delay: i * 0.2,
    })), []
  )

  const drips = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      id: i,
      width: 8 + (i * 2) % 8,
      height: 20 + (i * 5) % 30,
    })), []
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const secondImageScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1])
  const secondImageOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1])
  const textY = useTransform(scrollYProgress, [0.4, 0.6], [100, 0])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center py-20">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(255, 77, 0, 0.15) 0%, #1C1C1C 50%, #1C1C1C 100%)',
              'radial-gradient(circle at 30% 70%, rgba(255, 77, 0, 0.2) 0%, #1C1C1C 50%, #1C1C1C 100%)',
              'radial-gradient(circle at 70% 30%, rgba(255, 77, 0, 0.15) 0%, #1C1C1C 50%, #1C1C1C 100%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 77, 0, 0.15) 0%, #1C1C1C 50%, #1C1C1C 100%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: p.left,
                top: p.top,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-smoke/60 backdrop-blur-md rounded-full border border-primary/30 mb-8"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <span className="text-cream/80 text-sm tracking-wide">TANDOORI KITCHEN</span>
          </motion.div>

          {/* Dripping Graffiti Logo */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="logo-container relative inline-block">
              {/* Main Logo Text */}
              <div className="flex flex-col items-center leading-none" style={{ fontFamily: "'Lilita One', cursive" }}>
                <motion.span
                  className="logo-text text-5xl md:text-7xl lg:text-8xl"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  BUTTER
                </motion.span>
                <motion.span
                  className="logo-text text-4xl md:text-5xl lg:text-6xl -mt-1 md:-mt-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  MY
                </motion.span>
                <motion.span
                  className="logo-text text-6xl md:text-8xl lg:text-9xl -mt-1 md:-mt-3"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  CHICKEN
                </motion.span>
              </div>

              {/* Drips */}
              <div className="absolute -bottom-4 md:-bottom-6 left-0 right-0 flex justify-around px-4 md:px-8">
                {drips.map((d) => (
                  <motion.div
                    key={d.id}
                    className="drip"
                    style={{
                      width: `${d.width}px`,
                      background: 'linear-gradient(to bottom, #FF8C00, #FF6B00)',
                      borderRadius: '0 0 50% 50%',
                      boxShadow: '-2px 0 0 #000, 2px 0 0 #000, 0 2px 0 #000',
                    }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${d.height}px`, opacity: 1 }}
                    transition={{ delay: 1 + d.id * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>

              {/* Shine/Highlight effects */}
              <motion.div
                className="absolute top-2 left-1/4 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full opacity-80 blur-[1px]"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-4 left-1/3 w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-60"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div
                className="absolute top-6 right-1/4 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full opacity-70 blur-[1px]"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute top-3 right-1/3 w-1 h-1 bg-white rounded-full opacity-50"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }}
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-cream/60 text-lg md:text-xl max-w-md mx-auto mb-12 font-light tracking-wide"
          >
            Creamy. Rich. Unforgettable.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-cream/40 text-xs tracking-widest">SCROLL</span>
              <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Image Showcase Section */}
      <section className="min-h-screen relative flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* First Image with hover effect */}
            <motion.div
              style={{ scale: secondImageScale, opacity: secondImageOpacity }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary/20"
              >
                <Image
                  src="/butter-chicken-1.png"
                  alt="Butter Chicken"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              </motion.div>

              {/* Floating accent */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-fire-gradient rounded-full opacity-20 blur-xl"
              />
            </motion.div>

            {/* Text content */}
            <motion.div
              style={{ y: textY }}
              className="text-center lg:text-left"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-primary font-medium tracking-widest text-sm mb-4 block"
              >
                THE SIGNATURE DISH
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mb-6"
              >
                A Legend<br />
                <span className="text-transparent bg-clip-text bg-fire-gradient">On Every Plate</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-cream/60 text-lg leading-relaxed mb-8 max-w-lg"
              >
                Tender chicken simmered in a velvety tomato-cream sauce,
                infused with aromatic spices and finished with a touch of butter.
                This is the dish that made us famous.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                {['Creamy', 'Aromatic', 'Authentic'].map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 77, 0, 0.2)' }}
                    className="px-4 py-2 bg-smoke/60 rounded-full text-cream/80 text-sm border border-white/10"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Second Image Section - Full Width */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <Image
            src="/butter-chicken-2.png"
            alt="Butter Chicken with Naan"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/70" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-cream mb-8"
          >
            Taste the<br />
            <span className="text-transparent bg-clip-text bg-fire-gradient">Tradition</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-cream/70 text-xl md:text-2xl mb-12 font-light"
          >
            Every bite tells a story of generations of culinary mastery
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="https://tandoorikitchenco.com/order-online/butter-chicken/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-fire-gradient text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-shadow"
            >
              Order Now
            </motion.a>

            <motion.a
              href="https://tandoorikitchenco.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255, 77, 0, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cream/30 text-cream font-semibold rounded-full backdrop-blur-sm transition-colors"
            >
              View Full Menu
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12 text-center"
          >
            {[
              { number: '30+', label: 'Years of Heritage' },
              { number: '100%', label: 'Authentic Spices' },
              { number: '#1', label: 'Customer Favorite' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.span
                  className="font-heading text-6xl md:text-7xl text-transparent bg-clip-text bg-fire-gradient block mb-2"
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
          className="absolute inset-0 bg-fire-gradient opacity-10"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-6xl text-cream mb-6"
          >
            Ready to Experience<br />
            <span className="text-transparent bg-clip-text bg-fire-gradient">Butter Chicken?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-cream/60 text-xl mb-12 max-w-xl mx-auto"
          >
            Visit Tandoori Kitchen and discover why our butter chicken
            keeps customers coming back for more.
          </motion.p>

          <motion.a
            href="https://tandoorikitchenco.com/order-online/butter-chicken/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-fire-gradient text-white font-bold text-lg rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-shadow"
          >
            Order Butter Chicken
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
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
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
