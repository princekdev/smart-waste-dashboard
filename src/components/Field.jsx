export default function Field({ icon: Icon, endIcon: EndIcon, onEndIconClick, value, onChange, ...rest }) {
  return (
    <div className="field">
      <Icon size={15} className="field__icon" />
      <input value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
      {EndIcon && (
        <button type="button" className="field__end-icon" onClick={onEndIconClick}>
          <EndIcon size={15} />
        </button>
      )}
    </div>
  );
}
