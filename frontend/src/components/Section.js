

export default function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>{title}</h3>
      <hr />
      {children}
    </div>
  );
}