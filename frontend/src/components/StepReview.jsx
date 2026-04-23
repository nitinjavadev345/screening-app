import { useContext } from "react";
import { AppContext } from "../context/ApplicationContext";
import Layout from "../components/Layout";
import Section from "../components/Section";

export default function StepReview({ next, back, setScreeningId, goToStep }) {

  const { data } = useContext(AppContext);

  const submit = async () => {
    const res = await fetch("http://localhost:8080/screening", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.members)
    });

    const id = await res.json();
    setScreeningId(id);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Screening ID:", id);
    next();
  };

  return (
    <Layout title="Review Your Information" step={4} totalSteps={5}>

      {/* Household Section */}
      <Section title="Household Details">

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <strong>Number of people in household</strong>
            <div>{data.householdSize}</div>
          </div>

          {/* Optional Edit */}
          <button onClick={() => goToStep(1)}>Change</button>
        </div>

      </Section>

      {/* Members Section */}
      <Section title="Household Members">

        {data.members.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>{m.name || `Person ${i + 1}`}</h4>
              <button onClick={() => goToStep(2)}>Change</button>
            </div>

            <p><strong>Age:</strong> {m.age}</p>
            <p><strong>Monthly Income:</strong> ₹{m.income}</p>
          </div>
        ))}

      </Section>

      {/* Declaration (Very Cúram-like) */}
      <Section title="Declaration">

        <p>
          Please confirm that the information provided is correct to the best of your knowledge.
        </p>

      </Section>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={back}>Back</button>

        <button onClick={submit}>
          Submit Application
        </button>
      </div>

    </Layout>
  );
}