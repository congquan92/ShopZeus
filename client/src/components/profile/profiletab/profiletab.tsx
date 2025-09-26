import Info from "./info";
import Address from "./adress";

export default function ProfileTab() {
    return (
        <div className="space-y-4">
            {/* Profile Information */}
            <Info />

            {/* Address Management */}
            <Address />
        </div>
    );
}
