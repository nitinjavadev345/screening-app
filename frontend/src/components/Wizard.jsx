import { getNextStep } from "../utils/navigationRules";
import { useContext,useState } from "react";
import { AppContext } from "../context/ApplicationContext";
import { getPreviousStep } from "../utils/navigationRules";
import StepHousehold from "./StepHousehold";
import StepMembers from "./StepMembers";
import StepIncome from "./StepIncome";
import StepReview from "./StepReview";
import StepResult from "./StepResult";

export default function Wizard() {

  const { data } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [screeningId, setScreeningId] = useState(null);

  const next = () => {
    const nextStep = getNextStep(step, data);
    setStep(nextStep);
  };

  const back = () => setStep(s => s - 1);

  switch (step) {
    case 1: return <StepHousehold next={next} />;
    case 2: return <StepMembers next={next} back={back} />;
    case 3: return <StepIncome next={next} back={back} />;
    case 4: return <StepReview next={next} back={back} setScreeningId={setScreeningId} />;
    case 5: return <StepResult screeningId={screeningId} />;
    default: return <div>Done</div>;
  }
}