"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MarkdownBlockProps {
  content?: string;
  filePath?: string;
  title?: string;
  className?: string;
}

/**
 * MarkdownBlock component for displaying markdown content with math equation support.
 * Supports both inline markdown strings and loading from .md files.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.content] - Inline markdown content string.
 * @param {string} [props.filePath] - Path to a .md file to load (relative to public directory).
 * @param {string} [props.title] - Optional title for the markdown section.
 * @param {string} [props.className] - Additional CSS classes.
 */
export default function MarkdownBlock({ 
  content, 
  filePath, 
  title,
  className = "" 
}: MarkdownBlockProps) {
  const [markdownContent, setMarkdownContent] = useState(content || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (filePath && !content) {
      setIsLoading(true);
      setError(null);
      
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load markdown file: ${response.statusText}`);
          }
          return response.text();
        })
        .then((text) => {
          setMarkdownContent(text);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else if (content) {
      setMarkdownContent(content);
    }
  }, [content, filePath]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`bg-glass backdrop-blur-sm border border-glass-border rounded-lg p-6 ${className}`}
      >
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-glass-border border-t-white rounded-full animate-spin" />
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`bg-glass backdrop-blur-sm border border-glass-border rounded-lg p-6 ${className}`}
      >
        <div className="text-red-400 text-center py-4">
          <p className="font-semibold mb-2">Error Loading Markdown</p>
          <p className="text-sm text-red-300">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (!markdownContent) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-glass backdrop-blur-sm border border-glass-border rounded-lg p-6 ${className}`}
    >
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-4 mt-6 first:mt-0" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mb-3 mt-5 first:mt-0" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mb-3 mt-4 first:mt-0" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-semibold mb-2 mt-3 first:mt-0" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-base font-semibold mb-2 mt-3 first:mt-0" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-sm font-semibold mb-2 mt-3 first:mt-0" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-text-secondary leading-relaxed mb-4" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-text-secondary" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-text-secondary" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed ml-4" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-glass-border-hover pl-4 italic text-text-muted my-4"
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }: any) => {
            const text = String(children ?? "");
            const hasNewline = /[\r\n]/.test(text);
            const hasLanguage = /language-/.test(className || "");
            const isInline = !hasNewline && !hasLanguage;
            const baseClassName = isInline
              ? "bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-blue-300"
              : "block bg-black/40 p-4 rounded-lg overflow-x-auto text-sm font-mono text-text-secondary my-4";
            const combinedClassName = className
              ? `${baseClassName} ${className}`
              : baseClassName;
            return (
              <code className={combinedClassName} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => (
            <pre className="bg-black/40 rounded-lg overflow-hidden my-4" {...props} />
          ),
          img: ({ node, ...props }) => (
            <img
              className="w-full max-w-xl rounded-lg border border-glass-border my-4 mx-auto"
              loading="lazy"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="border-glass-border my-6" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-glass-border" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-white/5" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-glass-border" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="border-b border-glass-border" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-2 text-left font-semibold text-white" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-2 text-text-secondary" {...props} />
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </motion.div>
  );
}
