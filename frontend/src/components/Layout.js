export default function Layout({ title, step, totalSteps, children }) {

  const progress = (step / totalSteps) * 100;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>

      <h1>Eligibility Screening</h1>

      {/* ✅ Progress Bar (GLOBAL) */}
      <div style={{ background: "#eee", height: "10px", marginBottom: "10px" }}>
        <div
          style={{
            width: `${progress}%`,
            background: "blue",
            height: "10px",
            transition: "width 0.3s ease"
          }}
        />
      </div>

      <p>Step {step} of {totalSteps}</p>
      <h2>{title}</h2>

      <hr />

      {children}
    </div>
  );
}