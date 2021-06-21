# use-formik-persist **(Deprecate)**

> **Note:** better choice, [react-easy-persist](https://github.com/suhaotian/react-easy-persist)

<br />
<br />
<br />

A hook to persist formik's form state, support **web** and **react-native**,
[online demo](https://snack.expo.io/xhKV9CydX).

Install:

```zsh
yarn add use-formik-persist
```

peerDependencies:

```json
"peerDependencies": {
  // the latest async-stoarge version alread support web
  "@react-native-async-storage/async-storage": ">=1",
  "formik": ">=2",
  "react-use": ">=17",
  "react": ">=16.8"
}
```

Usage:

```tsx
import * as React from 'react';
import { useFormik } from 'formik';
import { useFormikPersist } from 'use-formik-persist';

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
  const [clear] = useFormikPersist(formik, { namespace: 'formik-example' });

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
              clear();
              alert('clear cache done!');
            }}
          >
            Clear Cache
          </button>
        </div>
      </form>
    </div>
  );
}
```
