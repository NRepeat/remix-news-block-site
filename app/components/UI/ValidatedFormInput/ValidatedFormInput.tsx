import {useField} from 'remix-validated-form';
import styles from './styles.module.css';
type MyInputProps = {
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  value?: number | string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  classNames?: string;
};

const FormInput = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  classNames,
}: MyInputProps) => {
  const {error, getInputProps} = useField(name);

  return (
    <div className={styles.input}>
      <div className={styles.container}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <input
          onChange={onChange}
          className={` ${classNames} border-2 border-gray-200 pl-1 min-h-6 pb-1 pt-1 rounded-sm`}
          {...getInputProps({
            onChange,
            value,
            type,
            id: name,
            placeholder,
            min: '0',
          })}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
export default FormInput;
