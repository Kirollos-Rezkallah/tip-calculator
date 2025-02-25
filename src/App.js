import { useState } from "react";

export default function App() {
  const [billAmount, setBillAmount] = useState("");
  const [myTip, setMyTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  function handleReset() {
    setBillAmount("");
    setMyTip(0);
    setFriendTip(0);
  }
  return (
    <div>
      <Bill billAmount={billAmount} onSetBillAmount={setBillAmount} />
      <TipSelector tipPercentage={myTip} onSetTipPercentage={setMyTip}>
        How did you like the servies?
      </TipSelector>
      <TipSelector tipPercentage={friendTip} onSetTipPercentage={setFriendTip}>
        How did your friend like the servies?
      </TipSelector>
      <Total billAmount={billAmount} myTip={myTip} friendTip={friendTip} />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

function Bill({ billAmount, onSetBillAmount }) {
  return (
    <div>
      <label htmlFor="bill">How much was the bill?</label>
      <input
        id="bill"
        placeholder="Enter the bill :)"
        type="number"
        value={billAmount}
        onChange={(e) => onSetBillAmount(Math.max(0, Number(e.target.value)))}
      />
    </div>
  );
}

function TipSelector({ children, tipPercentage, onSetTipPercentage }) {
  return (
    <div>
      <span>{children}</span>
      <select
        value={tipPercentage}
        onChange={(e) => onSetTipPercentage(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function Total({ billAmount, myTip, friendTip }) {
  const myTipAmount = (billAmount ?? 0) * (myTip / 100);
  const friendTipAmount = (billAmount ?? 0) * (friendTip / 100);
  const total = Number(billAmount + myTipAmount + friendTipAmount);
  return (
    <div>
      <p>
        You pay ${total.toFixed(2)} (${billAmount} + $
        {(myTipAmount + friendTipAmount).toFixed(2)})
      </p>
    </div>
  );
}
