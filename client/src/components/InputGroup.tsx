import classNames from 'classnames'

interface InputGroupProps {
    classname?: string,
    type: string,
    value: string,
    error: string | undefined,
    placeholder: string,
    setValue: (str: string) => void
}
const InputGroup: React.FC<InputGroupProps> = ({
    classname,
    type,
    value,
    error,
    placeholder,
    setValue,
}) => {
    return <div className={classname}>
        <input type={type}
            value={value}
            onChange={e => setValue(e.target.value)}
            className={
                classNames("w-full p-3 transition duration-200 border border-gray-300 rounded outline-none focus:bg-white hover:bg-white bg-gray-50",
                    { 'border-red-500': error }
                )}
            placeholder={placeholder}
        />
        <small className="font-medium text-red-600">{error}</small>
    </div>
}

export default InputGroup