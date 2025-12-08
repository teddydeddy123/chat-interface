"use client";

export default function DoodleBackground() {
  return (
    <div
      className="fixed inset-0 bg-gray-200"
      style={{
        backgroundImage: `url("/Body BG.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "700px 500px",
      }}
    />
  );
}
