import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";

export default function StepResult({ screeningId }) {

  const [results, setResults] = useState(null);
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$ Results:"+results);
  useEffect(() => {

    console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRScreening ID:", screeningId);
    if (!screeningId) return;

    fetch(`http://localhost:8080/screening/${screeningId}/apply`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(setResults);
  }, [screeningId]);

  return (
    <Layout title="Your Eligibility Results" step={5} totalSteps={5}>

      <Section title="Programs you may qualify for">

        <p>
          Based on the information you provided, here are your eligibility results.
        </p>

        {!results && <p>Loading results...</p>}

        {results && Object.entries(results).map(([program, result]) => (
          <div
            key={program}
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              background: result.eligible ? "#f0fff0" : "#fff5f5"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>{program} Program</h4>

              <span style={{
                fontWeight: "bold",
                color: result.eligible ? "green" : "red"
              }}>
                {result.eligible ? "Eligible" : "Not Eligible"}
              </span>
            </div>

            {/* ✅ Reason (KEY FEATURE) */}
            <p style={{ marginTop: "10px" }}>
              {result.reason}
            </p>

            {result.eligible && (
              <button>
                Apply for {program}
              </button>
            )}
          </div>
        ))}

      </Section>

    </Layout>
  );
}