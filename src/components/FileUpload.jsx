import api from "../api";

export default function FileUpload({ token }) {
  const upload = async e => {
    const form = new FormData();
    [...e.target.files].forEach(f => form.append("files", f));
    await api.post(`/client-setup/${token}/upload`, form);
  };

  return <input type="file" multiple onChange={upload} />;
}
