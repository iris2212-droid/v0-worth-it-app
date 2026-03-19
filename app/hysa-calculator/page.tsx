import HysaCalculator from "@/components/hysa-calculator";

export default function Page() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>High Yield Savings Calculator</h1>

      <HysaCalculator symbol="$" />
    </main>
  );
}
