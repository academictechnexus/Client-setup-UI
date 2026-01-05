import { useState } from "react";
import api from "../api";
import QuestionField from "./QuestionField";
import FileUpload from "./FileUpload";
import ProgressBar from "./ProgressBar";
import ClientLogin from "./ClientLogin";

export default function Wizard({ token, questions }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [setupDone, setSetupDone] = useState(false);
  const total = questions.length;

  const q = questions[step];

  // ✅ Safety guard – never disappear
  if (!q && !setupDone) {
    return (
      <div className="center">
        <div className="card">
          <h2>Setup completed</h2>
        </div>
      </div>
    );
  }

  // ✅ Detect upload step robustly
  const isUpload =
    q?.type === "file" ||
    q?.type === "upload" ||
    q?.type === "document" ||
    q?.key === "documents" ||
    q?.key === "uploads";

  const next = async () => {
    if (step === total - 1) {
      await api.post(`/client-setup/${token}/setup`, { answers });
      setSetupDone(true);
    } else {
      setStep(step + 1);
    }
  };

  if (setupDone) {
    return <ClientLogin token={token} />;
  }

  return (
    <div className="center">
      <div className="card">
        <ProgressBar step={step} total={total} />

        <h2>{q.label}</h2>
        {q.description && <p>{q.description}</p>}

        {isUpload ? (
          <FileUpload token={token} />
        ) : (
          <QuestionField
            question={q}
            value={answers[q.key]}
            onChange={v =>
              setAnswers(prev => ({ ...prev, [q.key]: v }))
            }
          />
        )}

        <button onClick={next}>
          {step === total - 1 ? "Finish Setup" : "Continue"}
        </button>
      </div>
    </div>
  );
}
