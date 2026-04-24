import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";

export default function StepResult({ screeningId }) {

  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!screeningId) return;

    fetch(`http://localhost:8080/screening/${screeningId}/apply`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(setResults)
      .catch(err => console.error("Error fetching results:", err));

  }, [screeningId]);

  return (
    <Layout title="Your Eligibility Results" step={5} totalSteps={5}>

      <Section title="Programs you may qualify for">

        <p>
          Based on the information you provided, here are your eligibility results.
        </p>

        {!results && <p>Loading results...</p>}

        {/* Program Results */}
        {results && results.results &&
          Object.entries(results.results).map(([program, result]) => (

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <h4 style={{ margin: 0 }}>{program} Program</h4>

                <span
                  style={{
                    fontWeight: "bold",
                    color: result.eligible ? "green" : "red"
                  }}
                >
                  {result.eligible ? "Eligible" : "Not Eligible"}
                </span>
              </div>

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

      {/* AI Explanation Section */}
      {results && results.aiExplanation && (
        <Section title="AI Summary">

          <div
            style={{
              padding: "15px",
              background: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "5px"
            }}
          >
            <p style={{ margin: 0 }}>
              {results.aiExplanation}
            </p>
          </div>

        </Section>
      )}

    </Layout>
  );
}