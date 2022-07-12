import { KeyboardEvent } from "react";


const onKeyUp = (e: KeyboardEvent<HTMLLIElement> | KeyboardEvent<HTMLButtonElement>) => {
  if (e.key === 'Enter')
    e.target.click();
};


export default onKeyUp;
