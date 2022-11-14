import { type ReactNode } from 'react';
const Options = ({ children }: { children: ReactNode }) => {

  return (
    <div className='bg-white border border-blue-300 rounded-lg mt-1 shadow'>
      {children}
    </div>
  );
};

const Option = ({
  value,
  children,
}: {
  children: ReactNode;
  value?: string;
}) => {
  return (
    <p className='cursor-pointer py-1 px-10 hover:bg-blue-700 hover:text-white'>
      {children}
    </p>
  );
};

const Input = ({
  onChange,
  defaultValue,
  value,
}: {
  onChange: (arg0: string) => void;
  defaultValue?: string;
  value?: string;
}) => (
  <label>
    <input
      defaultValue={defaultValue}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      type='search'
      className='text-white bg-blue-700 w-[100%] py-2 px-2 outline-blue-400 rounded-lg'
    />
  </label>
);



const ComboBox = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

ComboBox.Options = Options;
ComboBox.Option = Option;
ComboBox.Input = Input;

export default ComboBox;
