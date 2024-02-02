import {FC} from 'react';
import {useIsSubmitting} from 'remix-validated-form';

type SubmitButtonType = {
  children: React.ReactNode;
  classNames?: string;
};

export const SubmitButton: FC<SubmitButtonType> = ({children, classNames}) => {
  const isSubmitting = useIsSubmitting();
  return (
    <button className={classNames} type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : <> {children}</>}
    </button>
  );
};
