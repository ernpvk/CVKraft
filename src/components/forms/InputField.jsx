export default function InputField({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  required = false,
  error,
  touched,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none
          ${touched && error ? "border-red-500" : "border-gray-300"}`}
      />
      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
