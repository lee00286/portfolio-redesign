import WindowLayout from '@/components/computer/WindowLayout';

export default function Loading() {
  return (
    <WindowLayout>
      <div className="px-4 sm:px-5 py-3 w-full h-full">
        <div className="flex flex-col gap-4 py-5 px-0 sm:px-3 w-full animate-pulse">
          {/* Title skeleton */}
          <div className="rounded w-36 h-7 bg-gray-200" />

          {/* Card skeletons */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2.5 py-4 w-full">
              <div className="rounded w-28 h-3 bg-gray-200" />
              <div className="rounded w-56 h-5 bg-gray-200" />
              <div className="rounded w-20 h-3 bg-gray-100" />
              <div className="rounded w-full max-w-[400px] h-4 bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </WindowLayout>
  );
}
