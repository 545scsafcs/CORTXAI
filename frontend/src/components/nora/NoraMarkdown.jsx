import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";

export default function NoraMarkdown({ content }) {
  return (
    <div className="prose max-w-none text-[#111827] font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3 rounded-xl border border-slate-200 bg-slate-50/60 shadow-xs scrollbar-thin">
              <table className="w-full border-collapse text-left text-xs leading-relaxed text-[#111827]" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-slate-100 text-teal-700 border-b border-slate-200" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-3.5 py-2 font-bold text-[10px] uppercase tracking-wider font-mono" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-slate-100" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-slate-100/40 transition-colors duration-150" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-3.5 py-2 text-[#111827] font-sans text-xs" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="my-3 pl-3.5 border-l-2 border-teal-500 bg-teal-50/50 py-2 pr-3 rounded-r-xl italic text-slate-800 text-xs font-sans" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-4 space-y-1 my-2 text-xs text-[#111827]" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-4 space-y-1 my-2 text-xs text-[#111827]" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="marker:text-teal-600 text-[#111827] font-sans leading-relaxed text-xs" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="leading-relaxed mb-2 text-xs font-sans text-[#111827] font-normal" {...props} />
          ),
          h1: ({ node, ...props }) => <h1 className="text-base font-bold font-outfit text-[#111827] my-3" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-sm font-bold font-outfit text-[#111827] my-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xs font-bold font-outfit text-[#111827] my-1.5" {...props} />,
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ inline, className, children, ...props }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const codeContent = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (inline || !match) {
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-teal-700 text-[11px] font-medium"
        {...props}
      >
        {children}
      </code>
    );
  }

  const lang = match[1];

  return (
    <div className="relative my-3 rounded-xl border border-slate-700 bg-[#0F172A] overflow-hidden shadow-md font-mono text-xs leading-normal">
      {/* Code Header bar */}
      <div className="flex justify-between items-center px-3.5 py-1.5 bg-slate-900 border-b border-slate-700/80 text-[10px] text-slate-300 font-semibold tracking-wider uppercase select-none">
        <span>{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition duration-200 p-1 rounded hover:bg-slate-800 active:scale-95 cursor-pointer"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check size={11} className="text-teal-400" />
              <span className="text-teal-400 text-[9px]">Copied</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              <span className="text-[9px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code contents */}
      <div className="overflow-x-auto p-3 scrollbar-thin max-h-[300px]">
        <pre className="text-slate-100 font-mono text-xs whitespace-pre">
          <code>{codeContent}</code>
        </pre>
      </div>
    </div>
  );
}
