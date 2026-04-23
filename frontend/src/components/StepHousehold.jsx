import { useContext } from "react";
import { AppContext } from "../context/ApplicationContext";
import Layout from "../components/Layout";
import Section from "../components/Section";

export default function StepHousehold({ next }) {

  const { data, setData } = useContext(AppContext);

  const householdSize = Number(data.householdSize);
  const isValid = householdSize > 0;

  return (
    <Layout title="Household Information" step={1} totalSteps={5}>

      <Section title="Tell us about your household">

        <p>
          To determine which programs you may qualify for, we need some basic
          information about your household.
        </p>

        <div style={{ marginTop: "15px" }}>
          <label>
            How many people live in your household (including yourself)?
          </label>
          <br />

          <input
            type="number"
            value={data.householdSize || ""}
            onChange={e =>
              setData({ ...data, householdSize: e.target.value })
            }
            min="1"
            style={{ marginTop: "5px", padding: "5px", width: "100px" }}
          />
        </div>

        {/* Inline validation like Cúram */}
        {!isValid && (
          <p style={{ color: "red", marginTop: "10px" }}>
            Please enter a valid household size greater than 0.
          </p>
        )}

      </Section>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button disabled={!isValid} onClick={next}>
          Next
        </button>
      </div>

    </Layout>
  );
}