import { profile } from "console";
import { Badge } from "lucide-react";
import { Progress } from "../../../ui/progress";

export default function Rank() {
    return (
        <div>
            {/* Rank tổng quan + progress */}
            <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Hạng thành viên</div>
                    <Badge variant="outline" className="text-xs">
                        {profile.userRank}
                    </Badge>
                </div>
                <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span>Điểm hiện tại</span>
                        <span className="font-medium"> {points} 100000</span>
                    </div>
                    <Progress value={pct} />
                    <p className="text-xs text-muted-foreground">Tiếp tục tích điểm để nhận nhiều ưu đãi hơn.</p>
                </div>
            </div>
            {/* Khung rank từng bậc */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {TIERS.map((tier) => {
                    const isActive = (profile.userRank || "Bronze") === tier;
                    const b = TIER_BOUNDS[tier] || { min: 0 };
                    const label = b.max != null ? `${b.min}–${b.max}` : `${b.min}+`;
                    return (
                        <div key={tier} className={["rounded-xl border p-3", isActive ? "border-primary bg-muted/60" : "border-border bg-background"].join(" ")}>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">{tier}</span>
                                {isActive ? (
                                    <Badge className="text-[10px]" variant="default">
                                        Current
                                    </Badge>
                                ) : (
                                    <Badge className="text-[10px]" variant="outline">
                                        Tier
                                    </Badge>
                                )}
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                                Mốc điểm: <span className="text-foreground font-medium">{label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
