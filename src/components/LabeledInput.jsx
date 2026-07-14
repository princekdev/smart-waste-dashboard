export default function LabeledInput({ label, value, onChange, ...rest }) {
  return (
    <div className="labeled-input">
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
    </div>
  );
}
