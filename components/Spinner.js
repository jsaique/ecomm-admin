import { BarLoader } from "react-spinners";

export default function Spinner({ fullWidth }) {
  if (fullWidth) {
    return (
      <div className="w-full flex justify-center">
        <BarLoader color={"#14b8a6"} speedMultiplier={2} />
      </div>
    );
  }
  return <BarLoader color={"#14b8a6"} speedMultiplier={2} />;
}
