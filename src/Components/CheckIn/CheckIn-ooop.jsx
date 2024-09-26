import { Scanner } from "@yudiel/react-qr-scanner";
import "./CheckIn.css";
const CheckIn = () => {
  return (
    <div className="qr-scanner-container">
      <Scanner onScan={(result) => console.log(result)} />
    </div>
  );
};

export default CheckIn;
