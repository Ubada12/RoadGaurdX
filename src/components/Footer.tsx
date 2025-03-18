"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FacebookIcon, XIcon, Instagram, LinkedinIcon } from 'lucide-react'

const FooterSection = ({ title, links }: { title: string; links: { name: string; href: string }[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-4"
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <motion.li key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
            {link.name}
          </a>
        </motion.li>
      ))}
    </ul>
  </motion.div>
)

const SocialIcon = ({ Icon, href }: { Icon: React.ElementType; href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className="text-gray-300 hover:text-white transition-colors duration-200 border-2 border-white rounded-full p-2"
  >
    <Icon size={24} />
  </motion.a>
)

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterSection
            title="About Us"
            links={[
              { name: 'Team', href: '/about/team' },
              { name: 'Careers', href: '/about/careers' },
            ]}
          />
          <FooterSection
            title="Contact Us"
            links={[
              { name: 'Support', href: '/contact/support' },
              { name: 'Media Inquiries', href: '/contact/media' },
            ]}
          />
          <FooterSection
            title="Follow Me"
            links={[
              { name: 'Events', href: '/follow/events' },
              { name: 'Webinars', href: '/follow/webinars' },
            ]}
          />
          <FooterSection
            title="Other Things"
            links={[
              { name: 'Privacy Policy', href: '/other/privacy-policy' },
              { name: 'Terms of Service', href: '/other/terms-of-service' },
              { name: 'FAQ', href: '/other/faq' },
            ]}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col items-center"
        >
          <p className="text-gray-400 text-sm mb-4 text-center">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <SocialIcon Icon={FacebookIcon} href="https://www.facebook.com/yourprofile" />
            <SocialIcon Icon={XIcon} href="https://twitter.com/yourprofile" />
            <SocialIcon Icon={Instagram} href="https://www.instagram.com/yourprofile" />
            <SocialIcon Icon={LinkedinIcon} href="https://www.linkedin.com/in/yourprofile" />
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
