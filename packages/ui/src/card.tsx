export function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-6 rounded-xl bg-stone-300">
    <h1 className="text-xl border-b pb-2 font-semibold subpixel-antialiased">
        {title}
    </h1>
    <div>{children}</div>
  </div>
  );
}
