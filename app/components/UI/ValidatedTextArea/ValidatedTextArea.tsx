import {ChangeEventHandler} from 'react';
import {useField} from 'remix-validated-form';
import styles from './styles.module.css';

type MyInputProps = {
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  value?: number | string | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  classNames?: string;
};

const FormTextArea = ({
  name,
  label,
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
        <textarea
          className={`border-2 border-gray-200 pl-1 pb-1 pt-1 rounded-sm min-h-10 ${classNames} `}
          onChange={onChange}
          {...getInputProps({onChange, value, id: name, placeholder})}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FormTextArea;
