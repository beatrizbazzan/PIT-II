
export default function ButtonLogin({ text, className, ...props}) {
  return (
    <button {...props} className={className}>
      {text}
    </button>
  )
}
