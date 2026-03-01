import { Link } from "react-router-dom";
import type { Contact } from "../../interfaces/types";
interface Props {
    contact: Contact
}

export const RightSidebarContact = ({ contact }: Props) => {
    return (
        <Link to={'/message/' + contact.id}>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                <div className="relative">
                    <img src={contact.avatarUrl} alt={contact.name} className="w-8 h-8 rounded-full object-cover" />
                    {contact.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-white border-2"></div>}
                </div>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-[15px]">{contact.name}</span>
            </div>
        </Link>
    )
}
