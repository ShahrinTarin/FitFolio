export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-[#D5FF6D] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#D5FF6D] text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}