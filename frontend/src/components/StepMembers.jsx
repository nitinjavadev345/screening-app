import { useContext, useEffect } from "react";
import { AppContext } from "../context/ApplicationContext";
import Layout from "../components/Layout";
import Section from "../components/Section";

export default function StepMembers({ next, back }) {

  const { data, setData } = useContext(AppContext);

  // Auto-create members based on household size
  useEffect(() => {
    const size = Number(data.householdSize);

    if (data.members.length !== size) {
      const members = Array.from({ length: size }, () => ({
        name: "",
        age: "",
        income: ""
      }));

      setData({ ...data, members });
    }
  }, [data.householdSize]);

  const update = (i, field, value) => {
    const copy = [...data.members];
    copy[i][field] = value;
    setData({ ...data, members: copy });
  };

  // Validation
  const isValid = data.members.every(
    m => m.name && Number(m.age) > 0
  );

  return (
    <Layout title="Household Members" step={2} totalSteps={5}>

      <Section title="Tell us about each person in your household">

        <p>Please provide details for all members of your household.</p>

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
            <h4>Person {i + 1}</h4>

            <div style={{ marginBottom: "10px" }}>
              <label>Full Name</label>
              <br />
              <input
                type="text"
                value={m.name}
                onChange={e => update(i, "name", e.target.value)}
                placeholder="Enter full name"
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Age (in years)</label>
              <br />
              <input
                type="number"
                value={m.age}
                onChange={e => update(i, "age", e.target.value)}
                min="0"
              />
            </div>

          </div>
        ))}

      </Section>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={back}>Back</button>

        <button disabled={!isValid} onClick={next}>
          Next
        </button>
      </div>

    </Layout>
  );
}