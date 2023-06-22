import { useState } from "react";

const useErrors = () => {
  const [err, setErr] = useState();

  const documentErrors = (e) => {
    return setErr(e);
  };

  const showFormError = () => {
    return err.map((e) => <p className="Form-error">{e}</p>);
  };

  return [err, documentErrors, showFormError];
};

export default useErrors;
