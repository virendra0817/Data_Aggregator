import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex gap-3">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search country (e.g. India)"
        className="bg-slate-900 text-slate-100 placeholder:text-slate-400"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
