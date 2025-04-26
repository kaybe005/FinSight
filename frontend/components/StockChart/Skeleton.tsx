export default function Skeleton() {
  return (
    <div className="animate-pulse h-[400px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="space-y-2 text-center">
        <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
        <p className="text-gray-400 text-sm">Loading chart data...</p>
      </div>
    </div>
  );
}
