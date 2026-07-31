export default function Select({ value, onChange, options, labels }) {
  return (
    <select className="select-input" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o} value={o}>
          {labels?.[o] || o}
        </option>
      ))}
    </select>
  );
}
