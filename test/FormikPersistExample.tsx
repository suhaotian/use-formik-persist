import * as React from 'react';
import { useFormik } from 'formik';
import { useFormikPersist } from '../src';

export default function FormikPersistExample() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
  });
  const remove = useFormikPersist(formik, { namespace: 'formik-example' });

  return (
    <div>
      <h1>useFormikPersist Example</h1>
      <form
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
        onReset={formik.handleReset}
        onBlur={formik.handleBlur}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formik.values.username}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
        />
        <br />
        <br />
        <div>
          <button type="submit">Login</button>
          <button type="reset">Reset</button>
          <button
            onClick={() => {
              remove();
              alert('remove form cache done!');
            }}
          >
            Remove Form Cache
          </button>
        </div>
      </form>
    </div>
  );
}
