import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function InfoCard({ title, children }) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-sm text-slate-200">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-300 space-y-1">
        {children}
      </CardContent>
    </Card>
  );
}
