"use client";

import { useState, useEffect } from "react";
import { NotebookPen, Trash2, Save } from "lucide-react";

interface Note {
  id: string;
  reference: string;
  content: string;
  color: string;
  createdAt: string;
}

const COLORS: Record<string, string> = {
  yellow: "bg-yellow-50 border-yellow-200",
  blue: "bg-blue-50 border-blue-200",
  green: "bg-green-50 border-green-200",
  pink: "bg-pink-50 border-pink-200",
  purple: "bg-purple-50 border-purple-200",
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, setRef] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("yellow");

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const res = await fetch("/api/notes");
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function addNote() {
    if (!ref.trim() || !content.trim()) return;
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: ref.trim(), content: content.trim(), color }),
      });
      if (res.ok) {
        setRef("");
        setContent("");
        loadNotes();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteNote(id: string) {
    try {
      await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
      loadNotes();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Notes</h1>
      <p className="text-sm text-gray-500 mb-6">Personal study notes linked to Scripture references.</p>

      <div className="rounded-xl border border-gray-200 bg-white p-5 mb-6">
        <div className="space-y-3">
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="Reference (e.g. John 3:16)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your note..."
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {Object.keys(COLORS).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-2 ${c === color ? "border-gray-800" : "border-transparent"} ${COLORS[c].split(" ")[0]}`}
                />
              ))}
            </div>
            <button onClick={addNote} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors flex items-center gap-1">
              <Save className="h-3.5 w-3.5" /> Save Note
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-16">
          <NotebookPen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No notes yet</h3>
          <p className="text-sm text-gray-500">Add your first note above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((n) => (
            <div key={n.id} className={`rounded-xl border p-4 ${COLORS[n.color] || COLORS.yellow}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-600">{n.reference}</span>
                  <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{n.content}</p>
                </div>
                <button onClick={() => deleteNote(n.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
