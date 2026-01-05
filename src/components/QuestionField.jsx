export default function QuestionField({ question, value, onChange }) {
  const { type, options = [] } = question;

  switch (type) {
    case "textarea":
      return (
        <textarea
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      );

    case "select":
      return (
        <select
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        >
          <option value="">Select an option</option>
          {options.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div>
          {options.map(o => (
            <label key={o} style={{ display: "block", marginBottom: 8 }}>
              <input
                type="radio"
                name={question.key}
                value={o}
                checked={value === o}
                onChange={() => onChange(o)}
              />
              {" "}{o}
            </label>
          ))}
        </div>
      );

    case "multiselect":
      return (
        <div>
          {options.map(o => (
            <label key={o} style={{ display: "block", marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={Array.isArray(value) && value.includes(o)}
                onChange={e => {
                  const arr = Array.isArray(value) ? [...value] : [];
                  if (e.target.checked) arr.push(o);
                  else arr.splice(arr.indexOf(o), 1);
                  onChange(arr);
                }}
              />
              {" "}{o}
            </label>
          ))}
        </div>
      );

    case "number":
      return (
        <input
          type="number"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      );

    case "boolean":
      return (
        <select
          value={value ?? ""}
          onChange={e => onChange(e.target.value === "true")}
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );

    default:
      // 🚨 FAIL-SAFE (VERY IMPORTANT)
      return (
        <input
          type="text"
          placeholder={`Unsupported type: ${type}`}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      );
  }
}
