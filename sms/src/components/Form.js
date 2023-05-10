import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import toast, { Toaster } from 'react-hot-toast';

const Form = () => {
  const [form, setForm] = useState({
    phoneNumber: '',
    code: ''
  });

  const { data, error, setSubscribe } = useApi();

  useEffect(() => {
    if (data) {
      setForm({ ...form, phoneNumber: '', code: data.code });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { phoneNumber, code } = form;

  const onChange = (e) => {
    e.preventDefault();

    setForm({
      ...form,
      phoneNumber: e.target.value
    });
  };

  const onBlur = (e) => {
    e.preventDefault();

    setSubscribe(phoneNumber);
  };

  const onClickButton = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(code);
    toast('Copied', { icon: '👏' });
    setForm({ ...form, phoneNumber: '', code: '' });
  };

  return (
    <div>
      <div>
        <input
          id="phone"
          name="phone"
          type="text"
          value={phoneNumber}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Phone number"
        />
      </div>
      {error && <span>{error}</span>}
      {code && 
      <div>
        <button
          id="send"
          name="send"
          type="button"
          onClick={onClickButton}
        >Get Discount</button>
      </div>}
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default Form;