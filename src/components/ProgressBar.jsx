export default function ProgressBar({ step, total }) {
  const percent = Math.round(((step + 1) / total) * 100);

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        height: 6,
        background: "#e5e7eb",
        borderRadius: 4
      }}>
        <div style={{
          width: `${percent}%`,
          height: "100%",
          background: "#2563eb",
          borderRadius: 4
        }} />
      </div>
      <small style={{ color: "#6b7280" }}>
        Step {step + 1} of {total}
      </small>
    </div>
  );
}
