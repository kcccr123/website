"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ImageDisplayProps {
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
}

/**
 * ImageDisplay component for displaying project images with optional captions.
 * @param {Object} props - The component props.
 * @param {string} [props.src] - The source URL of the image.
 * @param {string} [props.alt="Project image"] - The alt text for the image.
 * @param {string} [props.caption] - Optional caption for the image.
 * @param {number} [props.width=1200] - The width of the image.
 * @param {number} [props.height=675] - The height of the image.
 */
export default function ImageDisplay({ 
  src, 
  alt = "Project image", 
  caption,
  width = 1200,
  height = 675,
  className = "",
  imageClassName
}: ImageDisplayProps) {
  if (!src) return null;

  const resolvedImageClassName = imageClassName ?? "object-cover";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-glass backdrop-blur-sm border border-glass-border rounded-lg overflow-hidden ${className}`}
    >
      <div className="relative w-full" style={{ aspectRatio: `${width}/${height}` }}>
        <Image
          src={src}
          alt={alt}
          fill
          className={resolvedImageClassName}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      {caption && (
        <div className="p-4 bg-black/20">
          <p className="text-sm text-text-secondary text-center italic">
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  );
}
