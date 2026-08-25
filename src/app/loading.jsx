import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Pink Glow */}
      <div
        className="
          absolute -left-32 -top-32
          h-96 w-96
          rounded-full
          bg-pink-300/30
          blur-3xl
          animate-pulse
        "
      />

      {/* Purple Glow */}
      <div
        className="
          absolute -bottom-32 -right-32
          h-96 w-96
          rounded-full
          bg-purple-300/30
          blur-3xl
          animate-pulse
        "
      />

      {/* Floating Decorations */}
      <span className="absolute left-[15%] top-[20%] text-xl opacity-60 animate-bounce">
        ✨
      </span>

      <span className="absolute right-[18%] top-[25%] text-2xl opacity-50 animate-pulse">
        💗
      </span>

      <span className="absolute bottom-[25%] left-[20%] text-xl opacity-50 animate-pulse">
        ⭐
      </span>

      <span className="absolute bottom-[20%] right-[15%] text-xl opacity-60 animate-bounce">
        ✨
      </span>

      {/* Small animated dots */}
      <span className="absolute left-[30%] top-[30%] h-2 w-2 rounded-full bg-pink-400/50 animate-ping" />

      <span className="absolute bottom-[30%] right-[30%] h-2 w-2 rounded-full bg-purple-400/50 animate-ping" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative flex h-36 w-36 items-center justify-center">
          {/* Outer spinning ring */}
          <div
            className="
              absolute inset-0
              rounded-full
              border-4
              border-pink-100
              border-t-pink-500
              border-r-purple-500
              animate-spin
            "
          />

          {/* Inner dashed ring */}
          <div
            className="
              absolute inset-3
              rounded-full
              border-2
              border-dashed
              border-pink-200
              animate-spin
            "
          />

          {/* Logo */}
          <div
            className="
              relative
              flex h-24 w-24
              items-center justify-center
              rounded-3xl
              border border-pink-100
              bg-white
              p-3
              shadow-xl
              shadow-pink-200/50
              ring-1 ring-slate-100
              transition-transform
              duration-300
              animate-pulse
            "
          >
            <Image
              src="/assets/logo.png"
              alt="Hero Kidz Logo"
              width={80}
              height={60}
              priority
              className="h-full w-full object-contain"
            />

            {/* Small decorative dot */}
            <span
              className="
                absolute -right-1 -top-1
                h-4 w-4
                rounded-full
                border-2 border-white
                bg-pink-500
                shadow-md
              "
            />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl">
            Getting things ready
            <span className="text-pink-500">...</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Please wait while we prepare something awesome
          </p>
        </div>

        <div className="mt-7 w-56 sm:w-64">
          <div className="h-2 overflow-hidden rounded-full bg-pink-100">
            <div
              className="
                h-full
                w-1/2
                rounded-full
                bg-gradient-to-r
                from-pink-500
                via-rose-500
                to-purple-500
                animate-pulse
              "
            />
          </div>

          {/* Loading dots */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-slate-400">
            <span>Loading...</span>

            <span className="flex gap-1">
              <span className="animate-bounce">●</span>

              <span className="animate-bounce [animation-delay:150ms]">●</span>

              <span className="animate-bounce [animation-delay:300ms]">●</span>
            </span>
          </div>
        </div>

        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
          Hero Kidz
        </p>

        <p className="mt-2 text-[10px] text-slate-300">Learn • Play • Grow</p>
      </div>
    </main>
  );
};

export default Loading;
