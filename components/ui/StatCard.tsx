import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export function StatCard({ title, value, change, icon: Icon, color, bgColor }: StatCardProps) {
  return (
    <div className="flex flex-col p-4 rounded-lg border border-pink-100 dark:border-pink-800 bg-white dark:bg-pink-950/50 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-md ${bgColor} transform transition-transform group-hover:scale-110`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-pink-900 dark:text-pink-100">{value}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{change}</span>
      </div>
    </div>
  );
}