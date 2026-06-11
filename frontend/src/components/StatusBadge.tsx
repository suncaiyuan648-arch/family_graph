interface StatusBadgeProps {
  children: string;
  tone?: "default" | "success" | "warning" | "danger" | "muted";
}

export function StatusBadge({ children, tone = "default" }: StatusBadgeProps) {
  return <span className={`status-badge ${tone}`}>{children}</span>;
}
