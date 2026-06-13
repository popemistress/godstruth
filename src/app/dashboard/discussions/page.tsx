"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: { name: string | null; image: string | null };
  replies: Comment[];
}

export default function DiscussionsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  const courseId = "placeholder"; // Would be dynamic in real app

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/comments?courseId=${courseId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  async function submitComment() {
    if (!newComment.trim()) return;
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, content: newComment }),
      });
      if (res.ok) {
        const comment = await res.json();
        setComments((prev) => [comment, ...prev]);
        setNewComment("");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Discussions</h1>
      <p className="text-sm text-gray-500 mb-8">Connect with fellow students and instructors.</p>

      <div className="rounded-xl border border-gray-200 bg-white p-5 mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share a thought, ask a question, or encourage someone..."
          className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={submitComment}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
          >
            <Send className="h-3.5 w-3.5" /> Post
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No discussions yet</h3>
          <p className="text-sm text-gray-500">Be the first to start a conversation.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-semibold text-emerald-700 flex-shrink-0">
                  {c.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{c.user.name || "Anonymous"}</span>
                    <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{c.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
