export default function QuestionField({ question, value, onChange }) {
  if (question.type === "textarea") {
    return (
      <textarea
        value={value || ""}
        onChange={e => onChange(e.target.value)}
      />
    );
  }

  if (question.type === "select") {
    return (
      <select value={value || ""} onChange={e => onChange(e.target.value)}>
        <option value="">Select</option>
        {question.options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      value={value || ""}
      onChange={e => onChange(e.target.value)}
    />
  );
}
