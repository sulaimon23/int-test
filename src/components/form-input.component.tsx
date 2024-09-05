import { FormInputProps } from '../types'

export default function FormInput(props: FormInputProps) {
  const { onChange, onBlur, value, name, label, error, variant, ...rest } =
    props
  return (
    <div className="flex flex-col mb-6">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={name}
      >
        {label}
      </label>
      {variant === 'textarea' ? (
        <textarea
          className={`flex min-h-[80px] mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? 'border-red-500' : ''
          }`}
          id={name}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...rest}
        ></textarea>
      ) : (
        <input
          className={`flex h-10 mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
            ${error ? 'border-red-500' : ''}`}
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
      )}

      {error && (
        <span className="text-xs italic text-red-500 mt-1">{error}</span>
      )}
    </div>
  )
}
