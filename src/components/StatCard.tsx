export function StatCard({ value, label }: { value: string; label: string; }){
  return (
    <div className="card p-6">
      <p className="text-3xl md:text-4xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-neutral-600">{label}</p>
    </div>
  );
}