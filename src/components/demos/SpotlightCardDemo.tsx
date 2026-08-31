import SpotlightCard from "../ui/SpotlightCard";

export default function SpotlightCardDemo() {
  return (
    <div className="mx-auto max-w-md">
      <SpotlightCard>
        <p className="text-sm text-zinc-500">
          Spotlight Card
        </p>

        <h3 className="mt-3 text-2xl font-semibold text-white">
          Move your cursor around.
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          The light follows your cursor across the surface.
        </p>
      </SpotlightCard>
    </div>
  );
}