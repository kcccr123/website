"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface AboutMeMarkdownProps {
  content?: string;
  filePath?: string;
  title?: string;
  className?: string;
}

export default function AboutMeMarkdown({
  content,
  filePath,
  title,
  className = ""
}: AboutMeMarkdownProps) {
  const [markdownContent, setMarkdownContent] = useState(content || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (filePath && !content) {
      setError(null);
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load markdown file: ${response.statusText}`);
          }
          return response.text();
        })
        .then((text) => setMarkdownContent(text))
        .catch((err) => setError(err.message));
    } else if (content) {
      setMarkdownContent(content);
    }
  }, [content, filePath]);

  if (error) {
    return (
      <div className={`glass-card ${className}`}>
        <p className="text-red-400 text-sm">Unable to load about section.</p>
      </div>
    );
  }

  if (!markdownContent) {
    return null;
  }

  return (
    <div className={`glass-card ${className}`}>
      {title && <h2 className="text-[clamp(1.2rem,1.8vw,1.6rem)] font-semibold mb-4">{title}</h2>}
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-[clamp(1.4rem,2.2vw,2rem)] font-semibold mb-4 mt-6 first:mt-0" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-[clamp(1.2rem,2vw,1.7rem)] font-semibold mb-3 mt-5 first:mt-0" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-[clamp(1.1rem,1.6vw,1.4rem)] font-semibold mb-3 mt-4 first:mt-0" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-[clamp(1rem,1.4vw,1.2rem)] text-text-secondary leading-relaxed mb-4" {...props} />
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
          hr: ({ node, ...props }) => (
            <hr className="border-glass-border my-6" {...props} />
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
