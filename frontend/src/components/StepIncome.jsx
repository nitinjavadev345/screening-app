import { useContext } from "react";
import { AppContext } from "../context/ApplicationContext";
import Layout from "../components/Layout";
import Section from "../components/Section";

export default function StepIncome({ next, back }) {

  const { data, setData } = useContext(AppContext);

  const updateIncome = (i, value) => {

    console.log(i+":::::::::::::"+value)
    const copy = [...data.members];
    copy[i].income = value;
    console.log(":::::::::::::Income::::::::::::"+copy[i].income)
    setData({ ...data, members: copy });
  };

  // Validation: allow 0, but not empty
  const isValid = data.members.every(
    m => m.income !== "" && m.income !== null && m.income !== undefined
  );
console.log("isValid:"+isValid);
  return (
    <Layout title="Income Information" step={3} totalSteps={5}>

      <Section title="Tell us about income for each household member">

        <p>
          Please provide the monthly income for each person in your household.
          Include earnings such as wages, pensions, or other sources of income.
        </p>

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
            <h4>{m.name || `Person ${i + 1}`}</h4>

            <div style={{ marginBottom: "10px" }}>
              <label>Monthly Income</label>
              <br />
              <input
                type="number"
                value={m.income}
                onChange={e => updateIncome(i, e.target.value)}
                placeholder="Enter amount (e.g., 15000)"
                min="0"
                style={{ marginTop: "5px", padding: "5px" }}
              />
            </div>

          </div>
        ))}

        {/* Inline validation */}
        {!isValid && (
          <p style={{ color: "red" }}>
            Please enter income for all household members (enter 0 if none).
          </p>
        )}

      </Section>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={back}>Back</button>

        <button disabled={!isValid} onClick={next}>
          Next
        </button>
      </div>

    </Layout>
  );
}