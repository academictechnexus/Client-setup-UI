import { useState } from "react";
import api from "../api";
import QuestionField from "./QuestionField";
import FileUpload from "./FileUpload";
import { useNavigate } from "react-router-dom";

export default function Wizard({ token, questions }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const q = questions[step];

  const next = async () => {
    if (step === questions.length - 1) {
      await api.post(`/client-setup/${token}/setup`, { answers });
      navigate("/success");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="card">
      <h2>{q.label}</h2>

      {q.type === "file" ? (
        <FileUpload token={token} />
      ) : (
        <QuestionField
          question={q}
          value={answers[q.key]}
          onChange={v => setAnswers({ ...answers, [q.key]: v })}
        />
      )}

      <button onClick={next}>
        {step === questions.length - 1 ? "Finish Setup" : "Next"}
      </button>
    </div>
  );
}
