import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    quantity: number;
    size: string;
    color: string;
}

interface CartItemRowProps {
    item: CartItem;
    onQtyChange: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
    formatPrice: (price: number) => string;
}

export function CartItemRow({ item, onQtyChange, onRemove, formatPrice }: CartItemRowProps) {
    return (
        <Card className="p-0 rounded-none shadow-sm">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Size: {item.size}</span>
                            <span>Màu: {item.color}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-red-600">{formatPrice(item.price)}</span>
                            <span className="text-sm text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                            <Badge className="bg-red-100 text-red-800 text-xs">Giảm {Math.round((1 - item.price / item.originalPrice) * 100)}%</Badge>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(item.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                            aria-label={`Xóa ${item.name}`}
                        >
                            <Trash2 size={16} />
                        </Button>
                        <div className="flex items-center border rounded-md">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onQtyChange(item.id, -1)}
                                className="px-2 py-1 h-8"
                                disabled={item.quantity <= 1}
                                aria-label="Giảm số lượng"
                            >
                                <Minus size={14} />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium" aria-live="polite">
                                {item.quantity}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onQtyChange(item.id, 1)}
                                className="px-2 py-1 h-8"
                                aria-label="Tăng số lượng"
                            >
                                <Plus size={14} />
                            </Button>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
