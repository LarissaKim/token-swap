import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import EthLogo from "../assets/eth-diamond-purple.png";
import TNTLogo from "../assets/token-logo.png";

const BuyForm = ({ userEthBalance, userTokenBalance, exchangeRate, buyTokens }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [ethAmount, setEthAmount] = useState(1);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    const subscription = watch((value) => {
      setEthAmount(value["ethAmt"]);
      setOutput(value["ethAmt"] * 100);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (e, value) => {
    e.preventDefault();
    await handleSubmit(buyTokens(ethAmount));
  };

  return (
    // <form onSubmit={onSubmit}>
    <form onSubmit={onSubmit}>
      <div className='form-label'>
        <label>
          <b>Input</b>
        </label>
        <span>
          Balance: <span>{userEthBalance}</span> ETH
        </span>
      </div>
      <div className='input-field'>
        <input
          type='number'
          name='ethAmt'
          id='ethAmt'
          placeholder='0'
          pattern='[0-9]'
          {...register("ethAmt", {
            required: "Enter a minimum of 1 ETH",
            valueAsNumber: true,
            min: { value: 1, message: "Swap a minimum of 1 ETH" },
          })}
        />
        <div className='token-logo'>
          <img src={EthLogo} height='32' alt='' />
          <p>ETH</p>
        </div>
      </div>
      {errors.ethAmt && <p className='error'>{errors.ethAmt.message}</p>}
      <div className='form-label'>
        <label>
          <b>Output</b>
        </label>
        <span>
          Balance: <span>{userTokenBalance}</span> TNT
        </span>
      </div>
      <div className='input-field'>
        <input type='number' name='tntAmt' id='tntAmt' placeholder='0' value={output} disabled />
        <div className='token-logo'>
          <img src={TNTLogo} height='32' alt='' />
          <p>TNT</p>
        </div>
      </div>
      <div className='form-label'>
        <span>Exchange Rate:</span>
        <span>
          1 ETH = <span>{exchangeRate}</span> TNT
        </span>
      </div>
      <button type='submit'>Swap</button>
    </form>
  );
};

export default BuyForm;
