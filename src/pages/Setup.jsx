import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import Wizard from "../components/Wizard";

export default function Setup() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    api
      .get(`/client-setup/${token}/questions`)
      .then(res => setQuestions(res.data.questions))
      .catch(() => navigate("/invalid"));
  }, [token]);

  if (!questions) return <div className="center">Loading setup…</div>;

  return <Wizard token={token} questions={questions} />;
}
