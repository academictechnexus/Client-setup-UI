import { useState } from "react";
import api from "../api";

export default function FileUpload({ token }) {
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const upload = async e => {
    const files = [...e.target.files];
    if (!files.length) return;

    const form = new FormData();
    files.slice(0, 3).forEach(f => form.append("files", f));

    try {
      setUploading(true);
      await api.post(`/client-setup/${token}/upload`, form);
      setDone(true);
    } catch (err) {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt"
        onChange={upload}
        disabled={uploading}
      />

      <p style={{ fontSize: 12, color: "#6b7280" }}>
        Upload up to 3 documents (PDF, DOC, DOCX, TXT)
      </p>

      {uploading && (
        <p style={{ fontSize: 12 }}>Uploading…</p>
      )}

      {done && (
        <p style={{ fontSize: 12, color: "green" }}>
          Files uploaded successfully
        </p>
      )}
    </div>
  );
}
