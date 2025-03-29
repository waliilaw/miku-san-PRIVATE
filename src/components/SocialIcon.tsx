import { Github, Twitter, Linkedin, Instagram } from "lucide-react"; // Ensure these are imported correctly
import { motion } from "framer-motion";

const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
  const icons = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
  };
  const Icon = icons[platform as keyof typeof icons];

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="text-white hover:text-[#39c5bb] transition-colors"
    >
      <Icon size={24} />
    </motion.a>
  );
};

export default SocialIcon; 