import React from "react";

const Loading = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-pink-50/30">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
          <span className="text-slate-300">/</span>
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
          <span className="text-slate-300">/</span>
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {/* Main Image Skeleton */}
            <div
              className="
                relative
                aspect-square
                overflow-hidden
                rounded-3xl
                border border-slate-200
                bg-white
                shadow-sm
              "
            >
              <div className="h-full w-full animate-pulse bg-gradient-to-br from-slate-100 via-slate-50 to-pink-50" />

              {/* Fake Image Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/70 shadow-sm">
                  <svg
                    className="h-10 w-10 text-slate-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Shimmer */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>

            {/* Thumbnail Skeletons */}
            <div className="mt-4 flex gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-20 w-20 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {/* Category */}
            <div className="mb-4 h-5 w-28 animate-pulse rounded-full bg-pink-100" />

            {/* Product Title */}
            <div className="space-y-3">
              <div className="h-9 w-full animate-pulse rounded-lg bg-slate-200" />
              <div className="h-9 w-4/5 animate-pulse rounded-lg bg-slate-200" />
            </div>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className="h-5 w-5 animate-pulse rounded bg-yellow-100"
                  />
                ))}
              </div>

              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
            </div>

            {/* Price */}
            <div className="mt-7 flex items-center gap-3">
              <div className="h-10 w-36 animate-pulse rounded-lg bg-pink-100" />
              <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
            </div>

            {/* Divider */}
            <div className="my-7 h-px w-full bg-slate-200" />

            {/* Description */}
            <div>
              <div className="mb-4 h-6 w-32 animate-pulse rounded bg-slate-200" />

              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
              </div>
            </div>

            {/* Product Features */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-pink-100" />
                <div className="space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-14 animate-pulse rounded bg-slate-100" />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-purple-100" />
                <div className="space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-14 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            </div>

            {/* Quantity + Cart */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {/* Quantity */}
              <div className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 sm:w-32">
                <div className="h-5 w-5 animate-pulse rounded bg-slate-200" />
                <div className="h-5 w-6 animate-pulse rounded bg-slate-200" />
                <div className="h-5 w-5 animate-pulse rounded bg-slate-200" />
              </div>

              {/* Add Cart */}
              <div className="h-12 flex-1 animate-pulse rounded-xl bg-pink-200" />
            </div>

            {/* Wishlist */}
            <div className="mt-3 h-11 w-full animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center pb-12">
        {/* Spinner */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-4 border-pink-100" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500" />
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-500">
          Preparing product details
          <span className="text-pink-500">...</span>
        </p>

        <p className="mt-1 text-xs text-slate-400">Almost there!</p>
      </div>
    </main>
  );
};

export default Loading;
